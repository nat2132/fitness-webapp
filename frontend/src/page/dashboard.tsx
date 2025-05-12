import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Activity, Calendar, Dumbbell, LineChart, Plus, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ActivityChart } from "@/components/activity-chart"
import { WeightChart } from "@/components/weight-chart"
import { CalorieChart } from "@/components/calorie-chart"
import { RecentActivities } from "@/components/recent-activities"

export default function DashboardPage() {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-4 sm:gap-8 py-4 sm:py-8"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Welcome back, John! Here&apos;s an overview of your fitness journey.</p>
        </div>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <Link to="/activity/log">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Log Activity
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={() => {}}>
        <div className="overflow-x-auto pb-2">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Weekly Workouts</CardTitle>
                  <Dumbbell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4/5</div>
                  <p className="text-xs text-muted-foreground">+2 from last week</p>
                  <Progress value={80} className="mt-2" />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,248</div>
                  <p className="text-xs text-muted-foreground">+189 from yesterday</p>
                  <Progress value={62} className="mt-2" />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Nutrition Goals</CardTitle>
                  <Utensils className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,840/2,200</div>
                  <p className="text-xs text-muted-foreground">Calories consumed today</p>
                  <Progress value={84} className="mt-2" />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Weight Progress</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">182 lbs</div>
                  <p className="text-xs text-muted-foreground">-2.5 lbs this month</p>
                  <Progress value={70} className="mt-2" />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Activity Overview</CardTitle>
                  <CardDescription>Your workout activity for the past 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <ActivityChart />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Upcoming Workouts</CardTitle>
                  <CardDescription>Your scheduled workouts for the week</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] overflow-auto">
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-lg border p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Dumbbell className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold">Upper Body Strength</h4>
                        <p className="text-xs text-muted-foreground">Tomorrow, 6:00 AM</p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                        <Calendar className="mr-2 h-4 w-4" />
                        Details
                      </Button>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-lg border p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Activity className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold">HIIT Cardio</h4>
                        <p className="text-xs text-muted-foreground">Wednesday, 5:30 PM</p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                        <Calendar className="mr-2 h-4 w-4" />
                        Details
                      </Button>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-lg border p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Dumbbell className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold">Lower Body Focus</h4>
                        <p className="text-xs text-muted-foreground">Friday, 7:00 AM</p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                        <Calendar className="mr-2 h-4 w-4" />
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your most recent workouts and meals</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivities />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="workouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workout History</CardTitle>
              <CardDescription>Track your workout progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Workout content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Tracking</CardTitle>
              <CardDescription>Monitor your caloric intake and macronutrients</CardDescription>
            </CardHeader>
            <CardContent>
              <CalorieChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weight Progress</CardTitle>
              <CardDescription>Track your weight changes over time</CardDescription>
            </CardHeader>
            <CardContent>
              <WeightChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
