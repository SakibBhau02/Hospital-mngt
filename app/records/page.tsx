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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, FileText, Eye, Edit, Plus, Clock, AlertCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock EMR data
const medicalRecords = [
  {
    id: "EMR001",
    patientId: "P001",
    patientName: "John Doe",
    lastUpdated: "2024-01-15",
    recordType: "Complete",
    status: "Active",
    conditions: ["Hypertension", "Diabetes"],
    lastVisit: "2024-01-15",
    avatar: "/patient-male.png",
    urgency: "normal",
  },
  {
    id: "EMR002",
    patientId: "P002",
    patientName: "Sarah Johnson",
    lastUpdated: "2024-01-14",
    recordType: "Partial",
    status: "Active",
    conditions: ["Asthma"],
    lastVisit: "2024-01-14",
    avatar: "/patient-female.png",
    urgency: "high",
  },
  {
    id: "EMR003",
    patientId: "P003",
    patientName: "Mike Wilson",
    lastUpdated: "2024-01-12",
    recordType: "Complete",
    status: "Archived",
    conditions: ["Fracture - Healed"],
    lastVisit: "2024-01-12",
    avatar: "/patient-male-2.png",
    urgency: "normal",
  },
  {
    id: "EMR004",
    patientId: "P004",
    patientName: "Emma Davis",
    lastUpdated: "2024-01-10",
    recordType: "Complete",
    status: "Active",
    conditions: ["Cardiac Arrhythmia"],
    lastVisit: "2024-01-10",
    avatar: "/patient-female-2.png",
    urgency: "medium",
  },
]

const stats = [
  { title: "Total Records", value: "2,847", change: "+12%" },
  { title: "Updated Today", value: "23", change: "+5%" },
  { title: "Pending Reviews", value: "8", change: "-2%" },
  { title: "Critical Cases", value: "3", change: "+1%" },
]

export default function MedicalRecordsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [urgencyFilter, setUrgencyFilter] = useState("all")

  const filteredRecords = medicalRecords.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || record.status.toLowerCase() === statusFilter
    const matchesUrgency = urgencyFilter === "all" || record.urgency === urgencyFilter
    return matchesSearch && matchesStatus && matchesUrgency
  })

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      <main className="md:ml-64 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Electronic Medical Records</h1>
            <p className="text-muted-foreground">Manage patient medical records and history</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Record
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Medical Records Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by patient name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Records Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Record ID</TableHead>
                    <TableHead>Conditions</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={record.avatar || "/placeholder.svg"} alt={record.patientName} />
                            <AvatarFallback>
                              {record.patientName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-medium">{record.patientName}</span>
                            <p className="text-xs text-muted-foreground">{record.patientId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{record.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {record.conditions.slice(0, 2).map((condition) => (
                            <Badge key={condition} variant="outline" className="text-xs">
                              {condition}
                            </Badge>
                          ))}
                          {record.conditions.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{record.conditions.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{record.lastUpdated}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={record.status === "Active" ? "default" : "secondary"}>{record.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {record.urgency === "high" && <AlertCircle className="h-4 w-4 text-red-500" />}
                          {record.urgency === "medium" && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                          {record.urgency === "normal" && <div className="h-2 w-2 rounded-full bg-green-500" />}
                          <span className="text-sm capitalize">{record.urgency}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z"
                                />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/records/${record.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Record
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Record
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
