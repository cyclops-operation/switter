import GapsooImage from "@/public/images/DOKKAEBI_LORD_D.png"
import MoogwangImage from "@/public/images/DOKKAEBI_LORD_F.png"
import EuldongImage from "@/public/images/DOKKAEBI_LORD_L.png"
import ByungchulImage from "@/public/images/DOKKAEBI_LORD_W.png"
import JeongnamImage from "@/public/images/DOKKAEBI_LORD_WA.png"
import DameeAndSapsareeImage from "@/public/images/DOKKAEBI_PRINCESS_AND_SAPSAREE_D.png"
import YejiAndSapsareeIamge from "@/public/images/DOKKAEBI_PRINCESS_AND_SAPSAREE_F.png"
import EunbeeAndSapsareeImage from "@/public/images/DOKKAEBI_PRINCESS_AND_SAPSAREE_L.png"
import YunaAndSapsareeImage from "@/public/images/DOKKAEBI_PRINCESS_AND_SAPSAREE_W.png"
import MinjiAndSapsareeImage from "@/public/images/DOKKAEBI_PRINCESS_AND_SAPSAREE_WA.png"
import JaduelAndAepiahImage from "@/public/images/TWIN_ANGELS_D.png"
import KaruelAndLanoahImage from "@/public/images/TWIN_ANGELS_F.png"
import MiruelAndGraciahImage from "@/public/images/TWIN_ANGELS_L.png"
import SadielAndZeryahImage from "@/public/images/TWIN_ANGELS_W.png"
import RamaelAndJudiahImage from "@/public/images/TWIN_ANGELS_WA.png"

const LatestMonster = {
  // 불 도깨비 공주와 삽살이
  YejiAndSapsaree: YejiAndSapsareeIamge,
  // 물 도깨비 공주와 삽살이
  MinjiAndSapsaree: MinjiAndSapsareeImage,
  // 풍 도깨비 공주와 삽살이
  YunaAndSapsaree: YunaAndSapsareeImage,
  // 빛 도깨비 공주와 삽살이
  EunbeeAndSapsaree: EunbeeAndSapsareeImage,
  // 암 도깨비 공주와 삽살이
  DameeAndSapsaree: DameeAndSapsareeImage,
  // 불 대왕 도깨비
  Moogwang: MoogwangImage,
  // 물 대왕 도깨비
  Jeongnam: JeongnamImage,
  // 풍 대왕 도깨비
  Byungchul: ByungchulImage,
  // 빛 대왕 도깨비
  Euldong: EuldongImage,
  // 암 대왕 도깨비
  Gapsoo: GapsooImage,
  // 불 쌍둥이 천사
  KaruelAndLanoah: KaruelAndLanoahImage,
  // 물 쌍둥이 천사
  RamaelAndJudiah: RamaelAndJudiahImage,
  // 풍 쌍둥이 천사
  SadielAndZeryah: SadielAndZeryahImage,
  // 빛 쌍둥이 천사
  MiruelAndGraciah: MiruelAndGraciahImage,
  // 암 쌍둥이 천사
  JaduelAndAepiah: JaduelAndAepiahImage,
} as const

type LatestMonsterType = keyof typeof LatestMonster

export { LatestMonster, type LatestMonsterType }
