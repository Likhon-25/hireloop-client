import { cn } from "@/lib/utils";
import type { JobStatus } from "@/types/job";

// Green pill for Active, grey pill for Expired.
export function JobStatusPill({ status }: { status: JobStatus }) {
  const active = status === "Active";

  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium",
        active ? "bg-[#14532d] text-[#4ade80]" : "bg-[#1f1f1f] text-[#a0a0ab]",
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          active ? "bg-[#4ade80]" : "bg-[#5a5a60]",
        )}
      />
      {status}
    </span>
  );
}
