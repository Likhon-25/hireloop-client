import {
  BriefcaseBusiness,
  CalendarDays,
  CircleDollarSign,
  MapPin,
} from "lucide-react";

import { formatDeadline, formatSalary, locationLabel } from "@/lib/job";
import type { Job } from "@/types/job";

// The four small info cards from the Figma "Bento Info Grid".
export function JobInfoGrid({ job }: { job: Job }) {
  const items = [
    {
      icon: CircleDollarSign,
      label: "SALARY RANGE",
      value: formatSalary(job),
    },
    { icon: MapPin, label: "LOCATION", value: locationLabel(job) || "—" },
    { icon: BriefcaseBusiness, label: "JOB TYPE", value: job.type || "—" },
    {
      icon: CalendarDays,
      label: "DEADLINE",
      value: formatDeadline(job.deadline),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-white/7 bg-[#141418] p-5 sm:p-6"
        >
          <item.icon className="size-5 text-[#c4c7c8]" />
          <p className="mt-4 text-[13px] font-medium text-[#a0a0ab]">
            {item.label}
          </p>
          <p className="mt-1 text-base font-semibold text-[#ededef]">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
