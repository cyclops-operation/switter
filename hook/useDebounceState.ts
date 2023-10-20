import { Dispatch, SetStateAction, useState } from "react"

import { debounce } from "@/lib/utils"

const useDebounceState = <V>(
  initialValue: V,
  delay = 500
): [V, Dispatch<SetStateAction<V>>] => {
  const [debounceState, setState] = useState<V>(initialValue)

  type Value = SetStateAction<V>

  const debounceSearchTerm = debounce((value: Value) => {
    setState(value)
  }, delay)

  const setDebounceState = (changedValue: Value) => {
    debounceSearchTerm(changedValue)
  }

  return [debounceState, setDebounceState]
}

export default useDebounceState
