"use client"

import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/navigation/sidebar"
import { Header } from "@/components/navigation/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, Clock, Award, Activity, Stethoscope } from "lucide-react"

// Mock staff profile data
const staffProfile = {
  id: "S001",
  name: "Dr. Sarah Smith",
  role: "Chief Medical Officer",
  department: "Cardiology",
  email: "sarah.smith@hospital.com",
  phone: "+1 (555) 123-4567",
  address: "123 Medical Center Dr, City, ST 12345",
  avatar: "/caring-doctor.png",
  status: "Active",
  joinDate: "2018-03-15",
  specialization: "Interventional Cardiology",
  experience: "15 years",
  education: [
    { degree: "MD", institution: "Harvard Medical School", year: "2009" },
    { degree: "Residency", institution: "Johns Hopkins Hospital", year: "2013" },
    { degree: "Fellowship", institution: "Mayo Clinic", year: "2015" },
  ],
  certifications: [
    "Board Certified in Cardiology",
    "Advanced Cardiac Life Support (ACLS)",
    "Basic Life Support (BLS)",
    "Interventional Cardiology Certification",
  ],
  schedule: [
    { day: "Monday", shift: "Day", hours: "8:00 AM - 6:00 PM", status: "Scheduled" },
    { day: "Tuesday", shift: "Day", hours: "8:00 AM - 6:00 PM", status: "Scheduled" },
    { day: "Wednesday", shift: "Day", hours: "8:00 AM - 6:00 PM", status: "Scheduled" },
    { day: "Thursday", shift: "Day", hours: "8:00 AM - 6:00 PM", status: "Scheduled" },
    { day: "Friday", shift: "Day", hours: "8:00 AM - 6:00 PM", status: "Scheduled" },
    { day: "Saturday", shift: "Off", hours: "-", status: "Off" },
    { day: "Sunday", shift: "On Call", hours: "On Call", status: "On Call" },
  ],
  recentActivity: [
    { date: "2024-01-15", activity: "Performed cardiac catheterization", patient: "John Doe" },
    { date: "2024-01-14", activity: "Consultation for chest pain", patient: "Sarah Johnson" },
    { date: "2024-01-13", activity: "Follow-up appointment", patient: "Mike Wilson" },
    { date: "2024-01-12", activity: "Emergency cardiac procedure", patient: "Emma Davis" },
  ],
  performance: {
    patientsSeen: 1247,
    averageRating: 4.8,
    completedProcedures: 89,
    consultations: 456,
  },
}

export default function StaffProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()

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
            <h1 className="text-3xl font-bold tracking-tight">Staff Profile</h1>
            <p className="text-muted-foreground">View and manage staff information</p>
          </div>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Profile Overview */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={staffProfile.avatar || "/placeholder.svg"} alt={staffProfile.name} />
                <AvatarFallback className="text-lg">
                  {staffProfile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">{staffProfile.name}</h2>
                    <p className="text-muted-foreground">
                      {staffProfile.role} • {staffProfile.department}
                    </p>
                  </div>
                  <Badge variant={staffProfile.status === "Active" ? "default" : "secondary"}>
                    {staffProfile.status}
                  </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{staffProfile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{staffProfile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{staffProfile.specialization}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Joined {staffProfile.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{staffProfile.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Experience</p>
                    <p className="text-sm text-muted-foreground">{staffProfile.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Department</p>
                    <p className="text-sm text-muted-foreground">{staffProfile.department}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {staffProfile.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Weekly Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {staffProfile.schedule.map((day) => (
                    <div key={day.day} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-20">
                          <p className="font-medium text-sm">{day.day}</p>
                        </div>
                        <div>
                          <p className="text-sm">{day.hours}</p>
                          <p className="text-xs text-muted-foreground">{day.shift}</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          day.status === "Scheduled" ? "default" : day.status === "Off" ? "secondary" : "outline"
                        }
                      >
                        {day.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{staffProfile.performance.patientsSeen}</div>
                    <p className="text-xs text-muted-foreground">Patients Seen</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{staffProfile.performance.averageRating}</div>
                    <p className="text-xs text-muted-foreground">Average Rating</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{staffProfile.performance.completedProcedures}</div>
                    <p className="text-xs text-muted-foreground">Procedures</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{staffProfile.performance.consultations}</div>
                    <p className="text-xs text-muted-foreground">Consultations</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="education" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Education & Training
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {staffProfile.education.map((edu, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{edu.degree}</p>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    </div>
                    <Badge variant="outline">{edu.year}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {staffProfile.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{activity.activity}</p>
                      <p className="text-xs text-muted-foreground">
                        Patient: {activity.patient} • {activity.date}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
