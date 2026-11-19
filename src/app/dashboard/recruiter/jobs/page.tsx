import Link from "next/link";
import { Briefcase, MapPin, Plus, Users } from "lucide-react";

import { JobActions } from "@/app/components/JobActions";
import { JobStatusPill } from "@/app/components/JobStatusPill";
import { PageHeader } from "@/app/components/PageHeader";
import { getJobs } from "@/lib/api/jobs";
import {
  formatDeadline,
  formatSalary,
  getJobStatus,
  locationLabel,
} from "@/lib/job";
import { cn } from "@/lib/utils";
import type { Job } from "@/types/job";

// Each department gets its own accent, same idea as the Figma rows.
const categoryColors: Record<string, string> = {
  "Engineering & Tech": "#38bdf8",
  "Design & Creative": "#f97316",
  "Product & Management": "#5c53fe",
  "Marketing & Sales": "#c3c0ff",
  "Finance & Accounting": "#4ade80",
  "Customer Support": "#818cf8",
  Other: "#a0a0ab",
};

const categoryColor = (category: string) =>
  categoryColors[category] ?? categoryColors.Other;

const thClasses =
  "px-3 py-3.5 text-[11px] font-medium tracking-wider whitespace-nowrap text-[#a0a0ab]";

// The table reads live jobs from the API, so the route renders per request.
export const instant = false;

const ManageJobsPage = async () => {
  // Typed here because getJobs() returns the raw JSON from the API.
  const jobs: Job[] = await getJobs();

  return (
    <div className="mx-auto max-w-[1395px]">
      <PageHeader
        breadcrumb={[
          { label: "Manage Jobs", href: "/dashboard/recruiter/jobs" },
          { label: "Job Listings & Postings", className: "text-[#c3c0ff]" },
        ]}
        title="Manage Job Posts"
        description="Review live listings, monitor applicants, and update job details across your organization."
        descriptionClassName="max-w-[580px]"
        action={
          <Link
            href="/dashboard/recruiter/jobs/new"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#5c53fe] px-5 text-sm font-medium text-white transition-colors hover:bg-[#6b63ff]"
          >
            <Plus className="size-4" />
            New Job Post
          </Link>
        }
      />

      {/* Scrolls sideways on narrow screens so no column gets squeezed */}
      <div className="overflow-hidden rounded-2xl border border-[#232327] bg-[#151516]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#0b0b0c]">
              <tr>
                <th className={cn(thClasses, "pl-5")}>JOB TITLE &amp; DEPT</th>
                <th className={cn(thClasses, "hidden md:table-cell")}>
                  COMPANY &amp; LOCATION
                </th>
                <th className={cn(thClasses, "hidden sm:table-cell")}>TYPE</th>
                <th className={cn(thClasses, "hidden lg:table-cell")}>
                  COMPENSATION
                </th>
                <th className={cn(thClasses, "hidden lg:table-cell")}>
                  APPLICANTS
                </th>
                <th className={thClasses}>STATUS</th>
                <th className={cn(thClasses, "hidden xl:table-cell")}>
                  DEADLINE
                </th>
                <th className={cn(thClasses, "pr-5 text-right")}>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-16 text-center text-sm text-[#a0a0ab]"
                  >
                    No job posts found.
                  </td>
                </tr>
              ) : null}

              {jobs.map((job) => {
                const status = getJobStatus(job);
                const expired = status === "Expired";

                return (
                  <tr
                    key={job._id}
                    className="border-t border-[#232327] transition-colors hover:bg-white/[0.02]"
                  >
                    {/* Job title + department */}
                    <td className="py-4 pr-3 pl-5">
                      <div className="flex items-center gap-2.5">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#232327]">
                          <Briefcase
                            className="size-4"
                            style={{ color: categoryColor(job.category) }}
                          />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-medium text-white">
                            {job.title}
                          </p>
                          <p
                            className="truncate text-xs"
                            style={{ color: categoryColor(job.category) }}
                          >
                            {job.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Company + location */}
                    <td className="hidden px-3 py-4 md:table-cell">
                      <p className="truncate text-[13px] text-white">
                        {job.company}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-[#a0a0ab]">
                        <MapPin className="size-3.5 shrink-0" />
                        <span className="truncate">{locationLabel(job)}</span>
                      </p>
                    </td>

                    {/* Job type */}
                    <td className="hidden px-3 py-4 sm:table-cell">
                      <span className="inline-flex h-[30px] items-center rounded-full border border-[#232327] bg-[#1f1f1f] px-2.5 text-[13px] whitespace-nowrap text-[#d4d4d8]">
                        {job.type}
                      </span>
                    </td>

                    {/* Compensation */}
                    <td className="hidden px-3 py-4 text-[13px] whitespace-nowrap text-white lg:table-cell">
                      {formatSalary(job)}
                    </td>

                    {/* Applicants */}
                    <td className="hidden px-3 py-4 lg:table-cell">
                      <span className="flex items-center gap-1.5 text-[13px] whitespace-nowrap text-[#c3c0ff]">
                        <Users className="size-4" />
                        {job.applicants ?? 0} Candidates
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-3 py-4">
                      <JobStatusPill status={status} />
                    </td>

                    {/* Deadline */}
                    <td className="hidden px-3 py-4 xl:table-cell">
                      <p
                        className={cn(
                          "text-[13px] whitespace-nowrap",
                          expired ? "text-[#a0a0ab]" : "text-white",
                        )}
                      >
                        {formatDeadline(job.deadline)}
                      </p>
                      {job.posted ? (
                        <p className="text-xs whitespace-nowrap text-[#5a5a60]">
                          {job.posted}
                        </p>
                      ) : null}
                    </td>

                    {/* Actions */}
                    <td className="py-4 pr-5 pl-3">
                      <JobActions job={job} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageJobsPage;
