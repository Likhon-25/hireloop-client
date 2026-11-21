// One document in the "applications" collection.
// Everything the My Applications table shows is stored here, so the table
// keeps working even if the job is edited or deleted later.

// The stages an application moves through.
export const APPLICATION_STATUSES = [
  "Review",
  "Shortlisted",
  "Interview",
  "Offered",
  "Rejected",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

// Shown under the job title as "Full-time • Remote".
export const WORK_MODES = ["Remote", "Hybrid", "On-site"] as const;

export type WorkMode = (typeof WORK_MODES)[number];

export type Application = {
  _id?: string;

  // 1. Which job was applied for (a snapshot of the job at apply time).
  jobId: string;
  jobTitle: string;
  company: string;
  jobType: string;
  workMode: WorkMode;
  location?: string;

  // 2. Who applied.
  userId: string;
  name: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  portfolioUrl?: string;
  coverLetter?: string;

  // 3. Where the application stands.
  status: ApplicationStatus;
  appliedAt: string; // ISO date string
  updatedAt?: string;
  isArchived?: boolean;
};

// What the "Apply Now" button sends; MongoDB adds the _id.
export type NewApplication = Omit<Application, "_id">;

// What the My Applications table renders: the saved document plus a readable
// "3 days ago" label, worked out once on the server.
export type ApplicationListItem = Application & {
  appliedLabel: string;
};
