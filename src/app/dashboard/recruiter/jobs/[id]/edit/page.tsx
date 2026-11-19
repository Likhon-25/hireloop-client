import { notFound } from "next/navigation";

import { JobPostForm } from "@/app/components/JobPostForm";
import { getJob } from "@/lib/api/jobs";
import { toFormValues } from "@/lib/job";
import type { Job } from "@/types/job";

// The job is read from the API on every request.
export const instant = false;

const EditJobPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const job: Job | null = await getJob(id);

  if (!job) notFound();

  return <JobPostForm jobId={id} initialValues={toFormValues(job)} />;
};

export default EditJobPage;
