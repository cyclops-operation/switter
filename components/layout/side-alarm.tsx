"use client"

import Link from "next/link"

import { Alarm } from "@/interface/alarm"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"

import Loading from "../common/loading"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"

const SideAlarm = () => {
  const { data: alarms, isLoading } = useQuery(
    [apiRoute.Alarm],
    async () => await axios.get(apiRoute.Alarm).then(({ data }) => data)
  )

  return (
    <Card className="h-[85vh] w-96">
      <CardHeader>
        <CardTitle>알림 목록</CardTitle>
        <CardDescription>전달된 알림 목록을 확인해보세요</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Loading />
        ) : (
          alarms?.map(({ id, title, description, url }: Alarm) => (
            <div key={id} className="space-y-1 rounded-sm">
              <Link className="text-sm" href={url}>
                {title}
              </Link>
              {description ? (
                <p className="text-xs text-zinc-400">{description}</p>
              ) : null}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

export default SideAlarm
