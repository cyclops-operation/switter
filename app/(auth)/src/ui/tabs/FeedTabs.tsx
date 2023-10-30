import { tabType } from "@/interface/feed"
import { useAtom } from "jotai"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/common/icons"

import { feedAtoms } from "../../states/feed"
import FeedList from "../list/feed-list"

export default function FeedTabs() {
  const [feedTabType, setFeedTabType] = useAtom(feedAtoms.feedTabTypeAtom)

  return (
    <Tabs defaultValue={tabType.Enum.all} value={feedTabType}>
      <TabsList>
        <TabsTrigger
          value={tabType.Enum.all}
          onClick={() => {
            setFeedTabType(tabType.Enum.all)
          }}
        >
          <Icons.layoutList size={18} />
        </TabsTrigger>

        <TabsTrigger
          value={tabType.Enum.bookmark}
          onClick={() => {
            setFeedTabType(tabType.Enum.bookmark)
          }}
        >
          <Icons.bookmark size={18} />
        </TabsTrigger>
      </TabsList>

      <TabsContent value={tabType.Enum.all}>
        <FeedList />
      </TabsContent>

      <TabsContent value={tabType.Enum.bookmark}>Feed</TabsContent>
    </Tabs>
  )
}
