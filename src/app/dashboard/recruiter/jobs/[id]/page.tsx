import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  CalendarDays,
  ChevronRight,
  Globe2,
  MapPin,
  Wallet,
} from "lucide-react";

import type { JobFormData } from "../new/page";
import { getJob } from "@/lib/api/jobs";

type JobDetails = JobFormData & { _id: string };

// The details come from the API on every request.
export const instant = false;

const formatMoney = (value: string) => {
  const amount = Number(value);

  return value && !Number.isNaN(amount)
    ? amount.toLocaleString("en-US")
    : value || "—";
};

const formatDeadline = (value: string) =>
  value
    ? new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "—";

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
  const job: JobDetails | null = await getJob(id);

  if (!job) notFound();

  return (
    <div className="mx-auto max-w-[984px]">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1 text-sm text-[#a0a0ab]"
      >
        <Link
          href="/dashboard/recruiter/jobs"
          className="transition-colors hover:text-white"
        >
          Manage Jobs
        </Link>
        <ChevronRight className="size-3.5 text-[#5a5a60]" />
        <span className="truncate text-white">{job.title}</span>
      </nav>

      <header className="mt-2 mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-[28px] leading-tight font-semibold text-white">
            {job.title}
          </h1>
          <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-[#a0a0ab]">
            <span>{job.company}</span>
            <span className="size-1 rounded-full bg-[#5a5a60]" />
            <span className="text-[#c3c0ff]">{job.category}</span>
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/jobs"
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#232327] bg-[#1e1e21] px-4 text-sm font-medium text-white transition-colors hover:bg-[#232327]"
        >
          <ArrowLeft className="size-4" />
          Back to jobs
        </Link>
      </header>

      <div className="space-y-6">
        <section className="rounded-2xl bg-[#151516] p-6">
          <h2 className="flex items-center gap-2 text-base font-semibold text-white">
            <span className="size-2 rounded-full bg-[#5c53fe]" />
            Job Overview
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <DetailItem icon={Briefcase} label="Company" value={job.company} />
            <DetailItem
              icon={Briefcase}
              label="Job Category"
              value={job.category}
            />
            <DetailItem icon={Briefcase} label="Job Type" value={job.type} />
            <DetailItem
              icon={Globe2}
              label="Work Mode"
              value={job.isRemote ? "Remote" : "On-site"}
            />
            <DetailItem icon={MapPin} label="Location" value={job.location} />
            <DetailItem
              icon={CalendarDays}
              label="Application Deadline"
              value={formatDeadline(job.deadline)}
            />
          </div>
        </section>

        <section className="rounded-2xl bg-[#151516] p-6">
          <h2 className="flex items-center gap-2 text-base font-semibold text-white">
            <span className="size-2 rounded-full bg-[#5c53fe]" />
            Compensation
          </h2>

          <div className="mt-5 flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-[#232327]">
              <Wallet className="size-4 text-[#5c53fe]" />
            </span>
            <p className="text-lg font-semibold text-white">
              ${formatMoney(job.minSalary)} – ${formatMoney(job.maxSalary)}
              <span className="ml-1 text-sm font-normal text-[#a0a0ab]">
                / {job.frequency.replace("per ", "")}
              </span>
            </p>
          </div>
        </section>

        <section className="rounded-2xl bg-[#151516] p-6">
          <h2 className="flex items-center gap-2 text-base font-semibold text-white">
            <span className="size-2 rounded-full bg-[#5c53fe]" />
            Key Responsibilities
          </h2>
          <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-[#d4d4d8]">
            {job.responsibilities || "No responsibilities added."}
          </p>
        </section>

        <section className="rounded-2xl bg-[#151516] p-6">
          <h2 className="flex items-center gap-2 text-base font-semibold text-white">
            <span className="size-2 rounded-full bg-[#5c53fe]" />
            Qualifications &amp; Requirements
          </h2>
          <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-[#d4d4d8]">
            {job.qualifications || "No qualifications added."}
          </p>
        </section>
      </div>
    </div>
  );
};

export default JobDetailsPage;
