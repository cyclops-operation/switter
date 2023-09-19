import { MonsterInfo } from "@/interface/monster"
import clsx from "clsx"

interface MonsterImageProps {
  className?: string
  monsterInfo: MonsterInfo
  onSelect: any
}

export default function MonsterImage({
  monsterInfo,
  className,
  onSelect,
}: MonsterImageProps) {
  const { originName, elementType } = monsterInfo

  return (
    <span
      className={clsx(
        "sprite relative inline-block rounded-xl",
        className,
        originName
      )}
      onClick={() => {
        onSelect(monsterInfo)
      }}
    >
      <i
        className={clsx(
          "monster-elements absolute right-[-4px] top-[-2px] inline-block",
          elementType
        )}
      />
    </span>
  )
}
