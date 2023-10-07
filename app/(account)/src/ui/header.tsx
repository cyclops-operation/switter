import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export interface AccountHeaderProps {
  title: React.ReactNode
  description?: React.ReactNode
}

export default function AccountHeader({
  title,
  description,
}: AccountHeaderProps) {
  return (
    <CardHeader>
      <CardTitle>{title}</CardTitle>

      {description ? (
        <CardDescription className="whitespace-pre-line break-keep">
          {description}
        </CardDescription>
      ) : null}
    </CardHeader>
  )
}
