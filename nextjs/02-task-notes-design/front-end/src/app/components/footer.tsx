export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-10 border-t">
      <div className="max-w-5xl mx-auto px-4 py-6 text-center text-gray-600">
        <p>© {new Date().getFullYear()} Task Notes App</p>
      </div>
    </footer>
  )
}