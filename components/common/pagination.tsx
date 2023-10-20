import { Button } from "../ui/button"

export interface PaginationProps {
  current: number
  total: number
  onPage: (page: number) => void
}

const Pagination = ({ current, total, onPage }: PaginationProps) => {
  const prevDisabled = current - 1 <= 0
  const nextDisabled = current + 1 > total

  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {current} / {total}
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPage(current - 1)}
          disabled={prevDisabled}
        >
          이전으로
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPage(current + 1)}
          disabled={nextDisabled}
        >
          다음으로
        </Button>
      </div>
    </div>
  )
}

export default Pagination
