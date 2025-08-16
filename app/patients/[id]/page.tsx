"use client"

import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/navigation/sidebar"
import { Header } from "@/components/navigation/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Phone, Mail, MapPin, Calendar, Heart, Pill, FileText, Activity } from "lucide-react"

// Mock patient data - in real app, this would come from API
const patient = {
  id: "P001",
  name: "John Doe",
  age: 45,
  gender: "Male",
  dateOfBirth: "1979-03-15",
  phone: "+1 (555) 123-4567",
  email: "john.doe@email.com",
  address: "123 Main St, Anytown, ST 12345",
  bloodType: "A+",
  status: "Active",
  avatar: "/patient-male.png",
  emergencyContact: {
    name: "Jane Doe",
    phone: "+1 (555) 234-5678",
    relation: "Spouse",
  },
  medicalHistory: [
    { date: "2024-01-15", condition: "Hypertension", doctor: "Dr. Smith", status: "Ongoing" },
    { date: "2023-08-20", condition: "Annual Checkup", doctor: "Dr. Johnson", status: "Completed" },
    { date: "2023-03-10", condition: "Flu", doctor: "Dr. Brown", status: "Resolved" },
  ],
  medications: [
    { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", prescribed: "2024-01-15" },
    { name: "Metformin", dosage: "500mg", frequency: "Twice daily", prescribed: "2023-12-01" },
  ],
  vitals: [
    { date: "2024-01-15", bp: "140/90", hr: "72", temp: "98.6°F", weight: "180 lbs" },
    { date: "2024-01-10", bp: "138/88", hr: "75", temp: "98.4°F", weight: "182 lbs" },
    { date: "2024-01-05", bp: "142/92", hr: "70", temp: "98.7°F", weight: "181 lbs" },
  ],
  appointments: [
    { date: "2024-01-20", time: "10:00 AM", doctor: "Dr. Smith", type: "Follow-up", status: "Scheduled" },
    { date: "2024-01-25", time: "2:00 PM", doctor: "Dr. Johnson", type: "Lab Results", status: "Scheduled" },
  ],
}

export default function PatientProfilePage({ params }: { params: { id: string } }) {
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
            <h1 className="text-3xl font-bold tracking-tight">Patient Profile</h1>
            <p className="text-muted-foreground">View and manage patient information</p>
          </div>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Patient Overview Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.name} />
                <AvatarFallback className="text-lg">
                  {patient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">{patient.name}</h2>
                    <p className="text-muted-foreground">Patient ID: {patient.id}</p>
                  </div>
                  <Badge variant={patient.status === "Active" ? "default" : "secondary"}>{patient.status}</Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{patient.age} years old</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Blood Type: {patient.bloodType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{patient.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{patient.email}</span>
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
            <TabsTrigger value="history">Medical History</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
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
                    <p className="text-sm text-muted-foreground">{patient.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Emergency Contact</p>
                    <p className="text-sm text-muted-foreground">
                      {patient.emergencyContact.name} ({patient.emergencyContact.relation})
                    </p>
                    <p className="text-sm text-muted-foreground">{patient.emergencyContact.phone}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {patient.medicalHistory.slice(0, 3).map((record, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{record.condition}</p>
                        <p className="text-xs text-muted-foreground">{record.date}</p>
                      </div>
                      <Badge variant="outline">{record.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Medical History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patient.medicalHistory.map((record, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{record.condition}</p>
                        <p className="text-sm text-muted-foreground">Dr. {record.doctor}</p>
                        <p className="text-xs text-muted-foreground">{record.date}</p>
                      </div>
                      <Badge variant={record.status === "Ongoing" ? "default" : "secondary"}>{record.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5" />
                  Current Medications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patient.medications.map((med, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{med.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {med.dosage} - {med.frequency}
                        </p>
                        <p className="text-xs text-muted-foreground">Prescribed: {med.prescribed}</p>
                      </div>
                      <Badge variant="outline">Active</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vitals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Vital Signs History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patient.vitals.map((vital, index) => (
                    <div key={index} className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 border rounded-lg">
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="font-medium">{vital.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Blood Pressure</p>
                        <p className="font-medium">{vital.bp}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Heart Rate</p>
                        <p className="font-medium">{vital.hr} bpm</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Temperature</p>
                        <p className="font-medium">{vital.temp}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Weight</p>
                        <p className="font-medium">{vital.weight}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patient.appointments.map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <p className="font-medium">{appointment.type}</p>
                        <p className="text-sm text-muted-foreground">Dr. {appointment.doctor}</p>
                        <p className="text-xs text-muted-foreground">
                          {appointment.date} at {appointment.time}
                        </p>
                      </div>
                      <Badge variant="outline">{appointment.status}</Badge>
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
