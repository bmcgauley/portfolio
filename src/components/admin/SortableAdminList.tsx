"use client";

import { useState, useTransition, type ReactNode } from "react";
import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type SortableItem = {
  id: string;
  node: ReactNode;
};

export function SortableAdminList({
  items,
  reorderAction,
}: {
  items: SortableItem[];
  reorderAction: (orderedIds: string[]) => Promise<void>;
}) {
  const [order, setOrder] = useState<SortableItem[]>(items);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = order.findIndex((i) => i.id === active.id);
    const newIndex = order.findIndex((i) => i.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;

    const previous = order;
    const next = arrayMove(order, oldIndex, newIndex);
    setOrder(next);
    setError(null);

    startTransition(async () => {
      try {
        await reorderAction(next.map((i) => i.id));
      } catch {
        setOrder(previous);
        setError("Failed to save order. Please try again.");
      }
    });
  }

  return (
    <div>
      {error ? (
        <p className="font-serif italic text-body text-crimson-deep mb-4">
          {error}
        </p>
      ) : null}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={order.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul
            className="space-y-4"
            data-pending={isPending ? "true" : undefined}
          >
            {order.map((item) => (
              <SortableRow key={item.id} id={item.id}>
                {item.node}
              </SortableRow>
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableRow({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
      }}
      className="relative flex items-stretch gap-3"
    >
      <button
        type="button"
        aria-label="Drag to reorder"
        {...attributes}
        {...listeners}
        className="shrink-0 cursor-grab active:cursor-grabbing select-none px-2 py-2 rounded-[2px] hover:bg-parchment text-gold-shadow hover:text-crimson-deep transition-colors flex items-center justify-center"
      >
        <svg
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="currentColor"
          aria-hidden
        >
          <circle cx="5" cy="4" r="1.5" />
          <circle cx="11" cy="4" r="1.5" />
          <circle cx="5" cy="10" r="1.5" />
          <circle cx="11" cy="10" r="1.5" />
          <circle cx="5" cy="16" r="1.5" />
          <circle cx="11" cy="16" r="1.5" />
        </svg>
      </button>
      <div className="flex-1 min-w-0">{children}</div>
    </li>
  );
}
