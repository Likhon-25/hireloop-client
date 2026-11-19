import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  CalendarDays,
  Globe2,
  MapPin,
  Wallet,
} from "lucide-react";

import { PageHeader } from "@/app/components/PageHeader";
import { SectionCard } from "@/app/components/SectionCard";
import { getJob } from "@/lib/api/jobs";
import { formatDeadline, formatMoney } from "@/lib/job";
import type { Job } from "@/types/job";

// The details come from the API on every request.
export const instant = false;

const DetailItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Briefcase;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-2.5">
    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#232327]">
      <Icon className="size-4 text-[#a0a0ab]" />
    </span>
    <div className="min-w-0">
      <p className="text-xs text-[#a0a0ab]">{label}</p>
      <p className="truncate text-sm font-medium text-white">{value || "—"}</p>
    </div>
  </div>
);

const JobDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const job: Job | null = await getJob(id);

  if (!job) notFound();

  // Every value shown in the overview grid, so the markup stays short.
  const overview = [
    { icon: Briefcase, label: "Company", value: job.company },
    { icon: Briefcase, label: "Job Category", value: job.category },
    { icon: Briefcase, label: "Job Type", value: job.type },
    {
      icon: Globe2,
      label: "Work Mode",
      value: job.isRemote ? "Remote" : "On-site",
    },
    { icon: MapPin, label: "Location", value: job.location },
    {
      icon: CalendarDays,
      label: "Application Deadline",
      value: formatDeadline(job.deadline),
    },
  ];

  return (
    <div className="mx-auto max-w-[984px]">
      <PageHeader
        className="items-start"
        breadcrumb={[
          { label: "Manage Jobs", href: "/dashboard/recruiter/jobs" },
          { label: job.title },
        ]}
        title={job.title}
        meta={
          <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-[#a0a0ab]">
            <span>{job.company}</span>
            <span className="size-1 rounded-full bg-[#5a5a60]" />
            <span className="text-[#c3c0ff]">{job.category}</span>
          </p>
        }
        action={
          <Link
            href="/dashboard/recruiter/jobs"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#232327] bg-[#1e1e21] px-4 text-sm font-medium text-white transition-colors hover:bg-[#232327]"
          >
            <ArrowLeft className="size-4" />
            Back to jobs
          </Link>
        }
      />

      <div className="space-y-6">
        <SectionCard
          title="Job Overview"
          bodyClassName="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {overview.map((item) => (
            <DetailItem key={item.label} {...item} />
          ))}
        </SectionCard>

        <SectionCard
          title="Compensation"
          bodyClassName="mt-5 flex items-center gap-2.5"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-[#232327]">
            <Wallet className="size-4 text-[#5c53fe]" />
          </span>
          <p className="text-lg font-semibold text-white">
            ${formatMoney(job.minSalary)} – ${formatMoney(job.maxSalary)}
            <span className="ml-1 text-sm font-normal text-[#a0a0ab]">
              / {job.frequency.replace("per ", "")}
            </span>
          </p>
        </SectionCard>

        <SectionCard title="Key Responsibilities" bodyClassName="mt-4">
          <p className="text-sm leading-relaxed whitespace-pre-line text-[#d4d4d8]">
            {job.responsibilities || "No responsibilities added."}
          </p>
        </SectionCard>

        <SectionCard title="Qualifications & Requirements" bodyClassName="mt-4">
          <p className="text-sm leading-relaxed whitespace-pre-line text-[#d4d4d8]">
            {job.qualifications || "No qualifications added."}
          </p>
        </SectionCard>
      </div>
    </div>
  );
};

export default JobDetailsPage;
