"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card } from "@/components/ui/card"

const data = [
  {
    date: "Mon",
    calories: 1850,
  },
  {
    date: "Tue",
    calories: 2100,
  },
  {
    date: "Wed",
    calories: 1950,
  },
  {
    date: "Thu",
    calories: 2200,
  },
  {
    date: "Fri",
    calories: 1800,
  },
  {
    date: "Sat",
    calories: 2300,
  },
  {
    date: "Sun",
    calories: 2000,
  },
]

export function CalorieChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
          domain={["dataMin - 200", "dataMax + 200"]}
        />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <Card className="p-2 shadow-md">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-sm font-medium">{payload[0].value} calories</span>
                    </div>
                  </div>
                </Card>
              )
            }
            return null
          }}
        />
        <Area
          type="monotone"
          dataKey="calories"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.2}
          className="stroke-primary fill-primary"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
