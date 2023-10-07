"use client"

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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  email: z.string().min(2, {
    message: formErrorMessage.email.length,
  }),
  password: z.string().min(2, {
    message: formErrorMessage.password.length,
  }),
  guildName: z.string().min(2, {
    message: formErrorMessage.guildName.length,
  }),
  nickname: z.string().min(2, {
    message: formErrorMessage.nickname.length,
  }),
})

type FormSchema = z.infer<typeof formSchema>

const SignUpForm = () => {
  const { push } = useRouter()
  const { toast } = useToast()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      guildName: "",
      nickname: "",
    },
  })

  const { mutate, isLoading } = useMutation(
    async (payload: FormSchema) => await axios.post(apiRoute.User, payload),
    {
      onSuccess: () => {
        toast({ title: "성공적으로 계정이 생성되었습니다." })
        push(pageRoute.SignIn)
      },
    }
  )

  const onSubmit = (value: FormSchema) => {
    mutate(value)
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

        <FormField
          control={form.control}
          name="guildName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>길드명</FormLabel>
              <FormControl>
                <Input {...field} placeholder="길드명을 입력해주세요" />
              </FormControl>
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
                <Input {...field} placeholder="인게임 닉네임을 입력해주세요" />
              </FormControl>
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
