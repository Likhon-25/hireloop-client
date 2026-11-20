import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { CompanyOverview } from "@/app/components/browse/CompanyOverview";
import { JobDetailsContent } from "@/app/components/browse/JobDetailsContent";
import { JobDetailsHeader } from "@/app/components/browse/JobDetailsHeader";
import { JobInfoGrid } from "@/app/components/browse/JobInfoGrid";
import { getJob } from "@/lib/api/jobs";
import type { Job } from "@/types/job";

// The job is read from the API on every request.
export const instant = false;

const JobDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const job: Job | null = await getJob(id);

  if (!job) notFound();

  return (
    <main className="flex-1 bg-[#08080a] pb-16">
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-8 sm:pt-8 lg:px-10 xl:px-20">
        <Link
          href="/browse-jobs"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#a0a0ab] transition-colors hover:text-white lg:hidden"
        >
          <ArrowLeft className="size-4" />
          Back to jobs
        </Link>

        <JobDetailsHeader job={job} />

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_397px]">
          <div className="space-y-6">
            <JobInfoGrid job={job} />
            <JobDetailsContent job={job} />
          </div>

          <CompanyOverview job={job} />
        </div>
      </div>
    </main>
  );
};

export default JobDetailsPage;
