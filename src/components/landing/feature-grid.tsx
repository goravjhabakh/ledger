import { PiggyBank, Target, Wallet } from "lucide-react"
import FeatureCard from "./feature-card"

const features = [
  {
    icon: Wallet,
    title: "Track Expenses",
    description: "Record income and expenses in seconds with a clean, intuitive workflow.",
  },
  {
    icon: PiggyBank,
    title: "Monthly Budgets",
    description: "Create spending limits and stay on top of your financial goals.",
  },
  {
    icon: Target,
    title: "Savings Goals",
    description: "Set targets and monitor your progress toward the things that matter.",
  },
]

export default function FeatureGrid() {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </section>
  )
}
