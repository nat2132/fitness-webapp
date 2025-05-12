import { Clock, MoreHorizontal, Utensils } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface MealCardProps {
  meal: {
    id: string
    title: string
    time: string
    calories: number
    protein: number
    carbs: number
    fat: number
    items: { name: string; calories: number }[]
  }
}

export function MealCard({ meal }: MealCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          <div className="flex items-center gap-2">
            <Utensils className="h-4 w-4 text-primary" />
            {meal.title}
          </div>
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            {meal.time}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit meal</DropdownMenuItem>
              <DropdownMenuItem>Duplicate meal</DropdownMenuItem>
              <DropdownMenuItem>Delete meal</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span>Calories</span>
              <span className="font-medium">{meal.calories}</span>
            </div>
            <Progress value={meal.calories / 25} className="h-2" />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-md bg-muted p-2">
              <div className="font-medium">{meal.protein}g</div>
              <div className="text-muted-foreground">Protein</div>
            </div>
            <div className="rounded-md bg-muted p-2">
              <div className="font-medium">{meal.carbs}g</div>
              <div className="text-muted-foreground">Carbs</div>
            </div>
            <div className="rounded-md bg-muted p-2">
              <div className="font-medium">{meal.fat}g</div>
              <div className="text-muted-foreground">Fat</div>
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-medium">Food Items</h4>
            <ul className="space-y-1 text-xs">
              {meal.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span className="text-muted-foreground">{item.calories} cal</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
