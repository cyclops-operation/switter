"use client"

import { MonsterInfo } from "@/interface/monster"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/common/icons"
import MonsterManageDialog from "@/app/(auth)/src/ui/dialog/monster-manage-dialog"

const AddMonsterDialog = () => {
  const queryClient = useQueryClient()

  const { toast } = useToast()

  const { mutate: addMonster } = useMutation(
    async (payload: MonsterInfo) =>
      await axios.post<MonsterInfo>(apiRoute.Monster, payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([apiRoute.Monster], {
          exact: false,
        })
        toast({ title: "몬스터가 추가되었습니다." })
      },
    }
  )

  const newLocal = "flex gap-2 items-center"
  return (
    <div className="flex justify-end pb-4">
      <MonsterManageDialog title="몬스터 추가하기" onSubmit={addMonster}>
        <Button className={newLocal} variant="outline" size="sm">
          <Icons.plusCircle size={16} />
          몬스터 추가
        </Button>
      </MonsterManageDialog>
    </div>
  )
}

export default AddMonsterDialog
