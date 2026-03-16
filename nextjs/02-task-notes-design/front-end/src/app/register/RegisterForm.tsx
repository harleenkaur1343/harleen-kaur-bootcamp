// src/app/register/RegisterForm.tsx
"use client"
import { useState } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { motion } from "framer-motion"
import { Loader2, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import { register } from "../login/actions"
import FormField from "@/app/components/FormField"
import { containerVariants, itemVariants } from "@/lib/animations"

// validation
function validateName(name: string) {
  if (!name) return "Name is required"
  if (name.length < 2) return "Name must be at least 2 characters"
  if (name.length > 50) return "Name must be less than 50 characters"
  return ""
}

function validateEmail(email: string) {
  if (!email) return "Email is required"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email"
  return ""
}

function validatePassword(password: string) {
  if (!password) return "Password is required"
  if (password.length < 8) return "Password must be at least 8 characters"
  if (!/[A-Z]/.test(password)) return "Must contain at least one uppercase letter"
  if (!/[0-9]/.test(password)) return "Must contain at least one number"
  return ""
}

function validateConfirmPassword(password: string, confirmPassword: string) {
  if (!confirmPassword) return "Please confirm your password"
  if (password !== confirmPassword) return "Passwords do not match"
  return ""
}

// submit button
function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <motion.div
      whileHover={{ scale: pending ? 1 : 1.02 }}
      whileTap={{ scale: pending ? 1 : 0.98 }}
    >
      <Button
        type="submit"
        disabled={pending}
        className="
          w-full gap-2
          bg-gradient-to-r from-blue-500 to-blue-600
          hover:from-blue-600 hover:to-blue-700
          text-white font-semibold
          rounded-lg shadow-md
          transition-all duration-200
        "
      >
        {pending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Creating account...
          </>
        ) : (
          <>
            <UserPlus className="w-4 h-4" />
            Create Account
          </>
        )}
      </Button>
    </motion.div>
  )
}

export default function RegisterForm() {
const [state, formAction] = useActionState<{ error: string } | null, FormData>(register, null)

  // field values
  const [name, setName]                     = useState("")
  const [email, setEmail]                   = useState("")
  const [password, setPassword]             = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // touched state — show errors only after interaction
  const [touched, setTouched] = useState({
    name:            false,
    email:           false,
    password:        false,
    confirmPassword: false,
  })

  const touch = (field: keyof typeof touched) =>
    setTouched(prev => ({ ...prev, [field]: true }))

  // real time errors
  const nameError            = touched.name            ? validateName(name)                              : ""
  const emailError           = touched.email           ? validateEmail(email)                            : ""
  const passwordError        = touched.password        ? validatePassword(password)                      : ""
  const confirmPasswordError = touched.confirmPassword ? validateConfirmPassword(password, confirmPassword) : ""

  // password strength indicator
  const passwordStrength = () => {
    if (!password) return null
    if (password.length < 8)                              return { label: "Weak",   color: "bg-red-500" }
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) return { label: "Fair",   color: "bg-yellow-500" }
    if (password.length < 12)                             return { label: "Good",   color: "bg-blue-500" }
    return                                                       { label: "Strong", color: "bg-green-500"}
  }
  const strength = passwordStrength()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4 border-b border-gray-100">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <CardTitle className="text-center text-2xl font-bold text-gray-900">
                Create account
              </CardTitle>
              <CardDescription className="text-center text-gray-500 mt-1">
                Join Task Notes today
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="pt-2">
            <form action={formAction}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-5"
              >

                {/* server error */}
                {state?.error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2"
                  >
                    {state.error}
                  </motion.div>
                )}

                {/* name */}
                <motion.div variants={itemVariants}>
                  <FormField
                    id="name"
                    name="name"
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={name}
                    onChange={(val) => { setName(val); touch("name") }}
                    error={nameError}
                    success={!!name && !nameError}
                  />
                </motion.div>

                {/* email */}
                <motion.div variants={itemVariants}>
                  <FormField
                    id="email"
                    name="email"
                    label="Email address"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(val) => { setEmail(val); touch("email") }}
                    error={emailError}
                    success={!!email && !emailError}
                  />
                </motion.div>

                {/* password */}
                <motion.div variants={itemVariants}>
                  <FormField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Min 8 characters"
                    required
                    value={password}
                    onChange={(val) => { setPassword(val); touch("password") }}
                    error={passwordError}
                    success={!!password && !passwordError}
                  />

                  {/* password strength bar */}
                  {password && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 space-y-1"
                    >
                      <p className={`text-xs font-medium ${
                        strength?.color === "bg-red-500"    ? "text-red-500"    :
                        strength?.color === "bg-yellow-500" ? "text-yellow-500" :
                        strength?.color === "bg-blue-500"   ? "text-blue-500"   :
                        "text-green-500"
                      }`}>
                        {strength?.label} password
                      </p>
                    </motion.div>
                  )}
                </motion.div>

                {/* confirm password */}
                <motion.div variants={itemVariants}>
                  <FormField
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Repeat your password"
                    required
                    value={confirmPassword}
                    onChange={(val) => { setConfirmPassword(val); touch("confirmPassword") }}
                    error={confirmPasswordError}
                    success={!!confirmPassword && !confirmPasswordError}
                  />
                </motion.div>

                {/* submit */}
                <motion.div variants={itemVariants}>
                  <SubmitButton />
                </motion.div>

                {/* login link */}
                <motion.p
                  variants={itemVariants}
                  className="text-center text-sm text-gray-500"
                >
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign in
                  </Link>
                </motion.p>

              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}