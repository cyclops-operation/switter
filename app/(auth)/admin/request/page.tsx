import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ContentHeader,
  ContentSubtitle,
  ContentTitle,
} from "@/components/common/content-header"
import { getUsers } from "@/app/api/user/action"

import RoleSelect from "../src/ui/role-select"
import StatusSelect from "../src/ui/status-select"

export default async function Admin() {
  const pendingUsers = await getUsers()

  return (
    <>
      <ContentHeader>
        <ContentTitle>가입 승인 관리</ContentTitle>
        <ContentSubtitle className="max-sm:text-base">
          가입 요청을 한 유저를 승인하거나 유저 역할을 변경할 수 있습니다.
        </ContentSubtitle>
      </ContentHeader>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[72px]">길드명</TableHead>
            <TableHead className="min-w-[120px]">인게임 닉네임</TableHead>
            <TableHead className="w-[130px]">역할</TableHead>
            <TableHead className="w-[130px]">상태</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {pendingUsers?.map(({ id, guildName, nickname, status, role }) => (
            <TableRow key={id}>
              <TableCell>{guildName}</TableCell>

              <TableCell>{nickname}</TableCell>

              <TableCell>
                <RoleSelect id={id} role={role} />
              </TableCell>

              <TableCell>
                <StatusSelect id={id} status={status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableCaption className="py-2">
          가입을 승인하면 해당 유저는 모든 서비스를 이용할 수 있습니다
        </TableCaption>
      </Table>
    </>
  )
}
