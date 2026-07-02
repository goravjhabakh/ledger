import Hero from "@/components/landing/hero"
import Navbar from "@/components/landing/navbar"
import { getCurrentUser } from "@/lib/session"

export default async function Home() {
  const user = await getCurrentUser()

  return (
    <>
      <Navbar initialUser={user} />

      <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center justify-center px-6">
        <Hero />
      </main>
    </>
  )
}
