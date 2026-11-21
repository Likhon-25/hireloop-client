import { formatApplied } from "@/lib/application";
import type { Application, ApplicationListItem } from "@/types/application";

// Dummy rows so the page can be designed before the API is ready.
// Replace the body of getMyApplications() with a fetch later.
const daysAgo = (days: number) =>
  new Date(Date.now() - days * 86_400_000).toISOString();

const dummyApplications: Application[] = [
  {
    _id: "app-1",
    jobId: "6afd3e06139f69c2511840ff",
    jobTitle: "Product Designer",
    company: "Cyberdyne Systems",
    jobType: "Contract",
    workMode: "Hybrid",
    location: "Dhaka, Bangladesh",
    userId: "seeker-1",
    name: "Alex Morgan",
    email: "alex@example.com",
    status: "Review",
    appliedAt: daysAgo(1),
  },
  {
    _id: "app-2",
    jobId: "6afd3e06139f69c251184100",
    jobTitle: "Senior Frontend Engineer",
    company: "TechNova Solutions",
    jobType: "Full-time",
    workMode: "Remote",
    location: "Dhaka, Bangladesh",
    userId: "seeker-1",
    name: "Alex Morgan",
    email: "alex@example.com",
    status: "Shortlisted",
    appliedAt: daysAgo(3),
  },
  {
    _id: "app-3",
    jobId: "6afbb22ec19ec921915cbdf8",
    jobTitle: "Lead Data Scientist",
    company: "Wayne Enterprises",
    jobType: "Full-time",
    workMode: "On-site",
    location: "Berlin, Germany",
    userId: "seeker-1",
    name: "Alex Morgan",
    email: "alex@example.com",
    status: "Shortlisted",
    appliedAt: daysAgo(4),
  },
  {
    _id: "app-4",
    jobId: "6afbb22ec19ec921915cbdfa",
    jobTitle: "Cloud Architect",
    company: "Oscorp Tech",
    jobType: "Full-time",
    workMode: "Remote",
    location: "Remote",
    userId: "seeker-1",
    name: "Alex Morgan",
    email: "alex@example.com",
    status: "Rejected",
    appliedAt: daysAgo(7),
  },
  {
    _id: "app-5",
    jobId: "6afd3e06139f69c2511840ff",
    jobTitle: "AI Research Engineer",
    company: "Hooli Corp",
    jobType: "Full-time",
    workMode: "Hybrid",
    location: "Austin, USA",
    userId: "seeker-1",
    name: "Alex Morgan",
    email: "alex@example.com",
    status: "Offered",
    appliedAt: daysAgo(14),
  },
  {
    _id: "app-6",
    jobId: "6afd3e06139f69c251184100",
    jobTitle: "Backend Developer",
    company: "CodeCraft Ltd",
    jobType: "Full-time",
    workMode: "On-site",
    location: "Dhaka, Bangladesh",
    userId: "seeker-1",
    name: "Alex Morgan",
    email: "alex@example.com",
    status: "Interview",
    appliedAt: daysAgo(9),
  },
  {
    _id: "app-7",
    jobId: "6afbb22ec19ec921915cbdf8",
    jobTitle: "UX Researcher",
    company: "Initech",
    jobType: "Part-time",
    workMode: "Remote",
    location: "Remote",
    userId: "seeker-1",
    name: "Alex Morgan",
    email: "alex@example.com",
    status: "Review",
    appliedAt: daysAgo(21),
    isArchived: true,
  },
];

// TODO: replace with GET `${BASE_URL}/applications?userId=...` once the API
// for reading applications exists.
export const getMyApplications = async (): Promise<ApplicationListItem[]> => {
  const now = Date.now();

  return dummyApplications.map((application) => ({
    ...application,
    appliedLabel: formatApplied(application.appliedAt, now),
  }));
};
