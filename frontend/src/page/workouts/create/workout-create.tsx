import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Clock, Dumbbell, Plus, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"

const exerciseSchema = z.object({
  name: z.string().min(1, { message: "Exercise name is required" }),
  sets: z.string().min(1, { message: "Number of sets is required" }),
  reps: z.string().min(1, { message: "Reps information is required" }),
  rest: z.string().min(1, { message: "Rest time is required" }),
  description: z.string().optional(),
})

const workoutFormSchema = z.object({
  title: z.string().min(2, {
    message: "Workout title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  duration: z.string().min(1, {
    message: "Duration is required.",
  }),
  level: z.string({
    required_error: "Please select a difficulty level.",
  }),
  category: z.string({
    required_error: "Please select a workout category.",
  }),
  exercises: z.array(exerciseSchema).min(1, {
    message: "Add at least one exercise to your workout.",
  }),
})

type WorkoutFormValues = z.infer<typeof workoutFormSchema>

export default function CreateWorkoutPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<WorkoutFormValues>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: "",
      level: "",
      category: "",
      exercises: [
        {
          name: "",
          sets: "",
          reps: "",
          rest: "",
          description: "",
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "exercises",
  })

  function onSubmit(_data: WorkoutFormValues) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Workout created",
        description: "Your workout has been created successfully.",
      })
      navigate("/workouts")
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container w-full p-8"
    >
      <div className="mb-8">
        <Button variant="ghost" className="mb-2" onClick={() => navigate("/workouts")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create Workout</h1>
        <p className="text-muted-foreground">Design a new workout routine for your fitness plan.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Workout Details</CardTitle>
              <CardDescription>Enter the basic information about your workout.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workout Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Full Body Strength" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the workout and its benefits"
                        className="resize-none min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <div className="flex items-center">
                          <Input type="number" {...field} />
                          <Clock className="ml-2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="strength">Strength</SelectItem>
                          <SelectItem value="cardio">Cardio</SelectItem>
                          <SelectItem value="hiit">HIIT</SelectItem>
                          <SelectItem value="flexibility">Flexibility</SelectItem>
                          <SelectItem value="core">Core</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Exercises</CardTitle>
                <CardDescription>Add exercises to your workout routine.</CardDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    name: "",
                    sets: "",
                    reps: "",
                    rest: "",
                    description: "",
                  })
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Exercise
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {fields.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <Dumbbell className="mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-medium">No exercises added</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Add exercises to create a complete workout routine.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      append({
                        name: "",
                        sets: "",
                        reps: "",
                        rest: "",
                        description: "",
                      })
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Exercise
                  </Button>
                </div>
              ) : (
                fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-lg border p-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Exercise {index + 1}</h3>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove exercise</span>
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`exercises.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Exercise Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Barbell Squats" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <FormField
                          control={form.control}
                          name={`exercises.${index}.sets`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sets</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 3" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`exercises.${index}.reps`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Reps</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 10-12" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`exercises.${index}.rest`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rest Time</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 60 sec" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`exercises.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe how to perform this exercise"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {index < fields.length - 1 && <Separator className="mt-4" />}
                  </motion.div>
                ))
              )}

              {fields.length > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    append({
                      name: "",
                      sets: "",
                      reps: "",
                      rest: "",
                      description: "",
                    })
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Another Exercise
                </Button>
              )}

              {form.formState.errors.exercises?.root && (
                <p className="text-sm font-medium text-destructive">{form.formState.errors.exercises.root.message}</p>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={() => navigate("/workouts")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                "Creating workout..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Create Workout
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  )
}
