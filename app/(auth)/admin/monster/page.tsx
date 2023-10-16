import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ContentHeader,
  ContentSubtitle,
  ContentTitle,
} from "@/components/common/content-header"

const AdminMonster = () => (
  <>
    <ContentHeader>
      <ContentTitle>몬스터 관리</ContentTitle>
      <ContentSubtitle>
        공격덱 혹은 방어덱에 추가할 수 있는 몬스터 추가 및 제거를 할 수
        있습니다.
      </ContentSubtitle>
    </ContentHeader>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">길드명</TableHead>
          <TableHead>인게임 닉네임</TableHead>
          <TableHead className="w-[130px]">역할</TableHead>
          <TableHead className="w-[130px]">상태</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody></TableBody>
    </Table>
  </>
)

export default AdminMonster
