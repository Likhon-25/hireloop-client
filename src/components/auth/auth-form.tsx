"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

type AuthMode = "sign-in" | "sign-up"

const tabs = [
  { mode: "sign-in", href: "/sign-in", label: "Sign In" },
  { mode: "sign-up", href: "/sign-up", label: "Sign Up" },
] as const

const fieldClasses =
  "h-12 rounded-xl border-white/10 bg-white/[0.03] px-3.5 text-base text-white placeholder:text-white/35 focus-visible:border-brand/60 focus-visible:ring-brand/20 dark:bg-white/[0.03] md:text-base"

const AuthForm = ({ mode }: { mode: AuthMode }) => {
  const router = useRouter()
  const isSignIn = mode === "sign-in"

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (pending) return

    setError(null)

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    const email = String(data.email ?? "").trim()
    const password = String(data.password ?? "")

    if (!isSignIn && password !== data.confirmPassword) {
      setError("Passwords do not match. Please try again.")
      return
    }

    setPending(true)

    try {
      const result = isSignIn
        ? await authClient.signIn.email({
            email,
            password,
            rememberMe: data.rememberMe === "on",
          })
        : await authClient.signUp.email({
            name: String(data.name ?? "").trim(),
            email,
            password,
          })

      if (result.error) {
        setError(
          result.error.message ?? "Something went wrong. Please try again."
        )
        return
      }

      router.push("/")
      router.refresh()
    } catch (cause) {
      console.error(`[hireloop:${mode}] auth request failed`, cause)
      setError("Unable to reach the authentication server. Please try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="w-full max-w-[460px]">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0f]/85 p-6 shadow-[0_40px_120px_-50px_rgba(92,83,254,0.5)] backdrop-blur-xl sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 left-1/2 h-56 w-72 -translate-x-1/2 rounded-full bg-brand/20 blur-3xl"
        />

        <div className="relative">
          {/* Sign In / Sign Up toggle */}
          <div className="grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
            {tabs.map((tab) => {
              const active = tab.mode === mode

              return (
                <Link
                  key={tab.mode}
                  href={tab.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-10 items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none",
                    active
                      ? "bg-white/[0.09] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                      : "text-white/55 hover:text-white"
                  )}
                >
                  {tab.label}
                </Link>
              )
            })}
          </div>

          <div className="mt-7">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-[32px]">
              {isSignIn ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-white/55">
              {isSignIn
                ? "Sign in to keep your job search moving."
                : "Join HireLoop and land your next role faster."}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            aria-busy={pending}
            className="mt-6 space-y-5"
          >
            {!isSignIn && (
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-white/80"
                >
                  Full name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  disabled={pending}
                  className={fieldClasses}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-white/80"
              >
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                disabled={pending}
                className={fieldClasses}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-white/80"
                >
                  Password
                </Label>
                {isSignIn && (
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-brand transition-colors hover:text-[#7b73ff]"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={
                    isSignIn
                      ? "Enter your password"
                      : "Create a strong password"
                  }
                  autoComplete={isSignIn ? "current-password" : "new-password"}
                  minLength={8}
                  required
                  disabled={pending}
                  className={cn(fieldClasses, "pr-11")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-xl text-white/45 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
                >
                  {showPassword ? (
                    <EyeOffIcon aria-hidden="true" className="size-4" />
                  ) : (
                    <EyeIcon aria-hidden="true" className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {!isSignIn && (
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-white/80"
                >
                  Confirm password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    disabled={pending}
                    aria-invalid={error ? true : undefined}
                    className={cn(fieldClasses, "pr-11")}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((visible) => !visible)
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    aria-pressed={showConfirmPassword}
                    className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-xl text-white/45 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon aria-hidden="true" className="size-4" />
                    ) : (
                      <EyeIcon aria-hidden="true" className="size-4" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {isSignIn && (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  disabled={pending}
                />
                <Label
                  htmlFor="rememberMe"
                  className="cursor-pointer text-sm font-normal text-white/60"
                >
                  Remember me for 30 days
                </Label>
              </div>
            )}

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-destructive/25 bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={pending}
              className="h-12 w-full rounded-xl bg-brand text-base font-semibold text-brand-foreground shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#6d65ff]"
            >
              {pending
                ? isSignIn
                  ? "Signing In..."
                  : "Creating Account..."
                : isSignIn
                  ? "Sign In"
                  : "Create Account"}
            </Button>
          </form>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-white/50">
        {isSignIn ? "New to HireLoop? " : "Already have an account? "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-medium text-brand transition-colors hover:text-[#7b73ff]"
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  )
}

export default AuthForm
