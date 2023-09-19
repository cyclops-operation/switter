"use client"

import { monsterInfo } from "@/interface/monster"
import { zodResolver } from "@hookform/resolvers/zod"
import { UseFieldArrayAppend, useFieldArray, useForm } from "react-hook-form"
import z from "zod"

import { formErrorMessage } from "@/lib/error-message"

import MonsterImage from "../common/monster-image"
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
import { Separator } from "../ui/separator"
import { Textarea } from "../ui/textarea"
import MonsterDialog from "./monster-dialog"

type MonsterFieldArray = UseFieldArrayAppend<
  {
    nickName: string
    guildName: string
    monsterList: {
      originName: string
      monsterName: string | null
      elementType: "dark" | "light" | "fire" | "water" | "wind" | null
      keyword: string[]
      id?: number | undefined
    }[]
    description?: string | undefined
  },
  "monsterList"
>

export type { MonsterFieldArray }

const formSchema = z.object({
  nickName: z.string().trim().min(1, {
    message: formErrorMessage.name.length,
  }),
  guildName: z.string().trim().min(2, {
    message: formErrorMessage.guildName.length,
  }),
  monsterList: z
    .array(monsterInfo)
    .min(2, {
      message: "최소 1마리 몬스터를 선택해야합니다.",
    })
    .max(3, {
      message: "최대 3마리의 몬스터만 선택해주세요.",
    })
    .refine(
      (monster) => {
        // 중복몬스터 검증

        const monsterMap = new Map()

        monster.map(({ originName, monsterName }) =>
          monsterMap.set(originName, monsterName)
        )

        return monsterMap.size === monster.length
      },
      {
        message: "중복 몬스터는 허용하지 않습니다.",
      }
    ),
  description: z.string().optional(),
})

export default function FeedDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickName: "",
      guildName: "",
      monsterList: [],
      description: "",
    },
  })

  const {
    fields: monsterSelectField,
    append: handleMonsterSelect,
    remove: handleMonsterRemove,
  } = useFieldArray({
    control: form.control,
    name: "monsterList",
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    form.reset()
  }

  return (
    <Dialog
      onOpenChange={(isDialogOpen) => {
        if (isDialogOpen) return
        form.reset()
      }}
    >
      <DialogTrigger asChild>
        <Button className="w-full">Create Feed</Button>
      </DialogTrigger>

      <DialogContent className="max-md:h-[calc(100%-48px)] max-md:max-w-[calc(100%-48px)] max-md:overflow-y-auto">
        <Form {...form}>
          <form
            className="relative flex h-full max-h-full flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              name="nickName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>닉네임</FormLabel>

                  <FormDescription>닉네임을 입력해주세요.</FormDescription>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              name="guildName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>길드명</FormLabel>

                  <FormDescription>길드명을 입력해주세요.</FormDescription>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              name="monsterList"
              render={() => (
                <FormItem>
                  <FormLabel
                    className={
                      monsterSelectField.length >= 3
                        ? "text-gray-500"
                        : undefined
                    }
                  >
                    {monsterSelectField.length >= 3
                      ? `몬스터 선택완료`
                      : `${
                          monsterSelectField.length + 1
                        }번 몬스터를 선택하세요.`}
                  </FormLabel>

                  {monsterSelectField.length <= 2 && (
                    <MonsterDialog onSelect={handleMonsterSelect} />
                  )}

                  <div className="flex flex-wrap gap-4">
                    {monsterSelectField.map((monsterInfo) => (
                      <MonsterImage
                        monsterInfo={monsterInfo}
                        onSelect={handleMonsterRemove}
                      />
                    ))}
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <FormField
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>내용</FormLabel>

                  <FormDescription>
                    피드에 남길 내용을 작성해주세요. (선택)
                  </FormDescription>

                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="max-md:hidden" />

            <Button className="w-full" type="submit">
              피드 생성
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
