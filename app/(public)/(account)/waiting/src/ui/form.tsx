"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { apiRoute } from "@/lib/api-route"
import { formErrorMessage } from "@/lib/error-message"
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
import { PostAccountPayload } from "@/app/api/account/route"

const formSchema = z.object({
  guildName: z.string().min(1, {
    message: formErrorMessage.guildName.length,
  }),
  name: z.string().min(1, {
    message: formErrorMessage.name.length,
  }),
})

const RequestForm = () => {
  const { toast } = useToast()

  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guildName: "",
      name: "",
    },
  })

  const { mutate: postAccountM } = useMutation(
    async (body: PostAccountPayload) => await axios.post("/api/account", body),
    {
      onSuccess: () => {
        toast({ title: "성공적으로 계정이 생성되었습니다.", duration: 1000 })
        queryClient.refetchQueries([apiRoute.Account])
      },
    }
  )

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    postAccountM(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="guildName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>길드명</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>인게임 닉네임</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          가입 요청하기
        </Button>
      </form>
    </Form>
  )
}

export default RequestForm
