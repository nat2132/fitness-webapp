import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card } from "@/components/ui/card"

const data = [
  { name: "Protein", value: 110, color: "#3b82f6" },
  { name: "Carbs", value: 170, color: "#10b981" },
  { name: "Fat", value: 70, color: "#f59e0b" },
]

const TOTAL_CALORIES = data.reduce((sum, item) => {
  const calories = item.name === "Protein" || item.name === "Carbs" ? item.value * 4 : item.value * 9
  return sum + calories
}, 0)

export function NutritionPieChart() {
  return (
    <div className="flex flex-col items-center">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload
                  const calories = item.name === "Protein" || item.name === "Carbs" ? item.value * 4 : item.value * 9
                  return (
                    <Card className="p-2 shadow-md">
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm font-medium">
                            {item.name}: {item.value}g ({calories} calories)
                          </span>
                        </div>
                      </div>
                    </Card>
                  )
                }
                return null
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">Total Calories: {TOTAL_CALORIES}</p>
        <div className="mt-2 flex justify-center gap-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs">
                {item.name}: {item.value}g
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
