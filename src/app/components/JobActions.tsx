import Link from "next/link";
import { Eye, Pencil } from "lucide-react";

import { DeleteJobDialog } from "@/app/components/DeleteJobDialog";
import type { Job } from "@/types/job";

// Update, view and delete buttons shown in every row of the jobs table.
export function JobActions({ job }: { job: Pick<Job, "_id" | "title"> }) {
  return (
    <div className="flex items-center justify-end gap-1.5">
      <Link
        href={`/dashboard/recruiter/jobs/${job._id}/edit`}
        aria-label={`Update ${job.title}`}
        className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#5c53fe] px-3 text-xs font-medium text-[#c3c0ff] transition-colors hover:bg-[#6b63ff]"
      >
        <Pencil className="size-3.5" />
        Update
      </Link>

      <Link
        href={`/dashboard/recruiter/jobs/${job._id}`}
        aria-label={`View ${job.title}`}
        className="hidden size-8 items-center justify-center rounded-lg bg-[#1f1f1f] text-[#a0a0ab] transition-colors hover:text-white sm:inline-flex"
      >
        <Eye className="size-4" />
      </Link>

      <DeleteJobDialog job={job} />
    </div>
  );
}
