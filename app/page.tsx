"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Activity, BarChart3, Calendar, Flame, Heart, Home, Plus, Settings, Utensils, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function FitnessTracker() {
  const [calories, setCalories] = useState(1450)
  const [water, setWater] = useState(4)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [foodInput, setFoodInput] = useState("")

  const chartData = [
    { name: "Mon", calories: 1200, steps: 8000 },
    { name: "Tue", calories: 1350, steps: 10000 },
    { name: "Wed", calories: 1500, steps: 9000 },
    { name: "Thu", calories: 1200, steps: 7500 },
    { name: "Fri", calories: 1450, steps: 12000 },
    { name: "Sat", calories: 1700, steps: 11000 },
    { name: "Sun", calories: 1600, steps: 9500 },
  ]

  const handleAddFood = () => {
    if (!foodInput) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setCalories((prev) => prev + 250)
      setIsLoading(false)
      setShowSuccess(true)
      setFoodInput("")

      setTimeout(() => {
        setShowSuccess(false)
      }, 2000)
    }, 1500)
  }

  const handleAddWater = () => {
    setWater((prev) => Math.min(prev + 1, 8))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold font-[Poppins] bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent">
            FitTrack
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-[Montserrat]">Tuesday, April 6 • Keep pushing!</p>
        </header>

        <Tabs defaultValue="dashboard" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <CardTitle className="flex items-center gap-2 font-[Poppins]">
                    <Activity className="h-5 w-5" /> Daily Summary
                  </CardTitle>
                  <CardDescription className="text-blue-100 font-[Montserrat]">Your progress for today</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Flame className="h-4 w-4 text-orange-500" />
                          <span className="font-medium font-[Montserrat]">Calories</span>
                        </div>
                        <span className="text-sm font-bold">{calories} / 2000 kcal</span>
                      </div>
                      <Progress value={calories / 20} className="h-2 bg-gray-100">
                        <motion.div
                          className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${calories / 20}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </Progress>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Utensils className="h-4 w-4 text-green-500" />
                          <span className="font-medium font-[Montserrat]">Protein</span>
                        </div>
                        <span className="text-sm font-bold">85 / 120 g</span>
                      </div>
                      <Progress value={70} className="h-2 bg-gray-100">
                        <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full" />
                      </Progress>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span className="font-medium font-[Montserrat]">Steps</span>
                        </div>
                        <span className="text-sm font-bold">7,543 / 10,000</span>
                      </div>
                      <Progress value={75} className="h-2 bg-gray-100">
                        <div className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full" />
                      </Progress>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <CardTitle className="flex items-center gap-2 font-[Poppins]">
                    <BarChart3 className="h-5 w-5" /> Weekly Progress
                  </CardTitle>
                  <CardDescription className="text-orange-100 font-[Montserrat]">
                    Last 7 days of activity
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          fontFamily: "Montserrat",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="calories"
                        stroke="#3b82f6"
                        fillOpacity={1}
                        fill="url(#colorCalories)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-4">
                  <CardTitle className="text-lg flex items-center gap-2 font-[Poppins]">
                    <Zap className="h-5 w-5" /> Quick Add
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="food" className="font-[Montserrat] text-sm font-medium">
                        Add Food
                      </Label>
                      <div className="flex mt-1.5 gap-2">
                        <motion.div
                          className="relative flex-1"
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Input
                            id="food"
                            placeholder="e.g., Chicken Salad"
                            className="pr-8 font-[Montserrat] border-blue-100 focus:border-blue-300"
                            value={foodInput}
                            onChange={(e) => setFoodInput(e.target.value)}
                          />
                        </motion.div>
                        <Button
                          onClick={handleAddFood}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                          disabled={isLoading || !foodInput}
                        >
                          {isLoading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                            />
                          ) : showSuccess ? (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-white">
                              ✓
                            </motion.div>
                          ) : (
                            "Add"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
                  <CardTitle className="text-lg flex items-center gap-2 font-[Poppins]">
                    <Utensils className="h-5 w-5" /> Meals Today
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <motion.div
                      className="p-2 rounded-lg bg-blue-50 dark:bg-gray-800 flex justify-between items-center"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <span className="font-[Montserrat] text-sm">Breakfast</span>
                      <span className="text-sm font-bold">420 kcal</span>
                    </motion.div>
                    <motion.div
                      className="p-2 rounded-lg bg-blue-50 dark:bg-gray-800 flex justify-between items-center"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <span className="font-[Montserrat] text-sm">Lunch</span>
                      <span className="text-sm font-bold">650 kcal</span>
                    </motion.div>
                    <motion.div
                      className="p-2 rounded-lg bg-blue-50 dark:bg-gray-800 flex justify-between items-center"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <span className="font-[Montserrat] text-sm">Snack</span>
                      <span className="text-sm font-bold">180 kcal</span>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                  <CardTitle className="text-lg flex items-center gap-2 font-[Poppins]">
                    <Zap className="h-5 w-5" /> Hydration
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="text-center mb-2">
                    <span className="text-2xl font-bold font-[Poppins]">{water}/8</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-[Montserrat]">glasses of water</p>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`h-8 rounded-full ${i < water ? "bg-gradient-to-r from-blue-400 to-blue-500" : "bg-gray-100 dark:bg-gray-700"}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      />
                    ))}
                  </div>
                  <Button
                    onClick={handleAddWater}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                    disabled={water >= 8}
                  >
                    Add Water
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="nutrition">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="font-[Poppins]">Nutrition Details</CardTitle>
                <CardDescription className="font-[Montserrat]">Track your macros and daily intake</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 dark:text-gray-400 font-[Montserrat]">
                  Switch to the Nutrition tab to see detailed breakdown
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="font-[Poppins]">Activity Tracking</CardTitle>
                <CardDescription className="font-[Montserrat]">
                  Monitor your workouts and daily movement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 dark:text-gray-400 font-[Montserrat]">
                  Switch to the Activity tab to see your exercise history
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <motion.div className="fixed bottom-6 right-6" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          size="lg"
          className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 shadow-lg"
        >
          <Plus className="h-6 w-6" />
          <span className="sr-only">Add new entry</span>
        </Button>
      </motion.div>

      <nav className="fixed bottom-0 inset-x-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="flex justify-around">
          {[
            { icon: Home, label: "Home" },
            { icon: Activity, label: "Activity" },
            { icon: Calendar, label: "Plan" },
            { icon: Settings, label: "Settings" },
          ].map((item, index) => (
            <motion.button
              key={index}
              className="flex flex-col items-center py-2 flex-1"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <item.icon className="h-5 w-5 mb-1 text-gray-500 dark:text-gray-400" />
              <span className="text-xs font-[Montserrat] text-gray-500 dark:text-gray-400">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </nav>
    </div>
  )
}

