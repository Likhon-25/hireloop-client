import { BadgeCheck, Bookmark, TriangleAlert } from "lucide-react";

import { categoryColor, getJobStatus } from "@/lib/job";
import { cn } from "@/lib/utils";
import type { Job } from "@/types/job";

// Top card of the Figma job details page.
export function JobDetailsHeader({ job }: { job: Job }) {
  const active = getJobStatus(job) === "Active";
  const initial = job.company?.charAt(0).toUpperCase() || "?";

  return (
    <header className="rounded-2xl border border-white/7 bg-[#141418] p-6 sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-5 sm:gap-6">
          {/* Company logo placeholder, same idea as the browse cards */}
          <span
            aria-hidden="true"
            className="flex size-20 shrink-0 items-center justify-center rounded-xl border border-white/7 bg-[#1a1a1f] text-3xl font-semibold"
            style={{ color: categoryColor(job.category) }}
          >
            {initial}
          </span>

          <div className="min-w-0">
            <h1 className="text-2xl leading-tight font-semibold text-[#ededef] sm:text-[32px]">
              {job.title}
            </h1>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <span className="text-lg font-semibold text-[#a0a0ab] sm:text-[22px]">
                {job.company}
              </span>

              <span
                aria-hidden="true"
                className="size-1 rounded-full bg-[#8e9192]"
              />

              <span
                className={cn(
                  "inline-flex items-center gap-1.5 text-sm font-semibold sm:text-base",
                  active ? "text-[#22c55e]" : "text-[#f59e0b]",
                )}
              >
                {active ? (
                  <BadgeCheck className="size-4" />
                ) : (
                  <TriangleAlert className="size-4" />
                )}
                {active ? "Actively Hiring" : "Applications Closed"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            aria-label={`Save ${job.title}`}
            className="flex size-12 items-center justify-center rounded-lg border border-white/7 bg-[#222228] text-[#e5e2e3] transition-colors hover:bg-[#2a2a31] hover:text-white focus-visible:ring-2 focus-visible:ring-[#5c53fe] focus-visible:outline-none"
          >
            <Bookmark className="size-[18px]" />
          </button>

          <button
            type="button"
            disabled={!active}
            className="h-12 rounded-lg bg-[#fafafa] px-5 text-base font-medium text-[#0b0b0c] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {active ? "Apply Now" : "Applications Closed"}
          </button>
        </div>
      </div>
    </header>
  );
}
