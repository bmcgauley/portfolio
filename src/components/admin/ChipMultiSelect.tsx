"use client";

import { useMemo, useState } from "react";

const CHIP_BASE =
  "inline-flex items-center gap-2 rounded-full pl-4 pr-3 py-1.5 font-serif text-body cursor-pointer transition-colors select-none";

type Props = {
  /** Hidden form field name; selected names submit as JSON array. */
  name: string;
  /** All known names from the master library. */
  library: string[];
  /** Initially selected names (project edit pages). */
  defaultValue?: string[];
  /** Optional placeholder text for the "add new" input. */
  addPlaceholder?: string;
  id?: string;
};

export function ChipMultiSelect({
  name,
  library,
  defaultValue = [],
  addPlaceholder = "Add new…",
  id,
}: Props) {
  const [selected, setSelected] = useState<string[]>(
    [...defaultValue].map((s) => s.trim()).filter((s) => s.length > 0),
  );
  const [draft, setDraft] = useState("");

  const allChips = useMemo(() => {
    const combined = new Set<string>();
    for (const item of library) combined.add(item);
    for (const item of selected) combined.add(item);
    return Array.from(combined).sort((a, b) => a.localeCompare(b));
  }, [library, selected]);

  function toggle(option: string) {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((p) => p !== option)
        : [...prev, option],
    );
  }

  function commitDraft() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (!selected.includes(trimmed)) {
      setSelected((prev) => [...prev, trimmed]);
    }
    setDraft("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commitDraft();
    } else if (e.key === "Backspace" && draft === "" && selected.length > 0) {
      setSelected((prev) => prev.slice(0, -1));
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(selected)} />

      {allChips.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-3">
          {allChips.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggle(option)}
                aria-pressed={isSelected}
                className={
                  CHIP_BASE +
                  (isSelected
                    ? " bg-crimson-deep text-vellum border border-crimson-deep"
                    : " bg-vellum text-ink border border-gold-shadow hover:border-crimson-deep")
                }
              >
                <span>{option}</span>
                {isSelected ? (
                  <span aria-hidden className="font-mono text-[12px] leading-none">
                    &times;
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="flex items-center gap-2 max-w-md">
        <input
          id={id}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commitDraft}
          placeholder={addPlaceholder}
          className="flex-1 bg-vellum border border-gold-shadow rounded-[2px] px-3 py-2 font-serif text-body text-ink placeholder:text-ink-muted focus:border-crimson-deep focus:outline-none focus:ring-2 focus:ring-crimson-deep/30"
        />
        <button
          type="button"
          onClick={commitDraft}
          disabled={draft.trim().length === 0}
          className="font-display uppercase tracking-[0.18em] text-xs text-crimson-deep hover:text-crimson disabled:opacity-30 disabled:cursor-not-allowed px-3 py-2"
        >
          + Add
        </button>
      </div>
    </div>
  );
}
