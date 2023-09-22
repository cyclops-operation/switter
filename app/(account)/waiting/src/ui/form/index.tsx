"use client"

import { ReactNode } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { formErrorMessage } from "@/lib/error-message"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  guildName: z.string().min(1, {
    message: formErrorMessage.guildName.length,
  }),
  name: z.string().min(1, {
    message: formErrorMessage.nickname.length,
  }),
})

export type WaitingForm = z.infer<typeof formSchema>

interface RequestFormProps {
  renderButton: (props: {
    submit: {
      className: string
      type: "submit"
    }
  }) => ReactNode
  onSubmit: (values: WaitingForm) => void
  defaultValues?: WaitingForm
}

const RequestForm = ({
  renderButton,
  onSubmit,
  defaultValues,
}: RequestFormProps) => {
  const form = useForm<WaitingForm>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      guildName: "",
      name: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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

        {renderButton({
          submit: {
            className: "w-full",
            type: "submit",
          },
        })}
      </form>
    </Form>
  )
}

export default RequestForm
