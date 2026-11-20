import { ChevronDown } from "lucide-react";

import { JobCard } from "@/app/components/browse/JobCard";
import type { Job } from "@/types/job";

// Results header, sort dropdown and the job card list.
export function JobResults({ jobs }: { jobs: Job[] }) {
  return (
    <section aria-label="Job results">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[22px] font-semibold text-[#ededef]">
          Found {jobs.length.toLocaleString("en-US")} Professional Jobs
        </h2>

        <label className="flex items-center gap-2 text-[13px] font-medium text-[#6e6e78]">
          Sort by:
          <span className="relative">
            <select
              name="sort"
              defaultValue="Most Recent"
              aria-label="Sort jobs"
              className="h-9 appearance-none rounded-lg border border-white/10 bg-[#0c0c0f] pr-9 pl-3 text-[13px] font-medium text-[#ededef] outline-none focus-visible:border-[#5c53fe]"
            >
              <option>Most Recent</option>
              <option>Salary: High to Low</option>
              <option>Salary: Low to High</option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#a1a4aa]" />
          </span>
        </label>
      </div>

      <div className="mt-6 space-y-3">
        {jobs.length === 0 ? (
          <p className="rounded-2xl border border-white/7 bg-[#141418] px-6 py-16 text-center text-sm text-[#a0a0ab]">
            No jobs found.
          </p>
        ) : (
          jobs.map((job) => <JobCard key={job._id} job={job} />)
        )}
      </div>
    </section>
  );
}
