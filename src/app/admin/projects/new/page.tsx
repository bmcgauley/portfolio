import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlobFileInput } from "@/components/admin/BlobFileInput";
import { createProjectAction } from "../actions";

const inputClass =
  "w-full bg-vellum border border-gold-shadow rounded-[2px] px-4 py-3 font-serif text-body text-ink placeholder:text-ink-muted focus:border-crimson-deep focus:outline-none focus:ring-2 focus:ring-crimson-deep/30";

const labelClass =
  "block font-display uppercase tracking-[0.18em] text-xs text-crimson-deep mb-2";

const captionClass =
  "mt-2 font-serif italic text-caption text-ink-muted";

interface PageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewProjectPage({ searchParams }: PageProps) {
  const { error } = await searchParams;

  return (
    <div>
      <header className="mb-12">
        <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-3">
          Office · Projects
        </p>
        <h1 className="font-display font-bold uppercase tracking-[0.04em] text-display-2 text-ink">
          New Project
        </h1>
        <p className="font-serif italic text-body text-ink-soft mt-3">
          Add a consulting engagement, academic project, or case study.
        </p>
      </header>

      {error === "MISSING_FIELDS" ? (
        <p className="mb-8 bg-parchment border border-crimson-deep rounded-[2px] px-4 py-3 font-mono uppercase tracking-[0.18em] text-[11px] text-crimson-deep max-w-3xl">
          Title and Description are required.
        </p>
      ) : null}

      <form
        action={createProjectAction}
        encType="multipart/form-data"
        className="space-y-8 max-w-3xl"
      >
        <div>
          <label htmlFor="title" className={labelClass}>
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="slug" className={labelClass}>
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            placeholder="auto-generated from title if empty"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="category" className={labelClass}>
            Category
          </label>
          <select
            id="category"
            name="category"
            defaultValue=""
            className={inputClass}
          >
            <option value="">— None —</option>
            <option value="Consulting">Consulting</option>
            <option value="Academic">Academic</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Personal">Personal</option>
          </select>
        </div>

        <div>
          <label htmlFor="tags" className={labelClass}>
            Tags
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            placeholder="Next.js, React, Branding"
            className={inputClass}
          />
          <p className={captionClass}>
            Comma-separated, e.g. &lsquo;Next.js, React, Branding&rsquo;
          </p>
        </div>

        <div>
          <label htmlFor="technologies" className={labelClass}>
            Technologies
          </label>
          <input
            id="technologies"
            name="technologies"
            type="text"
            placeholder="TypeScript, MongoDB, Tailwind"
            className={inputClass}
          />
          <p className={captionClass}>
            Comma-separated tech stack.
          </p>
        </div>

        <div>
          <label htmlFor="imageFile" className={labelClass}>
            Image File
          </label>
          <BlobFileInput
            id="imageFile"
            name="uploadedImageUrl"
            accept="image/jpeg,image/png,image/webp"
            pathPrefix="projects"
          />
          <p className={captionClass}>
            Upload an image (jpg, png, webp). Or paste a URL below — the file
            takes precedence if both provided.
          </p>
        </div>

        <div>
          <label htmlFor="imageUrl" className={labelClass}>
            Image URL
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            className={inputClass}
          />
          <p className={captionClass}>
            External URL (e.g. screenshot host). Used only if no file uploaded.
          </p>
        </div>

        <div>
          <label htmlFor="demoUrl" className={labelClass}>
            Demo URL
          </label>
          <input
            id="demoUrl"
            name="demoUrl"
            type="text"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="githubUrl" className={labelClass}>
            GitHub URL
          </label>
          <input
            id="githubUrl"
            name="githubUrl"
            type="text"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="folderName" className={labelClass}>
            Folder Name
          </label>
          <input
            id="folderName"
            name="folderName"
            type="text"
            className={inputClass}
          />
          <p className={captionClass}>
            Optional legacy field for /public/images/projects/&lt;folder&gt;/
            assets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="featured"
            name="featured"
            type="checkbox"
            className="h-4 w-4 accent-crimson-deep"
          />
          <label
            htmlFor="featured"
            className="font-serif text-body text-ink"
          >
            Feature on home page
          </label>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Button type="submit">Create Project</Button>
          <Link
            href="/admin/projects"
            className="font-display uppercase tracking-[0.05em] text-xs text-ink-soft hover:text-crimson-deep"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
