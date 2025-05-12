"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, Plus, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

type FoodItem = {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  serving_size: string
  serving_unit: string
}

export function FoodSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<FoodItem[]>([])
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // Mock food database
  const foodDatabase: FoodItem[] = [
    {
      id: "1",
      name: "Chicken Breast",
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      serving_size: "100",
      serving_unit: "g",
    },
    {
      id: "2",
      name: "Brown Rice",
      calories: 112,
      protein: 2.6,
      carbs: 23.5,
      fat: 0.9,
      serving_size: "100",
      serving_unit: "g",
    },
    {
      id: "3",
      name: "Broccoli",
      calories: 34,
      protein: 2.8,
      carbs: 6.6,
      fat: 0.4,
      serving_size: "100",
      serving_unit: "g",
    },
    {
      id: "4",
      name: "Salmon",
      calories: 208,
      protein: 20,
      carbs: 0,
      fat: 13,
      serving_size: "100",
      serving_unit: "g",
    },
    {
      id: "5",
      name: "Sweet Potato",
      calories: 86,
      protein: 1.6,
      carbs: 20.1,
      fat: 0.1,
      serving_size: "100",
      serving_unit: "g",
    },
    {
      id: "6",
      name: "Avocado",
      calories: 160,
      protein: 2,
      carbs: 8.5,
      fat: 14.7,
      serving_size: "100",
      serving_unit: "g",
    },
    {
      id: "7",
      name: "Greek Yogurt",
      calories: 59,
      protein: 10,
      carbs: 3.6,
      fat: 0.4,
      serving_size: "100",
      serving_unit: "g",
    },
    {
      id: "8",
      name: "Banana",
      calories: 89,
      protein: 1.1,
      carbs: 22.8,
      fat: 0.3,
      serving_size: "100",
      serving_unit: "g",
    },
    {
      id: "9",
      name: "Egg",
      calories: 155,
      protein: 12.6,
      carbs: 1.1,
      fat: 10.6,
      serving_size: "100",
      serving_unit: "g",
    },
    {
      id: "10",
      name: "Spinach",
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fat: 0.4,
      serving_size: "100",
      serving_unit: "g",
    },
  ]

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      const results = foodDatabase.filter((food) => food.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setSearchResults(results)
      setIsSearching(false)
    }, 800)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleAddFood = (food: FoodItem) => {
    toast({
      title: "Food added",
      description: `${food.name} has been added to your meal.`,
    })
  }

  const handleViewDetails = (food: FoodItem) => {
    setSelectedFood(food)
    setIsDetailOpen(true)
  }

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults([])
    }
  }, [searchQuery])

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for foods..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button onClick={handleSearch} disabled={isSearching}>
          {isSearching ? "Searching..." : "Search"}
        </Button>
      </div>

      {isSearching ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <div className="flex gap-2">
                      <Skeleton className="h-4 w-[60px]" />
                      <Skeleton className="h-4 w-[60px]" />
                      <Skeleton className="h-4 w-[60px]" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-9 rounded-md" />
                    <Skeleton className="h-9 w-9 rounded-md" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : searchResults.length > 0 ? (
        <div className="space-y-2">
          {searchResults.map((food) => (
            <Card key={food.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{food.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="outline">{food.calories} cal</Badge>
                      <Badge variant="outline">P: {food.protein}g</Badge>
                      <Badge variant="outline">C: {food.carbs}g</Badge>
                      <Badge variant="outline">F: {food.fat}g</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleViewDetails(food)}>
                      <Info className="h-4 w-4" />
                      <span className="sr-only">View details</span>
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleAddFood(food)}>
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add food</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : searchQuery !== "" ? (
        <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
          <div className="flex flex-col items-center gap-1 text-center">
            <Search className="h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-medium">No results found</h3>
            <p className="text-sm text-muted-foreground">Try a different search term</p>
          </div>
        </div>
      ) : null}

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedFood?.name}</DialogTitle>
            <DialogDescription>
              Nutritional information per {selectedFood?.serving_size} {selectedFood?.serving_unit}
            </DialogDescription>
          </DialogHeader>
          {selectedFood && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Calories</div>
                  <div className="text-2xl font-bold">{selectedFood.calories}</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Serving Size</div>
                  <div className="text-2xl font-bold">
                    {selectedFood.serving_size} {selectedFood.serving_unit}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Protein</div>
                  <div className="text-xl font-bold">{selectedFood.protein}g</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Carbs</div>
                  <div className="text-xl font-bold">{selectedFood.carbs}g</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm text-muted-foreground">Fat</div>
                  <div className="text-xl font-bold">{selectedFood.fat}g</div>
                </div>
              </div>

              <Button className="w-full" onClick={() => handleAddFood(selectedFood)}>
                <Plus className="mr-2 h-4 w-4" />
                Add to Meal
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
