import { clsx, type ClassValue } from "clsx"
import { getServerSession } from "next-auth"
import { twMerge } from "tailwind-merge"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** 디바운스 함수 */
function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number = 500
): (...args: Parameters<F>) => void {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<F>): void => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), waitFor)
  }
}

/** 로그인 한 유저 정보 (서버 전용) */
async function getServerAccount() {
  const session = await getServerSession(authOptions)

  // 기존 세션 타입에 email이 있는데 필요없다면 아래의 개체를 이용해 삭제
  // Reflect.deleteProperty(session.user, "email")

  return session
}

interface Path {
  key: string
  value: string
}

interface DynamicRouteParams {
  path?: (string | Path)[]
  query?: Record<string, unknown>
}

function getDynamicRoute(baseRoute: string, params?: DynamicRouteParams) {
  if (!params) return baseRoute

  const { path, query } = params

  const pathString = path
    ? path.reduce((acc, cur) => {
        const isPathStatic = typeof cur === "string"
        return (
          acc + (isPathStatic ? `/${cur}` : `/${cur.value ?? `[${cur.key}]`}`)
        )
      }, "")
    : ""

  const queryString = query
    ? Object.entries(query).reduce(
        (acc, [key, value]) => acc + (value ? `${key}=${value}` : ""),
        "?"
      )
    : ""

  const result = baseRoute + pathString + queryString

  return result
}

export { cn, debounce, getDynamicRoute, getServerAccount }
