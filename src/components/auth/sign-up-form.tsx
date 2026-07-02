"use client"

import { authClient } from "@/lib/auth-client"
import { SignUpInput, signUpSchema } from "@/schemas/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { useRouter } from "next/navigation"

type SignUpFormProps = {
  onSuccess?: () => void
  onSwitch: () => void
}

export default function SignUpForm({ onSuccess, onSwitch }: SignUpFormProps) {
  const router = useRouter()
  const { register, handleSubmit, formState, reset } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: SignUpInput) => {
    await authClient.signUp.email(
      { name: data.name, email: data.email, password: data.password },
      {
        onSuccess: () => {
          toast.success("Account created successfully.")
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
        <h2 className="text-2xl font-semibold tracking-tight">Create an Account</h2>
        <p className="text-muted-foreground text-sm">Enter your details below to get started.</p>
      </div>

      <Field>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <Input id="name" placeholder="John Doe" {...register("name")} />
        {formState.errors.name && <FieldError>{formState.errors.name.message}</FieldError>}
      </Field>

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

      <Field>
        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
        <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
        {formState.errors.confirmPassword && (
          <FieldError>{formState.errors.confirmPassword.message}</FieldError>
        )}
      </Field>

      <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
        {formState.isSubmitting ? <Spinner /> : "Create Account"}
      </Button>

      <p className="text-muted-foreground text-center text-sm">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-primary font-medium hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  )
}
