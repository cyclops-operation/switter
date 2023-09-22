"use client"

import { useState } from "react"

import { monsterList } from "@/interface/monster"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import z from "zod"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import MonsterImage from "@/components/common/monster-image"

import MonsterDialog from "./monster-search-dialog"

const formSchema = z.object({
  defencseMonsterList: monsterList,
  attackMonsterList: monsterList,
})

export default function FeedDialog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      defencseMonsterList: [],
      attackMonsterList: [],
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

  const {
    fields: attackMonsterField,
    append: handleAttackMonsterSelect,
    remove: handleAttackMonsterRemove,
  } = useFieldArray({
    control: form.control,
    name: "attackMonsterList",
  })

  const { toast } = useToast()

  const handleReset = () => {
    form.reset()
    setIsDialogOpen(false)
  }

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)

    toast({
      title: "피드를 생성했습니다.",
    })

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
      <DialogTrigger asChild>
        <Button className="w-full">Create Feed</Button>
      </DialogTrigger>

      <DialogContent className="max-w-xs max-md:max-w-[calc(100%-48px)]">
        <Form {...form}>
          <form
            className="relative flex h-full max-h-full flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
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
                    <MonsterDialog
                      renderSearchedMonster={(monsterList) => (
                        <div className="flex max-h-[300px] flex-wrap items-center gap-4 overflow-y-auto overflow-x-hidden">
                          {monsterList.map((monsterInfo) => (
                            <MonsterImage
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

            <Separator />

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
                    <MonsterDialog
                      renderSearchedMonster={(monsterList) => (
                        <div className="flex max-h-[300px] flex-wrap items-center gap-4 overflow-y-auto overflow-x-hidden">
                          {monsterList.map((monsterInfo) => (
                            <MonsterImage
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

            <Button className="w-full" type="submit">
              피드 생성
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
