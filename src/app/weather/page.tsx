"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Sunrise,
  Sunset,
  AlertTriangle,
  MapPin,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const currentWeather = {
  temp: 32,
  feelsLike: 35,
  condition: "Partly Cloudy",
  humidity: 65,
  windSpeed: 12,
  windDirection: "NE",
  visibility: 10,
  pressure: 1013,
  uvIndex: 6,
  dewPoint: 24,
};

const hourlyData = [
  { time: "6 AM", temp: 26, rain: 0 },
  { time: "9 AM", temp: 29, rain: 0 },
  { time: "12 PM", temp: 32, rain: 10 },
  { time: "3 PM", temp: 33, rain: 20 },
  { time: "6 PM", temp: 30, rain: 30 },
  { time: "9 PM", temp: 27, rain: 10 },
];

const today = new Date();

const weeklyForecast = [
  { day: "Today", date: new Date(today), high: 33, low: 25, condition: "partly-cloudy", rain: 20 },
  { day: "Thu", date: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000), high: 34, low: 26, condition: "sunny", rain: 0 },
  { day: "Fri", date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000), high: 35, low: 27, condition: "sunny", rain: 0 },
  { day: "Sat", date: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000), high: 32, low: 25, condition: "cloudy", rain: 40 },
  { day: "Sun", date: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000), high: 29, low: 24, condition: "rainy", rain: 80 },
  { day: "Mon", date: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000), high: 28, low: 23, condition: "rainy", rain: 70 },
  { day: "Tue", date: new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000), high: 30, low: 24, condition: "partly-cloudy", rain: 30 },
];
const farmingAlerts = [
  {
    type: "heatwave",
    severity: "warning",
    title: "Heatwave Expected",
    message: "Temperature may reach 42°C on Friday. Avoid spraying pesticides during peak hours.",
  },
  {
    type: "rain",
    severity: "info",
    title: "Rain Forecast",
    message: "Heavy rain expected on Sunday-Monday. Secure harvested crops and check drainage.",
  },
];

const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case "sunny":
      return <Sun className="h-8 w-8 text-yellow-500" />;
    case "partly-cloudy":
      return <Cloud className="h-8 w-8 text-blue-400" />;
    case "cloudy":
      return <Cloud className="h-8 w-8 text-gray-400" />;
    case "rainy":
      return <CloudRain className="h-8 w-8 text-blue-600" />;
    default:
      return <Sun className="h-8 w-8 text-yellow-500" />;
  }
};

export default function WeatherPage() {
  const [selectedDay, setSelectedDay] = useState(0);

  return (
    <div className="min-h-screen bg-background p-4 pt-20 md:ml-64 md:pt-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">Weather Forecast</h1>
          <p className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Nagpur, Maharashtra
          </p>
        </motion.div>

        {/* Current Weather Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-3xl bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-400 p-6 text-white md:p-8"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-4">
                <Sun className="h-16 w-16" />
                <div>
                  <div className="text-6xl font-bold">{currentWeather.temp}°</div>
                  <div className="text-xl opacity-90">{currentWeather.condition}</div>
                </div>
              </div>
              <p className="opacity-80">
                Feels like {currentWeather.feelsLike}° • Updated 10 mins ago
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white/20 p-4">
                <Droplets className="mb-2 h-5 w-5" />
                <p className="text-sm opacity-80">Humidity</p>
                <p className="text-xl font-semibold">{currentWeather.humidity}%</p>
              </div>
              <div className="rounded-2xl bg-white/20 p-4">
                <Wind className="mb-2 h-5 w-5" />
                <p className="text-sm opacity-80">Wind</p>
                <p className="text-xl font-semibold">{currentWeather.windSpeed} km/h</p>
              </div>
              <div className="rounded-2xl bg-white/20 p-4">
                <Eye className="mb-2 h-5 w-5" />
                <p className="text-sm opacity-80">Visibility</p>
                <p className="text-xl font-semibold">{currentWeather.visibility} km</p>
              </div>
              <div className="rounded-2xl bg-white/20 p-4">
                <Thermometer className="mb-2 h-5 w-5" />
                <p className="text-sm opacity-80">Pressure</p>
                <p className="text-xl font-semibold">{currentWeather.pressure} hPa</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Farming Alerts */}
        {farmingAlerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 space-y-3"
          >
            {farmingAlerts.map((alert, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3 rounded-2xl border p-4",
                  alert.severity === "warning"
                    ? "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-900/20"
                    : "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-900/20"
                )}
              >
                <AlertTriangle
                  className={cn(
                    "mt-0.5 h-5 w-5 shrink-0",
                    alert.severity === "warning" ? "text-amber-600" : "text-blue-600"
                  )}
                />
                <div>
                  <h3
                    className={cn(
                      "font-semibold",
                      alert.severity === "warning" ? "text-amber-800" : "text-blue-800"
                    )}
                  >
                    {alert.title}
                  </h3>
                  <p
                    className={cn(
                      "text-sm",
                      alert.severity === "warning" ? "text-amber-700" : "text-blue-700"
                    )}
                  >
                    {alert.message}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Temperature Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 rounded-2xl border bg-card p-6"
        >
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Thermometer className="h-5 w-5 text-primary" />
            Temperature Trend (24h)
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke="#f59e0b"
                  fillOpacity={1}
                  fill="url(#tempGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 7-Day Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border bg-card p-6"
        >
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Calendar className="h-5 w-5 text-primary" />
            7-Day Forecast
          </h3>
          <div className="grid gap-3">
            {weeklyForecast.map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={cn(
                  "flex items-center justify-between rounded-xl p-4 transition-colors",
                  selectedDay === index
                    ? "bg-primary/10"
                    : "hover:bg-muted"
                )}
              >
                <div className="flex items-center gap-4">
                  {getWeatherIcon(day.condition)}
                  <div className="text-left">
                    <p className="font-semibold">{day.day}</p>
                    <p className="text-sm text-muted-foreground">{day.date.toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  {day.rain > 0 && (
                    <div className="flex items-center gap-1 text-blue-600">
                      <CloudRain className="h-4 w-4" />
                      <span className="text-sm">{day.rain}%</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold">{day.high}°</span>
                    <span className="text-muted-foreground">{day.low}°</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Sun Timings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 grid grid-cols-2 gap-4"
        >
          <div className="flex items-center gap-4 rounded-2xl border bg-card p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
              <Sunrise className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sunrise</p>
              <p className="text-lg font-semibold">6:12 AM</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border bg-card p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
              <Sunset className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sunset</p>
              <p className="text-lg font-semibold">7:08 PM</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
