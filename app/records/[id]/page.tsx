"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/navigation/sidebar"
import { Header } from "@/components/navigation/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  ArrowLeft,
  Edit,
  FileText,
  Pill,
  TestTube,
  Video,
  ChevronDown,
  ChevronRight,
  Calendar,
  User,
  Heart,
  Activity,
} from "lucide-react"
import { TelemedicineWindow } from "@/components/records/telemedicine-window"

// Mock patient EMR data
const patientEMR = {
  id: "EMR001",
  patientId: "P001",
  patientName: "John Doe",
  age: 45,
  gender: "Male",
  bloodType: "A+",
  avatar: "/patient-male.png",
  lastUpdated: "2024-01-15",
  status: "Active",
  medicalHistory: [
    {
      id: "H001",
      date: "2024-01-15",
      condition: "Hypertension",
      doctor: "Dr. Sarah Smith",
      department: "Cardiology",
      diagnosis: "Essential hypertension",
      treatment: "Lifestyle modifications and medication",
      notes: "Patient shows good response to current treatment plan. Blood pressure well controlled.",
      status: "Ongoing",
      severity: "Moderate",
    },
    {
      id: "H002",
      date: "2023-12-01",
      condition: "Type 2 Diabetes",
      doctor: "Dr. Michael Brown",
      department: "Endocrinology",
      diagnosis: "Type 2 diabetes mellitus",
      treatment: "Metformin and dietary changes",
      notes: "HbA1c levels improving. Continue current medication regimen.",
      status: "Ongoing",
      severity: "Mild",
    },
    {
      id: "H003",
      date: "2023-08-20",
      condition: "Annual Physical",
      doctor: "Dr. Lisa Johnson",
      department: "General Medicine",
      diagnosis: "Routine examination",
      treatment: "Preventive care recommendations",
      notes: "Overall health good. Recommended regular exercise and diet monitoring.",
      status: "Completed",
      severity: "Normal",
    },
  ],
  prescriptions: [
    {
      id: "RX001",
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribedBy: "Dr. Sarah Smith",
      prescribedDate: "2024-01-15",
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      status: "Active",
      instructions: "Take with or without food. Monitor blood pressure regularly.",
      refillsRemaining: 2,
    },
    {
      id: "RX002",
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      prescribedBy: "Dr. Michael Brown",
      prescribedDate: "2023-12-01",
      startDate: "2023-12-01",
      endDate: "2024-06-01",
      status: "Active",
      instructions: "Take with meals to reduce stomach upset. Monitor blood glucose.",
      refillsRemaining: 3,
    },
    {
      id: "RX003",
      medication: "Aspirin",
      dosage: "81mg",
      frequency: "Once daily",
      prescribedBy: "Dr. Sarah Smith",
      prescribedDate: "2024-01-15",
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      status: "Active",
      instructions: "Take with food. Low-dose for cardiovascular protection.",
      refillsRemaining: 5,
    },
  ],
  testResults: [
    {
      id: "LAB001",
      testName: "Complete Blood Count",
      orderedBy: "Dr. Sarah Smith",
      orderedDate: "2024-01-10",
      completedDate: "2024-01-12",
      status: "Completed",
      results: {
        "White Blood Cells": { value: "7.2", unit: "K/uL", range: "4.0-11.0", status: "Normal" },
        "Red Blood Cells": { value: "4.8", unit: "M/uL", range: "4.2-5.4", status: "Normal" },
        Hemoglobin: { value: "14.2", unit: "g/dL", range: "12.0-16.0", status: "Normal" },
        Platelets: { value: "285", unit: "K/uL", range: "150-450", status: "Normal" },
      },
      notes: "All values within normal limits.",
    },
    {
      id: "LAB002",
      testName: "Lipid Panel",
      orderedBy: "Dr. Sarah Smith",
      orderedDate: "2024-01-10",
      completedDate: "2024-01-12",
      status: "Completed",
      results: {
        "Total Cholesterol": { value: "195", unit: "mg/dL", range: "<200", status: "Normal" },
        "LDL Cholesterol": { value: "118", unit: "mg/dL", range: "<100", status: "High" },
        "HDL Cholesterol": { value: "45", unit: "mg/dL", range: ">40", status: "Normal" },
        Triglycerides: { value: "160", unit: "mg/dL", range: "<150", status: "High" },
      },
      notes: "LDL and triglycerides slightly elevated. Recommend dietary modifications.",
    },
    {
      id: "LAB003",
      testName: "HbA1c",
      orderedBy: "Dr. Michael Brown",
      orderedDate: "2023-12-28",
      completedDate: "2023-12-30",
      status: "Completed",
      results: {
        "Hemoglobin A1c": { value: "6.8", unit: "%", range: "<7.0", status: "Normal" },
      },
      notes: "Good diabetic control. Continue current management.",
    },
  ],
}

