import type { Metadata } from "next"

import AuthForm from "@/components/auth/auth-form"

export const metadata: Metadata = {
  title: "Sign In — HireLoop",
  description: "Sign in to your HireLoop account and continue your job search.",
}

const SignInPage = () => {
  return <AuthForm mode="sign-in" />
}

export default SignInPage
