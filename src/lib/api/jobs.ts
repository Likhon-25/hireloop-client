import type { Job } from "@/types/job";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const getJobs = async (query: string = ""): Promise<Job[]> => {
  try {
    const res = await fetch(`${BASE_URL}/jobs?${query}`);

    if (!res.ok) return [];

    return res.json();
  } catch {
    // The API may be down; an empty table is better than a crashed page.
    return [];
  }
};

export const getJob = async (id: string): Promise<Job | null> => {
  try {
    const res = await fetch(`${BASE_URL}/jobs/${id}`);

    if (!res.ok) return null;

    return res.json();
  } catch {
    return null;
  }
};
