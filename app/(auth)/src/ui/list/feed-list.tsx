"use client"

import { useRouter } from "next/navigation"

import { userRole } from "@/interface/user"
import { AnimatePresence, motion, useIsPresent } from "framer-motion"
import { useSession } from "next-auth/react"

import { scaleAnimation } from "@/lib/animation"
import { apiErrorMessage } from "@/lib/error-message"
import { pageRoute } from "@/lib/page-route"
import { getDynamicRoute } from "@/lib/utils"
import { Icons } from "@/components/common/icons"
import Loading from "@/components/common/loading"

import useFeedDelete from "../../hooks/useFeedDelete"
import useFeedList from "../../hooks/useFeedList"
import FeedCard from "../card/feed-card"
import FeedDialog from "../dialog/feed-dialog"

export default function FeedList() {
  const { data: session } = useSession()

  const { push: routerPush } = useRouter()

  const { feedList, isFeedListLoading } = useFeedList()

  const { deleteFeed } = useFeedDelete()

  const handleFeedDelete = (feedId: number) => {
    if (!feedId) throw Error(apiErrorMessage.BadRequest)

    deleteFeed(Number(feedId))
  }

  const handleFeedClick = (feedId: number) => {
    routerPush(
      getDynamicRoute(pageRoute.Feed, {
        query: { feedId },
      })
    )
  }

  const isPresent = useIsPresent()

  const sessionUserId = session?.user.id

  const isAdmin = session?.user.role === userRole.Enum.ADMIN

  return (
    <div className="h-full pb-4">
      {isFeedListLoading ? (
        <Loading className="pt-56" height="fit" />
      ) : (
        <ul className="grid grid-cols-4 gap-[16px_8px] max-lg:grid-cols-3 max-md:grid-cols-2 max-mobile:grid-cols-1">
          <FeedDialog>
            <li className="group flex h-full min-h-[200px] cursor-pointer flex-col items-center justify-center gap-6 rounded-lg border border-dashed p-4 shadow-sm transition-shadow duration-300 hover:shadow-md">
              <Icons.plus
                size={30}
                className="text-gray-200 transition-colors duration-300 group-hover:animate-shake group-hover:text-gray-900 dark:text-gray-500 dark:group-hover:text-gray-100"
              />
            </li>
          </FeedDialog>

          <AnimatePresence>
            {feedList.map((props) => {
              return (
                <motion.li
                  key={props.id}
                  className="relative z-0"
                  layout
                  style={
                    isPresent
                      ? { position: "static" }
                      : { position: "absolute" }
                  }
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()

                    handleFeedClick(props.id)
                  }}
                  {...scaleAnimation}
                >
                  <FeedCard
                    {...props}
                    onDelete={
                      isAdmin || sessionUserId === props.author.id
                        ? (id) => handleFeedDelete(id)
                        : undefined
                    }
                  />
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>
      )}
    </div>
  )
}
