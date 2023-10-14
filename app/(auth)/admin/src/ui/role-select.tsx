"use client"

import { useRouter } from "next/navigation"

import { User, UserRole, userRole } from "@/interface/user"
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

const roleOptions = Object.values(userRole.Enum)

interface RoleSelectProps {
  id: User["id"]
  role: User["role"]
}

export { type RoleSelectProps }

export default function RoleSelect({ id, role }: RoleSelectProps) {
  const { refresh } = useRouter()

  const { toast } = useToast()

  const { mutate: patchUserM, isLoading } = useMutation(
    async (role: UserRole) =>
      await axios.patch(apiRoute.User, {
        id,
        role,
      }),
    {
      onSuccess: () => {
        toast({ title: "유저 역할이 변경되었습니다." })
        refresh()
      },
    }
  )

  return (
    <Select
      disabled={isLoading}
      onValueChange={(role) => patchUserM(role as UserRole)}
    >
      <SelectTrigger className="w-[130px]">
        <SelectValue placeholder={role} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {roleOptions.map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
