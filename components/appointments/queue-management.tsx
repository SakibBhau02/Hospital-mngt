"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Users, ArrowRight, Play, Pause } from "lucide-react"

const queueData = [
  {
    id: "Q001",
    patientName: "John Doe",
    patientId: "P001",
    appointmentTime: "09:00",
    estimatedWait: "5 min",
    status: "waiting",
    avatar: "/patient-male.png",
  },
  {
    id: "Q002",
    patientName: "Sarah Johnson",
    patientId: "P002",
    appointmentTime: "09:30",
    estimatedWait: "15 min",
    status: "waiting",
    avatar: "/patient-female.png",
  },
  {
    id: "Q003",
    patientName: "Mike Wilson",
    patientId: "P003",
    appointmentTime: "10:00",
    estimatedWait: "25 min",
    status: "waiting",
    avatar: "/patient-male-2.png",
  },
]

export function QueueManagement() {
  const [currentServing, setCurrentServing] = useState("Emma Davis - Room 3")
  const [isRunning, setIsRunning] = useState(true)
  const [queue, setQueue] = useState(queueData)

  // Animated "Now Serving" ticker
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      // This would typically update from real-time data
      // For demo, we'll just animate the text
    }, 3000)

    return () => clearInterval(interval)
  }, [isRunning])

  const handleCallNext = () => {
    if (queue.length > 0) {
      const nextPatient = queue[0]
      setCurrentServing(`${nextPatient.patientName} - Room 3`)
      setQueue((prev) => prev.slice(1))
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Queue Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Now Serving Display */}
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary">NOW SERVING</span>
            <Button variant="ghost" size="sm" onClick={() => setIsRunning(!isRunning)}>
              {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
          <div className="text-lg font-bold animate-pulse">{currentServing}</div>
        </div>

        {/* Queue List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Waiting Queue ({queue.length})</span>
            <Button size="sm" onClick={handleCallNext} disabled={queue.length === 0}>
              <ArrowRight className="mr-2 h-4 w-4" />
              Call Next
            </Button>
          </div>

          {queue.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground text-sm">No patients in queue</div>
          ) : (
            queue.map((patient, index) => (
              <div
                key={patient.id}
                className="flex items-center gap-3 p-3 border rounded-lg transition-all hover:shadow-sm"
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {index + 1}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={patient.avatar || "/placeholder.svg"} alt={patient.patientName} />
                  <AvatarFallback>
                    {patient.patientName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{patient.patientName}</p>
                  <p className="text-xs text-muted-foreground">
                    {patient.patientId} • Appt: {patient.appointmentTime}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-xs">
                    <Clock className="mr-1 h-3 w-3" />
                    {patient.estimatedWait}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Queue Stats */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div className="text-center">
            <div className="text-lg font-bold">{queue.length}</div>
            <div className="text-xs text-muted-foreground">Waiting</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">12 min</div>
            <div className="text-xs text-muted-foreground">Avg Wait</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
