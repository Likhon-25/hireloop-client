import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { categoryColor } from "@/lib/job";
import type { Job } from "@/types/job";

const OverviewRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between gap-4 py-3">
    <dt className="text-[13px] text-[#a0a0ab]">{label}</dt>
    <dd className="text-right text-base text-[#ededef]">{value}</dd>
  </div>
);

// The company card in the right sidebar of the details page.
export function CompanyOverview({ job }: { job: Job }) {
  const initial = job.company?.charAt(0).toUpperCase() || "?";

  return (
    <aside className="h-fit rounded-2xl border border-white/7 bg-[#141418] p-6">
      <h2 className="text-[22px] font-semibold text-[#ededef]">
        Company Overview
      </h2>

      {/* Decorative banner in place of the company photo */}
      <div className="relative mt-6 h-[204px] overflow-hidden rounded-xl border border-white/7 bg-gradient-to-br from-[#5c53fe]/35 via-[#1f1f28] to-[#141418]">
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center pb-8 text-7xl font-bold opacity-40"
          style={{ color: categoryColor(job.category) }}
        >
          {initial}
        </span>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b0b0c] to-transparent p-5">
          <p className="text-base font-semibold text-white">{job.company}</p>
          <p className="text-[13px] text-[#a0a0ab]">{job.category}</p>
        </div>
      </div>

      <dl className="mt-6 divide-y divide-white/7">
        <OverviewRow label="CATEGORY" value={job.category || "—"} />
        <OverviewRow
          label="WORK MODE"
          value={job.isRemote ? "Remote" : "On-site"}
        />
      </dl>

      <Link
        href="/browse-jobs"
        className="mt-6 flex h-11 items-center justify-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.04] text-[13px] font-medium text-[#ededef] transition-colors hover:bg-white/[0.08]"
      >
        <ArrowLeft className="size-4" />
        Browse More Jobs
      </Link>
    </aside>
  );
}
