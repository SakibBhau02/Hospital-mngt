import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, Filter, TrendingUp, Users, DollarSign, Activity, Clock } from "lucide-react"
import { PatientAnalyticsChart } from "@/components/reports/patient-analytics-chart"
import { RevenueChart } from "@/components/reports/revenue-chart"
import { DepartmentPerformanceChart } from "@/components/reports/department-performance-chart"
import { AppointmentTrendsChart } from "@/components/reports/appointment-trends-chart"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-medical-dark">Reports & Analytics</h1>
          <p className="text-medical-muted mt-1">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="30days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-medical-light hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-medical-muted">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-medical-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medical-dark">2,847</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-medical-light hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-medical-muted">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-medical-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medical-dark">$284,750</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-medical-light hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-medical-muted">Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-medical-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medical-dark">1,247</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5.7% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-medical-light hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-medical-muted">Avg Wait Time</CardTitle>
            <Clock className="h-4 w-4 text-medical-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-medical-dark">18 min</div>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <Activity className="h-3 w-3 mr-1" />
              +2.1 min from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-medical-light">
          <CardHeader>
            <CardTitle className="text-medical-dark">Patient Analytics</CardTitle>
            <CardDescription>Patient visits and admissions over time</CardDescription>
          </CardHeader>
          <CardContent>
            <PatientAnalyticsChart />
          </CardContent>
        </Card>

        <Card className="border-medical-light">
          <CardHeader>
            <CardTitle className="text-medical-dark">Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue and growth patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        <Card className="border-medical-light">
          <CardHeader>
            <CardTitle className="text-medical-dark">Department Performance</CardTitle>
            <CardDescription>Patient volume by department</CardDescription>
          </CardHeader>
          <CardContent>
            <DepartmentPerformanceChart />
          </CardContent>
        </Card>

        <Card className="border-medical-light">
          <CardHeader>
            <CardTitle className="text-medical-dark">Appointment Trends</CardTitle>
            <CardDescription>Appointment patterns and scheduling efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <AppointmentTrendsChart />
          </CardContent>
        </Card>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-medical-light hover:shadow-lg transition-all duration-300 cursor-pointer">
          <CardHeader>
            <CardTitle className="text-medical-dark flex items-center">
              <Users className="h-5 w-5 mr-2 text-medical-primary" />
              Patient Reports
            </CardTitle>
            <CardDescription>Demographics, visit history, and patient analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant="secondary">Demographics Report</Badge>
              <Badge variant="secondary">Visit History</Badge>
              <Badge variant="secondary">Patient Satisfaction</Badge>
            </div>
            <Button className="w-full mt-4 bg-transparent" variant="outline">
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="border-medical-light hover:shadow-lg transition-all duration-300 cursor-pointer">
          <CardHeader>
            <CardTitle className="text-medical-dark flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-medical-primary" />
              Financial Reports
            </CardTitle>
            <CardDescription>Revenue, billing, and financial performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant="secondary">Revenue Analysis</Badge>
              <Badge variant="secondary">Payment Reports</Badge>
              <Badge variant="secondary">Insurance Claims</Badge>
            </div>
            <Button className="w-full mt-4 bg-transparent" variant="outline">
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card className="border-medical-light hover:shadow-lg transition-all duration-300 cursor-pointer">
          <CardHeader>
            <CardTitle className="text-medical-dark flex items-center">
              <Activity className="h-5 w-5 mr-2 text-medical-primary" />
              Operational Reports
            </CardTitle>
            <CardDescription>Staff performance, efficiency, and operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant="secondary">Staff Performance</Badge>
              <Badge variant="secondary">Resource Utilization</Badge>
              <Badge variant="secondary">Quality Metrics</Badge>
            </div>
            <Button className="w-full mt-4 bg-transparent" variant="outline">
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
