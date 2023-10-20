import { AnimationProps } from "framer-motion"

const scaleAnimation: AnimationProps = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
  transition: { type: "spring", stiffness: 900, damping: 40 },
}

export { scaleAnimation }
