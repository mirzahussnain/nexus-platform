"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, TrendingDown, Download, FileText, PieChart, Activity } from "lucide-react"

const monthlyData = [
  { month: "Sep", requests: 28, resolved: 25 },
  { month: "Oct", requests: 35, resolved: 30 },
  { month: "Nov", requests: 22, resolved: 20 },
  { month: "Dec", requests: 40, resolved: 32 },
  { month: "Jan", requests: 38, resolved: 35 },
  { month: "Feb", requests: 32, resolved: 18 },
]

const categoryBreakdown = [
  { category: "Plumbing", count: 42, percentage: 30 },
  { category: "Electrical", count: 28, percentage: 20 },
  { category: "Structural", count: 21, percentage: 15 },
  { category: "Heating", count: 25, percentage: 18 },
  { category: "General", count: 14, percentage: 10 },
  { category: "Security", count: 12, percentage: 7 },
]

const reports = [
  { name: "Monthly Maintenance Summary", date: "Feb 2026", type: "Maintenance" },
  { name: "Quarterly Financial Report", date: "Q4 2025", type: "Financial" },
  { name: "Annual Inspection Compliance", date: "2025", type: "Compliance" },
  { name: "Tenant Satisfaction Survey", date: "Jan 2026", type: "Survey" },
  { name: "Property Portfolio Review", date: "Q4 2025", type: "Portfolio" },
]

export default function ReportsPage() {
  const maxRequests = Math.max(...monthlyData.map((d) => d.requests))

  return (
    <>
      <DashboardHeader
        title="Reports"
        description="Analytics and reporting across all properties and operations"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <TrendingDown className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Resolution Time</p>
              <p className="text-2xl font-bold text-foreground">3.8 days</p>
              <p className="text-xs font-medium text-accent">-12% vs last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/10">
              <TrendingUp className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
              <p className="text-2xl font-bold text-foreground">87%</p>
              <p className="text-xs font-medium text-accent">+5% vs last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-chart-3/10">
              <Activity className="h-5 w-5 text-chart-3" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tenant Satisfaction</p>
              <p className="text-2xl font-bold text-foreground">4.2/5</p>
              <p className="text-xs font-medium text-muted-foreground">Based on 86 reviews</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-4 w-4 text-primary" />
              Monthly Request Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {monthlyData.map((d) => (
                <div key={d.month} className="flex items-center gap-3">
                  <span className="w-8 text-xs font-medium text-muted-foreground">{d.month}</span>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="h-3 rounded-sm bg-primary/80" style={{ width: `${(d.requests / maxRequests) * 100}%` }} />
                      <span className="text-xs font-medium text-foreground">{d.requests}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 rounded-sm bg-accent/80" style={{ width: `${(d.resolved / maxRequests) * 100}%` }} />
                      <span className="text-xs font-medium text-muted-foreground">{d.resolved}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-sm bg-primary/80" />
                  <span className="text-xs text-muted-foreground">Submitted</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-sm bg-accent/80" />
                  <span className="text-xs text-muted-foreground">Resolved</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <PieChart className="h-4 w-4 text-primary" />
              Issues by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {categoryBreakdown.map((c) => (
                <div key={c.category} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{c.category}</span>
                    <span className="text-sm text-muted-foreground">{c.count} ({c.percentage}%)</span>
                  </div>
                  <Progress value={c.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4 text-primary" />
            Generated Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {reports.map((r) => (
              <div key={r.name} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.date} &middot; {r.type}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                  <Download className="h-3.5 w-3.5" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
