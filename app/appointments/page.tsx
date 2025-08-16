"use client"

import { useState } from "react"
import { Sidebar } from "@/components/navigation/sidebar"
import { Header } from "@/components/navigation/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, CalendarDays, Clock, Plus, ChevronLeft, ChevronRight, Users, Stethoscope } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AppointmentBookingForm } from "@/components/appointments/booking-form"
import { QueueManagement } from "@/components/appointments/queue-management"

// Mock appointment data
const appointments = [
  {
    id: "A001",
    patientName: "John Doe",
    patientId: "P001",
    doctor: "Dr. Sarah Smith",
    department: "Cardiology",
    time: "09:00",
    duration: 30,
    type: "Consultation",
    status: "Confirmed",
    avatar: "/patient-male.png",
  },
  {
    id: "A002",
    patientName: "Sarah Johnson",
    patientId: "P002",
    doctor: "Dr. Michael Brown",
    department: "Endocrinology",
    time: "10:30",
    duration: 45,
    type: "Follow-up",
    status: "Confirmed",
    avatar: "/patient-female.png",
  },
  {
    id: "A003",
    patientName: "Mike Wilson",
    patientId: "P003",
    doctor: "Dr. Sarah Smith",
    department: "Cardiology",
    time: "14:00",
    duration: 30,
    type: "Check-up",
    status: "Pending",
    avatar: "/patient-male-2.png",
  },
  {
    id: "A004",
    patientName: "Emma Davis",
    patientId: "P004",
    doctor: "Dr. Lisa Johnson",
    department: "Neurology",
    time: "15:30",
    duration: 60,
    type: "Consultation",
    status: "Confirmed",
    avatar: "/patient-female-2.png",
  },
]

const doctors = [
  { name: "Dr. Sarah Smith", department: "Cardiology", avatar: "/caring-doctor.png" },
  { name: "Dr. Michael Brown", department: "Endocrinology", avatar: "/caring-doctor.png" },
  { name: "Dr. Lisa Johnson", department: "Neurology", avatar: "/caring-doctor.png" },
  { name: "Dr. James Wilson", department: "Orthopedics", avatar: "/caring-doctor.png" },
]

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
]

const stats = [
  { title: "Today's Appointments", value: "24", change: "+3" },
  { title: "Pending Confirmations", value: "8", change: "+2" },
  { title: "Completed Today", value: "16", change: "+5" },
  { title: "No-Shows", value: "2", change: "-1" },
]

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState("day")
  const [selectedDoctor, setSelectedDoctor] = useState("all")
  const [isBookingOpen, setIsBookingOpen] = useState(false)

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
    if (viewMode === "day") {
      newDate.setDate(selectedDate.getDate() + (direction === "next" ? 1 : -1))
    } else if (viewMode === "week") {
      newDate.setDate(selectedDate.getDate() + (direction === "next" ? 7 : -7))
    } else {
      newDate.setMonth(selectedDate.getMonth() + (direction === "next" ? 1 : -1))
    }
    setSelectedDate(newDate)
  }

  const filteredAppointments = appointments.filter((apt) => selectedDoctor === "all" || apt.doctor === selectedDoctor)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      <main className="md:ml-64 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Appointment & Scheduling</h1>
            <p className="text-muted-foreground">Manage appointments and doctor schedules</p>
          </div>
          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Book New Appointment</DialogTitle>
              </DialogHeader>
              <AppointmentBookingForm onClose={() => setIsBookingOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600">{stat.change} from yesterday</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Calendar and Schedule */}
          <div className="lg:col-span-2 space-y-4">
            {/* Calendar Controls */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5" />
                    Schedule View
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Select value={viewMode} onValueChange={setViewMode}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Day View</SelectItem>
                        <SelectItem value="week">Week View</SelectItem>
                        <SelectItem value="month">Month View</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Doctors</SelectItem>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor.name} value={doctor.name}>
                            {doctor.name}
                          </SelectItem>
                        ))}
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
                {/* Day View Schedule */}
                {viewMode === "day" && (
                  <div className="space-y-2">
                    {timeSlots.map((time) => {
                      const appointment = filteredAppointments.find((apt) => apt.time === time)
                      return (
                        <div key={time} className="flex items-center gap-4 p-2 border-b border-border/50">
                          <div className="w-16 text-sm font-medium text-muted-foreground">{time}</div>
                          {appointment ? (
                            <div className="flex-1 flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg transition-all hover:shadow-sm">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={appointment.avatar || "/placeholder.svg"}
                                  alt={appointment.patientName}
                                />
                                <AvatarFallback>
                                  {appointment.patientName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="font-medium text-sm">{appointment.patientName}</p>
                                <p className="text-xs text-muted-foreground">
                                  {appointment.doctor} • {appointment.type}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant={appointment.status === "Confirmed" ? "default" : "secondary"}>
                                  {appointment.status}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{appointment.duration}min</span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex-1 p-3 border border-dashed border-border rounded-lg text-center text-muted-foreground text-sm">
                              Available
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Week/Month views would be implemented similarly */}
                {viewMode === "week" && (
                  <div className="text-center py-8 text-muted-foreground">Week view implementation coming soon</div>
                )}

                {viewMode === "month" && (
                  <div className="text-center py-8 text-muted-foreground">Month view implementation coming soon</div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Queue Management */}
          <div className="space-y-4">
            <QueueManagement />

            {/* Doctor Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  Doctor Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {doctors.map((doctor) => (
                  <div key={doctor.name} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={doctor.avatar || "/placeholder.svg"} alt={doctor.name} />
                      <AvatarFallback>
                        {doctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{doctor.name}</p>
                      <p className="text-xs text-muted-foreground">{doctor.department}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-xs text-muted-foreground">Available</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setIsBookingOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Appointment
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Clock className="mr-2 h-4 w-4" />
                  Reschedule
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="mr-2 h-4 w-4" />
                  View Waiting List
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
