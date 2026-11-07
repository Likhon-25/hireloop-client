import Image from "next/image"
import Link from "next/link"
import { MapPinIcon, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
] as const

const Hero = () => {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate -mt-[76px] overflow-hidden pt-[76px] lg:-mt-[100px] lg:pt-[100px]"
    >
      {/* Background artwork */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/asset/globe.png"
          alt=""
          width={1440}
          height={1882}
          priority
          sizes="(min-width: 1600px) 1600px, 100vw"
          className="absolute top-0 left-1/2 h-auto w-[1200px] max-w-none -translate-x-1/2 select-none sm:w-[1320px] lg:w-[1440px] xl:w-full xl:max-w-[1600px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(1,1,3,0.35)_0%,rgba(1,1,3,0.16)_18%,transparent_38%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(75%_50%_at_50%_35%,transparent_0%,rgba(1,1,3,0.45)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[860px] w-full max-w-[1440px] flex-col items-center px-4 pt-14 pb-24 sm:min-h-[960px] sm:px-8 sm:pt-16 lg:min-h-[1120px] lg:px-10 lg:pt-[174px] lg:pb-40 xl:px-20">
        <div className="flex w-full max-w-[784px] flex-col items-center text-center">
          {/* Trending badge */}
          <div className="inline-flex h-11 items-center gap-2.5 rounded-full border border-white/10 bg-[linear-gradient(180deg,#3b3b3b_0%,#131313_45%,#050505_100%)] px-5 text-sm font-medium text-white/85 shadow-[inset_0_0_6px_4px_rgba(0,0,0,0.35)] sm:h-[50px] sm:px-6 sm:text-[15px]">
            <span aria-hidden="true" className="text-lg leading-none sm:text-xl">
              💼
            </span>
            50,000+ new jobs this month
          </div>

          <h1
            id="hero-heading"
            className="mt-7 text-balance text-[34px] leading-[1.12] font-bold tracking-[-0.025em] text-foreground sm:mt-8 sm:text-[44px] lg:text-[56px] lg:leading-[1.15]"
          >
            Find Your Dream Job Today
          </h1>

          <p className="mt-4 max-w-[700px] text-pretty text-base leading-relaxed text-white/70 sm:text-lg lg:max-w-[784px] lg:text-xl lg:leading-[1.6]">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role — faster.
          </p>

          {/* Job search */}
          <form action="/jobs" method="get" className="mt-10 w-full sm:mt-12">
            <div className="flex w-full flex-col rounded-2xl border border-white/20 bg-[#101010] p-2 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] sm:h-16 sm:flex-row sm:items-center">
              <div className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-lg px-4 transition-colors focus-within:bg-white/[0.04]">
                <SearchIcon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-white/80"
                />
                <input
                  type="search"
                  name="q"
                  placeholder="Job title, skill or company"
                  aria-label="Job title, skill or company"
                  className="h-full w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/60 sm:text-base"
                />
              </div>

              <Separator className="bg-white/10 sm:hidden" />
              <Separator
                orientation="vertical"
                className="mx-1 hidden h-6 bg-white/20 sm:block"
              />

              <div className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-lg px-4 transition-colors focus-within:bg-white/[0.04]">
                <MapPinIcon
                  aria-hidden="true"
                  className="size-5 shrink-0 text-brand/80"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location or Remote"
                  aria-label="Location or Remote"
                  className="h-full w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/60 sm:text-base"
                />
              </div>

              <Button
                type="submit"
                className="mt-2 h-12 w-full gap-2 rounded-xl bg-brand px-6 text-sm font-medium text-brand-foreground shadow-[inset_0_3px_10px_rgba(255,255,255,0.18)] hover:bg-[#6d65ff] sm:mt-0 sm:w-12 sm:shrink-0 sm:px-0"
              >
                <SearchIcon aria-hidden="true" className="size-5" />
                <span className="sm:sr-only">Search</span>
              </Button>
            </div>
          </form>

          {/* Trending roles */}
          <div className="mt-6 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-2">
            <span className="text-sm font-medium text-white/60 sm:text-base">
              Trending Position
            </span>
            <ul className="flex flex-wrap justify-center gap-2">
              {trendingPositions.map((position) => (
                <li key={position}>
                  <Link
                    href={`/jobs?q=${encodeURIComponent(position)}`}
                    className="inline-flex h-[33px] items-center rounded-full border border-white/10 bg-[#1a1a1b] px-3 text-[13px] text-white/90 transition-colors hover:border-white/25 hover:bg-[#232326] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 sm:text-sm"
                  >
                    {position}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
