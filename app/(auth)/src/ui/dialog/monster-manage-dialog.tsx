"use client"

import { KeyboardEvent, ReactNode, useState } from "react"

import { MonsterInfo, monsterElement, monsterInfo } from "@/interface/monster"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { useForm } from "react-hook-form"

import { scaleAnimation } from "@/lib/animation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/common/icons"
import Tag from "@/components/common/tag"

const elementTypeLabel = {
  [monsterElement.Enum.fire]: "불",
  [monsterElement.Enum.wind]: "바람",
  [monsterElement.Enum.water]: "물",
  [monsterElement.Enum.dark]: "어둠",
  [monsterElement.Enum.light]: "빛",
}

const elementTypeOptions = Object.entries(elementTypeLabel).map(
  ([value, label]) => ({ label, value })
)

export interface MonsterManageDialogProps {
  children: ReactNode
  title: string
  onSubmit: (value: MonsterInfo) => void
  initValue?: MonsterInfo
}

export default function MonsterManageDialog({
  children,
  title,
  onSubmit,
  initValue,
}: MonsterManageDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const form = useForm<MonsterInfo>({
    resolver: zodResolver(monsterInfo),
    defaultValues: initValue ?? {
      // originName: "",
      // monsterName: null,
      elementType: null,
      keyword: [],
    },
  })

  const getKeyword = (e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()

    const {
      currentTarget: { value },
      key,
    } = e

    if (key === " ") {
      return value.trim()
    }
  }

  const handleSubmit = (values: MonsterInfo) => {
    onSubmit(values)
    setIsDialogOpen(false)
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          form.reset()
        }

        setIsDialogOpen(open)
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogTitle>{title}</DialogTitle>

        <Form {...form}>
          <form
            className="relative flex h-full max-h-full flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            {/* 추후 이미지 업데이트 기능 반영 후 적용
            <FormField
              control={form.control}
              name="originName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>원어명</FormLabel>

                  <FormControl>
                    <Input placeholder="원어명을 작성해주세요." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monsterName"
              render={({ field: { value, ...rest } }) => (
                <FormItem>
                  <FormLabel>한글명</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="한글명을 작성해주세요."
                      value={value ?? ""}
                      {...rest}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="elementType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>속성</FormLabel>

                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          field.value
                            ? elementTypeLabel[field.value]
                            : "속성 없음"
                        }
                      />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {elementTypeOptions.map(({ label, value }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keyword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>키워드</FormLabel>

                  <FormDescription className="flex items-center gap-1">
                    키워드를 입력하고 스페이스바를 눌러주세요.
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Icons.info size={16} />
                        </TooltipTrigger>

                        <TooltipContent>
                          추가한 키워드를 클릭하면 삭제할 수 있습니다.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormDescription>

                  <FormControl>
                    <Input
                      placeholder="키워드를 입력해주세요."
                      onKeyUp={(e) => {
                        const keyword = getKeyword(e)

                        if (keyword) {
                          e.currentTarget.value = keyword

                          if (field.value.includes(keyword)) {
                            form.setError("keyword", {
                              message: "중복되는 키워드는 입력할 수 없습니다.",
                            })
                            return
                          }

                          form.clearErrors("keyword")
                          field.onChange([...field.value, keyword])
                          e.currentTarget.value = ""
                        }
                      }}
                    />
                  </FormControl>

                  <FormMessage />

                  {field.value.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <AnimatePresence>
                        {field.value?.map(
                          (keyword) =>
                            keyword && (
                              <motion.div key={keyword} {...scaleAnimation}>
                                <Tag
                                  onClick={() => {
                                    field.onChange(
                                      field.value.filter(
                                        (item) => keyword !== item
                                      )
                                    )
                                  }}
                                >
                                  {keyword}
                                </Tag>
                              </motion.div>
                            )
                        )}
                      </AnimatePresence>
                    </div>
                  ) : null}
                </FormItem>
              )}
            />

            <Button type="submit">제출하기</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
