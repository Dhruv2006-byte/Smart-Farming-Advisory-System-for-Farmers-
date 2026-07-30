"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Cloud,
  Sun,
  Droplets,
  Wind,
  Thermometer,
  Sprout,
  TrendingUp,
  Calendar,
  AlertTriangle,
  Leaf,
  ArrowRight,
  IndianRupee,
  Droplet,
} from "lucide-react";
import { cn, getGreeting, getSeason, formatCurrency } from "@/lib/utils";

// Mock data for demonstration
const weatherData = {
  temp: 32,
  condition: "Partly Cloudy",
  humidity: 65,
  windSpeed: 12,
  uvIndex: 6,
  rainPrediction: "20%",
  soilMoisture: 45,
};

const farmingTip = {
  title: "Optimal Irrigation Time",
  content: "Early morning (5-7 AM) is the best time to irrigate crops. This reduces water loss due to evaporation and helps plants absorb water efficiently.",
};

const marketPrices = [
  { crop: "Wheat", price: 2425, trend: "up", change: 2.5 },
  { crop: "Rice", price: 2180, trend: "up", change: 1.8 },
  { crop: "Cotton", price: 6620, trend: "down", change: -0.5 },
];

const alerts = [
  { type: "weather", message: "Heatwave expected in next 3 days", severity: "warning" },
  { type: "pest", message: "Whitefly outbreak reported in nearby areas", severity: "danger" },
];

const upcomingTasks = [
  { task: "Irrigate wheat field", date: "Today", completed: false },
  { task: "Apply fertilizer", date: "Tomorrow", completed: false },
  { task: "Pest inspection", date: "In 2 days", completed: false },
];

const stats = [
  { label: "Total Crops", value: "5", icon: Sprout, color: "bg-green-500" },
  { label: "Active Season", value: getSeason(), icon: Sun, color: "bg-yellow-500" },
  { label: "Farm Size", value: "5.2 acres", icon: Leaf, color: "bg-emerald-500" },
  { label: "Est. Revenue", value: formatCurrency(285000), icon: IndianRupee, color: "bg-blue-500" },
];

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 pt-20 md:ml-64 md:pt-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">
            {getGreeting()}, Farmer! 👋
          </h1>
          <p className="text-muted-foreground">
            {currentTime.toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 space-y-2"
          >
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-4",
                  alert.severity === "danger"
                    ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20"
                    : "border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-900/20"
                )}
              >
                <AlertTriangle
                  className={cn(
                    "h-5 w-5",
                    alert.severity === "danger" ? "text-red-600" : "text-yellow-600"
                  )}
                />
                <span className="text-sm font-medium">{alert.message}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl border bg-card p-4 transition-all hover:shadow-md"
            >
              <div className={`mb-3 inline-flex rounded-xl ${stat.color} p-2`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Weather Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border bg-gradient-to-br from-blue-500 to-cyan-400 p-6 text-white lg:col-span-1"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Today&apos;s Weather</h2>
              <Cloud className="h-6 w-6" />
            </div>
            <div className="mb-6 flex items-center gap-4">
              <div className="text-5xl font-bold">{weatherData.temp}°C</div>
              <div>
                <p className="text-lg">{weatherData.condition}</p>
                <p className="text-sm opacity-80">Feels like {weatherData.temp + 2}°C</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4" />
                <span>Humidity: {weatherData.humidity}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4" />
                <span>Wind: {weatherData.windSpeed} km/h</span>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <span>UV Index: {weatherData.uvIndex}</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplet className="h-4 w-4" />
                <span>Rain: {weatherData.rainPrediction}</span>
              </div>
            </div>
            <Link
              href="/weather"
              className="mt-4 flex items-center gap-1 text-sm font-medium hover:underline"
            >
              View 7-day forecast
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Daily Tip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border bg-card p-6 lg:col-span-2"
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-semibold">Farming Tip of the Day</h2>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">{farmingTip.title}</h3>
            <p className="text-muted-foreground">{farmingTip.content}</p>
            <div className="mt-4 flex gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Water Management
              </span>
              <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-medium text-accent-foreground">
                Best Practice
              </span>
            </div>
          </motion.div>

          {/* Market Prices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl border bg-card p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Market Prices</h2>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              {marketPrices.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{item.crop}</span>
                  <div className="text-right">
                    <p className="font-semibold">₹{item.price}/quintal</p>
                    <p
                      className={cn(
                        "text-xs",
                        item.trend === "up" ? "text-green-600" : "text-red-600"
                      )}
                    >
                      {item.trend === "up" ? "+" : ""}
                      {item.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/market"
              className="mt-4 flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all prices
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Upcoming Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl border bg-card p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Upcoming Tasks</h2>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl bg-muted p-3"
                >
                  <div
                    className={cn(
                      "h-5 w-5 rounded-full border-2",
                      task.completed
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    )}
                  />
                  <div className="flex-1">
                    <p className={cn("font-medium", task.completed && "line-through")}>
                      {task.task}
                    </p>
                    <p className="text-xs text-muted-foreground">{task.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/calendar"
              className="mt-4 flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View calendar
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl border bg-card p-6"
          >
            <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/crop-advisor"
                className="flex flex-col items-center gap-2 rounded-xl bg-primary/10 p-4 text-center transition-colors hover:bg-primary/20"
              >
                <Sprout className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">Crop Advisor</span>
              </Link>
              <Link
                href="/disease-detection"
                className="flex flex-col items-center gap-2 rounded-xl bg-red-50 p-4 text-center transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30"
              >
                <Thermometer className="h-6 w-6 text-red-600" />
                <span className="text-sm font-medium">Check Disease</span>
              </Link>
              <Link
                href="/soil-analyzer"
                className="flex flex-col items-center gap-2 rounded-xl bg-amber-50 p-4 text-center transition-colors hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/30"
              >
                <Leaf className="h-6 w-6 text-amber-600" />
                <span className="text-sm font-medium">Soil Health</span>
              </Link>
              <Link
                href="/expenses"
                className="flex flex-col items-center gap-2 rounded-xl bg-blue-50 p-4 text-center transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30"
              >
                <IndianRupee className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-medium">Expenses</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
