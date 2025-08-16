"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", visits: 420, admissions: 85 },
  { month: "Feb", visits: 380, admissions: 92 },
  { month: "Mar", visits: 450, admissions: 78 },
  { month: "Apr", visits: 520, admissions: 105 },
  { month: "May", visits: 480, admissions: 88 },
  { month: "Jun", visits: 590, admissions: 112 },
]

export function PatientAnalyticsChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Line
            type="monotone"
            dataKey="visits"
            stroke="#0ea5e9"
            strokeWidth={3}
            dot={{ fill: "#0ea5e9", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "#0ea5e9", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="admissions"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
