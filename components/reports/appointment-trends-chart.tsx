"use client"

import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { day: "Mon", scheduled: 85, completed: 78, cancelled: 7 },
  { day: "Tue", scheduled: 92, completed: 85, cancelled: 7 },
  { day: "Wed", scheduled: 78, completed: 72, cancelled: 6 },
  { day: "Thu", scheduled: 105, completed: 98, cancelled: 7 },
  { day: "Fri", scheduled: 88, completed: 82, cancelled: 6 },
  { day: "Sat", scheduled: 65, completed: 60, cancelled: 5 },
  { day: "Sun", scheduled: 45, completed: 42, cancelled: 3 },
]

export function AppointmentTrendsChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Bar dataKey="completed" fill="#10b981" radius={[2, 2, 0, 0]} />
          <Bar dataKey="cancelled" fill="#ef4444" radius={[2, 2, 0, 0]} />
          <Line
            type="monotone"
            dataKey="scheduled"
            stroke="#0ea5e9"
            strokeWidth={3}
            dot={{ fill: "#0ea5e9", strokeWidth: 2, r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
