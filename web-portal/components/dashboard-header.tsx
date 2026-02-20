import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface DashboardHeaderProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function DashboardHeader({
  title,
  description,
  actionLabel,
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">
          {title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {actionLabel && (
        <Button className="gap-2 self-start sm:self-auto" size="sm">
          <Plus className="h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </header>
  )
}
