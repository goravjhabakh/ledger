import Link from "next/link"
import { User } from "better-auth"
import { Button } from "@/components/ui/button"

type WelcomeBackProps = {
  user: User
}

export default function WelcomeBack({ user }: WelcomeBackProps) {
  return (
    <section className="animate-fade-in flex flex-col items-center text-center">
      <h1 className="text-5xl font-bold tracking-tight">
        Welcome back,
        <br />
        {user.name.split(" ").at(0) ?? user.name}
      </h1>

      <p className="text-muted-foreground mt-6 max-w-xl text-lg">
        Continue tracking your finances, monitor your budgets, and stay on top of your goals.
      </p>

      <Button
        asChild
        size="lg"
        className="mt-10 h-12 min-w-56 transition-transform duration-200 hover:scale-[1.02]"
      >
        <Link href="/dashboard">Open Dashboard</Link>
      </Button>
    </section>
  )
}
