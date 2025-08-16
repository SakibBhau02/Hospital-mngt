"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowUpRight, ArrowDownRight, CreditCard, Banknote, Building } from "lucide-react"

// Mock transaction data
const transactions = [
  {
    id: "TXN-001",
    type: "Payment Received",
    patientName: "John Doe",
    amount: 1250.0,
    method: "Insurance",
    date: "2024-01-15",
    time: "10:30 AM",
    status: "Completed",
    avatar: "/patient-male.png",
    direction: "in",
  },
  {
    id: "TXN-002",
    type: "Refund Issued",
    patientName: "Sarah Johnson",
    amount: 150.0,
    method: "Credit Card",
    date: "2024-01-14",
    time: "2:15 PM",
    status: "Completed",
    avatar: "/patient-female.png",
    direction: "out",
  },
  {
    id: "TXN-003",
    type: "Payment Received",
    patientName: "Mike Wilson",
    amount: 850.0,
    method: "Cash",
    date: "2024-01-14",
    time: "11:45 AM",
    status: "Completed",
    avatar: "/patient-male-2.png",
    direction: "in",
  },
  {
    id: "TXN-004",
    type: "Payment Received",
    patientName: "Emma Davis",
    amount: 675.0,
    method: "Credit Card",
    date: "2024-01-13",
    time: "4:20 PM",
    status: "Processing",
    avatar: "/patient-female-2.png",
    direction: "in",
  },
  {
    id: "TXN-005",
    type: "Payment Received",
    patientName: "Robert Brown",
    amount: 2100.0,
    method: "Insurance",
    date: "2024-01-12",
    time: "9:15 AM",
    status: "Completed",
    avatar: "/patient-male.png",
    direction: "in",
  },
]

export function RecentTransactions() {
  const getMethodIcon = (method: string) => {
    switch (method) {
      case "Credit Card":
        return <CreditCard className="h-4 w-4" />
      case "Cash":
        return <Banknote className="h-4 w-4" />
      case "Insurance":
        return <Building className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={transaction.avatar || "/placeholder.svg"} alt={transaction.patientName} />
                    <AvatarFallback>
                      {transaction.patientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center ${
                      transaction.direction === "in" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.direction === "in" ? (
                      <ArrowDownRight className="h-3 w-3" />
                    ) : (
                      <ArrowUpRight className="h-3 w-3" />
                    )}
                  </div>
                </div>
                <div>
                  <p className="font-medium text-sm">{transaction.type}</p>
                  <p className="text-xs text-muted-foreground">{transaction.patientName}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {getMethodIcon(transaction.method)}
                    <span className="text-xs text-muted-foreground">{transaction.method}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${transaction.direction === "in" ? "text-green-600" : "text-red-600"}`}>
                    {transaction.direction === "in" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </span>
                  <Badge variant={transaction.status === "Completed" ? "default" : "secondary"} className="text-xs">
                    {transaction.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {transaction.date} at {transaction.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
