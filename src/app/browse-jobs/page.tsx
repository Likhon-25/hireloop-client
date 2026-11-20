import { JobFilters } from "@/app/components/browse/JobFilters";
import { JobResults } from "@/app/components/browse/JobResults";
import { JobSearchBar } from "@/app/components/browse/JobSearchBar";
import { getJobs } from "@/lib/api/jobs";

// Jobs are read from the API on every request.
export const instant = false;

const BrowseJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  // ১. URL থেকে searchParams গ্রহণ করা
  const search = await searchParams;
  const urlSearch = new URLSearchParams(search as Record<string, string>);
  const query = urlSearch.toString();

  // ২. ব্যাকএন্ডের API-তে search=developer কুয়েরি পাঠানো
  const jobs = await getJobs(query);

  return (
    <main className="flex-1 bg-[#08080a] pb-16">
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-8 sm:pt-8 lg:px-10 xl:px-20">
        <h1 className="sr-only">Browse Jobs</h1>

        <JobSearchBar />

        <div className="mt-6 grid gap-6 lg:grid-cols-[296px_minmax(0,1fr)] lg:gap-8">
          <JobFilters jobs={jobs} />
          <JobResults jobs={jobs} />
        </div>
      </div>
    </main>
  );
};

export default BrowseJobsPage;
