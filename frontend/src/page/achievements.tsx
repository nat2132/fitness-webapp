import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Award, Check, Dumbbell, Heart, Lock, Medal, Star, Trophy, Utensils } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Achievement types
type AchievementStatus = "completed" | "in-progress" | "locked"
type AchievementCategory = "workout" | "nutrition" | "progress" | "special"

interface Achievement {
  id: string
  title: string
  description: string
  category: AchievementCategory
  icon: React.ReactNode
  status: AchievementStatus
  progress?: number
  requirement: string
  reward: string
  date?: string
}

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Mock achievements data
  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Workout",
      description: "Complete your first workout session",
      category: "workout",
      icon: <Dumbbell className="h-6 w-6" />,
      status: "completed",
      progress: 100,
      requirement: "Complete 1 workout",
      reward: "10 points",
      date: "May 15, 2023",
    },
    {
      id: "2",
      title: "Workout Streak",
      description: "Complete workouts for 7 consecutive days",
      category: "workout",
      icon: <Award className="h-6 w-6" />,
      status: "in-progress",
      progress: 57,
      requirement: "Complete 7 consecutive days of workouts",
      reward: "50 points",
    },
    {
      id: "3",
      title: "Strength Master",
      description: "Complete 20 strength training workouts",
      category: "workout",
      icon: <Trophy className="h-6 w-6" />,
      status: "in-progress",
      progress: 35,
      requirement: "Complete 20 strength workouts",
      reward: "100 points",
    },
    {
      id: "4",
      title: "Nutrition Tracker",
      description: "Log your meals for 10 consecutive days",
      category: "nutrition",
      icon: <Utensils className="h-6 w-6" />,
      status: "completed",
      progress: 100,
      requirement: "Log meals for 10 consecutive days",
      reward: "50 points",
      date: "May 22, 2023",
    },
    {
      id: "5",
      title: "Protein Champion",
      description: "Meet your protein goal for 14 days",
      category: "nutrition",
      icon: <Medal className="h-6 w-6" />,
      status: "in-progress",
      progress: 64,
      requirement: "Meet protein goal for 14 days",
      reward: "75 points",
    },
    {
      id: "6",
      title: "Hydration Hero",
      description: "Track water intake for 30 days",
      category: "nutrition",
      icon: <Award className="h-6 w-6" />,
      status: "locked",
      requirement: "Track water intake for 30 days",
      reward: "100 points",
    },
    {
      id: "7",
      title: "Weight Goal Achieved",
      description: "Reach your target weight goal",
      category: "progress",
      icon: <Star className="h-6 w-6" />,
      status: "locked",
      requirement: "Reach your target weight",
      reward: "200 points",
    },
    {
      id: "8",
      title: "Body Fat Milestone",
      description: "Reduce body fat percentage by 5%",
      category: "progress",
      icon: <Heart className="h-6 w-6" />,
      status: "in-progress",
      progress: 40,
      requirement: "Reduce body fat by 5%",
      reward: "150 points",
    },
    {
      id: "9",
      title: "Marathon Ready",
      description: "Run a total of 100 miles",
      category: "progress",
      icon: <Trophy className="h-6 w-6" />,
      status: "in-progress",
      progress: 22,
      requirement: "Run 100 miles total",
      reward: "250 points",
    },
    {
      id: "10",
      title: "Early Bird",
      description: "Complete 10 workouts before 8 AM",
      category: "special",
      icon: <Medal className="h-6 w-6" />,
      status: "in-progress",
      progress: 30,
      requirement: "Complete 10 early morning workouts",
      reward: "75 points",
    },
    {
      id: "11",
      title: "Weekend Warrior",
      description: "Complete workouts on 8 consecutive weekends",
      category: "special",
      icon: <Award className="h-6 w-6" />,
      status: "locked",
      requirement: "Complete workouts on 8 consecutive weekends",
      reward: "100 points",
    },
    {
      id: "12",
      title: "Fitness Enthusiast",
      description: "Use the app for 30 consecutive days",
      category: "special",
      icon: <Star className="h-6 w-6" />,
      status: "completed",
      progress: 100,
      requirement: "Use the app for 30 consecutive days",
      reward: "150 points",
      date: "June 1, 2023",
    },
  ]

  // Filter achievements based on selected category
  const filteredAchievements =
    selectedCategory === "all"
      ? achievements
      : achievements.filter((achievement) => achievement.category === selectedCategory)

  // Count achievements by status
  const completedCount = achievements.filter((a) => a.status === "completed").length
  const inProgressCount = achievements.filter((a) => a.status === "in-progress").length
  const lockedCount = achievements.filter((a) => a.status === "locked").length
  const totalPoints = achievements
    .filter((a) => a.status === "completed")
    .reduce((total, a) => total + Number.parseInt(a.reward.split(" ")[0]), 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-8 p-8"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
        <p className="text-muted-foreground">Track your fitness milestones and accomplishments.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {completedCount}/{achievements.length}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round((completedCount / achievements.length) * 100)}% completed
              </p>
              <Progress value={(completedCount / achievements.length) * 100} className="mt-2" />
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
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressCount}</div>
              <p className="text-xs text-muted-foreground">Achievements you're working towards</p>
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
              <CardTitle className="text-sm font-medium">Locked</CardTitle>
              <Lock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lockedCount}</div>
              <p className="text-xs text-muted-foreground">Achievements yet to be unlocked</p>
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
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPoints}</div>
              <p className="text-xs text-muted-foreground">Points earned from achievements</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="all" className="space-y-4" onValueChange={setSelectedCategory}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="workout">Workout</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="special">Special</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <AchievementCard achievement={achievement} />
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const iconColors = {
    completed: "text-green-500",
    "in-progress": "text-blue-500",
    locked: "text-gray-400 dark:text-gray-500",
  }

  return (
    <Card
      className={cn(
        "transition-all duration-200 h-full",
        achievement.status === "completed" ? "border-green-200 dark:border-green-900" : "",
        achievement.status === "locked" ? "opacity-70" : "",
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div
            className={cn(
              "p-2 rounded-full",
              achievement.status === "completed" ? "bg-green-100 dark:bg-green-900/30" : "",
              achievement.status === "in-progress" ? "bg-blue-100 dark:bg-blue-900/30" : "",
              achievement.status === "locked" ? "bg-gray-100 dark:bg-gray-800" : "",
            )}
          >
            <div className={cn("h-8 w-8", iconColors[achievement.status])}>{achievement.icon}</div>
          </div>
          <Badge
            variant={achievement.status === "completed" ? "default" : "outline"}
            className={cn(
              achievement.status === "completed" ? "bg-green-500" : "",
              achievement.status === "in-progress" ? "text-blue-500" : "",
              achievement.status === "locked" ? "text-gray-400" : "",
            )}
          >
            {achievement.status === "completed" && <Check className="mr-1 h-3 w-3" />}
            {achievement.status === "completed"
              ? "Completed"
              : achievement.status === "in-progress"
                ? "In Progress"
                : "Locked"}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-2">{achievement.title}</CardTitle>
        <CardDescription>{achievement.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {achievement.status === "in-progress" && achievement.progress && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Progress</span>
              <span>{achievement.progress}%</span>
            </div>
            <Progress value={achievement.progress} className="h-2" />
          </div>
        )}
        <div className="text-sm">
          <p className="text-muted-foreground">
            <span className="font-medium">Requirement:</span> {achievement.requirement}
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">Reward:</span> {achievement.reward}
          </p>
          {achievement.date && (
            <p className="text-muted-foreground mt-2">
              <span className="font-medium">Achieved:</span> {achievement.date}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
