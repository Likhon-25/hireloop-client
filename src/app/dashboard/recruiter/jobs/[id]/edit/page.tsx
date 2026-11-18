import { notFound } from "next/navigation";

import { JobPostForm, type JobFormData } from "@/app/components/JobPostForm";
import { getJob } from "@/lib/api/jobs";

// The job is read from the API on every request.
export const instant = false;

const EditJobPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) notFound();

  // The API returns the saved document, so any missing field falls back to a
  // sensible default and the form always gets plain strings.
  const initialValues: JobFormData = {
    title: job.title ?? "",
    company: job.company ?? "",
    category: job.category ?? "",
    type: job.type ?? "Full-time",
    isRemote: Boolean(job.isRemote),
    location: job.location ?? "",
    deadline: job.deadline ?? "",
    minSalary: String(job.minSalary ?? ""),
    maxSalary: String(job.maxSalary ?? ""),
    frequency: job.frequency ?? "per hour",
    responsibilities: job.responsibilities ?? "",
    qualifications: job.qualifications ?? "",
  };

  return <JobPostForm jobId={id} initialValues={initialValues} />;
};

export default EditJobPage;
