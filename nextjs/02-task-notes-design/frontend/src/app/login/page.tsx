// app/login/page.tsx
import type { Metadata } from "next"
import LoginForm from "./LoginForm"

export const metadata: Metadata = {
  title: "Sign In | Task Notes",
  description: "Sign in to your Task Notes account",
}

export default function LoginPage() {
  return <LoginForm />   
}