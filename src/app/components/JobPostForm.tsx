"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, ChevronDown, Globe2, MapPin } from "lucide-react";
import { toast } from "sonner";

import { PageHeader } from "@/app/components/PageHeader";
import { SectionCard } from "@/app/components/SectionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createJob, updateJob } from "@/lib/actions/jobs";
import { JOB_CATEGORIES, JOB_FREQUENCIES, JOB_TYPES } from "@/lib/job";
import { cn } from "@/lib/utils";
import type { JobFormData } from "@/types/job";

// What the form starts with when no job is being edited.
const emptyForm: JobFormData = {
  title: "",
  company: "",
  category: "",
  type: "Full-time",
  isRemote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  frequency: "per hour",
  responsibilities: "",
  qualifications: "",
  skills: "",
  benefits: "",
};

// Shared styling so every input matches the Figma 44px dark field.
const fieldClasses =
  "h-11 rounded-xl border border-[#232327] bg-[#1e1e21] px-4 text-sm text-white placeholder:text-[#5a5a60] transition-colors focus-visible:border-[#5c53fe] focus-visible:ring-0";

// Shared styling for the two dark dropdowns (category + frequency).
const selectClasses =
  "h-11 w-full appearance-none rounded-xl border border-[#232327] bg-[#1e1e21] pr-10 pl-4 text-sm text-white outline-none transition-colors focus:border-[#5c53fe]";

// Both textareas look the same.
const textareaClasses =
  "min-h-[98px] w-full resize-y rounded-xl border border-[#232327] bg-[#1e1e21] px-4 py-3.5 text-sm leading-relaxed text-[#f4f4f5] outline-none placeholder:text-[#5a5a60] focus:border-[#5c53fe]";

const FieldLabel = ({
  htmlFor,
  children,
  hint,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  hint?: string;
}) => (
  <div className="mb-2 flex items-center gap-2">
    <Label
      htmlFor={htmlFor}
      className="text-sm leading-none font-medium text-[#f4f4f5]"
    >
      {children}
    </Label>
    {hint ? <span className="text-xs text-[#5a5a60]">{hint}</span> : null}
  </div>
);

type JobPostFormProps = {
  // When a jobId is given the form edits that job, otherwise it creates one.
  jobId?: string;
  initialValues?: JobFormData;
};

