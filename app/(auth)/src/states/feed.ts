import { FeedTabType, tabType } from "@/interface/feed"
import { atomWithReset } from "jotai/utils"

const feedTabTypeAtom = atomWithReset<FeedTabType>(tabType.Enum.all)

const feedAtoms = {
  feedTabTypeAtom,
}

export { feedAtoms }
