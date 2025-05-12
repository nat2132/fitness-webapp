import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card } from "@/components/ui/card"

const data = [
  {
    date: "Week 1",
    running: 2.5,
    cycling: 8,
  },
  {
    date: "Week 2",
    running: 3,
    cycling: 10,
  },
  {
    date: "Week 3",
    running: 3.2,
    cycling: 12,
  },
  {
    date: "Week 4",
    running: 3.8,
    cycling: 13,
  },
  {
    date: "Week 5",
    running: 4.2,
    cycling: 15,
  },
  {
    date: "Week 6",
    running: 4.5,
    cycling: 16,
  },
]

export function EnduranceChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} mi/km`}
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
                      <span className="text-sm font-medium">Running: {payload[0].value} miles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span className="text-sm font-medium">Cycling: {payload[1].value} km</span>
                    </div>
                  </div>
                </Card>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          dataKey="running"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          className="stroke-primary"
        />
        <Line type="monotone" dataKey="cycling" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
