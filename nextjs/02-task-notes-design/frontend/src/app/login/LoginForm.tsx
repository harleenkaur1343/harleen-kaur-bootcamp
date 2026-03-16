"use client";

import { useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import { Loader2} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { login } from "./actions";
import FormField from "@/app/components/FormField";
import { containerVariants, itemVariants } from "@/lib/animations";

function validateEmail(email: string) {
  if (!email) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email";
  return "";
}

function validatePassword(password: string) {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  return "";
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <motion.div
      whileHover={{ scale: pending ? 1 : 1.02 }}
      whileTap={{ scale: pending ? 1 : 0.98 }}
    >
      <Button
        type="submit"
        disabled={pending}
        className="w-full gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
      >
        {pending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Signing In...
          </>
        ) : (
          <>
            Sign In
          </>
        )}
      </Button>
    </motion.div>
  );
}

export default function LoginForm() {
  //server action state - captures the error returned from action
  const [state, formAction] = useActionState(login, null);

  //client side field vals
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailError = touched.email ? validateEmail(email) : "";
  const passwordError = touched.password ? validatePassword(password) : "";

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
                Sign in
              </CardTitle>
              <CardDescription className="text-center text-gray-500 mt-1">
                Welcome back to Task Notes
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="pt-3">
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
                    ⚠️ {state.error}
                  </motion.div>
                )}

                {/* email field */}
                <motion.div variants={itemVariants}>
                  <FormField
                    id="email"
                    name="email"
                    label="Email address"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(val) => {
                      setEmail(val);
                      setTouched((prev) => ({ ...prev, email: true }));
                    }}
                    error={emailError}
                    success={!!email && !emailError}
                  />
                </motion.div>

                {/* password field */}
                <motion.div variants={itemVariants}>
                  <FormField
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(val) => {
                      setPassword(val);
                      setTouched((prev) => ({ ...prev, password: true }));
                    }}
                    error={passwordError}
                    success={!!password && !passwordError}
                  />
                </motion.div>

                {/* submit */}
                <motion.div variants={itemVariants}>
                  <SubmitButton />
                </motion.div>

                {/* register link */}
                <motion.p
                  variants={itemVariants}
                  className="text-center text-sm text-gray-500"
                >
                  {`Don't have an account? `}
                  <Link
                    href="/register"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Create one
                  </Link>
                </motion.p>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
