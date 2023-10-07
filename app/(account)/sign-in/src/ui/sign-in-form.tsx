"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import z from "zod"

import { formErrorMessage } from "@/lib/error-message"
import { pageRoute } from "@/lib/page-route"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Button } from "../../../../../components/ui/button"

const formSchema = z.object({
  email: z.string().min(2, {
    message: formErrorMessage.email.length,
  }),
  password: z.string().min(2, {
    message: formErrorMessage.password.length,
  }),
})

type FormSchema = z.infer<typeof formSchema>

const SignInForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (value: FormSchema) => {
    signIn("credentials", {
      ...value,
      redirect: true,
      callbackUrl: pageRoute.Waiting,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  placeholder="이메일를 입력해주세요"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>패스워드</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="패스워드를 입력해주세요"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          로그인
        </Button>
      </form>
    </Form>
  )
}

export default SignInForm
