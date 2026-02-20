"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, MoreHorizontal } from "lucide-react"
import { useState } from "react"

type UrgencyLevel = "High" | "Low"
type RequestStatus = "Open" | "In Progress" | "Resolved" | "Pending"

interface MaintenanceRequest {
  id: string
  tenantName: string
  issue: string
  urgency: UrgencyLevel
  status: RequestStatus
  date: string
}

const requests: MaintenanceRequest[] = [
  {
    id: "MR-1042",
    tenantName: "Sarah Mitchell",
    issue: "Boiler Leak",
    urgency: "High",
    status: "Open",
    date: "12 Feb 2026",
  },
  {
    id: "MR-1041",
    tenantName: "James Okafor",
    issue: "Broken Window Latch",
    urgency: "Low",
    status: "In Progress",
    date: "11 Feb 2026",
  },
  {
    id: "MR-1040",
    tenantName: "Priya Sharma",
    issue: "Damp Patch on Ceiling",
    urgency: "High",
    status: "Pending",
    date: "10 Feb 2026",
  },
  {
    id: "MR-1039",
    tenantName: "David Kowalski",
    issue: "Front Door Lock Jammed",
    urgency: "High",
    status: "In Progress",
    date: "10 Feb 2026",
  },
  {
    id: "MR-1038",
    tenantName: "Amina Diallo",
    issue: "Kitchen Tap Dripping",
    urgency: "Low",
    status: "Resolved",
    date: "9 Feb 2026",
  },
  {
    id: "MR-1037",
    tenantName: "Tom Henderson",
    issue: "Radiator Not Heating",
    urgency: "Low",
    status: "Open",
    date: "8 Feb 2026",
  },
  {
    id: "MR-1036",
    tenantName: "Mei Lin Chen",
    issue: "Electrical Socket Sparking",
    urgency: "High",
    status: "Open",
    date: "8 Feb 2026",
  },
  {
    id: "MR-1035",
    tenantName: "Robert Adeyemi",
    issue: "Blocked Drain",
    urgency: "Low",
    status: "In Progress",
    date: "7 Feb 2026",
  },
  {
    id: "MR-1034",
    tenantName: "Claire Dubois",
    issue: "Cracked Bathroom Tile",
    urgency: "Low",
    status: "Pending",
    date: "6 Feb 2026",
  },
  {
    id: "MR-1033",
    tenantName: "Michael Reeves",
    issue: "Gas Smell in Kitchen",
    urgency: "High",
    status: "In Progress",
    date: "5 Feb 2026",
  },
]

function getUrgencyBadge(urgency: UrgencyLevel) {
  if (urgency === "High") {
    return (
      <Badge className="border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/10">
        High
      </Badge>
    )
  }
  return (
    <Badge className="border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
      Low
    </Badge>
  )
}

function getStatusBadge(status: RequestStatus) {
  switch (status) {
    case "Open":
      return (
        <Badge variant="outline" className="border-foreground/20 text-foreground">
          Open
        </Badge>
      )
    case "In Progress":
      return (
        <Badge className="border-accent/20 bg-accent/10 text-accent hover:bg-accent/10">
          In Progress
        </Badge>
      )
    case "Resolved":
      return (
        <Badge className="border-accent/30 bg-accent text-accent-foreground hover:bg-accent">
          Resolved
        </Badge>
      )
    case "Pending":
      return (
        <Badge className="border-chart-3/20 bg-chart-3/10 text-chart-3 hover:bg-chart-3/10">
          Pending
        </Badge>
      )
  }
}

export function MaintenanceTable() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRequests = requests.filter(
    (req) =>
      req.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 space-y-0 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-lg font-semibold text-foreground">
          Maintenance Requests
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-64 pl-9 text-sm"
              aria-label="Search maintenance requests"
            />
          </div>
          <Button variant="outline" size="sm" className="h-9 gap-1.5">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6">ID</TableHead>
              <TableHead>Tenant Name</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Urgency</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12 pr-6">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="pl-6 font-mono text-xs font-medium text-muted-foreground">
                  {request.id}
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  {request.tenantName}
                </TableCell>
                <TableCell className="text-foreground">
                  {request.issue}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {request.date}
                </TableCell>
                <TableCell>{getUrgencyBadge(request.urgency)}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell className="pr-6">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground"
                    aria-label={`Actions for request ${request.id}`}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredRequests.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  No matching requests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between border-t px-6 py-3">
          <p className="text-sm text-muted-foreground">
            Showing {filteredRequests.length} of {requests.length} requests
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
