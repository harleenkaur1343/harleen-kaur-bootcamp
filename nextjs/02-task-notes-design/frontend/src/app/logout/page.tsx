// components/LogoutButton.tsx
"use client"
import { useTransition } from "react"
import { logout } from "@/app/login/actions"
import { useAuth } from "@/contexts/AuthContext"
import { LogOut, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition()
  const { clearUser } = useAuth()

  const handleLogout = () => {
    startTransition(async () => {
      clearUser()      
      await logout()    
    })
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={isPending}
      onClick={handleLogout}
      className="gap-2 text-gray-600 hover:text-red-600 hover:bg-red-50"
    >
      {isPending
        ? <Loader2 className="w-4 h-4 animate-spin" />
        : <LogOut className="w-4 h-4" />
      }
      {isPending ? "Logging out..." : "Logout"}
    </Button>
  )
}

