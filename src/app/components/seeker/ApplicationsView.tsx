"use client";

import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";

import { ApplicationStats } from "@/app/components/seeker/ApplicationStats";
import { ApplicationsTable } from "@/app/components/seeker/ApplicationsTable";
import { cn } from "@/lib/utils";
import type { ApplicationListItem } from "@/types/application";

const PAGE_SIZE = 5;

type Tab = "active" | "archived";

type ApplicationsViewProps = {
  applications: ApplicationListItem[];
  stats: {
    total: number;
    shortlisted: number;
    interviews: number;
    successRate: number;
  };
};

// Header, stats, tabs, search and the applications table all live here,
// because they all share the same filter state.
export function ApplicationsView({
  applications,
  stats,
}: ApplicationsViewProps) {
  const [tab, setTab] = useState<Tab>("active");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return applications.filter((application) => {
      const archived = Boolean(application.isArchived);

      if (tab === "active" && archived) return false;
      if (tab === "archived" && !archived) return false;
      if (!term) return true;

      return [application.jobTitle, application.company, application.status]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [applications, tab, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  const emptyMessage = search.trim()
    ? "No applications match your search."
    : tab === "active"
      ? "No active applications yet. Apply to a job to see it here."
      : "No archived applications yet.";

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[#ededef]">
            My Applications
          </h1>
          <p className="mt-2 text-[13px] text-[#a0a0ab]">
            Track your job applications and interview progress in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* The Figma search sits in the top bar; the dashboard has no top
              bar yet, so it belongs beside the page actions for now. */}
          <div className="relative w-full sm:w-[240px]">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-[#c4c7c8]" />
            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search applications..."
              aria-label="Search applications"
              className="h-[42px] w-full rounded-lg border border-white/10 bg-[#0c0c0f] pr-3 pl-9 text-[13px] text-[#ededef] placeholder:text-[#828997] focus:border-white/20 focus:outline-none"
            />
          </div>

          <div
            role="tablist"
            aria-label="Applications"
            className="flex h-[42px] items-center gap-1 rounded-lg border border-white/[0.07] bg-[#1a1a1f] p-[5px]"
          >
            {(
              [
                { id: "active", label: "Active" },
                { id: "archived", label: "Archived" },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={tab === item.id}
                onClick={() => {
                  setTab(item.id);
                  setPage(1);
                }}
                className={cn(
                  "h-8 rounded-md px-4 text-[13px] transition-colors",
                  tab === item.id
                    ? "border border-white/10 bg-[#222228] text-[#ededef]"
                    : "border border-transparent text-[#a0a0ab] hover:text-[#ededef]",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-[42px] items-center gap-2 rounded-lg bg-[#fafafa] px-4 text-[13px] font-medium text-[#0b0b0c] transition-colors hover:bg-white"
          >
            <Download className="size-3" />
            Export PDF
          </button>
        </div>
      </header>

      <ApplicationStats stats={stats} />

      <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#141418]">
        <ApplicationsTable applications={visible} emptyMessage={emptyMessage} />

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] bg-[#1a1a1f] px-6 py-4">
          <p className="text-[13px] text-[#a0a0ab]">
            {filtered.length === 0
              ? "No applications to show"
              : `Showing ${start + 1}–${start + visible.length} of ${
                  filtered.length
                } applications`}
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="flex size-8 items-center justify-center rounded-lg border border-white/[0.08] text-[#a0a0ab] transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              ‹
            </button>

            {Array.from({ length: pageCount }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  aria-current={pageNumber === currentPage ? "page" : undefined}
                  className={cn(
                    "flex size-8 items-center justify-center rounded-lg border text-[13px] transition-colors",
                    pageNumber === currentPage
                      ? "border-white bg-white font-medium text-[#0b0b0c]"
                      : "border-white/[0.08] text-[#a0a0ab] hover:text-white",
                  )}
                >
                  {pageNumber}
                </button>
              ),
            )}

            <button
              type="button"
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === pageCount}
              aria-label="Next page"
              className="flex size-8 items-center justify-center rounded-lg border border-white/[0.08] text-[#a0a0ab] transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              ›
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
