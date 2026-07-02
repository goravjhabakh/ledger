import AppSidebar from "@/components/dashboard/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { requireUser } from "@/lib/session"

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const user = await requireUser()

  return (
    <SidebarProvider>
      <AppSidebar user={user} />

      <SidebarInset>
        <main className="flex flex-1 flex-col p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
