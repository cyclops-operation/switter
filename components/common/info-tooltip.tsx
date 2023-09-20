"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Icons } from "@/components/common/icons"

export interface InfoTooltipProps {
  triggerText: string
  tooltipText: string
}

const InfoTooltip = ({ triggerText, tooltipText }: InfoTooltipProps) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger className="flex cursor-pointer items-center justify-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
          <Icons.info size={14} />
          {triggerText}
        </TooltipTrigger>
        <TooltipContent className="whitespace-pre-line" sideOffset={16}>
          {tooltipText}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default InfoTooltip
