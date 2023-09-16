import { HTMLAttributes } from "react"

import {
  MonsterInfo,
  monsterInfo as monsterInfoSchema,
} from "@/interface/monster"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import clsx from "clsx"
import { useForm } from "react-hook-form"

import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

interface MonsterImageProps extends HTMLAttributes<HTMLSpanElement> {
  monsterInfo: MonsterInfo
}

export default function MonsterImage({
  monsterInfo,
  className,
  ...rest
}: MonsterImageProps) {
  const form = useForm<MonsterInfo>({
    resolver: zodResolver(monsterInfoSchema),
    defaultValues: monsterInfo,
  })

  const queryClient = useQueryClient()

  const originName = form.watch("originName")

  const elementType = form.watch("elementType")

  const handleSubmit = async (monsterInfo: MonsterInfo) => {
    await axios
      .patch("/api/monster", monsterInfo)
      .then(() => queryClient.invalidateQueries({ queryKey: ["monster"] }))
  }

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <span
          className={clsx(
            "sprite relative inline-block rounded-xl",
            className,
            originName
          )}
          {...rest}
        >
          <i
            className={clsx(
              "monster-elements absolute right-[-4px] top-[-2px] inline-block",
              elementType
            )}
          />
        </span>
      </PopoverTrigger>

      <PopoverContent>
        <div className="space-y-2">
          <h2 className="text-sm text-muted-foreground">몬스터 정보 변경</h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="elementType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>타입</FormLabel>

                  <FormControl>
                    <RadioGroup
                      className="flex space-x-2"
                      onValueChange={field.onChange}
                      defaultValue={field.value || ""}
                    >
                      <FormItem className="flex items-center space-x-[4px] space-y-0">
                        <FormControl>
                          <RadioGroupItem value="fire" />
                        </FormControl>
                        <FormLabel>불</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-[4px] space-y-0">
                        <FormControl>
                          <RadioGroupItem value="water" />
                        </FormControl>
                        <FormLabel>물</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-[4px] space-y-0">
                        <FormControl>
                          <RadioGroupItem value="wind" />
                        </FormControl>
                        <FormLabel>풍</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-[4px] space-y-0">
                        <FormControl>
                          <RadioGroupItem value="light" />
                        </FormControl>
                        <FormLabel>빛</FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-[4px] space-y-0">
                        <FormControl>
                          <RadioGroupItem value="dark" />
                        </FormControl>
                        <FormLabel>암</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="originName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>원본 이름</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      disabled
                      readOnly
                      value={field.value || ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monsterName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>몬스터 이름</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="전속성 공통이름 (ex. 드루이드)"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keyword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>키워드</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      placeholder="(ex. 물,물드루)"
                      onChange={(e) => {
                        const replaceValue = e.target.value.split(",")

                        field.onChange(replaceValue)
                      }}
                      value={field.value || ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              수정
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
