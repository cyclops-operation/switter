"use client"

import { ReactNode, useState } from "react"

import { DefenseMonster, defenseMonster } from "@/interface/feed"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useFieldArray, useForm } from "react-hook-form"

import { apiRoute } from "@/lib/api-route"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
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
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import MonsterImage from "@/components/common/monster-image"

import MonsterSearchDialog from "./monster-search-dialog"

interface FeedDialogProps {
  children: ReactNode
}

export default function FeedDialog({ children }: FeedDialogProps) {
  const { toast } = useToast()

  const queryClient = useQueryClient()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<DefenseMonster>({
    resolver: zodResolver(defenseMonster),
    defaultValues: {
      keyword: "",
      defencseMonsterList: [],
    },
  })

  const {
    fields: defenseMonsterField,
    append: handleDefenseMonsterSelect,
    remove: handleDefenseMonsterRemove,
  } = useFieldArray({
    control: form.control,
    name: "defencseMonsterList",
  })

  const { mutate: createFeed } = useMutation(
    [apiRoute.Feed],
    async (feed: DefenseMonster) => axios.post(apiRoute.Feed, feed),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries([apiRoute.Feed])

        toast({
          title: "방어덱을 추가했습니다.",
        })
      },
    }
  )

  const handleReset = () => {
    form.reset()
    setIsDialogOpen(false)
  }

  const handleSubmit = (values: DefenseMonster) => {
    createFeed(values)

    handleReset()
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isDialogOpen) => {
        form.reset()
        setIsDialogOpen(isDialogOpen)
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-xs max-md:max-w-[calc(100%-48px)]">
        <Form {...form}>
          <form
            className="relative flex h-full max-h-full flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              name="keyword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>키워드</FormLabel>

                  <FormDescription>
                    키워드를 입력하면 빠르게 검색할 수 있습니다.
                  </FormDescription>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder="ex) 해극해"
                      autoComplete="off"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="defencseMonsterList"
              render={() => (
                <FormItem>
                  <FormLabel
                    className={
                      defenseMonsterField.length >= 3
                        ? "text-gray-500"
                        : undefined
                    }
                  >
                    {defenseMonsterField.length >= 3
                      ? "상대방 몬스터 선택완료"
                      : "상대방 방어덱 몬스터를 선택하세요."}
                  </FormLabel>

                  {defenseMonsterField.length <= 2 && (
                    <MonsterSearchDialog
                      renderSearchedMonster={(monsterList) => (
                        <div className="flex max-h-[300px] flex-wrap items-center gap-4 overflow-y-auto overflow-x-hidden">
                          {monsterList.map((monsterInfo) => (
                            <MonsterImage
                              className="cursor-pointer"
                              key={monsterInfo.id}
                              monsterInfo={monsterInfo}
                              onClick={() =>
                                handleDefenseMonsterSelect(monsterInfo)
                              }
                            />
                          ))}
                        </div>
                      )}
                    />
                  )}

                  <div className="flex flex-wrap gap-4">
                    {defenseMonsterField.map((monsterInfo) => {
                      const selectedMonsterIndex =
                        defenseMonsterField.findIndex(
                          ({ originName: selectedOriginName }) =>
                            selectedOriginName === monsterInfo.originName
                        )

                      return (
                        <MonsterImage
                          className="cursor-pointer"
                          key={monsterInfo.id}
                          monsterInfo={monsterInfo}
                          onClick={() =>
                            handleDefenseMonsterRemove(selectedMonsterIndex)
                          }
                        />
                      )
                    })}
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="max-md:hidden" />

            <Button className="flex w-full items-center gap-2" type="submit">
              방어덱 추가
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
