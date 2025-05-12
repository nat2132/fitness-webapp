import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card } from "@/components/ui/card"

const data = [
  {
    date: "Jan",
    weight: 195,
  },
  {
    date: "Feb",
    weight: 192,
  },
  {
    date: "Mar",
    weight: 190,
  },
  {
    date: "Apr",
    weight: 187,
  },
  {
    date: "May",
    weight: 184,
  },
  {
    date: "Jun",
    weight: 182,
  },
]

export function WeightChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} lbs`}
          domain={["dataMin - 5", "dataMax + 5"]}
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
                      <span className="text-sm font-medium">{payload[0].value} lbs</span>
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
          dataKey="weight"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.2}
          className="stroke-primary fill-primary"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
