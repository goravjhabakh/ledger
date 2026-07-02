import { headers } from "next/headers"
import { auth } from "./auth"
import { redirect } from "next/navigation"

export const getSession = async () => {
  return auth.api.getSession({
    headers: await headers(),
  })
}

export const getCurrentUser = async () => {
  const session = await getSession()
  return session?.user ?? null
}

export const requireUser = async () => {
  const session = await getSession()
  if (!session?.user) {
    redirect("/?auth=signin")
  }
  return session.user
}
