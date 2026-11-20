import {
  Bookmark,
  Briefcase,
  CircleDollarSign,
  Globe2,
  TriangleAlert,
} from "lucide-react";
import type { ReactNode } from "react";

import {
  categoryColor,
  formatSalary,
  getJobStatus,
  locationLabel,
} from "@/lib/job";
import type { Job } from "@/types/job";

// The small bordered chips under the job title (salary, job type).
const InfoChip = ({
  icon: Icon,
  children,
}: {
  icon: typeof Briefcase;
  children: ReactNode;
}) => (
  <span className="inline-flex h-[30px] items-center gap-1.5 rounded-md border border-white/10 bg-[#1a1a1f] px-2.5 text-[13px] font-medium text-[#ededef]">
    <Icon className="size-3.5 shrink-0 text-[#e5e2e3]" />
    {children}
  </span>
);

// The colored badges from the Figma cards (green = remote, amber = expired).
const BADGE_TONES = {
  green: "border-[#22c55e]/30 bg-[#22c55e]/10 text-[#22c55e]",
  amber: "border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#f59e0b]",
};

const JobBadge = ({
  tone,
  icon: Icon,
  children,
}: {
  tone: keyof typeof BADGE_TONES;
  icon: typeof Briefcase;
  children: ReactNode;
}) => (
  <span
    className={`inline-flex h-[30px] items-center gap-1.5 rounded-md border px-2.5 text-[13px] font-medium ${BADGE_TONES[tone]}`}
  >
    <Icon className="size-3.5 shrink-0" />
    {children}
  </span>
);

// One job card, matching the Figma "Article - Job Card" design.
export function JobCard({ job }: { job: Job }) {
  const expired = getJobStatus(job) === "Expired";
  const initial = job.company?.charAt(0).toUpperCase() || "?";

  return (
    <article className="rounded-2xl border border-white/7 bg-[#141418] p-6 transition-colors hover:border-white/15">
      <div className="flex gap-5">
        {/* Company logo placeholder, tinted with the category color */}
        <span
          aria-hidden="true"
          className="flex size-16 shrink-0 items-center justify-center rounded-lg border border-white/7 bg-[#222228] text-[22px] font-semibold"
          style={{ color: categoryColor(job.category) }}
        >
          {initial}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-xl font-semibold text-[#ededef] sm:text-[22px]">
                {job.title}
              </h3>
              <p className="mt-1 truncate text-sm font-semibold text-[#6e6e78] sm:text-base">
                {job.company}
                {job.location ? ` • ${locationLabel(job)}` : null}
              </p>
            </div>

            <button
              type="button"
              aria-label={`Save ${job.title}`}
              className="flex size-10 shrink-0 items-center justify-center rounded-lg text-[#8e9192] transition-colors hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-[#5c53fe] focus-visible:outline-none"
            >
              <Bookmark className="size-[18px]" />
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <InfoChip icon={CircleDollarSign}>{formatSalary(job)}</InfoChip>
            <InfoChip icon={Briefcase}>{job.type}</InfoChip>

            {job.isRemote ? (
              <JobBadge tone="green" icon={Globe2}>
                Remote
              </JobBadge>
            ) : null}

            {expired ? (
              <JobBadge tone="amber" icon={TriangleAlert}>
                Expired
              </JobBadge>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
