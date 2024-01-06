import { HTMLAttributes, memo } from "react"
import Image from "next/image"

import { MonsterInfo } from "@/interface/monster"
import clsx from "clsx"

import { LatestMonster, LatestMonsterType } from "@/lib/monster"

interface MonsterImageProps extends HTMLAttributes<HTMLSpanElement> {
  monsterInfo: MonsterInfo
}

export default memo(function MonsterImage({
  monsterInfo,
  className,
  ...rest
}: MonsterImageProps) {
  const { originName, elementType } = monsterInfo

  /** 신규 몬스터 여부 */
  const hasLatestMonster = Object.keys(LatestMonster).includes(originName)

  /** 신규 몬스터의 경우 sprite 이미지를 사용하지 않음 */
  if (hasLatestMonster) {
    const staticImageUrl = LatestMonster[originName as LatestMonsterType].src

    return (
      <span
        {...rest}
        className={clsx("relative inline-block drop-shadow-lg", className)}
      >
        <i
          className={clsx(
            "monster-elements absolute right-0 top-0 inline-block z-10",
            elementType
          )}
        />

        <Image
          className="rounded-xl"
          src={staticImageUrl}
          width={60}
          height={60}
          alt={`${monsterInfo.monsterName} 이미지`}
        />

        <span className="sr-only">{monsterInfo.monsterName} 이미지</span>
      </span>
    )
  }

  return (
    <span
      {...rest}
      className={clsx(
        "sprite relative inline-block rounded-xl drop-shadow-lg",
        className,
        originName
      )}
    >
      <i
        className={clsx(
          "monster-elements absolute right-0 top-0 inline-block",
          elementType
        )}
      />
      <span className="sr-only">{monsterInfo.monsterName} 이미지</span>
    </span>
  )
})
