import { DashboardHeader } from "@/components/dashboard-header"
import { SummaryCards } from "@/components/summary-cards"
import { MaintenanceTable } from "@/components/maintenance-table"

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader
        title="Maintenance Overview"
        description="Track, manage, and resolve property maintenance requests"
        actionLabel="New Request"
      />
      <SummaryCards />
      <MaintenanceTable />
    </>
  )
}
