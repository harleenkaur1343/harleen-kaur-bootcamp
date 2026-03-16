"use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { api } from "@/lib/api";

// interface RegisterRequest {
//   name: string;
//   email: string;
//   password: string;
// }

// export default function RegisterPage() {
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     setLoading(true);
//     setError("");

//     const body: RegisterRequest = {
//       name,
//       email,
//       password,
//     };

//     try {
//       const res: any = await api.register(body);

//       if (!res.ok) {
//         throw new Error("Registration failed");
//       }

//       router.push("/login");
//     } catch (err) {
//       setError("Failed to register");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="flex justify-center items-center min-h-[70vh]">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle className="text-2xl">Create Account</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <Label>Name</Label>

//               <Input
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <Label>Email</Label>

//               <Input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div>
//               <Label>Password</Label>

//               <Input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             {error && <p className="text-red-500 text-sm">{error}</p>}

//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? "Creating..." : "Register"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import type { Metadata } from "next"
import RegisterForm from "./RegisterForm"
const metadata: Metadata = {
  title: "Create Account | Task Notes",
  description: "Get started with your Task Notes account",
}

export default function RegisterPage() {
  return <RegisterForm />    // ← clean, just renders client form
}
