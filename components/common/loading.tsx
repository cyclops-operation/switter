import Image from "next/image"

import { CommonRange, commonRange } from "@/interface/common"
import clsx from "clsx"

import loading from "/public/images/loading-spinner.svg"

export interface LoadingProps {
  /**
   * 로딩 컨테이너 넓이 기준.
   */
  width?: CommonRange
  /**
   * 로딩 컨테이너 높이 기준.
   */
  height?: CommonRange

  className?: string
}

const Loading = ({
  width = commonRange.Enum.full,
  height = commonRange.Enum.full,
  className = "",
}: LoadingProps) => {
  return (
    <div
      className={clsx(`w-${width} h-${height} flex justify-center`, className)}
    >
      <Image src={loading} alt="로딩 이미지" />
    </div>
  )
}

export default Loading
