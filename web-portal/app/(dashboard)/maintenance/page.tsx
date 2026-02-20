"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MoreHorizontal, Wrench, Clock, CheckCircle2, AlertTriangle } from "lucide-react"
import { useState } from "react"

const allRequests = [
  { id: "MR-1042", tenant: "Sarah Mitchell", unit: "12A", issue: "Boiler Leak", category: "Plumbing", urgency: "High" as const, status: "Open" as const, date: "12 Feb 2026", assignee: "Mike Torres" },
  { id: "MR-1041", tenant: "James Okafor", unit: "7B", issue: "Broken Window Latch", category: "General", urgency: "Low" as const, status: "In Progress" as const, date: "11 Feb 2026", assignee: "Lisa Wong" },
  { id: "MR-1040", tenant: "Priya Sharma", unit: "3C", issue: "Damp Patch on Ceiling", category: "Structural", urgency: "High" as const, status: "Pending" as const, date: "10 Feb 2026", assignee: "Unassigned" },
  { id: "MR-1039", tenant: "David Kowalski", unit: "15D", issue: "Front Door Lock Jammed", category: "Security", urgency: "High" as const, status: "In Progress" as const, date: "10 Feb 2026", assignee: "Mike Torres" },
  { id: "MR-1038", tenant: "Amina Diallo", unit: "9A", issue: "Kitchen Tap Dripping", category: "Plumbing", urgency: "Low" as const, status: "Resolved" as const, date: "9 Feb 2026", assignee: "Lisa Wong" },
  { id: "MR-1037", tenant: "Tom Henderson", unit: "2B", issue: "Radiator Not Heating", category: "Heating", urgency: "Low" as const, status: "Open" as const, date: "8 Feb 2026", assignee: "Unassigned" },
  { id: "MR-1036", tenant: "Mei Lin Chen", unit: "11C", issue: "Electrical Socket Sparking", category: "Electrical", urgency: "High" as const, status: "Open" as const, date: "8 Feb 2026", assignee: "Unassigned" },
  { id: "MR-1035", tenant: "Robert Adeyemi", unit: "5A", issue: "Blocked Drain", category: "Plumbing", urgency: "Low" as const, status: "In Progress" as const, date: "7 Feb 2026", assignee: "Mike Torres" },
  { id: "MR-1034", tenant: "Claire Dubois", unit: "8D", issue: "Cracked Bathroom Tile", category: "General", urgency: "Low" as const, status: "Pending" as const, date: "6 Feb 2026", assignee: "Lisa Wong" },
  { id: "MR-1033", tenant: "Michael Reeves", unit: "14B", issue: "Gas Smell in Kitchen", category: "Gas", urgency: "High" as const, status: "In Progress" as const, date: "5 Feb 2026", assignee: "Mike Torres" },
  { id: "MR-1032", tenant: "Emma Watson", unit: "6A", issue: "Leaking Roof", category: "Structural", urgency: "High" as const, status: "Open" as const, date: "4 Feb 2026", assignee: "Unassigned" },
  { id: "MR-1031", tenant: "Ali Hassan", unit: "10C", issue: "Broken Intercom", category: "Electrical", urgency: "Low" as const, status: "Resolved" as const, date: "3 Feb 2026", assignee: "Lisa Wong" },
]

const stats = [
  { label: "Open", value: 4, icon: AlertTriangle, color: "text-destructive" },
  { label: "In Progress", value: 4, icon: Wrench, color: "text-primary" },
  { label: "Pending", value: 2, icon: Clock, color: "text-chart-3" },
  { label: "Resolved", value: 2, icon: CheckCircle2, color: "text-accent" },
]

export default function MaintenancePage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filtered = allRequests.filter((r) => {
    const matchSearch =
      r.tenant.toLowerCase().includes(search.toLowerCase()) ||
      r.issue.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "all" || r.status.toLowerCase().replace(" ", "-") === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <>
      <DashboardHeader
        title="Maintenance Requests"
        description="View and manage all property maintenance requests"
        actionLabel="New Request"
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

      <Tabs defaultValue="all" className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setStatusFilter("all")}>All</TabsTrigger>
            <TabsTrigger value="open" onClick={() => setStatusFilter("open")}>Open</TabsTrigger>
            <TabsTrigger value="in-progress" onClick={() => setStatusFilter("in-progress")}>In Progress</TabsTrigger>
            <TabsTrigger value="resolved" onClick={() => setStatusFilter("resolved")}>Resolved</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search requests..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-64 pl-9 text-sm"
                aria-label="Search maintenance requests"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="h-9 w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="structural">Structural</SelectItem>
                <SelectItem value="heating">Heating</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <RequestTable requests={filtered} />
        </TabsContent>
        <TabsContent value="open" className="mt-0">
          <RequestTable requests={filtered} />
        </TabsContent>
        <TabsContent value="in-progress" className="mt-0">
          <RequestTable requests={filtered} />
        </TabsContent>
        <TabsContent value="resolved" className="mt-0">
          <RequestTable requests={filtered} />
        </TabsContent>
      </Tabs>
    </>
  )
}

function RequestTable({ requests }: { requests: typeof allRequests }) {
  return (
    <Card>
      <CardContent className="px-0 pb-0 pt-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6">ID</TableHead>
              <TableHead>Tenant</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Urgency</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead className="w-12 pr-6"><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="pl-6 font-mono text-xs font-medium text-muted-foreground">{r.id}</TableCell>
                <TableCell className="font-medium text-foreground">{r.tenant}</TableCell>
                <TableCell className="text-muted-foreground">{r.unit}</TableCell>
                <TableCell className="text-foreground">{r.issue}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">{r.category}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={r.urgency === "High" ? "border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/10" : "border-primary/20 bg-primary/10 text-primary hover:bg-primary/10"}>
                    {r.urgency}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={
                    r.status === "Open" ? "border-foreground/20 bg-foreground/5 text-foreground hover:bg-foreground/5" :
                    r.status === "In Progress" ? "border-primary/20 bg-primary/10 text-primary hover:bg-primary/10" :
                    r.status === "Resolved" ? "border-accent/20 bg-accent text-accent-foreground hover:bg-accent" :
                    "border-chart-3/20 bg-chart-3/10 text-chart-3 hover:bg-chart-3/10"
                  }>
                    {r.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{r.assignee}</TableCell>
                <TableCell className="pr-6">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" aria-label={`Actions for ${r.id}`}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {requests.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">No requests found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between border-t px-6 py-3">
          <p className="text-sm text-muted-foreground">Showing {requests.length} of {allRequests.length} requests</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
