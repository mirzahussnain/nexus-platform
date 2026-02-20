import { Card, CardContent } from "@/components/ui/card"
import { ClipboardList, AlertTriangle, Clock } from "lucide-react"

const stats = [
  {
    label: "Total Issues",
    value: "142",
    change: "+12 this month",
    trend: "up" as const,
    icon: ClipboardList,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    label: "Emergency Repairs",
    value: "8",
    change: "3 unassigned",
    trend: "alert" as const,
    icon: AlertTriangle,
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
  },
  {
    label: "Avg Response Time",
    value: "4.2h",
    change: "-0.8h vs last month",
    trend: "down" as const,
    icon: Clock,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
  },
]

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="relative overflow-hidden">
          <CardContent className="flex items-start gap-4 p-5">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${stat.iconBg}`}
            >
              <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                {stat.value}
              </p>
              <p
                className={`mt-1 text-xs font-medium ${
                  stat.trend === "alert"
                    ? "text-destructive"
                    : stat.trend === "down"
                      ? "text-accent"
                      : "text-muted-foreground"
                }`}
              >
                {stat.change}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
