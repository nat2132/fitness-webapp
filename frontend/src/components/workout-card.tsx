import { Link } from "react-router-dom"
import { Clock, Dumbbell, MoreHorizontal, Play } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface WorkoutCardProps {
  workout: {
    id: string
    title: string
    description: string
    duration: string
    level: string
    category: string
  }
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4 text-primary" />
            {workout.title}
          </div>
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit workout</DropdownMenuItem>
            <DropdownMenuItem>Duplicate workout</DropdownMenuItem>
            <DropdownMenuItem>Delete workout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">{workout.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {workout.duration}
          </Badge>
          <Badge variant="outline">{workout.level}</Badge>
          <Badge variant="outline">{workout.category}</Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <div className="flex w-full gap-2">
          <Button asChild className="flex-1">
            <Link to={`/workouts/${workout.id}`}>
              <Play className="mr-2 h-4 w-4" />
              Start
            </Link>
          </Button>
          <Button variant="outline" asChild className="flex-1">
            <Link to={`/workouts/${workout.id}`}>Details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
