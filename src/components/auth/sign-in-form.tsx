"use client"

import { authClient } from "@/lib/auth-client"
import { signInSchema, SignInInput } from "@/schemas/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { useRouter } from "next/navigation"

type SignInFormProps = {
  onSuccess?: () => void
  onSwitch: () => void
}

export default function SignInForm({ onSuccess, onSwitch }: SignInFormProps) {
  const router = useRouter()
  const { register, handleSubmit, formState, reset } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: SignInInput) => {
    await authClient.signIn.email(
      { email: data.email, password: data.password },
      {
        onSuccess: () => {
          toast.success("Signed In successfully.")
          reset()
          onSuccess?.()
          router.refresh()
        },
        onError: ({ error }) => {
          toast.error(error.message)
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
        <p className="text-muted-foreground text-sm">Sign in to your account.</p>
      </div>

      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
        {formState.errors.email && <FieldError>{formState.errors.email.message}</FieldError>}
      </Field>

      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input id="password" type="password" {...register("password")} />
        {formState.errors.password && <FieldError>{formState.errors.password.message}</FieldError>}
      </Field>

      <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
        {formState.isSubmitting ? <Spinner /> : "Sign In"}
      </Button>

      <p className="text-muted-foreground text-center text-sm">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-primary font-medium hover:underline"
        >
          Sign Up
        </button>
      </p>
    </form>
  )
}
