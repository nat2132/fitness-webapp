"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card } from "@/components/ui/card"

const data = [
  {
    name: "Mon",
    calories: 420,
    minutes: 45,
  },
  {
    name: "Tue",
    calories: 380,
    minutes: 40,
  },
  {
    name: "Wed",
    calories: 650,
    minutes: 65,
  },
  {
    name: "Thu",
    calories: 410,
    minutes: 45,
  },
  {
    name: "Fri",
    calories: 590,
    minutes: 60,
  },
  {
    name: "Sat",
    calories: 720,
    minutes: 75,
  },
  {
    name: "Sun",
    calories: 0,
    minutes: 0,
  },
]

export function ActivityChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
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
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                      <span className="text-sm font-medium">{payload[1].value} minutes</span>
                    </div>
                  </div>
                </Card>
              )
            }
            return null
          }}
        />
        <Bar dataKey="calories" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} className="fill-primary" />
        <Bar
          dataKey="minutes"
          fill="hsl(var(--muted-foreground))"
          radius={[4, 4, 0, 0]}
          className="fill-muted-foreground"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
