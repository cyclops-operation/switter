"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { DefenseMonsterSearch, defenseMonsterSearch } from "@/interface/feed"
import { zodResolver } from "@hookform/resolvers/zod"
import { useResetAtom } from "jotai/utils"
import { useForm } from "react-hook-form"

import { pageRoute } from "@/lib/page-route"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/common/icons"

import { feedAtoms } from "../../states/feed"

export default function FeedSearch() {
  const searchParams = useSearchParams()

  const searchTerm = searchParams.get("searchTerm")

  const { push } = useRouter()

  const resetFeedTabType = useResetAtom(feedAtoms.feedTabTypeAtom)

  const { success: hasSearchTerm } = defenseMonsterSearch.safeParse({
    searchTerm,
  })

  const form = useForm<DefenseMonsterSearch>({
    resolver: zodResolver(defenseMonsterSearch),
    defaultValues: {
      searchTerm: "",
    },
  })

  const handleSubmit = ({ searchTerm }: DefenseMonsterSearch) => {
    const isValidSearchTerm = Boolean(searchTerm)

    const url = isValidSearchTerm
      ? `${pageRoute.Feed}?searchTerm=${searchTerm}`
      : pageRoute.Feed

    push(url)
    resetFeedTabType()
  }

  const handleReset = () => {
    form.reset()

    push(pageRoute.Feed)
  }

  return (
    <div className="my-4">
      <Form {...form}>
        <form
          className="relative flex h-full max-h-full gap-2"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            name="searchTerm"
            render={({ field }) => (
              <FormItem className="min-w-[267px]">
                <FormLabel>검색</FormLabel>

                <FormDescription>
                  검색할 몬스터명 또는 키워드를 입력해주세요.
                </FormDescription>

                <FormControl>
                  <Input
                    {...field}
                    placeholder="ex) 물해적, 해극해"
                    autoComplete="off"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex gap-2 self-end">
            {hasSearchTerm && (
              <Button
                className="flex-1"
                variant="secondary"
                type="reset"
                onClick={handleReset}
              >
                <span className="sr-only">검색 초기화</span>

                <Icons.reset size={16} />
              </Button>
            )}

            <Button className="flex-1" variant="outline" type="submit">
              <span className="sr-only">검색</span>

              <Icons.search size={16} />
            </Button>
          </div>
        </form>
      </Form>

      <Separator className="mt-4" />
    </div>
  )
}
