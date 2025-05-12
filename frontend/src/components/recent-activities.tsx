import { Activity, Dumbbell, Utensils } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const activities = [
  {
    id: 1,
    type: "workout",
    title: "Upper Body Strength",
    time: "Today, 7:30 AM",
    duration: "45 min",
    calories: 320,
    icon: <Dumbbell className="h-4 w-4" />,
    iconColor: "bg-blue-500",
  },
  {
    id: 2,
    type: "meal",
    title: "Lunch",
    time: "Today, 12:30 PM",
    calories: 650,
    items: ["Grilled chicken salad", "Whole grain bread", "Apple"],
    icon: <Utensils className="h-4 w-4" />,
    iconColor: "bg-green-500",
  },
  {
    id: 3,
    type: "activity",
    title: "Evening Walk",
    time: "Today, 6:00 PM",
    duration: "30 min",
    calories: 180,
    icon: <Activity className="h-4 w-4" />,
    iconColor: "bg-orange-500",
  },
  {
    id: 4,
    type: "meal",
    title: "Breakfast",
    time: "Today, 7:30 AM",
    calories: 450,
    items: ["Oatmeal with berries", "Greek yogurt", "Black coffee"],
    icon: <Utensils className="h-4 w-4" />,
    iconColor: "bg-green-500",
  },
  {
    id: 5,
    type: "workout",
    title: "HIIT Cardio",
    time: "Yesterday, 5:30 PM",
    duration: "30 min",
    calories: 380,
    icon: <Dumbbell className="h-4 w-4" />,
    iconColor: "bg-blue-500",
  },
]

export function RecentActivities() {
  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3 rounded-lg border p-3">
          <Avatar className={`h-9 w-9 sm:h-10 sm:w-10 ${activity.iconColor} text-white shrink-0`}>
            <AvatarFallback className="bg-transparent">{activity.icon}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h4 className="text-sm font-semibold truncate">{activity.title}</h4>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {activity.type === "meal" ? (
                <div>
                  <p>{activity.calories} calories</p>
                  <p className="mt-1 truncate sm:normal-case">{activity.items?.join(", ")}</p>
                </div>
              ) : (
                <div>
                  <p>
                    {activity.duration} • {activity.calories} calories
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
