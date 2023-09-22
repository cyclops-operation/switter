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
import { getPendingUsers } from "@/app/api/user/pending/action"

const Admin = async () => {
  const pendingUsers = await getPendingUsers()

  return (
    <section className="container">
      <ContentHeader>
        <ContentTitle>관리자 페이지</ContentTitle>
        <ContentSubtitle>
          관리자 페이지에선 가입 요청을 한 유저의 승인을 할 수 있습니다.
        </ContentSubtitle>
      </ContentHeader>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">길드명</TableHead>
            <TableHead>인게임 닉네임</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {pendingUsers?.map(({ guildName, name }) => (
            <TableRow key={name}>
              <TableCell>{guildName}</TableCell>
              <TableCell>{name}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableCaption>
          가입을 승인하면 해당 유저는 모든 서비스를 이용할 수 있습니다
        </TableCaption>
      </Table>
    </section>
  )
}

export default Admin
