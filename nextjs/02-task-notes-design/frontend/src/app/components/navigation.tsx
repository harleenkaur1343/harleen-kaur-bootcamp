import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export default function Navigation() {
  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Task Notes</h1>
        <div className="flex gap-6">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/tasks" className="hover:text-gray-300">
            Tasks
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
          <Link href="/logout">Logout</Link>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
