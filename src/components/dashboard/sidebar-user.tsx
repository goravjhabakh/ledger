"use client"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { getInitials } from "@/lib/utils"
import { LogOut, MoreVertical, UserCircle } from "lucide-react"
import Link from "next/link"
import { User } from "better-auth"

type SidebaseUserProps = {
  user: User
}

export default function SidebarUser({ user }: SidebaseUserProps) {
  const router = useRouter()

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully")
          router.refresh()
        },
        onError: ({ error }) => {
          toast.error(error.message)
        },
      },
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto w-full justify-between px-2 py-2">
          <div className="flex items-center gap-3 overflow-hidden">
            <Avatar className="size-9">
              <AvatarImage src={user.image ?? ""} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>

            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="text-muted-foreground truncate text-xs">{user.email}</p>
            </div>
          </div>

          <MoreVertical className="size-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="space-y-1">
          <p className="font-medium">{user.name}</p>
          <p className="text-muted-foreground text-xs font-normal">{user.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserCircle className="mr-2 size-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleSignout}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 size-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