export function JobPostForm({ jobId, initialValues }: JobPostFormProps) {
  const router = useRouter();
  const isEdit = Boolean(jobId);
  const [form, setForm] = useState<JobFormData>(initialValues ?? emptyForm);
  const [pending, setPending] = useState(false);

  // A single updater keeps every field change to one line at the call site.
  const update = <K extends keyof JobFormData>(key: K, value: JobFormData[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    try {
      if (jobId) {
        const result = await updateJob(jobId, form);

        // A save with no changes still matches the job, so matchedCount is enough.
        if (result.matchedCount > 0) {
          toast.success("Job updated successfully");
          router.push("/dashboard/recruiter/jobs");
          router.refresh();
        } else {
          toast.error("Could not update this job");
        }
      } else {
        const result = await createJob(form);

        if (result.insertedId) {
          toast.success("Job posted successfully");
          // Show the new post in the jobs table right away.
          router.push("/dashboard/recruiter/jobs");
          router.refresh();
        } else {
          toast.error("Could not post this job");
        }
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-[984px]">
      <PageHeader
        breadcrumb={
          isEdit
            ? [
                { label: "Manage Jobs", href: "/dashboard/recruiter/jobs" },
                { label: "Job Listings & Postings" },
                { label: "Update Job Post" },
              ]
            : [
                { label: "Manage Jobs", href: "/dashboard/recruiter/jobs" },
                { label: "Create New Listing" },
              ]
        }
        title={isEdit ? "Update Job Post" : "Post a New Job"}
        description={
          isEdit
            ? "Modify position specifications, compensation range, and candidate requirements for this listing."
            : "Fill in the position specifications to attract qualified talent across our network."
        }
      />

      <div className="space-y-6">
        {/* 1. Basic Information */}
        <SectionCard title="1. Basic Information">
          <div>
            <FieldLabel htmlFor="job-title">Job Title *</FieldLabel>
            <Input
              id="job-title"
              required
              value={form.title}
              onChange={(event) => update("title", event.target.value)}
              placeholder="Frontend Developer"
              className={fieldClasses}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="job-company">Company Name *</FieldLabel>
              <Input
                id="job-company"
                required
                value={form.company}
                onChange={(event) => update("company", event.target.value)}
                placeholder="HirePulse Network"
                className={fieldClasses}
              />
            </div>

            <div>
              <FieldLabel htmlFor="job-category">Job Category *</FieldLabel>
              <div className="relative">
                <select
                  id="job-category"
                  required
                  value={form.category}
                  onChange={(event) => update("category", event.target.value)}
                  className={cn(
                    selectClasses,
                    !form.category && "text-[#5a5a60]",
                  )}
                >
                  <option value="">Select category</option>
                  {JOB_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[#a0a0ab]" />
              </div>
            </div>
          </div>

          <div>
            <FieldLabel>Job Type *</FieldLabel>
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
              {JOB_TYPES.map((type) => {
                const active = form.type === type;

                return (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={active}
                    onClick={() => update("type", type)}
                    className={cn(
                      "h-11 rounded-xl border text-sm font-medium transition-colors",
                      active
                        ? "border-[#5c53fe] bg-[#232327] text-white"
                        : "border-transparent bg-[#1e1e21] text-[#a0a0ab] hover:text-white",
                    )}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>
        </SectionCard>

        {/* 2. Location, Compensation & Timeline */}
        <SectionCard title="2. Location, Compensation & Timeline">
          {/* Remote toggle */}
          <div className="flex items-center justify-between gap-4 rounded-xl border border-[#232327] bg-[#1e1e21] p-3">
            <div className="flex items-center gap-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#232327]">
                <Globe2 className="size-5 text-[#c3c0ff]" />
              </span>
              <div>
                <p className="text-sm font-medium text-white">
                  Remote Work Allowed
                </p>
                <p className="text-sm text-[#a0a0ab]">
                  Enable worldwide or distributed candidate applications
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={form.isRemote}
              aria-label="Remote work allowed"
              onClick={() => update("isRemote", !form.isRemote)}
              className={cn(
                "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                form.isRemote ? "bg-[#5c53fe]" : "bg-[#232327]",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 size-5 rounded-full bg-white transition-all",
                  form.isRemote ? "left-[22px]" : "left-0.5",
                )}
              />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="job-location" hint="Required">
                Job Location
              </FieldLabel>
              <div className="relative">
                <MapPin className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#a0a0ab]" />
                <Input
                  id="job-location"
                  required
                  value={form.location}
                  onChange={(event) => update("location", event.target.value)}
                  placeholder="New York, USA"
                  className={cn(fieldClasses, "pl-11")}
                />
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="job-deadline">
                Application Deadline
              </FieldLabel>
              <div className="relative">
                <Input
                  id="job-deadline"
                  type="date"
                  value={form.deadline}
                  onChange={(event) => update("deadline", event.target.value)}
                  className={cn(
                    fieldClasses,
                    "pl-11 [color-scheme:dark]",
                    !form.deadline && "text-[#5a5a60]",
                  )}
                />
                <CalendarDays className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#a0a0ab]" />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <FieldLabel htmlFor="job-min-salary">
                Min Salary / Rate
              </FieldLabel>
              <Input
                id="job-min-salary"
                inputMode="numeric"
                value={form.minSalary}
                onChange={(event) => update("minSalary", event.target.value)}
                placeholder="25"
                className={fieldClasses}
              />
            </div>

            <div>
              <FieldLabel htmlFor="job-max-salary">
                Max Salary / Rate
              </FieldLabel>
              <Input
                id="job-max-salary"
                inputMode="numeric"
                value={form.maxSalary}
                onChange={(event) => update("maxSalary", event.target.value)}
                placeholder="40"
                className={fieldClasses}
              />
            </div>

            <div>
              <FieldLabel htmlFor="job-frequency">Frequency</FieldLabel>
              <div className="relative">
                <select
                  id="job-frequency"
                  value={form.frequency}
                  onChange={(event) => update("frequency", event.target.value)}
                  className={selectClasses}
                >
                  {JOB_FREQUENCIES.map((frequency) => (
                    <option key={frequency} value={frequency}>
                      {frequency}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[#a0a0ab]" />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* 3. Responsibilities & Requirements */}
        <SectionCard title="3. Responsibilities & Requirements">
          <div>
            <FieldLabel htmlFor="job-responsibilities">
              Key Responsibilities *
            </FieldLabel>
            <textarea
              id="job-responsibilities"
              required
              value={form.responsibilities}
              onChange={(event) =>
                update("responsibilities", event.target.value)
              }
              placeholder="Collaborate with designers and backend engineers to craft responsive, micro-interaction rich products."
              className={textareaClasses}
            />
          </div>

          <div>
            <FieldLabel htmlFor="job-qualifications">
              Qualifications & Requirements *
            </FieldLabel>
            <textarea
              id="job-qualifications"
              required
              value={form.qualifications}
              onChange={(event) => update("qualifications", event.target.value)}
              placeholder={
                "• 3+ years of experience with React and TypeScript\n• Solid understanding of DOM performance\n• Experience partnering closely with UI/UX designers"
              }
              className={textareaClasses}
            />
          </div>

          <div>
            <FieldLabel htmlFor="job-skills" hint="comma separated">
              Requirement Tags
            </FieldLabel>
            <Input
              id="job-skills"
              value={form.skills}
              onChange={(event) => update("skills", event.target.value)}
              placeholder="Figma, UI/UX Design, System Thinking"
              className={fieldClasses}
            />
          </div>

          <div>
            <FieldLabel htmlFor="job-benefits" hint="one per line">
              Benefits
            </FieldLabel>
            <textarea
              id="job-benefits"
              value={form.benefits}
              onChange={(event) => update("benefits", event.target.value)}
              placeholder={
                "• Full Health & Dental\n• Competitive 401k\n• Latest Hardware Stipend\n• Unlimited PTO"
              }
              className={textareaClasses}
            />
          </div>
        </SectionCard>

        <Button
          type="submit"
          disabled={pending}
          className="h-11 rounded-xl bg-[#5c53fe] px-6 text-sm font-medium text-white hover:bg-[#6b63ff] disabled:opacity-60"
        >
          {isEdit
            ? pending
              ? "Updating..."
              : "Update Job"
            : pending
              ? "Publishing..."
              : "Publish Job"}
        </Button>
      </div>
    </form>
  );
}
