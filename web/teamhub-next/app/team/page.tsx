import { team } from "../../data";

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Team</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {team.map((m) => (
          <div key={m.id} className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold">{m.name}</h3>
            <p className="text-gray-500">{m.role}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
