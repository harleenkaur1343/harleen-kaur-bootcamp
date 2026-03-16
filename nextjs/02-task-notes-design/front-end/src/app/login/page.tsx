// app/login/page.tsx
//import { login } from './actions';

// export default function LoginPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="text-3xl font-bold text-center">Sign in to Task Notes</h2>
//           <p className="mt-2 text-center text-gray-600">
//             Or{' '}
//             <a href="/register" className="text-blue-600 hover:underline">
//               create a new account
//             </a>
//           </p>
//         </div>

//         <form action={login} className="mt-8 space-y-6">
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter your email"
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="Enter your password"
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             Sign In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import type { Metadata } from "next"
import LoginForm from "./LoginForm"

export const metadata: Metadata = {
  title: "Sign In | Task Notes",
  description: "Sign in to your Task Notes account",
}

export default function LoginPage() {
  return <LoginForm />    // ← clean, just renders client form
}