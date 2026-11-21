import { connection } from "next/server";

import { ApplicationsView } from "@/app/components/seeker/ApplicationsView";
import { applicationStats } from "@/lib/application";
import { getMyApplications } from "@/lib/api/applications";

// "3 days ago" labels should be fresh on every visit.
export const instant = false;

const MyApplicationsPage = async () => {
  // Date.now() inside getMyApplications() must run per request, not at build.
  await connection();

  // Dummy data for now; getMyApplications() will read the API later.
  const applications = await getMyApplications();

  return (
    <div className="mx-auto w-full min-w-0 max-w-[1120px]">
      <ApplicationsView
        applications={applications}
        stats={applicationStats(applications)}
      />
    </div>
  );
};

export default MyApplicationsPage;
