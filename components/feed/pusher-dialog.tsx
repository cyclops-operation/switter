import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import Pusher from "pusher"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { apiRoute } from "@/lib/api-route"
import { formErrorMessage } from "@/lib/error-message"
import { pusherOptions } from "@/lib/pusher"

import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: formErrorMessage.id.length,
  }),
})

export default function PusherDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const pusher = new Pusher(pusherOptions)

    if (!pusher) return

    //TODO: 추후에 useMutation으로 교체
    await axios.post(apiRoute.Pusher, { message: values.username })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Pusher Event</Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>아이디</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="인게임 아이디를 입력해주세요."
                      {...field}
                    />
                  </FormControl>

                  <FormDescription>
                    가입요청시 어드민의 확인이 필요합니다.
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              가입요청
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
