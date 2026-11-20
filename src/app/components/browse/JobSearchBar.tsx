import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

// Search bar from the Figma browse page. The button has no handler yet; the
// search wiring will be added later.
export function JobSearchBar() {
  return (
    <section
      aria-label="Search jobs"
      className="rounded-2xl border border-white/7 bg-[#141418] p-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-[#8e9192]" />
          <Input
            type="search"
            name="search"
            aria-label="Search by job title, keywords"
            placeholder="Search by job title, keywords..."
            className="h-[58px] rounded-lg border-white/7 bg-[#1a1a1f] pr-4 pl-12 text-sm text-white placeholder:text-[#a0a0ab] focus-visible:border-[#5c53fe] focus-visible:ring-0 dark:bg-[#1a1a1f]"
          />
        </div>

        <button
          type="button"
          className="h-[58px] shrink-0 rounded-lg bg-white px-6 text-base font-semibold text-[#2f3131] transition-colors hover:bg-[#ededef] focus-visible:ring-2 focus-visible:ring-[#5c53fe] focus-visible:outline-none sm:w-36"
        >
          Search Jobs
        </button>
      </div>
    </section>
  );
}
