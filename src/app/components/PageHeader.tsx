import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

// The last breadcrumb has no href, so it renders as plain text.
export type BreadcrumbItem = {
  label: string;
  href?: string;
  className?: string;
};

type PageHeaderProps = {
  breadcrumb: BreadcrumbItem[];
  title: string;
  // A short line under the title.
  description?: string;
  // Custom content under the title, e.g. the company and category on the
  // details page. Used instead of description.
  meta?: ReactNode;
  // Anything on the right side, like a button.
  action?: ReactNode;
  descriptionClassName?: string;
  className?: string;
};

export function PageHeader({
  breadcrumb,
  title,
  description,
  meta,
  action,
  descriptionClassName,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "mb-6 flex flex-wrap items-end justify-between gap-4",
        className,
      )}
    >
      <div className="min-w-0">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1 text-sm text-[#a0a0ab]"
        >
          {breadcrumb.map((crumb, index) => (
            <span key={crumb.label} className="flex items-center gap-1">
              {index > 0 ? (
                <ChevronRight className="size-3.5 text-[#5a5a60]" />
              ) : null}

              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="transition-colors hover:text-white"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className={cn("text-white", crumb.className)}>
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="mt-2 text-[28px] leading-tight font-semibold text-white">
          {title}
        </h1>

        {description ? (
          <p
            className={cn(
              "mt-1 max-w-[632px] text-sm text-[#a0a0ab]",
              descriptionClassName,
            )}
          >
            {description}
          </p>
        ) : null}

        {meta}
      </div>

      {action}
    </header>
  );
}
