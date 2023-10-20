import {
  ContentHeader,
  ContentSubtitle,
  ContentTitle,
} from "@/components/common/content-header"

import MonsterTable from "./src/ui/monster-table"

const AdminMonster = () => (
  <>
    <ContentHeader>
      <ContentTitle>몬스터 관리</ContentTitle>
      <ContentSubtitle>
        공격덱 혹은 방어덱에 추가할 수 있는 몬스터 추가 및 제거를 할 수
        있습니다.
      </ContentSubtitle>
    </ContentHeader>

    {/* <AddMonsterDialog /> 추후 이미지 업로드 기능 업데이트 된 후 반영 */}
    <MonsterTable />
  </>
)

export default AdminMonster
