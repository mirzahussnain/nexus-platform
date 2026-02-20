"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, MoreHorizontal, Users, UserCheck, UserX, Phone } from "lucide-react"
import { useState } from "react"

const tenants = [
  { id: "T-001", name: "Sarah Mitchell", email: "sarah.m@email.com", phone: "+44 7700 900123", unit: "12A", property: "Oakwood Tower", lease: "Active", moveIn: "15 Mar 2024", rent: "1,250" },
  { id: "T-002", name: "James Okafor", email: "j.okafor@email.com", phone: "+44 7700 900456", unit: "7B", property: "Elm Court", lease: "Active", moveIn: "1 Jun 2023", rent: "980" },
  { id: "T-003", name: "Priya Sharma", email: "priya.s@email.com", phone: "+44 7700 900789", unit: "3C", property: "Oakwood Tower", lease: "Active", moveIn: "22 Sep 2024", rent: "1,100" },
  { id: "T-004", name: "David Kowalski", email: "d.kowalski@email.com", phone: "+44 7700 901234", unit: "15D", property: "Birch House", lease: "Expiring", moveIn: "10 Jan 2023", rent: "1,450" },
  { id: "T-005", name: "Amina Diallo", email: "amina.d@email.com", phone: "+44 7700 901567", unit: "9A", property: "Elm Court", lease: "Active", moveIn: "5 Aug 2024", rent: "920" },
  { id: "T-006", name: "Tom Henderson", email: "tom.h@email.com", phone: "+44 7700 901890", unit: "2B", property: "Oakwood Tower", lease: "Active", moveIn: "18 Nov 2023", rent: "1,180" },
  { id: "T-007", name: "Mei Lin Chen", email: "mei.chen@email.com", phone: "+44 7700 902123", unit: "11C", property: "Birch House", lease: "Active", moveIn: "3 Apr 2024", rent: "1,300" },
  { id: "T-008", name: "Robert Adeyemi", email: "r.adeyemi@email.com", phone: "+44 7700 902456", unit: "5A", property: "Cedar Lane", lease: "Expired", moveIn: "14 Feb 2022", rent: "875" },
  { id: "T-009", name: "Claire Dubois", email: "c.dubois@email.com", phone: "+44 7700 902789", unit: "8D", property: "Cedar Lane", lease: "Active", moveIn: "27 Jul 2024", rent: "950" },
  { id: "T-010", name: "Michael Reeves", email: "m.reeves@email.com", phone: "+44 7700 903012", unit: "14B", property: "Oakwood Tower", lease: "Expiring", moveIn: "9 Dec 2023", rent: "1,380" },
]

const stats = [
  { label: "Total Tenants", value: 10, icon: Users, color: "text-primary" },
  { label: "Active Leases", value: 7, icon: UserCheck, color: "text-accent" },
  { label: "Expiring Soon", value: 2, icon: Phone, color: "text-chart-3" },
  { label: "Expired", value: 1, icon: UserX, color: "text-destructive" },
]

export default function TenantsPage() {
  const [search, setSearch] = useState("")

  const filtered = tenants.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.unit.toLowerCase().includes(search.toLowerCase()) ||
      t.property.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <DashboardHeader
        title="Tenants"
        description="Manage tenant records, leases, and contact information"
        actionLabel="Add Tenant"
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
                placeholder="Search tenants by name, email, unit..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 pl-9 text-sm"
                aria-label="Search tenants"
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-6">Tenant</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>{'Rent (pcm)'}</TableHead>
                <TableHead>Lease</TableHead>
                <TableHead>Move-in</TableHead>
                <TableHead className="w-12 pr-6"><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                          {t.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-foreground">{t.unit}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{t.property}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{t.phone}</TableCell>
                  <TableCell className="text-sm font-medium text-foreground">{"£"}{t.rent}</TableCell>
                  <TableCell>
                    <Badge className={
                      t.lease === "Active" ? "border-accent/20 bg-accent/10 text-accent hover:bg-accent/10" :
                      t.lease === "Expiring" ? "border-chart-3/20 bg-chart-3/10 text-chart-3 hover:bg-chart-3/10" :
                      "border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/10"
                    }>
                      {t.lease}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{t.moveIn}</TableCell>
                  <TableCell className="pr-6">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" aria-label={`Actions for ${t.name}`}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">No tenants found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between border-t px-6 py-3">
            <p className="text-sm text-muted-foreground">Showing {filtered.length} of {tenants.length} tenants</p>
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
