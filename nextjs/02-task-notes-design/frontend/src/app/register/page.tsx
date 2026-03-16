"use client";

import type { Metadata } from "next"
import RegisterForm from "./RegisterForm"
const metadata: Metadata = {
  title: "Create Account | Task Notes",
  description: "Get started with your Task Notes account",
}

export default function RegisterPage() {
  return <RegisterForm />    // ← clean, just renders client form
}
