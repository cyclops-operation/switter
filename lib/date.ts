import { format, formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"

function dateDistanceToNow(date: Date) {
  const d = new Date(date)
  const now = Date.now()
  const diff = (now - d.getTime()) / 1000 // 현재 시간과의 차이(초)
  if (diff < 60 * 1) {
    // 1분 미만일땐 방금 전 표기
    return "방금 전"
  }
  if (diff < 60 * 60 * 24 * 3) {
    // 3일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
    return formatDistanceToNow(d, { addSuffix: true, locale: ko })
  }
  return format(d, "PPP EEE p", { locale: ko }) // 날짜 포맷
}

export { dateDistanceToNow }
