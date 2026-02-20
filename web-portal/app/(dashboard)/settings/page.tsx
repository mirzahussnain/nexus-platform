"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Bell, Shield, User } from "lucide-react"

export default function SettingsPage() {
  return (
    <>
      <DashboardHeader
        title="Settings"
        description="Manage your account, notifications, and system preferences"
      />

      <Tabs defaultValue="profile" className="flex flex-col gap-6">
        <TabsList className="self-start">
          <TabsTrigger value="profile" className="gap-1.5">
            <User className="h-3.5 w-3.5" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5">
            <Bell className="h-3.5 w-3.5" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="organisation" className="gap-1.5">
            <Building2 className="h-3.5 w-3.5" />
            Organisation
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5">
            <Shield className="h-3.5 w-3.5" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-0 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile Information</CardTitle>
              <CardDescription>Update your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">JD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">Change Photo</Button>
                  <p className="mt-1 text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@oakwood-ha.org" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" defaultValue="+44 7700 900000" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="admin">
                    <SelectTrigger id="role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="manager">Property Manager</SelectItem>
                      <SelectItem value="officer">Housing Officer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" defaultValue="Property Management" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button size="sm">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-0 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to receive updates</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              {[
                { label: "Emergency Alerts", desc: "Get immediate alerts for high-priority maintenance issues", defaultChecked: true },
                { label: "New Requests", desc: "Notify when a new maintenance request is submitted", defaultChecked: true },
                { label: "Status Updates", desc: "Get notified when request statuses change", defaultChecked: true },
                { label: "Inspection Reminders", desc: "Reminders for upcoming property inspections", defaultChecked: true },
                { label: "Lease Notifications", desc: "Alerts for upcoming lease expirations and renewals", defaultChecked: false },
                { label: "Weekly Digest", desc: "Receive a weekly summary of all activities", defaultChecked: false },
              ].map((pref) => (
                <div key={pref.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{pref.label}</p>
                    <p className="text-xs text-muted-foreground">{pref.desc}</p>
                  </div>
                  <Switch defaultChecked={pref.defaultChecked} aria-label={pref.label} />
                </div>
              ))}
              <div className="flex justify-end">
                <Button size="sm">Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organisation" className="mt-0 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Organisation Details</CardTitle>
              <CardDescription>Manage your housing association settings</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="orgName">Organisation Name</Label>
                  <Input id="orgName" defaultValue="Oakwood Housing Association" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="regNumber">Registration Number</Label>
                  <Input id="regNumber" defaultValue="HA-2024-0042" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="orgAddress">Address</Label>
                  <Input id="orgAddress" defaultValue="42 Oakwood Lane, London E1 6AN" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="orgEmail">Contact Email</Label>
                  <Input id="orgEmail" type="email" defaultValue="admin@oakwood-ha.org" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="sla">Default SLA (hours)</Label>
                  <Select defaultValue="24">
                    <SelectTrigger id="sla">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4 hours (Emergency)</SelectItem>
                      <SelectItem value="24">24 hours (Standard)</SelectItem>
                      <SelectItem value="72">72 hours (Low Priority)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="gmt">
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gmt">GMT (London)</SelectItem>
                      <SelectItem value="cet">CET (Paris)</SelectItem>
                      <SelectItem value="est">EST (New York)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button size="sm">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-0 flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex max-w-md flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button size="sm">Update Password</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Enable 2FA</p>
                  <p className="text-xs text-muted-foreground">Secure your account with authenticator app verification</p>
                </div>
                <Switch aria-label="Enable two-factor authentication" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
