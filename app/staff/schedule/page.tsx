"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/navigation/sidebar"
import { Header } from "@/components/navigation/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Plus, Users, Clock } from "lucide-react"
import { ShiftPlannerCalendar } from "@/components/staff/shift-planner-calendar"

// Mock shift data
const shifts = [
  {
    id: "SH001",
    staffId: "S001",
    staffName: "Dr. Sarah Smith",
    department: "Cardiology",
    date: "2024-01-15",
    startTime: "08:00",
    endTime: "18:00",
    shiftType: "Day",
    status: "Scheduled",
    avatar: "/caring-doctor.png",
  },
  {
    id: "SH002",
    staffId: "S002",
    staffName: "Dr. Michael Brown",
    department: "Endocrinology",
    date: "2024-01-15",
    startTime: "07:30",
    endTime: "17:30",
    shiftType: "Day",
    status: "Scheduled",
    avatar: "/caring-doctor.png",
  },
  {
    id: "SH003",
    staffId: "S003",
    staffName: "Dr. Lisa Johnson",
    department: "Neurology",
    date: "2024-01-15",
    startTime: "20:00",
    endTime: "08:00",
    shiftType: "Night",
    status: "Scheduled",
    avatar: "/caring-doctor.png",
  },
  {
    id: "SH004",
    staffId: "S004",
    staffName: "Nurse Jennifer Wilson",
    department: "ICU",
    date: "2024-01-15",
    startTime: "08:00",
    endTime: "20:00",
    shiftType: "Day",
    status: "Scheduled",
    avatar: "/caring-doctor.png",
  },
]

const departments = ["All Departments", "Cardiology", "Endocrinology", "Neurology", "ICU", "Orthopedics"]
const shiftTypes = ["All Shifts", "Day", "Night", "On Call"]

export default function ShiftPlannerPage() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedShiftType, setSelectedShiftType] = useState("All Shifts")
  const [viewMode, setViewMode] = useState("week")

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate)
    if (viewMode === "week") {
      newDate.setDate(selectedDate.getDate() + (direction === "next" ? 7 : -7))
    } else {
      newDate.setMonth(selectedDate.getMonth() + (direction === "next" ? 1 : -1))
    }
    setSelectedDate(newDate)
  }

  const filteredShifts = shifts.filter((shift) => {
    const matchesDepartment = selectedDepartment === "All Departments" || shift.department === selectedDepartment
    const matchesShiftType = selectedShiftType === "All Shifts" || shift.shiftType === selectedShiftType
    return matchesDepartment && matchesShiftType
  })

  const stats = [
    { title: "Total Shifts", value: shifts.length.toString(), change: "+5%" },
    { title: "Day Shifts", value: shifts.filter((s) => s.shiftType === "Day").length.toString(), change: "+3%" },
    { title: "Night Shifts", value: shifts.filter((s) => s.shiftType === "Night").length.toString(), change: "+2%" },
    { title: "Coverage", value: "98%", change: "+1%" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      <main className="md:ml-64 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">Shift Planner</h1>
            <p className="text-muted-foreground">Manage staff schedules and shift assignments</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Shift
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600">{stat.change} from last week</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Calendar Controls */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Shift Calendar
              </CardTitle>
              <div className="flex items-center gap-2">
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedShiftType} onValueChange={setSelectedShiftType}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {shiftTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={viewMode} onValueChange={setViewMode}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Week View</SelectItem>
                    <SelectItem value="month">Month View</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{formatDate(selectedDate)}</h3>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" onClick={() => navigateDate("prev")}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
                  Today
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigateDate("next")}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ShiftPlannerCalendar shifts={filteredShifts} selectedDate={selectedDate} viewMode={viewMode} />
          </CardContent>
        </Card>

        {/* Today's Shifts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Today's Shifts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredShifts.map((shift) => (
                <div
                  key={shift.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={shift.avatar || "/placeholder.svg"} alt={shift.staffName} />
                      <AvatarFallback>
                        {shift.staffName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{shift.staffName}</p>
                      <p className="text-xs text-muted-foreground">{shift.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Shift Time</p>
                      <p className="font-medium text-sm">
                        {shift.startTime} - {shift.endTime}
                      </p>
                    </div>
                    <Badge
                      variant={
                        shift.shiftType === "Day" ? "default" : shift.shiftType === "Night" ? "secondary" : "outline"
                      }
                    >
                      {shift.shiftType}
                    </Badge>
                    <Badge variant="outline">{shift.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
