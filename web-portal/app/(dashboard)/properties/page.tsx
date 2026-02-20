"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Building2, MapPin, Users, Wrench, MoreHorizontal } from "lucide-react"

const properties = [
  {
    id: "P-001",
    name: "Oakwood Tower",
    address: "42 Oakwood Lane, London E1 6AN",
    type: "High-Rise",
    units: 48,
    occupied: 45,
    openIssues: 6,
    lastInspection: "15 Jan 2026",
    status: "Good",
  },
  {
    id: "P-002",
    name: "Elm Court",
    address: "18 Elm Street, London SE15 3PQ",
    type: "Low-Rise",
    units: 24,
    occupied: 22,
    openIssues: 3,
    lastInspection: "22 Dec 2025",
    status: "Good",
  },
  {
    id: "P-003",
    name: "Birch House",
    address: "7 Birch Road, London N1 8JT",
    type: "Mid-Rise",
    units: 36,
    occupied: 34,
    openIssues: 8,
    lastInspection: "5 Nov 2025",
    status: "Needs Attention",
  },
  {
    id: "P-004",
    name: "Cedar Lane",
    address: "91 Cedar Lane, London SW9 7HG",
    type: "Terraced",
    units: 12,
    occupied: 10,
    openIssues: 2,
    lastInspection: "30 Jan 2026",
    status: "Good",
  },
  {
    id: "P-005",
    name: "Maple Gardens",
    address: "55 Maple Avenue, London W3 6RP",
    type: "Low-Rise",
    units: 20,
    occupied: 18,
    openIssues: 5,
    lastInspection: "8 Oct 2025",
    status: "Needs Attention",
  },
  {
    id: "P-006",
    name: "Willow Court",
    address: "3 Willow Close, London E14 2BN",
    type: "Mid-Rise",
    units: 30,
    occupied: 29,
    openIssues: 1,
    lastInspection: "2 Feb 2026",
    status: "Excellent",
  },
]

const totalUnits = properties.reduce((a, p) => a + p.units, 0)
const totalOccupied = properties.reduce((a, p) => a + p.occupied, 0)
const totalIssues = properties.reduce((a, p) => a + p.openIssues, 0)

export default function PropertiesPage() {
  return (
    <>
      <DashboardHeader
        title="Properties"
        description="Manage your housing association property portfolio"
        actionLabel="Add Property"
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Building2 className="h-5 w-5 text-primary" />
            <div>
              <p className="text-2xl font-bold text-foreground">{properties.length}</p>
              <p className="text-xs text-muted-foreground">Properties</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Users className="h-5 w-5 text-accent" />
            <div>
              <p className="text-2xl font-bold text-foreground">{totalUnits}</p>
              <p className="text-xs text-muted-foreground">Total Units</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Users className="h-5 w-5 text-chart-3" />
            <div>
              <p className="text-2xl font-bold text-foreground">{Math.round((totalOccupied / totalUnits) * 100)}%</p>
              <p className="text-xs text-muted-foreground">Occupancy Rate</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Wrench className="h-5 w-5 text-destructive" />
            <div>
              <p className="text-2xl font-bold text-foreground">{totalIssues}</p>
              <p className="text-xs text-muted-foreground">Open Issues</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {properties.map((property) => {
          const occupancyRate = Math.round((property.occupied / property.units) * 100)
          return (
            <Card key={property.id} className="flex flex-col">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                <div className="flex-1">
                  <CardTitle className="text-base font-semibold text-foreground">
                    {property.name}
                  </CardTitle>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {property.address}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-muted-foreground" aria-label={`Actions for ${property.name}`}>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">{property.type}</Badge>
                  <Badge className={
                    property.status === "Excellent" ? "border-accent/20 bg-accent text-accent-foreground hover:bg-accent" :
                    property.status === "Good" ? "border-accent/20 bg-accent/10 text-accent hover:bg-accent/10" :
                    "border-chart-3/20 bg-chart-3/10 text-chart-3 hover:bg-chart-3/10"
                  }>
                    {property.status}
                  </Badge>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Occupancy</span>
                    <span className="font-medium text-foreground">{property.occupied}/{property.units} units ({occupancyRate}%)</span>
                  </div>
                  <Progress value={occupancyRate} className="h-2" />
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3 border-t pt-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Open Issues</p>
                    <p className="text-sm font-semibold text-foreground">{property.openIssues}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Last Inspection</p>
                    <p className="text-sm font-semibold text-foreground">{property.lastInspection}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}
