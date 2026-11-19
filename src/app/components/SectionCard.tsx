import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionCardProps = {
  title: string;
  children: ReactNode;
  // By default the body is a spaced column; pass your own layout when needed.
  bodyClassName?: string;
  className?: string;
};

// The dark card with the small dot used on every job page.
export function SectionCard({
  title,
  children,
  bodyClassName = "mt-5 space-y-5",
  className,
}: SectionCardProps) {
  return (
    <section className={cn("rounded-2xl bg-[#151516] p-6", className)}>
      <h2 className="flex items-center gap-2 text-base font-semibold text-white">
        <span className="size-2 rounded-full bg-[#5c53fe]" />
        {title}
      </h2>
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}
