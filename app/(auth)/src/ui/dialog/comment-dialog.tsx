"use client"

import { ReactNode, useState } from "react"
import { useSearchParams } from "next/navigation"

import { AttackMonster, attackMonster } from "@/interface/comment"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useFieldArray, useForm } from "react-hook-form"

import { apiRoute } from "@/lib/api-route"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import FullPageLoading from "@/components/common/loading/full-page"
import MonsterImage from "@/components/common/monster-image"

import MonsterSearchDialog from "./monster-search-dialog"

interface CommentDialogProps {
  children: ReactNode
}

export default function CommentDialog({ children }: CommentDialogProps) {
  const searchParams = useSearchParams()

  const feedId = searchParams.get("feedId")

  const { toast } = useToast()

  const queryClient = useQueryClient()

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { mutate: createComment, isLoading } = useMutation(
    [apiRoute.Feed],
    async (comment: AttackMonster) => {
      return axios.post(apiRoute.Comment, { ...comment, feedId })
    },
    {
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries([apiRoute.Comment]),
          queryClient.invalidateQueries([apiRoute.Feed]),
        ])

        toast({
          title: "공격덱을 추가했습니다.",
        })
      },
      useErrorBoundary: true,
    }
  )

  const form = useForm<AttackMonster>({
    resolver: zodResolver(attackMonster),
    defaultValues: {
      attackMonsterList: [],
      description: "",
    },
  })

  const {
    fields: attackMonsterField,
    append: handleAttackMonsterSelect,
    remove: handleAttackMonsterRemove,
  } = useFieldArray({
    control: form.control,
    name: "attackMonsterList",
  })

  const handleReset = () => {
    form.reset()
    setIsDialogOpen(false)
  }

  const handleSubmit = (values: AttackMonster) => {
    createComment(values)

    handleReset()
  }

  if (isLoading) return <FullPageLoading />

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isDialogOpen) => {
        form.reset()

        setIsDialogOpen(isDialogOpen)
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-md max-md:max-w-[calc(100%-48px)]">
        <Form {...form}>
          <form
            className="relative flex h-full max-h-full flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              name="attackMonsterList"
              render={() => (
                <FormItem>
                  <FormLabel
                    className={
                      attackMonsterField.length >= 3
                        ? "text-gray-500"
                        : undefined
                    }
                  >
                    {attackMonsterField.length >= 3
                      ? "공격덱 몬스터 선택완료"
                      : "공격덱 몬스터를 선택하세요."}
                  </FormLabel>

                  {attackMonsterField.length <= 2 && (
                    <MonsterSearchDialog
                      selectedMonster={
                        attackMonsterField.length ? (
                          <div className="flex w-full flex-col gap-4">
                            <Separator />

                            <span className="select-none text-sm font-bold">
                              선택한 몬스터
                            </span>

                            <div className="flex gap-4">
                              {attackMonsterField.map((monsterInfo) => {
                                const selectedMonsterIndex =
                                  attackMonsterField.findIndex(
                                    ({ originName: selectedOriginName }) =>
                                      selectedOriginName ===
                                      monsterInfo.originName
                                  )

                                return (
                                  <MonsterImage
                                    className="cursor-pointer"
                                    key={monsterInfo.id}
                                    monsterInfo={monsterInfo}
                                    onClick={() =>
                                      handleAttackMonsterRemove(
                                        selectedMonsterIndex
                                      )
                                    }
                                  />
                                )
                              })}
                            </div>
                          </div>
                        ) : undefined
                      }
                      renderSearchedMonster={(monsterList) => (
                        <div className="flex max-h-[300px] flex-wrap items-center gap-4 overflow-y-auto overflow-x-hidden">
                          {monsterList.map((monsterInfo) => (
                            <MonsterImage
                              className="cursor-pointer"
                              key={monsterInfo.id}
                              monsterInfo={monsterInfo}
                              onClick={() =>
                                handleAttackMonsterSelect(monsterInfo)
                              }
                            />
                          ))}
                        </div>
                      )}
                    />
                  )}

                  <div className="flex flex-wrap gap-4">
                    {attackMonsterField.map((monsterInfo) => {
                      const selectedMonsterIndex = attackMonsterField.findIndex(
                        ({ originName: selectedOriginName }) =>
                          selectedOriginName === monsterInfo.originName
                      )

                      return (
                        <MonsterImage
                          className="cursor-pointer"
                          key={monsterInfo.id}
                          monsterInfo={monsterInfo}
                          onClick={() =>
                            handleAttackMonsterRemove(selectedMonsterIndex)
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

            <FormField
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>설명</FormLabel>

                  <FormDescription>공격덱의 설명을 남겨주세요.</FormDescription>

                  <Textarea placeholder="설명을 입력해주세요." {...field} />

                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="max-md:hidden" />

            <Button className="flex w-full items-center gap-2" type="submit">
              공격덱 추가
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
