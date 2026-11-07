"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/companies", label: "Company" },
  { href: "/pricing", label: "Pricing" },
] as const

const authLinks = {
  signIn: { href: "/sign-in", label: "Sign In" },
  getStarted: { href: "/sign-up", label: "Get Started" },
} as const

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

const buttonBase =
  "inline-flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"

const glassShadow = "shadow-[inset_0_3px_10px_rgba(255,255,255,0.18)]"
const ctaShadow = "shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)]"

const signInClasses = cn(
  buttonBase,
  "h-[38px] px-4 text-[17px] font-semibold text-[#645bff] hover:bg-white/5 hover:text-[#7b73ff]",
  glassShadow
)

const getStartedClasses = cn(
  buttonBase,
  "h-[52px] bg-brand px-6 text-[17px] font-medium text-brand-foreground hover:bg-[#6d65ff]",
  ctaShadow
)

const Navbar = () => {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const closeMobile = () => setMobileOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-white/5 bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6 px-4 py-4 sm:px-8 lg:px-10 xl:px-20">
        {/* Nav Logo */}
        <Link
          href="/"
          aria-label="HireLoop home"
          className="flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
        >
          <Image
            src="/asset/logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            priority
            className="h-9 w-auto sm:h-10 lg:h-11"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden h-[68px] items-center rounded-lg border border-nav-border bg-nav px-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] lg:flex"
        >
          <ul className="flex items-center gap-5">
            {navLinks.map((link) => {
              const active = isActivePath(pathname, link.href)

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-md px-1 py-2 text-base text-foreground/90 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                      active && "font-bold text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div aria-hidden="true" className="mx-6 flex h-6 items-center">
            <Separator orientation="vertical" className="bg-white/25" />
          </div>

          <div className="flex items-center gap-4">
            <Link href={authLinks.signIn.href} className={signInClasses}>
              {authLinks.signIn.label}
            </Link>
            <Link href={authLinks.getStarted.href} className={getStartedClasses}>
              {authLinks.getStarted.label}
            </Link>
          </div>
        </nav>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label="Open navigation menu"
                className="size-11 rounded-lg border border-nav-border bg-nav text-foreground hover:bg-white/[0.06] lg:hidden"
              />
            }
          >
            <MenuIcon className="size-5" />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="gap-0 border-l border-white/10 bg-[#08080c] p-0 data-[side=right]:w-[86%] sm:max-w-sm"
          >
            <SheetHeader className="border-b border-white/10 px-5 py-5">
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Browse HireLoop pages and access your account.
              </SheetDescription>
              <Link
                href="/"
                onClick={closeMobile}
                aria-label="HireLoop home"
                className="w-fit rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              >
                <Image
                  src="/asset/logo.png"
                  alt="HireLoop"
                  width={154}
                  height={44}
                  className="h-9 w-auto"
                />
              </Link>
            </SheetHeader>

            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1 p-3"
            >
              {navLinks.map((link) => {
                const active = isActivePath(pathname, link.href)

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobile}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-white",
                      active && "bg-white/5 text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            <div className="mt-auto flex flex-col gap-3 border-t border-white/10 p-5">
              <Link
                href={authLinks.signIn.href}
                onClick={closeMobile}
                className={cn(
                  signInClasses,
                  "h-11 w-full text-base"
                )}
              >
                {authLinks.signIn.label}
              </Link>
              <Link
                href={authLinks.getStarted.href}
                onClick={closeMobile}
                className={cn(
                  getStartedClasses,
                  "h-12 w-full text-base"
                )}
              >
                {authLinks.getStarted.label}
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
export default Navbar