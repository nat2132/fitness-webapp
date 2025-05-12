import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, CheckCircle, Clock, Dumbbell, Play, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"

export default function WorkoutDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [isStarting, setIsStarting] = useState(false)

  // Mock workout data - in a real app, this would be fetched based on the ID
  const workout = {
    id: id,
    title: "Full Body Strength",
    description: "A comprehensive workout targeting all major muscle groups for overall strength and conditioning.",
    duration: "45 min",
    level: "Intermediate",
    category: "Strength",
    calories: "320",
    exercises: [
      {
        name: "Barbell Squats",
        sets: 3,
        reps: "10-12",
        rest: "60 sec",
        description:
          "Stand with feet shoulder-width apart, barbell across upper back. Bend knees to lower body, then return to standing.",
      },
      {
        name: "Push-ups",
        sets: 3,
        reps: "12-15",
        rest: "45 sec",
        description:
          "Start in plank position with hands slightly wider than shoulders. Lower chest to floor, then push back up.",
      },
      {
        name: "Bent-over Rows",
        sets: 3,
        reps: "10-12",
        rest: "60 sec",
        description:
          "Bend at hips with slight knee bend, back flat. Pull weight to lower ribs, squeezing shoulder blades.",
      },
      {
        name: "Dumbbell Lunges",
        sets: 3,
        reps: "10 each leg",
        rest: "45 sec",
        description:
          "Hold dumbbells at sides, step forward into lunge position. Lower back knee toward floor, then push back to start.",
      },
      {
        name: "Shoulder Press",
        sets: 3,
        reps: "10-12",
        rest: "60 sec",
        description: "Sit or stand with dumbbells at shoulder height. Press weights overhead until arms are extended.",
      },
      {
        name: "Plank",
        sets: 3,
        reps: "30-60 sec",
        rest: "30 sec",
        description: "Hold forearm plank position with body in straight line from head to heels.",
      },
    ],
  }

  const startWorkout = () => {
    setIsStarting(true)
    setTimeout(() => {
      setIsStarting(false)
      navigate(`/workouts/${id}/active`)
      toast({
        title: "Workout started",
        description: "Your workout has been started. Good luck!",
      })
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container w-full p-8"
    >
      <div className="mb-8 ">
        <Button variant="ghost" className="mb-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{workout.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge variant="secondary">
                <Dumbbell className="mr-1 h-3 w-3" />
                {workout.category}
              </Badge>
              <Badge variant="outline">
                <Clock className="mr-1 h-3 w-3" />
                {workout.duration}
              </Badge>
              <Badge variant="outline">{workout.level}</Badge>
              <Badge variant="outline">{workout.calories} cal</Badge>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button onClick={startWorkout} disabled={isStarting}>
              {isStarting ? (
                "Starting..."
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Start Workout
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Workout Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{workout.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exercises</CardTitle>
            <CardDescription>Complete all exercises in order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {workout.exercises.map((exercise, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="rounded-lg border p-4"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-semibold">{exercise.name}</h3>
                      <p className="text-sm text-muted-foreground">{exercise.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                      <Badge variant="outline">{exercise.sets} sets</Badge>
                      <Badge variant="outline">{exercise.reps}</Badge>
                      <Badge variant="outline">{exercise.rest} rest</Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>History</CardTitle>
            <CardDescription>Your previous completions of this workout</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">May 22, 2023</p>
                  <p className="text-sm text-muted-foreground">Completed all exercises</p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">May 15, 2023</p>
                  <p className="text-sm text-muted-foreground">Completed 5/6 exercises</p>
                </div>
                <Progress value={83} className="w-[100px]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
