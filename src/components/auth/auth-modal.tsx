"use client"

import { Dialog, DialogContent } from "../ui/dialog"
import SignUpForm from "./sign-up-form"
import SignInForm from "./sign-in-form"

export type AuthView = "signin" | "signup" | null

type AuthModalProps = {
  view: AuthView
  onViewChange: (view: AuthView) => void
}

export default function AuthModal({ view, onViewChange }: AuthModalProps) {
  return (
    <Dialog
      open={view !== null}
      onOpenChange={(open) => {
        if (!open) onViewChange(null)
      }}
    >
      <DialogContent className="sm:max-w-md">
        {view === "signup" && (
          <SignUpForm
            onSuccess={() => onViewChange(null)}
            onSwitch={() => onViewChange("signin")}
          />
        )}

        {view === "signin" && (
          <SignInForm
            onSuccess={() => onViewChange(null)}
            onSwitch={() => onViewChange("signup")}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
