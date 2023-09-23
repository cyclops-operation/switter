"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Icons } from "@/components/common/icons"

export default function FeedFilter() {
  const [searchType, setSearchType] = useState("")

  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-background p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Label
          htmlFor={searchType ? "searchTerm" : "searchType"}
          className="cursor-pointer"
        >
          검색
        </Label>

        <div className="flex flex-1 items-center gap-2">
          <Select onValueChange={setSearchType}>
            <SelectTrigger id="searchType" className="max-w-[190px]">
              <SelectValue placeholder="검색 기준을 선택해주세요." />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>검색 기준</SelectLabel>
                <SelectItem value="1">전체 몬스터</SelectItem>
                <SelectItem value="2">방어덱 몬스터</SelectItem>
                <SelectItem value="3">공격덱 몬스터</SelectItem>
                <SelectItem value="4">키워드</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            id="searchTerm"
            className="flex-1"
            autoComplete="off"
            disabled={!searchType}
            placeholder={
              !searchType
                ? "검색기준 선택 후 검색어를 입력해주세요."
                : " 검색어를 입력해주세요."
            }
          />

          <Button variant="outline">
            <Icons.search size={16} />
            <span className="sr-only">검색</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