export default function PatientEMRPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [isTelemedicineOpen, setIsTelemedicineOpen] = useState(false)

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

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
            <h1 className="text-3xl font-bold tracking-tight">Electronic Medical Record</h1>
            <p className="text-muted-foreground">Complete medical history and records</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsTelemedicineOpen(true)}>
              <Video className="mr-2 h-4 w-4" />
              Telemedicine
            </Button>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit Record
            </Button>
          </div>
        </div>

        {/* Patient Overview */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={patientEMR.avatar || "/placeholder.svg"} alt={patientEMR.patientName} />
                <AvatarFallback className="text-lg">
                  {patientEMR.patientName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">{patientEMR.patientName}</h2>
                    <p className="text-muted-foreground">
                      EMR ID: {patientEMR.id} • Patient ID: {patientEMR.patientId}
                    </p>
                  </div>
                  <Badge variant={patientEMR.status === "Active" ? "default" : "secondary"}>{patientEMR.status}</Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {patientEMR.age} years old, {patientEMR.gender}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Blood Type: {patientEMR.bloodType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Last Updated: {patientEMR.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {patientEMR.medicalHistory.filter((h) => h.status === "Ongoing").length} Active Conditions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* EMR Tabs */}
        <Tabs defaultValue="history" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="history" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Medical History
            </TabsTrigger>
            <TabsTrigger value="prescriptions" className="flex items-center gap-2">
              <Pill className="h-4 w-4" />
              Prescriptions
            </TabsTrigger>
            <TabsTrigger value="tests" className="flex items-center gap-2">
              <TestTube className="h-4 w-4" />
              Test Results
            </TabsTrigger>
          </TabsList>

          {/* Medical History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Medical History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {patientEMR.medicalHistory.map((record) => (
                  <Collapsible
                    key={record.id}
                    open={expandedSections[record.id]}
                    onOpenChange={() => toggleSection(record.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {expandedSections[record.id] ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{record.condition}</h4>
                            <p className="text-sm text-muted-foreground">
                              {record.date} • {record.doctor} • {record.department}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              record.severity === "Severe"
                                ? "destructive"
                                : record.severity === "Moderate"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {record.severity}
                          </Badge>
                          <Badge variant={record.status === "Ongoing" ? "default" : "secondary"}>{record.status}</Badge>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="mt-4 space-y-3 border-t pt-4">
                        <div>
                          <h5 className="font-medium text-sm">Diagnosis</h5>
                          <p className="text-sm text-muted-foreground">{record.diagnosis}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm">Treatment</h5>
                          <p className="text-sm text-muted-foreground">{record.treatment}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm">Notes</h5>
                          <p className="text-sm text-muted-foreground">{record.notes}</p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Prescriptions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {patientEMR.prescriptions.map((prescription) => (
                  <Collapsible
                    key={prescription.id}
                    open={expandedSections[prescription.id]}
                    onOpenChange={() => toggleSection(prescription.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {expandedSections[prescription.id] ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{prescription.medication}</h4>
                            <p className="text-sm text-muted-foreground">
                              {prescription.dosage} • {prescription.frequency}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={prescription.status === "Active" ? "default" : "secondary"}>
                            {prescription.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {prescription.refillsRemaining} refills left
                          </span>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="mt-4 space-y-3 border-t pt-4">
                        <div className="grid gap-3 md:grid-cols-2">
                          <div>
                            <h5 className="font-medium text-sm">Prescribed By</h5>
                            <p className="text-sm text-muted-foreground">{prescription.prescribedBy}</p>
                          </div>
                          <div>
                            <h5 className="font-medium text-sm">Prescribed Date</h5>
                            <p className="text-sm text-muted-foreground">{prescription.prescribedDate}</p>
                          </div>
                          <div>
                            <h5 className="font-medium text-sm">Start Date</h5>
                            <p className="text-sm text-muted-foreground">{prescription.startDate}</p>
                          </div>
                          <div>
                            <h5 className="font-medium text-sm">End Date</h5>
                            <p className="text-sm text-muted-foreground">{prescription.endDate}</p>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm">Instructions</h5>
                          <p className="text-sm text-muted-foreground">{prescription.instructions}</p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Test Results Tab */}
          <TabsContent value="tests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Laboratory Test Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {patientEMR.testResults.map((test) => (
                  <Collapsible
                    key={test.id}
                    open={expandedSections[test.id]}
                    onOpenChange={() => toggleSection(test.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            {expandedSections[test.id] ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{test.testName}</h4>
                            <p className="text-sm text-muted-foreground">
                              Ordered: {test.orderedDate} • Completed: {test.completedDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={test.status === "Completed" ? "default" : "secondary"}>{test.status}</Badge>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="mt-4 space-y-3 border-t pt-4">
                        <div className="grid gap-2">
                          {Object.entries(test.results).map(([testName, result]) => (
                            <div key={testName} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                              <span className="font-medium text-sm">{testName}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm">
                                  {result.value} {result.unit}
                                </span>
                                <Badge
                                  variant={
                                    result.status === "High" || result.status === "Low" ? "destructive" : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {result.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div>
                          <h5 className="font-medium text-sm">Notes</h5>
                          <p className="text-sm text-muted-foreground">{test.notes}</p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Telemedicine Window */}
        <TelemedicineWindow
          isOpen={isTelemedicineOpen}
          onClose={() => setIsTelemedicineOpen(false)}
          patientName={patientEMR.patientName}
        />
      </main>
    </div>
  )
}
