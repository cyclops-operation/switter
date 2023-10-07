"use client"

import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import z from "zod"

import { apiErrorMessage, formErrorMessage } from "@/lib/error-message"
import { pageRoute } from "@/lib/page-route"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/common/icons"
import Loading from "@/components/common/loading"

import { Button } from "../../../../../components/ui/button"

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: formErrorMessage.email.length,
    })
    .email(formErrorMessage.email.invalid),
  password: z.string().min(2, {
    message: formErrorMessage.password.length,
  }),
})

type FormSchema = z.infer<typeof formSchema>

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [isVisiblePassword, setIsVisiblePassword] = useState(false)

  const handleSubmit = async (accountValues: FormSchema) => {
    setIsLoading(true)

    try {
      const { success: isValid } = formSchema.safeParse(accountValues)

      if (!isValid)
        return new Response(apiErrorMessage.BadRequest, { status: 400 })

      await signIn("credentials", {
        ...accountValues,
        redirect: true,
        callbackUrl: pageRoute.Waiting,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(error.message, { status: 400 })
      }

      return new Response(apiErrorMessage.ServerError, { status: 500 })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVisiblePasswordToggle = () => {
    setIsVisiblePassword((prev) => !prev)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
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
                    autoComplete="off"
                  />
                </FormControl>

                <FormMessage />
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
                  <div className="relative">
                    <Input
                      {...field}
                      className="pr-9"
                      type={isVisiblePassword ? "text" : "password"}
                      placeholder="패스워드를 입력해주세요."
                      autoComplete="off"
                    />

                    {isVisiblePassword ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="absolute right-2 top-2"
                        onClick={handleVisiblePasswordToggle}
                      >
                        <span className="sr-only">비밀번호 숨기기</span>

                        <Icons.eyeOff size={16} />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="absolute right-2 top-2"
                        onClick={handleVisiblePasswordToggle}
                      >
                        <span className="sr-only">비밀번호 보기</span>

                        <Icons.eye size={16} />
                      </Button>
                    )}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full self-end"
            disabled={isLoading}
          >
            로그인
          </Button>
        </form>
      </Form>

      {isLoading && <Loading className="fixed inset-0 bg-foreground/30" />}
    </>
  )
}
