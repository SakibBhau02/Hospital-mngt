"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Download, Send, DollarSign } from "lucide-react"

// Mock invoice data
const invoices = [
  {
    id: "INV-001",
    patientName: "John Doe",
    patientId: "P001",
    amount: 1250.0,
    status: "Paid",
    dueDate: "2024-01-20",
    issueDate: "2024-01-05",
    services: ["Consultation", "Lab Tests", "X-Ray"],
    avatar: "/patient-male.png",
  },
  {
    id: "INV-002",
    patientName: "Sarah Johnson",
    patientId: "P002",
    amount: 850.0,
    status: "Pending",
    dueDate: "2024-01-25",
    issueDate: "2024-01-10",
    services: ["Follow-up", "Prescription"],
    avatar: "/patient-female.png",
  },
  {
    id: "INV-003",
    patientName: "Mike Wilson",
    patientId: "P003",
    amount: 2100.0,
    status: "Overdue",
    dueDate: "2024-01-15",
    issueDate: "2023-12-30",
    services: ["Surgery", "Post-op Care", "Medications"],
    avatar: "/patient-male-2.png",
  },
  {
    id: "INV-004",
    patientName: "Emma Davis",
    patientId: "P004",
    amount: 675.0,
    status: "Draft",
    dueDate: "2024-02-01",
    issueDate: "2024-01-15",
    services: ["Consultation", "ECG"],
    avatar: "/patient-female-2.png",
  },
]

export function InvoiceCards() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "default"
      case "Pending":
        return "secondary"
      case "Overdue":
        return "destructive"
      case "Draft":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Recent Invoices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {invoices.map((invoice) => (
            <Card key={invoice.id} className="transition-all hover:shadow-md hover:scale-[1.02]">
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={invoice.avatar || "/placeholder.svg"} alt={invoice.patientName} />
                        <AvatarFallback>
                          {invoice.patientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{invoice.patientName}</p>
                        <p className="text-xs text-muted-foreground">{invoice.id}</p>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                  </div>

                  {/* Amount */}
                  <div className="text-center py-2">
                    <div className="text-2xl font-bold">${invoice.amount.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">Total Amount</p>
                  </div>

                  {/* Services */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Services:</p>
                    <div className="flex flex-wrap gap-1">
                      {invoice.services.map((service) => (
                        <Badge key={service} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-muted-foreground">Issue Date</p>
                      <p className="font-medium">{invoice.issueDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Due Date</p>
                      <p className="font-medium">{invoice.dueDate}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Eye className="mr-2 h-3 w-3" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Download className="mr-2 h-3 w-3" />
                      Download
                    </Button>
                    {invoice.status === "Draft" && (
                      <Button size="sm" className="flex-1">
                        <Send className="mr-2 h-3 w-3" />
                        Send
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
