import {
  CalendarDays,
  Check,
  HeartPulse,
  Laptop,
  PiggyBank,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { locationLabel, toBulletList, toTagList } from "@/lib/job";
import { cn } from "@/lib/utils";
import type { Job } from "@/types/job";

// One bordered block inside the details card.
const DetailsSection = ({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) => (
  <section
    className={cn(
      "border-t border-white/7 pt-6 first:border-t-0 first:pt-0",
      className,
    )}
  >
    <h2 className="text-[22px] font-semibold text-[#ededef]">{title}</h2>
    <div className="mt-6">{children}</div>
  </section>
);

const BulletList = ({ items }: { items: string[] }) =>
  items.length === 0 ? (
    <p className="text-[13px] text-[#a0a0ab]">No details added yet.</p>
  ) : (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={`${index}-${item}`} className="flex gap-6">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white" />
          <span className="text-[13px] leading-relaxed text-[#a0a0ab]">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );

// The bordered skill tags from the Figma "Requirements" block.
const SkillChips = ({ skills }: { skills: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {skills.map((skill) => (
      <span
        key={skill}
        className="inline-flex h-9 items-center gap-2 rounded-md border border-white/10 bg-[#1a1a1f] px-3.5 text-[13px] font-medium text-[#ededef]"
      >
        <Check className="size-3.5 shrink-0 text-[#a1a4aa]" />
        {skill}
      </span>
    ))}
  </div>
);

// Picks a fitting icon for a benefit line. Unknown benefits get a sparkle.
const benefitIcon = (benefit: string): LucideIcon => {
  const text = benefit.toLowerCase();

  if (/health|dental|medical|insurance|wellness/.test(text)) return HeartPulse;
  if (/401k|pension|retirement|savings|equity/.test(text)) return PiggyBank;
  if (/hardware|laptop|equipment|stipend|device/.test(text)) return Laptop;
  if (/pto|vacation|leave|holiday|time off/.test(text)) return CalendarDays;

  return Sparkles;
};

// The circular icon + label pairs from the Figma "Benefits" block.
const BenefitsGrid = ({ benefits }: { benefits: string[] }) => {
  if (benefits.length === 0) {
    return <p className="text-[13px] text-[#a0a0ab]">No benefits added yet.</p>;
  }

  return (
    <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
      {benefits.map((benefit) => {
        const Icon = benefitIcon(benefit);

        return (
          <li key={benefit} className="flex items-center gap-6">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10">
              <Icon className="size-4 text-white" />
            </span>
            <span className="text-base font-semibold text-[#ededef]">
              {benefit}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

// Description, responsibilities, requirements and benefits of the job.
export function JobDetailsContent({ job }: { job: Job }) {
  const team = job.category ? ` to join its ${job.category} team` : "";
  const place = job.location ? ` based in ${locationLabel(job)}` : "";
  const intro = `${job.company} is hiring a ${job.title}${team}. This is a ${
    job.type || "full-time"
  } role${place}.`;

  const skills = toTagList(job.skills);
  const qualifications = toBulletList(job.qualifications);
  const benefits = toBulletList(job.benefits);

  return (
    <div className="space-y-6 rounded-2xl border border-white/7 bg-[#141418] p-6 sm:p-8">
      <DetailsSection title="Job Description">
        <p className="text-[13px] leading-relaxed text-[#a0a0ab]">{intro}</p>
      </DetailsSection>

      <DetailsSection title="Responsibilities">
        <BulletList items={toBulletList(job.responsibilities)} />
      </DetailsSection>

      <DetailsSection title="Requirements">
        {skills.length === 0 && qualifications.length === 0 ? (
          <p className="text-[13px] text-[#a0a0ab]">No details added yet.</p>
        ) : (
          <div className="space-y-6">
            {skills.length > 0 && <SkillChips skills={skills} />}
            {qualifications.length > 0 && <BulletList items={qualifications} />}
          </div>
        )}
      </DetailsSection>

      <DetailsSection title="Benefits">
        <BenefitsGrid benefits={benefits} />
      </DetailsSection>
    </div>
  );
}
