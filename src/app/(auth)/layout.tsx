import type { ReactNode } from "react"

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative isolate -mt-[76px] flex flex-1 items-center justify-center overflow-hidden px-4 pt-[calc(76px+2.5rem)] pb-10 sm:px-6 lg:-mt-[100px] lg:pt-[calc(100px+3rem)] lg:pb-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_-5%,rgba(92,83,254,0.22)_0%,rgba(1,1,3,0)_65%)]" />
        <div className="absolute top-1/3 -left-32 size-[420px] rounded-full bg-[#7c146e]/10 blur-[120px]" />
        <div className="absolute -right-24 bottom-0 size-[380px] rounded-full bg-brand/10 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_45%,black,transparent_100%)]" />
      </div>

      {children}
    </main>
  )
}

export default AuthLayout
