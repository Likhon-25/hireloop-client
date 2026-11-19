// Every field the job form collects and sends to the backend.
export type JobFormData = {
  title: string;
  company: string;
  category: string;
  type: string;
  isRemote: boolean;
  location: string;
  deadline: string;
  minSalary: string;
  maxSalary: string;
  frequency: string;
  responsibilities: string;
  qualifications: string;
};

// The table shows Active or Expired, worked out from the deadline.
export type JobStatus = "Active" | "Expired";

// A job saved in the database always has an _id.
export type Job = JobFormData & {
  _id: string;
  // Not stored by the job form yet, so they stay optional.
  applicants?: number;
  status?: JobStatus;
  posted?: string;
};
