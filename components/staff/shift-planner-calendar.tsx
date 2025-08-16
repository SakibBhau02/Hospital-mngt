"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Shift {
  id: string
  staffId: string
  staffName: string
  department: string
  date: string
  startTime: string
  endTime: string
  shiftType: string
  status: string
  avatar: string
}

interface ShiftPlannerCalendarProps {
  shifts: Shift[]
  selectedDate: Date
  viewMode: string
}

export function ShiftPlannerCalendar({ shifts, selectedDate, viewMode }: ShiftPlannerCalendarProps) {
  const getWeekDays = (date: Date) => {
    const week = []
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day
    startOfWeek.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      week.push(day)
    }
    return week
  }

  const timeSlots = [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ]

  if (viewMode === "week") {
    const weekDays = getWeekDays(selectedDate)

    return (
      <div className="space-y-4">
        {/* Week View */}
        <div className="grid grid-cols-8 gap-2">
          {/* Time column header */}
          <div className="text-center font-medium text-sm p-2">Time</div>

          {/* Day headers */}
          {weekDays.map((day) => (
            <div key={day.toISOString()} className="text-center font-medium text-sm p-2 border-b">
              <div>{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
              <div className="text-xs text-muted-foreground">{day.getDate()}</div>
            </div>
          ))}

          {/* Time slots */}
          {timeSlots.map((time) => (
            <div key={time} className="contents">
              <div className="text-xs text-muted-foreground p-2 border-r">{time}</div>
              {weekDays.map((day) => {
                const dayShifts = shifts.filter((shift) => {
                  const shiftDate = new Date(shift.date)
                  return (
                    shiftDate.toDateString() === day.toDateString() && shift.startTime <= time && shift.endTime > time
                  )
                })

                return (
                  <div key={`${day.toISOString()}-${time}`} className="p-1 border-r border-b min-h-[60px]">
                    {dayShifts.map((shift) => (
                      <div
                        key={shift.id}
                        className="mb-1 p-2 bg-primary/10 border border-primary/20 rounded text-xs hover:bg-primary/20 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-1">
                          <Avatar className="h-4 w-4">
                            <AvatarImage src={shift.avatar || "/placeholder.svg"} alt={shift.staffName} />
                            <AvatarFallback className="text-xs">
                              {shift.staffName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="truncate">{shift.staffName.split(" ")[1]}</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {shift.startTime}-{shift.endTime}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Month view placeholder
  return <div className="text-center py-8 text-muted-foreground">Month view implementation coming soon</div>
}
