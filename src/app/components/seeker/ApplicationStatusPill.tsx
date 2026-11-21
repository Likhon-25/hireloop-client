import { statusStyle } from "@/lib/application";
import { cn } from "@/lib/utils";
import type { ApplicationStatus } from "@/types/application";

// The small colored pill in the Status column.
export function ApplicationStatusPill({
  status,
}: {
  status: ApplicationStatus;
}) {
  const style = statusStyle(status);

  return (
    <span
      className={cn(
        "inline-flex h-[22px] items-center rounded-md border px-2.5 text-xs font-medium whitespace-nowrap",
        style.className,
      )}
    >
      {style.label}
    </span>
  );
}
