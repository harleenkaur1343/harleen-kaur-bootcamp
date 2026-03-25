import { notFound } from "next/navigation";
import { articles } from "../../../data";

export default async function ArticleDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = articles.find((a) => a.id === Number(id));

  if (!article) return notFound();

  return (
    <main>
      <h1>{article.title}</h1>
      <p>By {article.author}</p>
    </main>
  );
}
