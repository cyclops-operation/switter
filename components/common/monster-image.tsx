import { HTMLAttributes, memo } from "react"

import { MonsterInfo } from "@/interface/monster"
import clsx from "clsx"

interface MonsterImageProps extends HTMLAttributes<HTMLSpanElement> {
  monsterInfo: MonsterInfo
}

export default memo(function MonsterImage({
  monsterInfo,
  className,
  ...rest
}: MonsterImageProps) {
  const { originName, elementType } = monsterInfo

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
          "monster-elements absolute right-[-4px] top-[-2px] inline-block",
          elementType
        )}
      />
      <span className="sr-only">{monsterInfo.monsterName} 이미지</span>
    </span>
  )
})
