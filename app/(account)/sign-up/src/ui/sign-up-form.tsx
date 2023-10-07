"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import z from "zod"

import { apiRoute } from "@/lib/api-route"
import { formErrorMessage } from "@/lib/error-message"
import { pageRoute } from "@/lib/page-route"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/common/icons"

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
  guildName: z
    .string()
    .min(2, {
      message: formErrorMessage.guildName.length,
    })
    .refine(
      (guildName) => {
        return guildName !== "개발자"
      },
      {
        message: formErrorMessage.guildName.invalidName,
      }
    ),
  nickname: z.string().min(2, {
    message: formErrorMessage.nickname.length,
  }),
})

type FormSchema = z.infer<typeof formSchema>

const SignUpForm = () => {
  const { push } = useRouter()

  const { toast } = useToast()

  const [isVisiblePassword, setIsVisiblePassword] = useState(false)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      guildName: "",
      nickname: "",
    },
  })

  const { mutate: createUser, isLoading } = useMutation(
    async (payload: FormSchema) => await axios.post(apiRoute.User, payload),
    {
      onSuccess: () => {
        toast({ title: "성공적으로 계정이 생성되었습니다." })
        push(pageRoute.SignIn)
      },
    }
  )

  const handleSubmit = (accountValues: FormSchema) => {
    createUser(accountValues)
  }

  const handleVisiblePasswordToggle = () => {
    setIsVisiblePassword((prev) => !prev)
  }

  return (
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
                  placeholder="이메일를 입력해주세요."
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

        <FormField
          control={form.control}
          name="guildName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>길드명</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  placeholder="길드명을 입력해주세요."
                  autoComplete="off"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>인게임 닉네임</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  placeholder="인게임 닉네임을 입력해주세요."
                  autoComplete="off"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          회원가입
        </Button>
      </form>
    </Form>
  )
}

export default SignUpForm
