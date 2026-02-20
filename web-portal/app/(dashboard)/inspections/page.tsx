"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, MoreHorizontal, ClipboardList, CheckCircle2, Clock, AlertTriangle } from "lucide-react"
import { useState } from "react"

const inspections = [
  { id: "INS-201", property: "Oakwood Tower", type: "Fire Safety", inspector: "Alan Price", date: "15 Jan 2026", status: "Completed", result: "Pass" },
  { id: "INS-200", property: "Elm Court", type: "Gas Safety", inspector: "Sarah Banks", date: "22 Dec 2025", status: "Completed", result: "Pass" },
  { id: "INS-199", property: "Birch House", type: "Electrical", inspector: "Alan Price", date: "5 Nov 2025", status: "Completed", result: "Issues Found" },
  { id: "INS-198", property: "Cedar Lane", type: "General", inspector: "Maria Lopez", date: "30 Jan 2026", status: "Completed", result: "Pass" },
  { id: "INS-197", property: "Maple Gardens", type: "Fire Safety", inspector: "Alan Price", date: "8 Oct 2025", status: "Completed", result: "Issues Found" },
  { id: "INS-196", property: "Willow Court", type: "Gas Safety", inspector: "Sarah Banks", date: "2 Feb 2026", status: "Completed", result: "Pass" },
  { id: "INS-195", property: "Oakwood Tower", type: "Legionella", inspector: "Maria Lopez", date: "20 Feb 2026", status: "Scheduled", result: "-" },
  { id: "INS-194", property: "Birch House", type: "Structural", inspector: "Alan Price", date: "25 Feb 2026", status: "Scheduled", result: "-" },
  { id: "INS-193", property: "Elm Court", type: "Electrical", inspector: "Sarah Banks", date: "1 Mar 2026", status: "Scheduled", result: "-" },
  { id: "INS-192", property: "Maple Gardens", type: "General", inspector: "Maria Lopez", date: "28 Feb 2026", status: "Overdue", result: "-" },
]

const stats = [
  { label: "Total Inspections", value: 10, icon: ClipboardList, color: "text-primary" },
  { label: "Completed", value: 6, icon: CheckCircle2, color: "text-accent" },
  { label: "Scheduled", value: 3, icon: Clock, color: "text-chart-3" },
  { label: "Overdue", value: 1, icon: AlertTriangle, color: "text-destructive" },
]

export default function InspectionsPage() {
  const [search, setSearch] = useState("")

  const filtered = inspections.filter(
    (i) =>
      i.property.toLowerCase().includes(search.toLowerCase()) ||
      i.type.toLowerCase().includes(search.toLowerCase()) ||
      i.inspector.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <DashboardHeader
        title="Inspections"
        description="Schedule and track property inspections and compliance checks"
        actionLabel="Schedule Inspection"
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-3 p-4">
              <s.icon className={`h-5 w-5 ${s.color}`} />
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="px-0 pb-0 pt-0">
          <div className="flex items-center gap-2 border-b px-6 py-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by property, type, or inspector..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 pl-9 text-sm"
                aria-label="Search inspections"
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6">ID</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Inspector</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Result</TableHead>
                <TableHead className="w-12 pr-6"><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((i) => (
                <TableRow key={i.id}>
                  <TableCell className="pl-6 font-mono text-xs font-medium text-muted-foreground">{i.id}</TableCell>
                  <TableCell className="font-medium text-foreground">{i.property}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{i.type}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{i.inspector}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{i.date}</TableCell>
                  <TableCell>
                    <Badge className={
                      i.status === "Completed" ? "border-accent/20 bg-accent/10 text-accent hover:bg-accent/10" :
                      i.status === "Scheduled" ? "border-primary/20 bg-primary/10 text-primary hover:bg-primary/10" :
                      "border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/10"
                    }>
                      {i.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {i.result === "-" ? (
                      <span className="text-sm text-muted-foreground">-</span>
                    ) : (
                      <Badge className={
                        i.result === "Pass" ? "border-accent/20 bg-accent text-accent-foreground hover:bg-accent" :
                        "border-chart-3/20 bg-chart-3/10 text-chart-3 hover:bg-chart-3/10"
                      }>
                        {i.result}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="pr-6">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" aria-label={`Actions for ${i.id}`}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">No inspections found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between border-t px-6 py-3">
            <p className="text-sm text-muted-foreground">Showing {filtered.length} of {inspections.length} inspections</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
