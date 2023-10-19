import { ListWithCount, UseQueryParams } from "@/interface/common"
import { MonsterInfo, MonsterSearch } from "@/interface/monster"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"
import { getDynamicRoute } from "@/lib/utils"

const useMonsterList: UseQueryParams<
  MonsterSearch,
  ListWithCount<MonsterInfo[]>
> = (params, options) => {
  const result = useQuery<ListWithCount<MonsterInfo[]>>(
    [apiRoute.Monster, params.searchTerm, params.page, params.limit],
    async () =>
      await axios
        .get(
          getDynamicRoute(apiRoute.Monster, {
            query: params,
          })
        )
        .then((res) => res.data),
    options
  )

  return result
}

export default useMonsterList
