"use client"

import { useState } from "react"
import Link from "next/link"
import { Sidebar } from "@/components/navigation/sidebar"
import { Header } from "@/components/navigation/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Users, Stethoscope, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

// Mock staff data
const staffMembers = [
  {
    id: "S001",
    name: "Dr. Sarah Smith",
    role: "Chief Medical Officer",
    department: "Cardiology",
    email: "sarah.smith@hospital.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    shift: "Day",
    avatar: "/caring-doctor.png",
    specialization: "Interventional Cardiology",
    experience: "15 years",
    availability: "Available",
    lastSeen: "Online now",
  },
  {
    id: "S002",
    name: "Dr. Michael Brown",
    role: "Senior Physician",
    department: "Endocrinology",
    email: "michael.brown@hospital.com",
    phone: "+1 (555) 234-5678",
    status: "Active",
    shift: "Day",
    avatar: "/caring-doctor.png",
    specialization: "Diabetes & Metabolism",
    experience: "12 years",
    availability: "In Surgery",
    lastSeen: "2 hours ago",
  },
  {
    id: "S003",
    name: "Dr. Lisa Johnson",
    role: "Neurologist",
    department: "Neurology",
    email: "lisa.johnson@hospital.com",
    phone: "+1 (555) 345-6789",
    status: "Active",
    shift: "Night",
    avatar: "/caring-doctor.png",
    specialization: "Stroke & Cerebrovascular",
    experience: "10 years",
    availability: "Available",
    lastSeen: "30 minutes ago",
  },
  {
    id: "S004",
    name: "Nurse Jennifer Wilson",
    role: "Head Nurse",
    department: "ICU",
    email: "jennifer.wilson@hospital.com",
    phone: "+1 (555) 456-7890",
    status: "Active",
    shift: "Day",
    avatar: "/caring-doctor.png",
    specialization: "Critical Care",
    experience: "8 years",
    availability: "Available",
    lastSeen: "15 minutes ago",
  },
  {
    id: "S005",
    name: "Dr. James Wilson",
    role: "Orthopedic Surgeon",
    department: "Orthopedics",
    email: "james.wilson@hospital.com",
    phone: "+1 (555) 567-8901",
    status: "On Leave",
    shift: "Day",
    avatar: "/caring-doctor.png",
    specialization: "Joint Replacement",
    experience: "18 years",
    availability: "On Leave",
    lastSeen: "3 days ago",
  },
]

const attendanceData = [
  { id: "S001", name: "Dr. Sarah Smith", status: "Present", checkIn: "08:00", checkOut: "-", hours: "8.5" },
  { id: "S002", name: "Dr. Michael Brown", status: "Present", checkIn: "07:30", checkOut: "-", hours: "9.0" },
  { id: "S003", name: "Dr. Lisa Johnson", status: "Off Duty", checkIn: "-", checkOut: "-", hours: "0" },
  { id: "S004", name: "Nurse Jennifer Wilson", status: "Present", checkIn: "08:15", checkOut: "-", hours: "8.25" },
  { id: "S005", name: "Dr. James Wilson", status: "On Leave", checkIn: "-", checkOut: "-", hours: "0" },
]

const stats = [
  { title: "Total Staff", value: "127", change: "+3%" },
  { title: "On Duty Today", value: "89", change: "+5%" },
  { title: "Available Now", value: "34", change: "-2%" },
  { title: "On Leave", value: "8", change: "+1%" },
]

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = departmentFilter === "all" || staff.department === departmentFilter
    const matchesStatus = statusFilter === "all" || staff.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available":
        return "text-green-600"
      case "In Surgery":
        return "text-red-600"
      case "On Leave":
        return "text-gray-500"
      default:
        return "text-yellow-600"
    }
  }

  const getAttendanceIcon = (status: string) => {
    switch (status) {
      case "Present":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Absent":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "On Leave":
        return <AlertCircle className="h-4 w-4 text-gray-500" />
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      <main className="md:ml-64 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Doctor & Staff Management</h1>
            <p className="text-muted-foreground">Manage hospital staff, schedules, and attendance</p>
          </div>
          <div className="flex gap-2">
            <Link href="/staff/schedule">
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Shift Planner
              </Button>
            </Link>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Staff
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="directory" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="directory" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Staff Directory
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Attendance Tracker
            </TabsTrigger>
          </TabsList>

          {/* Staff Directory Tab */}
          <TabsContent value="directory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Staff Directory</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search staff by name or role..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="Cardiology">Cardiology</SelectItem>
                      <SelectItem value="Endocrinology">Endocrinology</SelectItem>
                      <SelectItem value="Neurology">Neurology</SelectItem>
                      <SelectItem value="ICU">ICU</SelectItem>
                      <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="On Leave">On Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Staff Cards Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredStaff.map((staff) => (
                    <Card key={staff.id} className="transition-all hover:shadow-md hover:scale-[1.02] cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                            <AvatarFallback>
                              {staff.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div>
                              <h3 className="font-semibold text-sm">{staff.name}</h3>
                              <p className="text-xs text-muted-foreground">{staff.role}</p>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Stethoscope className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs">{staff.department}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div
                                  className={`h-2 w-2 rounded-full ${
                                    staff.availability === "Available"
                                      ? "bg-green-500"
                                      : staff.availability === "In Surgery"
                                        ? "bg-red-500"
                                        : staff.availability === "On Leave"
                                          ? "bg-gray-500"
                                          : "bg-yellow-500"
                                  }`}
                                />
                                <span className={`text-xs ${getAvailabilityColor(staff.availability)}`}>
                                  {staff.availability}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <Badge variant={staff.status === "Active" ? "default" : "secondary"} className="text-xs">
                                {staff.status}
                              </Badge>
                              <Link href={`/staff/${staff.id}`}>
                                <Button variant="ghost" size="sm" className="text-xs">
                                  View Profile
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Tracker Tab */}
          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendanceData.map((record) => (
                    <div
                      key={record.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {getAttendanceIcon(record.status)}
                        <div>
                          <p className="font-medium text-sm">{record.name}</p>
                          <p className="text-xs text-muted-foreground">ID: {record.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Check In</p>
                          <p className="font-medium">{record.checkIn}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Check Out</p>
                          <p className="font-medium">{record.checkOut}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Hours</p>
                          <p className="font-medium">{record.hours}</p>
                        </div>
                        <Badge
                          variant={
                            record.status === "Present"
                              ? "default"
                              : record.status === "Absent"
                                ? "destructive"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {record.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
