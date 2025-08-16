import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Bed, AlertTriangle } from "lucide-react"

const stats = [
  {
    title: "Total Patients",
    value: "2,847",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Today's Appointments",
    value: "156",
    change: "+8%",
    changeType: "positive" as const,
    icon: Calendar,
  },
  {
    title: "Available Beds",
    value: "23",
    change: "-5%",
    changeType: "negative" as const,
    icon: Bed,
  },
  {
    title: "Critical Cases",
    value: "7",
    change: "+2",
    changeType: "warning" as const,
    icon: AlertTriangle,
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={stat.title}
          className="interactive-card glass-effect group cursor-pointer animate-slide-up border-primary/20 hover:border-primary/40"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
              {stat.title}
            </CardTitle>
            <div className="relative">
              <stat.icon className="h-5 w-5 text-primary/70 group-hover:text-primary transition-all duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 rounded-full animate-pulse-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 animate-bounce-in">
              {stat.value}
            </div>
            <p
              className={`text-xs font-medium transition-all duration-300 ${
                stat.changeType === "positive"
                  ? "text-emerald-600 group-hover:text-emerald-500"
                  : stat.changeType === "negative"
                    ? "text-red-600 group-hover:text-red-500"
                    : "text-amber-600 group-hover:text-amber-500"
              }`}
            >
              <span className="group-hover:animate-shimmer">{stat.change} from last month</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
