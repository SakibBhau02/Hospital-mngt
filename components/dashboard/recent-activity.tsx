import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const activities = [
  {
    id: 1,
    patient: "John Doe",
    action: "Admitted to ICU",
    time: "2 minutes ago",
    priority: "high" as const,
    avatar: "/patient-male.png",
  },
  {
    id: 2,
    patient: "Sarah Johnson",
    action: "Lab results ready",
    time: "15 minutes ago",
    priority: "medium" as const,
    avatar: "/patient-female.png",
  },
  {
    id: 3,
    patient: "Mike Wilson",
    action: "Appointment scheduled",
    time: "1 hour ago",
    priority: "low" as const,
    avatar: "/patient-male-2.png",
  },
  {
    id: 4,
    patient: "Emma Davis",
    action: "Prescription updated",
    time: "2 hours ago",
    priority: "medium" as const,
    avatar: "/patient-female-2.png",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.patient} />
              <AvatarFallback>
                {activity.patient
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{activity.patient}</p>
              <p className="text-sm text-muted-foreground">{activity.action}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  activity.priority === "high"
                    ? "destructive"
                    : activity.priority === "medium"
                      ? "default"
                      : "secondary"
                }
              >
                {activity.priority}
              </Badge>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
