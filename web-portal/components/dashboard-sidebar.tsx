"use client"

import { cn } from "@/lib/utils"
import {
  Building2,
  ClipboardList,
  Home,
  Users,
  Wrench,
  Settings,
  BarChart3,
  Bell,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { label: "Dashboard", icon: Home, href: "/" },
  { label: "Maintenance", icon: Wrench, href: "/maintenance" },
  { label: "Tenants", icon: Users, href: "/tenants" },
  { label: "Properties", icon: Building2, href: "/properties" },
  { label: "Inspections", icon: ClipboardList, href: "/inspections" },
  { label: "Reports", icon: BarChart3, href: "/reports" },
  { label: "Notifications", icon: Bell, href: "/notifications", badge: 3 },
]

const bottomNavItems = [
  { label: "Settings", icon: Settings, href: "/settings" },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground md:flex">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
          <Building2 className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-sidebar-foreground">
            Nexus
          </h1>
          <p className="text-xs text-sidebar-foreground/60">Admin Portal</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4" aria-label="Main navigation">
        <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/40">
          Main Menu
        </p>
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-semibold text-destructive-foreground">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-sidebar-border px-3 py-4">
        <ul className="flex flex-col gap-1">
          {bottomNavItems.map((item) => {
            const active = isActive(item.href)
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              </li>
            )
          })}
          <li>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground">
              <LogOut className="h-4 w-4 shrink-0" />
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </aside>
  )
}
