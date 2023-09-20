import Image from "next/image"

import { CommonRange, commonRange } from "@/interface/common"

import loading from "/public/images/loading-spinner.svg"

interface LoadingProps {
  /**
   * 로딩 컨테이너 넓이 기준.
   */
  width?: CommonRange
  /**
   * 로딩 컨테이너 높이 기준.
   */
  height?: CommonRange
}

const Loading = ({
  width = commonRange.Enum.full,
  height = commonRange.Enum.full,
}: LoadingProps) => {
  return (
    <div className={`w-${width} h-${height} flex justify-center`}>
      <Image src={loading} alt="로딩 이미지" />
    </div>
  )
}

export default Loading
