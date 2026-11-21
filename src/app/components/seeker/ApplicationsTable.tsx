import Link from "next/link";
import { Briefcase } from "lucide-react";

import { ApplicationStatusPill } from "@/app/components/seeker/ApplicationStatusPill";
import type { ApplicationListItem } from "@/types/application";

type ApplicationsTableProps = {
  applications: ApplicationListItem[];
  emptyMessage: string;
};

// The Figma table: Job Title, Company, Applied, Status, Action.
export function ApplicationsTable({
  applications,
  emptyMessage,
}: ApplicationsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[820px] table-fixed text-left">
        <colgroup>
          <col className="w-[30.5%]" />
          <col className="w-[20%]" />
          <col className="w-[15%]" />
          <col className="w-[17.5%]" />
          <col className="w-[17%]" />
        </colgroup>

        <thead className="bg-[#1a1a1f]">
          <tr className="border-b border-white/[0.07]">
            <th className="px-4 py-3.5 text-xs font-medium text-[#6e6e78]">
              Job Title
            </th>
            <th className="px-4 py-3.5 text-xs font-medium text-[#6e6e78]">
              Company
            </th>
            <th className="px-4 py-3.5 text-xs font-medium text-[#6e6e78]">
              Applied
            </th>
            <th className="px-4 py-3.5 text-xs font-medium text-[#6e6e78]">
              Status
            </th>
            <th className="px-4 py-3.5 text-right text-xs font-medium text-[#6e6e78]">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-14 text-center text-[13px] text-[#a0a0ab]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : null}

          {applications.map((application) => (
            <tr
              key={
                application._id ??
                `${application.jobId}-${application.appliedAt}`
              }
              className="h-16 border-b border-white/[0.07] transition-colors last:border-b-0 hover:bg-white/[0.02]"
            >
              {/* Job title + type / work mode */}
              <td className="px-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded bg-[#222228]">
                    <Briefcase className="size-3.5 text-white" />
                  </span>

                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-[#ededef]">
                      {application.jobTitle}
                    </p>
                    <p className="truncate text-xs text-[#a0a0ab]">
                      {application.jobType} &bull; {application.workMode}
                    </p>
                  </div>
                </div>
              </td>

              <td className="truncate px-4 text-[13px] text-[#ededef]">
                {application.company}
              </td>

              <td className="px-4 text-[13px] whitespace-nowrap text-[#a0a0ab]">
                {application.appliedLabel}
              </td>

              <td className="px-4">
                <ApplicationStatusPill status={application.status} />
              </td>

              <td className="px-4 text-right">
                <Link
                  href={
                    application.jobId
                      ? `/browse-jobs/${application.jobId}`
                      : "/browse-jobs"
                  }
                  className="text-[13px] text-[#ededef] transition-colors hover:text-white hover:underline"
                >
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
