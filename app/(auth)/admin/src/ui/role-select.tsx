"use client"

import { useRouter } from "next/navigation"

import { User, UserStatus, userStatus } from "@/interface/user"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

import { apiRoute } from "@/lib/api-route"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

const statusOptions = Object.values(userStatus.Enum)

interface RoleSelectProps {
  id: User["id"]
  status: User["status"]
}

const RoleSelect = ({ id, status }: RoleSelectProps) => {
  const { refresh } = useRouter()

  const { toast } = useToast()

  const { mutate: patchUserM, isLoading } = useMutation(
    async (status: UserStatus) =>
      await axios.patch(apiRoute.User, {
        id,
        status,
      }),
    {
      onSuccess: () => {
        toast({ title: "유저 상태가 변경되었습니다." })
        refresh()
      },
    }
  )

  return (
    <Select
      disabled={isLoading}
      onValueChange={(status) => patchUserM(status as UserStatus)}
    >
      <SelectTrigger className="w-[130px]">
        <SelectValue placeholder={status} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {statusOptions.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export { type RoleSelectProps }

export default RoleSelect
