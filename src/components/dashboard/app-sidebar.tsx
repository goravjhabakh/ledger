import { User } from "better-auth"
import { LayoutDashboard, PiggyBank, ReceiptText, Target } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"
import Link from "next/link"
import SidebarUser from "./sidebar-user"

type AppSidebarProps = {
  user: User
}

const navigation = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "Transactions", href: "/dashboard/transactions", icon: ReceiptText },
]

const comingSoon = [
  { title: "Budgets", icon: PiggyBank },
  { title: "Goals", icon: Target },
]

export default function AppSidebar({ user }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <Link href="/" className="px-2 py-2 text-lg font-semibold">
          Ledger
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon className="mr-1 size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {comingSoon.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton disabled>
                    <item.icon className="mr-1 size-4" />
                    <span>{item.title}</span>
                    <span className="text-muted-foreground ml-auto text-xs">Soon</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
