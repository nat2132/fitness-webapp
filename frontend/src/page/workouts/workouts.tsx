import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Plus, Filter, Search, Dumbbell, Clock, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Sample workout data
const workouts = [
    {
    id: 1,
    title: "Upper Body Strength",
    description: "Focus on chest, shoulders, and triceps",
      duration: "45 min",
      level: "Intermediate",
    calories: 320,
      category: "Strength",
    tags: ["chest", "arms", "shoulders"]
    },
    {
    id: 2,
    title: "HIIT Cardio",
    description: "High-intensity interval training for maximum calorie burn",
      duration: "30 min",
      level: "Advanced",
    calories: 400,
      category: "Cardio",
    tags: ["cardio", "fat-burn", "intense"]
    },
    {
    id: 3,
    title: "Lower Body Focus",
    description: "Target your quads, hamstrings, and glutes",
    duration: "40 min",
      level: "Beginner",
    calories: 280,
    category: "Strength",
    tags: ["legs", "glutes", "core"]
  },
  {
    id: 4,
    title: "Yoga Flow",
    description: "Improve flexibility and mindfulness",
    duration: "50 min",
    level: "All levels",
    calories: 200,
    category: "Flexibility",
    tags: ["yoga", "stretching", "relaxation"]
  },
    {
    id: 5,
    title: "Core Crusher",
    description: "Strengthen your abs and lower back",
    duration: "25 min",
      level: "Intermediate",
    calories: 240,
      category: "Strength",
    tags: ["abs", "core", "strength"]
    },
    {
    id: 6,
    title: "Full Body Circuit",
    description: "Total body workout to build strength and endurance",
    duration: "60 min",
    level: "Advanced",
    calories: 450,
      category: "Strength",
    tags: ["full-body", "circuit", "strength"]
    },
  ]

export default function WorkoutsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-4 sm:gap-8 py-4 sm:py-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Workouts</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Browse workouts or create your own custom routine
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/workouts/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Workout
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search workouts..."
            className="w-full pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2 items-center w-full sm:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="strength">Strength</SelectItem>
              <SelectItem value="cardio">Cardio</SelectItem>
              <SelectItem value="flexibility">Flexibility</SelectItem>
              <SelectItem value="hiit">HIIT</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="shrink-0">
          <Filter className="h-4 w-4" />
        </Button>
        </div>
      </div>

      {/* Workouts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {workouts.map((workout) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: workout.id * 0.1 }}
              >
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="line-clamp-1">{workout.title}</CardTitle>
                <CardDescription className="line-clamp-2">{workout.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  {workout.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
            ))}
          </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{workout.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-muted-foreground" />
                    <span>{workout.calories} cal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dumbbell className="h-4 w-4 text-muted-foreground" />
                    <span>{workout.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                      {workout.level}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Link to={`/workouts/${workout.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Workout
                  </Button>
                </Link>
              </CardFooter>
            </Card>
              </motion.div>
            ))}
          </div>
    </motion.div>
  )
}
