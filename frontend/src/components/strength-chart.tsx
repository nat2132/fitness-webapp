import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card } from "@/components/ui/card"

const data = [
  {
    date: "Week 1",
    bench: 135,
    squat: 185,
    deadlift: 225,
  },
  {
    date: "Week 2",
    bench: 145,
    squat: 195,
    deadlift: 235,
  },
  {
    date: "Week 3",
    bench: 150,
    squat: 205,
    deadlift: 245,
  },
  {
    date: "Week 4",
    bench: 155,
    squat: 215,
    deadlift: 255,
  },
  {
    date: "Week 5",
    bench: 160,
    squat: 225,
    deadlift: 265,
  },
  {
    date: "Week 6",
    bench: 165,
    squat: 235,
    deadlift: 275,
  },
]

export function StrengthChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} lbs`}
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
                      <span className="text-sm font-medium">Bench: {payload[0].value} lbs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span className="text-sm font-medium">Squat: {payload[1].value} lbs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm font-medium">Deadlift: {payload[2].value} lbs</span>
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
          dataKey="bench"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          className="stroke-primary"
        />
        <Line
          type="monotone"
          dataKey="squat"
          stroke="#3b82f6" // blue-500
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="deadlift"
          stroke="#10b981" // green-500
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
