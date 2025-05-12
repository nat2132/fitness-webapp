import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Calendar, Filter, Plus, Search, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalorieChart } from "@/components/calorie-chart"
import { NutritionPieChart } from "@/components/nutrition-pie-chart"
import { MealCard } from "@/components/meal-card"

export default function MealsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const todayMeals = [
    {
      id: "1",
      title: "Breakfast",
      time: "7:30 AM",
      calories: 450,
      protein: 25,
      carbs: 45,
      fat: 15,
      items: [
        { name: "Oatmeal with berries", calories: 320 },
        { name: "Greek yogurt", calories: 100 },
        { name: "Black coffee", calories: 30 },
      ],
    },
    {
      id: "2",
      title: "Lunch",
      time: "12:30 PM",
      calories: 650,
      protein: 40,
      carbs: 60,
      fat: 25,
      items: [
        { name: "Grilled chicken salad", calories: 450 },
        { name: "Whole grain bread", calories: 120 },
        { name: "Apple", calories: 80 },
      ],
    },
    {
      id: "3",
      title: "Dinner",
      time: "7:00 PM",
      calories: 750,
      protein: 45,
      carbs: 65,
      fat: 30,
      items: [
        { name: "Salmon fillet", calories: 350 },
        { name: "Brown rice", calories: 200 },
        { name: "Steamed vegetables", calories: 120 },
        { name: "Olive oil", calories: 80 },
      ],
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-8 p-8"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meal Tracking</h1>
          <p className="text-muted-foreground">Monitor your nutrition and track your meals.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/log/meal">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Log Meal
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search meals..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Calendar className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Daily Calories</CardTitle>
              <CardDescription>Caloric intake for the past 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <CalorieChart />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Macronutrient Breakdown</CardTitle>
              <CardDescription>Today's macronutrient distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <NutritionPieChart />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {todayMeals.map((meal, index) => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <MealCard meal={meal} />
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Card className="flex h-full flex-col items-center justify-center p-6 text-center">
                <Utensils className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Add another meal</h3>
                <p className="mt-2 text-sm text-muted-foreground">Track your snacks and additional meals</p>
                <Link to="/log/meal" className="mt-4">
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Log Meal
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Meal History</CardTitle>
              <CardDescription>View your past meals and nutrition data</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Meal history will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Favorite Meals</CardTitle>
              <CardDescription>Quick access to your frequently logged meals</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Your favorite meals will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
