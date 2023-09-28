import { Alarm } from "@/interface/alarm"

import prisma from "@/lib/prisma"
import { getServerAccount } from "@/lib/utils"

async function getMyAlarms(where?: Omit<Alarm, "receiverId">) {
  const session = await getServerAccount()

  const alarms = await prisma.alarm.findMany({
    where: {
      receiverId: session?.user.id,
      ...where,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return alarms
}

interface SendAlarmParams
  extends Pick<Alarm, "title" | "description" | "eventType" | "url"> {
  receiverIds: number[]
}

async function sendAlarm(params: SendAlarmParams) {
  const { title, description, url, receiverIds, eventType } = params

  if (!receiverIds) {
    throw new Error("알림 수신자의 아이디가 전달되지 않았습니다.")
  }

  const commonCreateData = {
    title,
    description,
    url,
  }

  if (eventType) {
    const repeatedAlarms = await prisma.alarm.findMany({
      where: {
        receiverId: { in: receiverIds },
        eventType,
      },
      select: {
        id: true,
        count: true,
      },
    })

    const hasRepeatedAlarm = repeatedAlarms.length > 0
    const repeatedAlarmIds = repeatedAlarms.map(({ id, count }) => {
      if (count === 3) {
        throw new Error("반복 알림 최대 횟수를 넘겼습니다.")
      }
      return id
    })

    if (hasRepeatedAlarm) {
      await prisma.alarm.updateMany({
        where: {
          id: { in: repeatedAlarmIds },
          eventType,
        },
        data: {
          count: {
            increment: 1,
          },
        },
      })
    } else {
      await prisma.alarm.createMany({
        data: receiverIds.map((id) => ({
          receiverId: id,
          eventType,
          ...commonCreateData,
        })),
      })
    }
  } else {
    await prisma.alarm.createMany({
      data: receiverIds.map((id) => ({ receiverId: id, ...commonCreateData })),
    })
  }
}

export { getMyAlarms, sendAlarm, type SendAlarmParams }
