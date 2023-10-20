import {
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import z from "zod"

const commonRange = z.enum(["full", "fit"])
type CommonRange = z.infer<typeof commonRange>

type UseQueryParams<P = unknown, R = unknown> = (
  params: P,
  options?:
    | Omit<
        UseQueryOptions<
          AxiosResponse<R>["data"],
          unknown,
          AxiosResponse<R>["data"],
          QueryKey
        >,
        "queryKey" | "queryFn"
      >
    | undefined
) => UseQueryResult<R> & {
  context?: Record<string, unknown>
}

type ListWithCount<L> = {
  list: L
  total: number
}

export {
  commonRange,
  type CommonRange,
  type ListWithCount,
  type UseQueryParams,
}
