import type { Application, ApplicationStatus } from "@/types/application";

// The colored status pills from the Figma table.
const STATUS_STYLES: Record<
  ApplicationStatus,
  { label: string; className: string }
> = {
  Review: {
    label: "Review",
    className: "border-[#f59e0b]/30 bg-[#f59e0b]/15 text-[#f59e0b]",
  },
  Shortlisted: {
    label: "Shortlisted",
    className: "border-[#60a5fa]/30 bg-[#60a5fa]/15 text-[#60a5fa]",
  },
  Interview: {
    label: "Interview",
    className: "border-[#a78bfa]/30 bg-[#a78bfa]/15 text-[#a78bfa]",
  },
  Offered: {
    label: "Offered",
    className: "border-[#22c55e]/30 bg-[#22c55e]/15 text-[#22c55e]",
  },
  Rejected: {
    label: "Rejected",
    className: "border-[#ef4444]/30 bg-[#ef4444]/15 text-[#ef4444]",
  },
};

// Unknown values from old data still get a neutral pill instead of crashing.
export const statusStyle = (status?: string) =>
  STATUS_STYLES[status as ApplicationStatus] ?? {
    label: status || "Unknown",
    className: "border-white/10 bg-white/5 text-[#a0a0ab]",
  };

// A job only stores isRemote, so that decides the work mode for new applications.
export const workModeLabel = (isRemote: boolean) =>
  isRemote ? "Remote" : "On-site";

// "2026-11-20T10:00:00.000Z" -> "1 day ago". `now` comes from the server so
// the client never calls Date.now() during render.
export const formatApplied = (value: string | undefined, now: number) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  const days = Math.floor((now - date.getTime()) / 86_400_000);

  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;

  const weeks = Math.floor(days / 7);

  return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
};

// The four stat cards above the table.
export const applicationStats = (applications: Application[]) => {
  const count = (status: ApplicationStatus) =>
    applications.filter((application) => application.status === status).length;

  const total = applications.length;
  const offered = count("Offered");

  return {
    total,
    shortlisted: count("Shortlisted"),
    interviews: count("Interview"),
    successRate: total ? Math.round((offered / total) * 100) : 0,
  };
};
