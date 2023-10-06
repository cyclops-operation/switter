import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"

function dateDistanceToNow(date: Date) {
  const d = new Date(date)

  const now = Date.now()

  const diff = (now - d.getTime()) / 1000 // 현재 시간과의 차이(초)

  // 1분 미만일땐 방금 전 표기
  if (diff < 60 * 1) {
    return "방금 전"
  }

  return formatDistanceToNow(d, { addSuffix: true, locale: ko })
}

export { dateDistanceToNow }
