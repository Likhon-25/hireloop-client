import type { Job, JobFormData, JobStatus } from "@/types/job";

// Dropdown options used by the job form.
export const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design & Creative",
  "Product & Management",
  "Marketing & Sales",
  "Finance & Accounting",
  "Customer Support",
  "Other",
];

export const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

export const JOB_FREQUENCIES = ["per hour", "per month", "per year"];

// Each category gets its own accent, used for company logos and labels.
const CATEGORY_COLORS: Record<string, string> = {
  "Engineering & Tech": "#38bdf8",
  "Design & Creative": "#f97316",
  "Product & Management": "#5c53fe",
  "Marketing & Sales": "#c3c0ff",
  "Finance & Accounting": "#4ade80",
  "Customer Support": "#818cf8",
  Other: "#a0a0ab",
};

export const categoryColor = (category: string) =>
  CATEGORY_COLORS[category] ?? CATEGORY_COLORS.Other;

// 25000 -> "25,000". Empty or non-numeric values are shown as they are.
export const formatMoney = (value: string) => {
  const amount = Number(value);

  return value && !Number.isNaN(amount)
    ? amount.toLocaleString("en-US")
    : value || "—";
};

// "2026-12-31" -> "Dec 31, 2026"
export const formatDeadline = (value: string) =>
  value
    ? new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "—";

// "$25 – $40 / hour"
export const formatSalary = (job: JobFormData) =>
  `$${formatMoney(job.minSalary)} – $${formatMoney(job.maxSalary)} / ${job.frequency.replace("per ", "")}`;

// "Dhaka, BD (Remote)" for remote jobs, otherwise just the location.
export const locationLabel = (job: JobFormData) =>
  job.isRemote ? `${job.location} (Remote)` : job.location;

// No status is stored yet, so a past deadline counts as expired.
export const getJobStatus = (
  job: Pick<Job, "status" | "deadline">,
): JobStatus =>
  job.status ??
  (job.deadline && new Date(job.deadline) < new Date() ? "Expired" : "Active");

// The form needs plain strings, so missing values fall back to a default.
export const toFormValues = (job: Partial<Job>): JobFormData => ({
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
});
