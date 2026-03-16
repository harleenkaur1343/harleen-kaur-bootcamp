// app/login/actions.ts
"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { api } from "@/lib/api";

type Response = {
  token : string
};

export async function login(prevState: { error: string } | null, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const cookie = await cookies();
  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const response : Response = await api.login({ email, password });

    // Store token in HTTP-only cookie
    console.log("Action login response token", response.token);
    cookie.set("auth-token", response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      // path: '/',
    });

    // Store user info in a readable cookie (optional)
    cookie.set("user", JSON.stringify(response.user), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  } catch (error) {
    console.log("Login frontend", error);
    return { error: "Invalid email or password" };
  }

  redirect("/tasks");
}

export async function register(prevState: { error: string } | null, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const cookie = await cookies();

  if (!email || !password || !confirmPassword || !name) {
    return { error: "All fields are required" };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters" };
  }
  const data = {
    name,
    email,
    password,
  };
  try {
    const response = await api.register(data);

    cookie.set("auth-token", response.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  } catch (error) {
    console.log("Register frontend", error);
    return { error: "Failed to create account. Email may already exist." };
  }

  redirect("/tasks");
}

// export async function logout() {
  
// const cookie = await cookies();
//   cookie.delete("auth-token");
//   cookie.delete("user");
//   redirect("/login");
// }
