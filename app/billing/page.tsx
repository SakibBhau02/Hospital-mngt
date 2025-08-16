"use client"

import { useState } from "react"
import Link from "next/link"
import { Sidebar } from "@/components/navigation/sidebar"
import { Header } from "@/components/navigation/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, CreditCard, FileText, TrendingUp, Plus, Download, Calendar } from "lucide-react"
import { BillingChart } from "@/components/billing/billing-chart"
import { RecentTransactions } from "@/components/billing/recent-transactions"
import { InvoiceCards } from "@/components/billing/invoice-cards"

// Mock billing data
const billingStats = [
  { title: "Total Revenue", value: "$847,250", change: "+12.5%", trend: "up" },
  { title: "Outstanding", value: "$23,450", change: "-8.2%", trend: "down" },
  { title: "This Month", value: "$156,780", change: "+15.3%", trend: "up" },
  { title: "Avg. Payment Time", value: "12 days", change: "-2 days", trend: "down" },
]

const revenueData = [
  { month: "Jan", revenue: 65000, expenses: 45000 },
  { month: "Feb", revenue: 72000, expenses: 48000 },
  { month: "Mar", revenue: 68000, expenses: 46000 },
  { month: "Apr", revenue: 78000, expenses: 52000 },
  { month: "May", revenue: 85000, expenses: 55000 },
  { month: "Jun", revenue: 92000, expenses: 58000 },
]

const paymentMethods = [
  { method: "Insurance", amount: 425000, percentage: 65 },
  { method: "Cash", amount: 130000, percentage: 20 },
  { method: "Credit Card", amount: 85000, percentage: 13 },
  { method: "Other", amount: 13000, percentage: 2 },
]

export default function BillingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      <main className="md:ml-64 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Billing & Finance</h1>
            <p className="text-muted-foreground">Manage invoices, payments, and financial reports</p>
          </div>
          <div className="flex gap-2">
            <Link href="/billing/invoices">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                View Invoices
              </Button>
            </Link>
            <Link href="/billing/payments">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Payment
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {billingStats.map((stat) => (
            <Card key={stat.title} className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change} from last period
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Revenue Overview
                  </CardTitle>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <BillingChart data={revenueData} />
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.method} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{method.method}</span>
                      <span className="font-medium">${method.amount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${method.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground text-right">{method.percentage}%</div>
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
                <Link href="/billing/invoices/new">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="mr-2 h-4 w-4" />
                    Create Invoice
                  </Button>
                </Link>
                <Link href="/billing/payments">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Process Payment
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Export Reports
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Calendar className="mr-2 h-4 w-4" />
                  Payment Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs for detailed views */}
        <Tabs defaultValue="invoices" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="invoices">Recent Invoices</TabsTrigger>
            <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="invoices">
            <InvoiceCards />
          </TabsContent>

          <TabsContent value="transactions">
            <RecentTransactions />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
