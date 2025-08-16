import { Sidebar } from "@/components/navigation/sidebar"
import { Header } from "@/components/navigation/header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, Users, FileText } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />

      <main className="md:ml-64 p-6 space-y-6">
        <div className="flex items-center justify-between animate-slide-up">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-bounce-in">
              Good morning, Dr. Smith
            </h1>
            <p className="text-muted-foreground animate-slide-up" style={{ animationDelay: "200ms" }}>
              Here's what's happening at your hospital today.
            </p>
          </div>
          <div className="flex gap-2 animate-slide-up" style={{ animationDelay: "400ms" }}>
            <Button className="interactive-button bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/30">
              <Plus className="mr-2 h-4 w-4" />
              New Patient
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card
            className="interactive-card glass-effect border-primary/20 animate-slide-up"
            style={{ animationDelay: "600ms" }}
          >
            <CardHeader>
              <CardTitle className="text-primary">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start interactive-button border-primary/30 hover:bg-primary/10 hover:border-primary/50 hover:text-primary bg-transparent"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start interactive-button border-primary/30 hover:bg-primary/10 hover:border-primary/50 hover:text-primary bg-transparent"
              >
                <Users className="mr-2 h-4 w-4" />
                Add New Patient
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start interactive-button border-primary/30 hover:bg-primary/10 hover:border-primary/50 hover:text-primary bg-transparent"
              >
                <FileText className="mr-2 h-4 w-4" />
                View Medical Records
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <div className="animate-slide-up" style={{ animationDelay: "700ms" }}>
            <RecentActivity />
          </div>

          <Card
            className="interactive-card glass-effect border-primary/20 animate-slide-up"
            style={{ animationDelay: "800ms" }}
          >
            <CardHeader>
              <CardTitle className="text-primary">Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { task: "Morning Rounds", time: "8:00 AM" },
                  { task: "Surgery - Room 3", time: "10:30 AM" },
                  { task: "Patient Consultations", time: "2:00 PM" },
                  { task: "Staff Meeting", time: "4:00 PM" },
                ].map((item, index) => (
                  <div
                    key={item.task}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/5 transition-all duration-300 cursor-pointer group animate-slide-up"
                    style={{ animationDelay: `${900 + index * 100}ms` }}
                  >
                    <span className="text-sm font-medium group-hover:text-primary transition-colors duration-300">
                      {item.task}
                    </span>
                    <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded-full">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card
            className="interactive-card glass-effect border-primary/20 animate-slide-up"
            style={{ animationDelay: "1000ms" }}
          >
            <CardHeader>
              <CardTitle className="text-primary">Department Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { dept: "Emergency", status: "High Load", color: "red" },
                  { dept: "ICU", status: "Moderate", color: "yellow" },
                  { dept: "General Ward", status: "Normal", color: "green" },
                  { dept: "Laboratory", status: "Normal", color: "green" },
                ].map((item, index) => (
                  <div
                    key={item.dept}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/5 transition-all duration-300 group animate-slide-up"
                    style={{ animationDelay: `${1100 + index * 100}ms` }}
                  >
                    <span className="text-sm group-hover:text-primary transition-colors duration-300">{item.dept}</span>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full animate-pulse bg-${item.color}-500`}></div>
                      <span className="text-xs text-muted-foreground">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card
            className="interactive-card glass-effect border-primary/20 animate-slide-up"
            style={{ animationDelay: "1200ms" }}
          >
            <CardHeader>
              <CardTitle className="text-primary">Critical Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-200 hover:shadow-lg transition-all duration-300 cursor-pointer group animate-bounce-in">
                  <div className="h-2 w-2 rounded-full bg-red-500 mt-2 animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-900 group-hover:text-red-700 transition-colors duration-300">
                      Patient in Room 205
                    </p>
                    <p className="text-xs text-red-700">Vital signs critical - immediate attention required</p>
                  </div>
                </div>
                <div
                  className="flex items-start gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200 hover:shadow-lg transition-all duration-300 cursor-pointer group animate-bounce-in"
                  style={{ animationDelay: "100ms" }}
                >
                  <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2 animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-yellow-900 group-hover:text-yellow-700 transition-colors duration-300">
                      Medication Stock Low
                    </p>
                    <p className="text-xs text-yellow-700">Insulin supply running low - reorder needed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
