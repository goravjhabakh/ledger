/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useEffect, useState } from "react"
import AuthModal, { AuthView } from "../auth/auth-modal"
import Link from "next/link"
import { Button } from "../ui/button"
import { useSearchParams } from "next/navigation"
import { User } from "better-auth"
import { authClient } from "@/lib/auth-client"
import { Wallet } from "lucide-react"
import UserMenu from "./user-menu"
import ThemeToggle from "./theme-toggle"

type NavbarProps = {
  initialUser: User | null
}

export default function Navbar({ initialUser }: NavbarProps) {
  const { data: session } = authClient.useSession()
  const user = session?.user || initialUser

  const searchParams = useSearchParams()
  const [view, setView] = useState<AuthView>(null)

  useEffect(() => {
    const auth = searchParams.get("auth")

    if (auth === "signin" || auth === "signup") {
      setView(auth)
    }
  }, [searchParams])

  return (
    <>
      <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-1">
            <Wallet className="size-5 stroke-[2.3]" />
            <span className="text-2xl font-bold tracking-tight">Ledger</span>
          </Link>

          <nav className="flex items-center gap-3">
            {user ? (
              <>
                <Button asChild variant="outline" className="h-11">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <ThemeToggle />
                <UserMenu user={user} />
              </>
            ) : (
              <>
                <ThemeToggle />
                <Button variant="ghost" onClick={() => setView("signin")} className="h-11 px-4">
                  Sign In
                </Button>
                <Button variant="default" onClick={() => setView("signup")} className="h-11 px-4">
                  Get Started
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      <AuthModal view={view} onViewChange={setView} />
    </>
  )
}
