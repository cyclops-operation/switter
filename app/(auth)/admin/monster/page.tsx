import {
  Table,
  TableBody,
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
          <TableHead className="w-[250px]">원어명</TableHead>
          <TableHead className="w-[250px]">한글명</TableHead>
          <TableHead className="w-[200px]">속성</TableHead>
          <TableHead>키워드</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell>dfs</TableCell>
          <TableCell>dfs</TableCell>
          <TableCell>dfs</TableCell>
          <TableCell>dfs</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </>
)

export default AdminMonster
