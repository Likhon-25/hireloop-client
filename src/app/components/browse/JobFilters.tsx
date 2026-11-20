"use client"; 

import { Check } from "lucide-react";
import { JOB_CATEGORIES, JOB_TYPES } from "@/lib/job";
import type { Job } from "@/types/job";

// Counts how many jobs share each value
const countBy = (values: string[]) => {
  const counts: Record<string, number> = {};
  for (const value of values) {
    counts[value] = (counts[value] ?? 0) + 1;
  }
  return counts;
};

// FilterOption
const FilterOption = ({
  name,
  value,
  count,
  single,
  onSelect,
}: {
  name: string;
  value: string;
  count: number;
  single?: boolean;
  onSelect?: () => void;
}) => (
  <label className="flex cursor-pointer items-center gap-2.5">
    <input
      type={single ? "radio" : "checkbox"}
      name={name}
      value={value}
      onChange={onSelect} 
      className="peer sr-only"
    />

    <span className="flex size-[22px] shrink-0 items-center justify-center rounded border border-white/7 bg-[#1a1a1f] text-transparent transition-colors peer-checked:border-white peer-checked:bg-white peer-checked:text-[#08080a] peer-focus-visible:ring-2 peer-focus-visible:ring-[#5c53fe]/60">
      <Check className="size-3.5" strokeWidth={3} />
    </span>

    <span className="flex-1 text-[13px] font-medium text-[#a0a0ab]">
      {value}
    </span>
    <span className="text-xs text-[#6e6e78]">
      {count.toLocaleString("en-US")}
    </span>
  </label>
);

// FilterGroup
const FilterGroup = ({
  title,
  name,
  options,
  counts,
  single = false,
}: {
  title: string;
  name: string;
  options: string[];
  counts: Record<string, number>;
  single?: boolean;
}) => (
  <div>
    <h3 className="text-base font-semibold text-[#ededef]">{title}</h3>

    <div className="mt-3.5 space-y-3">
      {options.map((option) => (
        <FilterOption
          key={option}
          name={name}
          value={option}
          count={counts[option] ?? 0}
          single={single}
          onSelect={() => console.log(`${title} ${option}`)}
        />
      ))}
    </div>
  </div>
);

export function JobFilters({ jobs }: { jobs: Job[] }) {
  const workModeCounts = {
    Remote: jobs.filter((job) => job.isRemote).length,
    "On-site": jobs.filter((job) => !job.isRemote).length,
  };

  return (
    <aside
      aria-label="Job filters"
      className="h-fit rounded-2xl border border-white/7 bg-[#141418] p-6"
    >
      <h2 className="text-[22px] font-semibold text-[#ededef]">Filters</h2>

      <div className="mt-6 space-y-6">
        <FilterGroup
          title="Job Type"
          name="type"
          options={JOB_TYPES}
          counts={countBy(jobs.map((job) => job.type))}
          single
        />

        <FilterGroup
          title="Category"
          name="category"
          options={JOB_CATEGORIES}
          counts={countBy(jobs.map((job) => job.category))}
          single
        />

        <FilterGroup
          title="Work Mode"
          name="workMode"
          options={["Remote", "On-site"]}
          counts={workModeCounts}
        />
      </div>
    </aside>
  );
}