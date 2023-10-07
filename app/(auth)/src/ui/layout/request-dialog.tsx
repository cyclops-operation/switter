"use client"

import { useState } from "react"

import {
  RequestRowForm,
  requestRowForm,
  requestRowType,
} from "@/interface/sheet"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"

import { apiRoute } from "@/lib/api-route"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/common/icons"

const selectOptions = [
  {
    label: "신규 기능",
    value: requestRowType.Enum.FEATURE,
  },
  {
    label: "버그 제보",
    value: requestRowType.Enum.BUG,
  },
]

// TODO: google sheet key에 문제가 있음. 현재 배포 버전에서 작동하지 않음
export default function RequestDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { toast } = useToast()

  const form = useForm<RequestRowForm>({
    resolver: zodResolver(requestRowForm),
    defaultValues: {
      type: requestRowType.Enum.FEATURE,
      title: "",
      description: "",
    },
  })

  const { mutateAsync: createRequestRow, isLoading } = useMutation(
    [apiRoute.Sheet],
    async (payload: RequestRowForm) => axios.post(apiRoute.Sheet, payload),
    {
      onSuccess: async () => {
        toast({
          title: "요청사항이 전달되었습니다.",
        })
      },
    }
  )

  const handleSubmit = (values: RequestRowForm) => {
    createRequestRow(values).then(() => setIsDialogOpen(false))
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isDialogOpen) => {
        form.reset()
        setIsDialogOpen(isDialogOpen)
      }}
    >
      <DialogTrigger className="fixed bottom-10 right-10">
        <motion.div
          className="rounded-full bg-zinc-900 p-[12px] dark:bg-zinc-300"
          whileHover={{ scale: 1.1 }}
        >
          <Icons.mail className="text-zinc-200 dark:text-zinc-700" size={20} />
        </motion.div>
      </DialogTrigger>

      <DialogContent className="w-96">
        <DialogTitle>요청사항 작성</DialogTitle>

        <DialogDescription className="whitespace-pre-line">{`서비스를 사용하시면서 발생한 요청사항에 대해 작성해주세요!\n새로운 기능부터 버그라고 생각되는 부분까지 전부 작성 가능합니다.`}</DialogDescription>

        <Form {...form}>
          <form
            className="relative flex h-full max-h-full flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              name="type"
              render={({ field }) => {
                const selectedTypeLabel = selectOptions.find(
                  ({ value }) => value === field.value
                )?.label

                return (
                  <FormItem>
                    <FormLabel>타입</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue>{selectedTypeLabel}</SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {selectOptions.map(({ label, value }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )
              }}
            />

            <FormField
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder="요청사항의 제목을 작성해주세요."
                      autoComplete="off"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>내용</FormLabel>

                  <FormDescription>
                    요청사항의 내용을 자세히 작성할 수록 빠른 개발에 도움이
                    됩니다.
                  </FormDescription>

                  <FormControl>
                    <Textarea
                      {...field}
                      className="h-64"
                      placeholder="요청사항의 내용을 작성해주세요."
                      autoComplete="off"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              요청사항 전달하기
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
