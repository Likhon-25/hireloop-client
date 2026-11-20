"use client";

import React from "react";
import { Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation"; // ১. রাউটার এবং সার্চ প্যারামস ইমপোর্ট
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
  checked,
  onChange,
}: {
  name: string;
  value: string;
  count: number;
  single?: boolean;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <label className="flex cursor-pointer items-center gap-2.5">
    <input
      type={single ? "radio" : "checkbox"}
      name={name}
      value={value}
      checked={checked} // URL অনুযায়ী টিক চিহ্ন ধরে রাখবে
      onChange={onChange} // ক্লিক করলে URL পরিবর্তন করার হ্যান্ডলার
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
  selectedValues,
  onChange,
}: {
  title: string;
  name: string;
  options: string[];
  counts: Record<string, number>;
  single?: boolean;
  selectedValues: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
          checked={selectedValues === option} // যদি এই অপশনটি সিলেক্টেড থাকে
          onChange={onChange}
        />
      ))}
    </div>
  </div>
);

export function JobFilters({ jobs }: { jobs: Job[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const workModeCounts = {
    Remote: jobs.filter((job) => job.isRemote).length,
    "On-site": jobs.filter((job) => !job.isRemote).length,
  };

  // ২. চেকবক্স বা অপশনে ক্লিক করলে URL পরিবর্তন করার মূল ফাংশন
  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    // বর্তমান URL-এ যা যা প্যারামিটার আছে তা কপি করা হচ্ছে (যাতে search মুছে না যায়)
    const params = new URLSearchParams(searchParams.toString());

    console.log(`Clicked Filter: ${name} -> ${value}`);

    // Work Mode হলে ব্যাকএন্ডের সাথে মিলিয়ে isRemote হ্যান্ডেল করা
    if (name === "workMode") {
      if (checked) {
        params.set("isRemote", value === "Remote" ? "true" : "false");
      } else {
        params.delete("isRemote");
      }
    } else {
      // type বা category হলে
      if (checked) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
    }

    // ৩. নতুন URL পুশ করা হচ্ছে (এর ফলে ব্রাউজারের URL স্বয়ংক্রিয়ভাবে চেঞ্জ হবে)
    router.push(`/browse-jobs?${params.toString()}`);
  };

  // URL এ বর্তমানে কোনটি সিলেক্ট করা আছে তা বের করা
  const currentType = searchParams.get("type");
  const currentCategory = searchParams.get("category");
  const currentIsRemote = searchParams.get("isRemote");
  const currentWorkMode =
    currentIsRemote === "true"
      ? "Remote"
      : currentIsRemote === "false"
        ? "On-site"
        : null;

  return (
    <aside
      aria-label="Job filters"
      className="h-fit rounded-2xl border border-white/7 bg-[#141418] p-6"
    >
      <h2 className="text-[22px] font-semibold text-[#ededef]">Filters</h2>

      <div className="mt-6 space-y-6">
        {/* Job Type Filter */}
        <FilterGroup
          title="Job Type"
          name="type"
          options={JOB_TYPES}
          counts={countBy(jobs.map((job) => job.type))}
          single
          selectedValues={currentType}
          onChange={handleCheckBoxChange}
        />

        {/* Category Filter */}
        <FilterGroup
          title="Category"
          name="category"
          options={JOB_CATEGORIES}
          counts={countBy(jobs.map((job) => job.category))}
          single
          selectedValues={currentCategory}
          onChange={handleCheckBoxChange}
        />

        {/* Work Mode Filter */}
        <FilterGroup
          title="Work Mode"
          name="workMode"
          options={["Remote", "On-site"]}
          counts={workModeCounts}
          single
          selectedValues={currentWorkMode}
          onChange={handleCheckBoxChange}
        />
      </div>
    </aside>
  );
}
