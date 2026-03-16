export default function TasksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <header className="mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <p className="text-gray-600">Manage and view your tasks</p>
      </header>

      {children}
    </section>
  )
}