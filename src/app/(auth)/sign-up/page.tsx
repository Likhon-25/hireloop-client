import type { Metadata } from "next"

import AuthForm from "@/components/auth/auth-form"

export const metadata: Metadata = {
  title: "Sign Up — HireLoop",
  description: "Create a HireLoop account and find your next role faster.",
}

const SignUpPage = () => {
  return <AuthForm mode="sign-up" />
}

export default SignUpPage
