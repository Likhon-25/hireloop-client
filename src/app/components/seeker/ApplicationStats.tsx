import { cn } from "@/lib/utils";

type StatsProps = {
  stats: {
    total: number;
    shortlisted: number;
    interviews: number;
    successRate: number;
  };
};

// The four bento cards above the applications table.
export function ApplicationStats({ stats }: StatsProps) {
  const items = [
    { label: "Total Applied", value: String(stats.total) },
    { label: "Shortlisted", value: String(stats.shortlisted) },
    {
      label: "Interviews",
      value: String(stats.interviews),
      className: "text-[#f59e0b]",
    },
    {
      label: "Success Rate",
      value: `${stats.successRate}%`,
      className: "text-[#22c55e]",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-white/[0.07] bg-[#141418] px-5 py-4"
        >
          <p className="text-[13px] text-[#a0a0ab]">{item.label}</p>
          <p
            className={cn(
              "mt-2 text-[26px] leading-none font-semibold text-[#ededef]",
              item.className,
            )}
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
