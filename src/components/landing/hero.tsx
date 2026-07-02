import Link from "next/link"
import { Button } from "../ui/button"
import FeatureGrid from "./feature-grid"

export default function Hero() {
  return (
    <section className="flex w-full flex-col items-center text-center">
      <div className="animate-fade-up">
        <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
          Take control of your finances.
        </h1>

        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg leading-8">
          Track income, monitor expenses, stay within budget, and build better financial habits with
          a clean, distraction-free dashboard.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 min-w-48 transition-transform duration-200 hover:scale-[1.02]"
          >
            <Link href="/?auth=signup">Get Started</Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="h-12 min-w-48 transition-colors">
            <Link href="/?auth=signin">Sign In</Link>
          </Button>
        </div>
      </div>

      <div className="animate-fade-up-delay mt-20 w-full">
        <FeatureGrid />
      </div>
    </section>
  )
}
