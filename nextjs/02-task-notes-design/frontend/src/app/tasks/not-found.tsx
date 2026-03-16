import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold">Task Not Found</h2>

      <p className="text-gray-600 mt-2">
        The task you are looking for does not exist.
      </p>

      <Link href="/tasks" className="mt-4 inline-block text-blue-600 underline">
        Back to Tasks
      </Link>
    </div>
  );
}
