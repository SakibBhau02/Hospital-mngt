"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { department: "Cardiology", patients: 245, satisfaction: 4.8 },
  { department: "Neurology", patients: 180, satisfaction: 4.6 },
  { department: "Orthopedics", patients: 320, satisfaction: 4.7 },
  { department: "Pediatrics", patients: 290, satisfaction: 4.9 },
  { department: "Emergency", patients: 450, satisfaction: 4.2 },
  { department: "Surgery", patients: 165, satisfaction: 4.5 },
]

export function DepartmentPerformanceChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="department" stroke="#64748b" fontSize={12} angle={-45} textAnchor="end" height={80} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Bar dataKey="patients" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
