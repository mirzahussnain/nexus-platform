"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  ClipboardList,
  Info,
  MessageSquare,
  Wrench,
  X,
} from "lucide-react"
import { useState } from "react"

interface Notification {
  id: string
  type: "urgent" | "info" | "success" | "message"
  title: string
  description: string
  time: string
  read: boolean
}

const initialNotifications: Notification[] = [
  { id: "N-1", type: "urgent", title: "Emergency: Gas Smell Reported", description: "Michael Reeves (Unit 14B, Oakwood Tower) has reported a gas smell in the kitchen. Immediate action required.", time: "2 hours ago", read: false },
  { id: "N-2", type: "urgent", title: "Boiler Leak - High Priority", description: "Sarah Mitchell (Unit 12A) reported a boiler leak. Contractor needs to be dispatched urgently.", time: "4 hours ago", read: false },
  { id: "N-3", type: "message", title: "Tenant Message: David Kowalski", description: "Hi, just following up on the front door lock repair. Any update on when the contractor will arrive?", time: "5 hours ago", read: false },
  { id: "N-4", type: "info", title: "Inspection Scheduled", description: "Legionella inspection for Oakwood Tower has been scheduled for 20 Feb 2026 with inspector Maria Lopez.", time: "1 day ago", read: true },
  { id: "N-5", type: "success", title: "Request Resolved: MR-1038", description: "Kitchen Tap Dripping for Amina Diallo has been marked as resolved by contractor Lisa Wong.", time: "1 day ago", read: true },
  { id: "N-6", type: "info", title: "Lease Expiring: David Kowalski", description: "Lease for Unit 15D (Birch House) expires in 30 days. Send renewal notice.", time: "2 days ago", read: true },
  { id: "N-7", type: "success", title: "Request Resolved: MR-1031", description: "Broken Intercom for Ali Hassan has been marked as resolved by contractor Lisa Wong.", time: "3 days ago", read: true },
  { id: "N-8", type: "info", title: "New Tenant Application", description: "New tenant application received for Unit 6B at Elm Court. Review and approve.", time: "3 days ago", read: true },
  { id: "N-9", type: "urgent", title: "Overdue Inspection: Maple Gardens", description: "General inspection for Maple Gardens was due on 28 Feb 2026 and has not been completed.", time: "4 days ago", read: true },
  { id: "N-10", type: "message", title: "Contractor Update: Mike Torres", description: "Completed the front door lock repair for Unit 15D. Awaiting tenant confirmation.", time: "5 days ago", read: true },
]

const iconMap = {
  urgent: AlertTriangle,
  info: Info,
  success: CheckCircle2,
  message: MessageSquare,
}

const colorMap = {
  urgent: "text-destructive bg-destructive/10",
  info: "text-primary bg-primary/10",
  success: "text-accent bg-accent/10",
  message: "text-chart-3 bg-chart-3/10",
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [tab, setTab] = useState("all")

  const unreadCount = notifications.filter((n) => !n.read).length

  const filtered = notifications.filter((n) => {
    if (tab === "unread") return !n.read
    if (tab === "urgent") return n.type === "urgent"
    return true
  })

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function dismiss(id: string) {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  function markRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  return (
    <>
      <DashboardHeader
        title="Notifications"
        description="Stay updated on maintenance requests, inspections, and tenant communications"
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Bell className="h-5 w-5 text-primary" />
            <div>
              <p className="text-2xl font-bold text-foreground">{notifications.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Info className="h-5 w-5 text-chart-3" />
            <div>
              <p className="text-2xl font-bold text-foreground">{unreadCount}</p>
              <p className="text-xs text-muted-foreground">Unread</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <div>
              <p className="text-2xl font-bold text-foreground">{notifications.filter((n) => n.type === "urgent").length}</p>
              <p className="text-xs text-muted-foreground">Urgent</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <MessageSquare className="h-5 w-5 text-accent" />
            <div>
              <p className="text-2xl font-bold text-foreground">{notifications.filter((n) => n.type === "message").length}</p>
              <p className="text-xs text-muted-foreground">Messages</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge className="ml-1.5 h-5 min-w-5 bg-destructive px-1 text-[10px] text-destructive-foreground hover:bg-destructive">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="urgent">Urgent</TabsTrigger>
          </TabsList>
        </Tabs>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {filtered.map((n) => {
          const Icon = iconMap[n.type]
          return (
            <Card key={n.id} className={`transition-colors ${!n.read ? "border-primary/30 bg-primary/[0.02]" : ""}`}>
              <CardContent className="flex items-start gap-4 p-4">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colorMap[n.type]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1" role="button" tabIndex={0} onClick={() => markRead(n.id)} onKeyDown={(e) => e.key === "Enter" && markRead(n.id)}>
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-semibold ${!n.read ? "text-foreground" : "text-foreground/80"}`}>{n.title}</p>
                    {!n.read && <div className="h-2 w-2 rounded-full bg-primary" />}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">{n.description}</p>
                  <p className="mt-1.5 text-xs text-muted-foreground/70">{n.time}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 text-muted-foreground" onClick={() => dismiss(n.id)} aria-label="Dismiss notification">
                  <X className="h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
        {filtered.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-8 w-8 text-muted-foreground/40" />
              <p className="mt-3 text-sm font-medium text-muted-foreground">No notifications</p>
              <p className="mt-1 text-xs text-muted-foreground/70">{"You're all caught up!"}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
