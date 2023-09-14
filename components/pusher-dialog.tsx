import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { pusherSend } from "@/app/action"

import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function PusherDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Pusher Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            action={async (formData) => {
              await pusherSend(formData)
            }}
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
