"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sprout,
  Droplets,
  FlaskConical,
  Bug,
  Scissors,
  Plus,
  Clock,
  AlertCircle,
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const activities = [
  { id: 1, date: 10, month: 6, title: "Wheat Sowing", type: "sowing", crop: "Wheat", time: "6:00 AM" },
  { id: 2, date: 12, month: 6, title: "First Irrigation", type: "irrigation", crop: "Wheat", time: "5:30 AM" },
  { id: 3, date: 15, month: 6, title: "Fertilizer Application", type: "fertilizer", crop: "Wheat", time: "7:00 AM" },
  { id: 4, date: 20, month: 6, title: "Pest Inspection", type: "pest", crop: "Wheat", time: "8:00 AM" },
  { id: 5, date: 25, month: 6, title: "Second Irrigation", type: "irrigation", crop: "Wheat", time: "6:00 AM" },
  { id: 6, date: 5, month: 7, title: "Weed Control", type: "weed", crop: "Cotton", time: "7:00 AM" },
  { id: 7, date: 8, month: 7, title: "Harvest", type: "harvest", crop: "Wheat", time: "6:00 AM" },
];

const activityIcons: Record<string, typeof Sprout> = {
  sowing: Sprout,
  irrigation: Droplets,
  fertilizer: FlaskConical,
  pest: Bug,
  weed: Scissors,
  harvest: Scissors,
};

const activityColors: Record<string, string> = {
  sowing: "bg-green-500",
  irrigation: "bg-blue-500",
  fertilizer: "bg-amber-500",
  pest: "bg-red-500",
  weed: "bg-purple-500",
  harvest: "bg-emerald-600",
};

const cropCalendar = [
  { crop: "Wheat", sowing: "Nov-Dec", harvest: "Mar-Apr", duration: "120-150 days" },
  { crop: "Rice", sowing: "Jun-Jul", harvest: "Oct-Nov", duration: "120-140 days" },
  { crop: "Cotton", sowing: "May-Jun", harvest: "Oct-Dec", duration: "150-180 days" },
  { crop: "Soybean", sowing: "Jun-Jul", harvest: "Sep-Oct", duration: "90-120 days" },
  { crop: "Maize", sowing: "Jun-Jul", harvest: "Sep-Oct", duration: "90-110 days" },
  { crop: "Sugarcane", sowing: "Feb-Mar", harvest: "Dec-Jan", duration: "10-12 months" },
];

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(6); // July
  const [currentYear, setCurrentYear] = useState(2024);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getActivitiesForDate = (date: number) => {
    return activities.filter(
      (a) => a.date === date && a.month === currentMonth
    );
  };

  const selectedActivities = selectedDate ? getActivitiesForDate(selectedDate) : [];

  return (
    <div className="min-h-screen bg-background p-4 pt-20 md:ml-64 md:pt-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Crop Calendar</h1>
            <p className="text-muted-foreground">Manage your farming activities and schedules</p>
          </div>
          <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            <Plus className="h-5 w-5" />
            Add Activity
          </button>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border bg-card p-6 lg:col-span-2"
          >
            {/* Calendar Header */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {months[currentMonth]} {currentYear}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={prevMonth}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border transition-colors hover:bg-muted"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextMonth}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border transition-colors hover:bg-muted"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Days Header */}
            <div className="mb-2 grid grid-cols-7 gap-1">
              {days.map((day) => (
                <div
                  key={day}
                  className="py-2 text-center text-sm font-medium text-muted-foreground"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const date = index + 1;
                const dayActivities = getActivitiesForDate(date);
                const isSelected = selectedDate === date;
                const isToday = date === new Date().getDate() && currentMonth === new Date().getMonth();

                return (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={cn(
                      "relative aspect-square rounded-xl border p-2 text-left transition-colors",
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted",
                      isToday && "border-primary font-bold text-primary"
                    )}
                  >
                    <span className="text-sm">{date}</span>
                    {dayActivities.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-0.5">
                        {dayActivities.slice(0, 3).map((activity, i) => (
                          <div
                            key={i}
                            className={cn("h-1.5 w-1.5 rounded-full", activityColors[activity.type])}
                          />
                        ))}
                        {dayActivities.length > 3 && (
                          <span className="text-[8px]">+{dayActivities.length - 3}</span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-3">
              {Object.entries(activityColors).map(([type, color]) => (
                <div key={type} className="flex items-center gap-1.5">
                  <div className={cn("h-3 w-3 rounded-full", color)} />
                  <span className="text-xs capitalize">{type}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Date Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border bg-card p-6"
            >
              <h3 className="mb-4 font-semibold">
                {selectedDate
                  ? `Activities for ${selectedDate} ${months[currentMonth]}`
                  : "Select a date to view activities"}
              </h3>
              {selectedActivities.length > 0 ? (
                <div className="space-y-3">
                  {selectedActivities.map((activity) => {
                    const Icon = activityIcons[activity.type];
                    return (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 rounded-xl bg-muted p-3"
                      >
                        <div
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                            activityColors[activity.type]
                          )}
                        >
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.crop}</p>
                          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : selectedDate ? (
                <p className="text-sm text-muted-foreground">No activities scheduled for this date</p>
              ) : null}
            </motion.div>

            {/* Upcoming Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border bg-card p-6"
            >
              <h3 className="mb-4 font-semibold">Upcoming Activities</h3>
              <div className="space-y-3">
                {activities
                  .filter((a) => a.month === currentMonth && a.date >= new Date().getDate())
                  .slice(0, 4)
                  .map((activity) => {
                    const Icon = activityIcons[activity.type];
                    return (
                      <div
                        key={activity.id}
                        className="flex items-center gap-3 rounded-xl bg-muted p-3"
                      >
                        <div
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                            activityColors[activity.type]
                          )}
                        >
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.date} {months[activity.month]}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </motion.div>

            {/* Crop Calendar Reference */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border bg-card p-6"
            >
              <h3 className="mb-4 font-semibold">Crop Calendar</h3>
              <div className="space-y-2">
                {cropCalendar.map((crop) => (
                  <div
                    key={crop.crop}
                    className="flex items-center justify-between rounded-lg bg-muted p-2 text-sm"
                  >
                    <span className="font-medium">{crop.crop}</span>
                    <span className="text-xs text-muted-foreground">
                      {crop.sowing} - {crop.harvest}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
