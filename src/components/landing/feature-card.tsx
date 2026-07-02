import { LucideIcon } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"

type FeatureCardProps = {
  icon: LucideIcon
  title: string
  description: string
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardHeader>
        <div className="bg-primary/10 text-primay mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
          <Icon className="size-6" />
        </div>
      </CardHeader>

      <CardTitle>{title}</CardTitle>

      <CardDescription className="leading-6">{description}</CardDescription>
    </Card>
  )
}
