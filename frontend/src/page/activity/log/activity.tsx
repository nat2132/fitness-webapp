import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Activity as ActivityIcon, Bike, Dumbbell, Footprints, MonitorIcon as Running, Save, Trash2, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/date-picker"
import { TimePicker } from "@/components/time-picker"
import { LoadingSpinner } from "@/components/loading-spinner"
import { toast } from "@/hooks/use-toast"
import { api, type Activity, type ActivityInput } from "@/lib/api"

const activityFormSchema = z.object({
  title: z.string().min(1, {
    message: "Please enter a title for your activity.",
  }),
  type: z.string({
    required_error: "Please select an activity type.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  time: z.date({
    required_error: "Please select a time.",
  }),
  duration: z
    .string()
    .min(1, {
      message: "Please enter the duration.",
    })
    .refine((value) => Number.isInteger(Number(value)) && Number(value) >= 1, {
      message: "Duration must be a positive number of minutes.",
    }),
  calories: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value ||
        (Number.isInteger(Number(value)) && Number(value) >= 0 && value.trim() !== ""),
      {
        message: "Calories burned must be a positive number.",
      }
    ),
  notes: z.string().optional(),
})

function formatActivityDate(dateString: string): string {
  return new Date(dateString).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

export default function ActivityLogPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoadingActivities, setIsLoadingActivities] = useState(true)
  const [activitiesError, setActivitiesError] = useState("")
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const form = useForm<z.infer<typeof activityFormSchema>>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      title: "",
      type: "",
      date: new Date(),
      time: new Date(),
      duration: "",
      calories: "",
      notes: "",
    },
  })

  const loadActivities = useCallback(async () => {
    setIsLoadingActivities(true)
    setActivitiesError("")
    try {
      setActivities(await api.getActivities())
    } catch (error) {
      setActivitiesError(
        error instanceof Error ? error.message : "Failed to load activities."
      )
    } finally {
      setIsLoadingActivities(false)
    }
  }, [])

  useEffect(() => {
    loadActivities()
  }, [loadActivities])

  async function onSubmit(values: z.infer<typeof activityFormSchema>) {
    setIsLoading(true)
    try {
      const activityDate = new Date(values.date.getTime())
      activityDate.setHours(values.time.getHours(), values.time.getMinutes(), 0, 0)

      const payload: ActivityInput = {
        title: values.title,
        activityType: values.type as ActivityInput["activityType"],
        durationMinutes: Number(values.duration),
        caloriesBurned: values.calories ? Number(values.calories) : undefined,
        date: activityDate.toISOString(),
        notes: values.notes,
      }

      await api.createActivity(payload)

      toast({
        title: "Activity logged",
        description: "Your activity has been logged successfully.",
      })

      form.reset({
        title: "",
        type: "",
        date: new Date(),
        time: new Date(),
        duration: "",
        calories: "",
        notes: "",
      })
      loadActivities()
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to log activity. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id)
    try {
      await api.deleteActivity(id)
      setActivities((previous) => previous.filter((activity) => activity._id !== id))
      toast({
        title: "Activity deleted",
        description: "The activity has been removed from your log.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to delete activity. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container w-full p-8"
    >
      <div className="mb-8">
        <Button variant="ghost" className="mb-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Log Activity</h1>
        <p className="text-muted-foreground">Record your workout or physical activity.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Details</CardTitle>
          <CardDescription>Enter the details of your activity.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Morning run in the park" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="walk">
                          <div className="flex items-center">
                            <Footprints className="mr-2 h-4 w-4" />
                            Walk
                          </div>
                        </SelectItem>
                        <SelectItem value="run">
                          <div className="flex items-center">
                            <Running className="mr-2 h-4 w-4" />
                            Run
                          </div>
                        </SelectItem>
                        <SelectItem value="cycling">
                          <div className="flex items-center">
                            <Bike className="mr-2 h-4 w-4" />
                            Cycling
                          </div>
                        </SelectItem>
                        <SelectItem value="swimming">
                          <div className="flex items-center">
                            <Waves className="mr-2 h-4 w-4" />
                            Swimming
                          </div>
                        </SelectItem>
                        <SelectItem value="strength">
                          <div className="flex items-center">
                            <Dumbbell className="mr-2 h-4 w-4" />
                            Strength
                          </div>
                        </SelectItem>
                        <SelectItem value="other">
                          <div className="flex items-center">
                            <ActivityIcon className="mr-2 h-4 w-4" />
                            Other
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <DatePicker date={field.value} setDate={field.onChange} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Time</FormLabel>
                      <TimePicker date={field.value} setDate={field.onChange} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="calories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calories Burned</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>Optional.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any additional details about your workout"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional: Record how you felt, difficulty level, or other observations.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Activity
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Your Activities</CardTitle>
          <CardDescription>All activities you have logged so far.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingActivities ? (
            <div className="flex items-center justify-center py-8">
              <LoadingSpinner className="mr-2" />
              <span className="text-muted-foreground">Loading activities...</span>
            </div>
          ) : activitiesError ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <p className="text-destructive">{activitiesError}</p>
              <Button variant="outline" onClick={loadActivities}>
                Try again
              </Button>
            </div>
          ) : activities.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No activities logged yet. Use the form above to log your first one.
            </p>
          ) : (
            <ul className="divide-y">
              {activities.map((activity) => (
                <li key={activity._id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.activityType.charAt(0).toUpperCase() + activity.activityType.slice(1)}
                      {" · "}
                      {formatActivityDate(activity.date)}
                      {" · "}
                      {activity.durationMinutes} min
                      {activity.caloriesBurned !== undefined &&
                        ` · ${activity.caloriesBurned} kcal`}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive cursor-pointer"
                    disabled={deletingId === activity._id}
                    onClick={() => handleDelete(activity._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete {activity.title}</span>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
