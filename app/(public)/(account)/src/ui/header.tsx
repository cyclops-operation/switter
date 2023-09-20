export interface AccountHeaderProps {
  title: React.ReactNode
  description?: React.ReactNode
}

const AccountHeader = ({ title, description }: AccountHeaderProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="break-keep text-5xl font-bold text-zinc-600 dark:text-zinc-300">
        {title}
      </h1>
      {description ? (
        <p className="whitespace-pre-line break-keep text-lg text-zinc-400 dark:text-zinc-500">
          {description}
        </p>
      ) : null}
    </div>
  )
}

export default AccountHeader
