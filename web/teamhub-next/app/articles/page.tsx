import Link from "next/link";
import { articles } from "../../data";

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Articles</h1>

      <div className="space-y-4">
        {articles.map((a) => (
          <Link
            key={a.id}
            href={`/articles/${a.id}`}
            className="block bg-white p-5 rounded-xl shadow hover:shadow-md"
          >
            <h3 className="font-semibold">{a.title}</h3>
            <p className="text-gray-500 text-sm">{a.author}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}