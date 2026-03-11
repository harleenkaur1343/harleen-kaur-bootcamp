import { useState } from "react"
import { login } from "./authApi"

interface Props {
  onLogin: () => void
}

function LoginForm({ onLogin }: Props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const data = await login(email, password)

      localStorage.setItem("token", data.token)

      onLogin()
    } catch {
      setError("Invalid credentials")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>

      {error && <p>{error}</p>}
    </form>
  )
}

export default LoginForm;