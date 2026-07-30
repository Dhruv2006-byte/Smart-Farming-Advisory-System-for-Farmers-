"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Droplets,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Sprout,
  Sun,
  Wind,
  Thermometer,
  Waves,
  ArrowRight,
  Plus,
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

const irrigationMethods = [
  {
    id: "drip",
    name: "Drip Irrigation",
    description: "Water-saving method delivering water directly to plant roots",
    waterSaving: "40-60%",
    suitable: "Row crops, orchards, vegetables",
    cost: "High initial, Low maintenance",
    efficiency: 95,
  },
  {
    id: "sprinkler",
    name: "Sprinkler System",
    description: "Overhead water distribution mimicking natural rainfall",
    waterSaving: "30-50%",
    suitable: "Wheat, pulses, vegetables",
    cost: "Medium initial, Medium maintenance",
    efficiency: 85,
  },
  {
    id: "flood",
    name: "Flood Irrigation",
    description: "Traditional method flooding the field with water",
    waterSaving: "0-20%",
    suitable: "Rice, pastures",
    cost: "Low initial, High labor",
    efficiency: 60,
  },
  {
    id: "furrow",
    name: "Furrow Irrigation",
    description: "Water flows through furrows between crop rows",
    waterSaving: "20-30%",
    suitable: "Cotton, sugarcane, vegetables",
    cost: "Low initial, Medium labor",
    efficiency: 70,
  },
];

const weeklySchedule = [
  { day: "Monday", crop: "Wheat", time: "6:00 AM", duration: "2 hours", method: "Drip", completed: true },
  { day: "Tuesday", crop: "Cotton", time: "5:30 AM", duration: "3 hours", method: "Furrow", completed: false },
  { day: "Wednesday", crop: "Vegetables", time: "6:00 AM", duration: "1.5 hours", method: "Drip", completed: false },
  { day: "Thursday", crop: "Wheat", time: "6:00 AM", duration: "2 hours", method: "Drip", completed: false },
  { day: "Friday", crop: "Rest", time: "-", duration: "-", method: "-", completed: false },
  { day: "Saturday", crop: "Cotton", time: "5:30 AM", duration: "3 hours", method: "Furrow", completed: false },
  { day: "Sunday", crop: "Vegetables", time: "6:00 AM", duration: "1.5 hours", method: "Drip", completed: false },
];

const waterSavingTips = [
  "Mulching reduces evaporation by 50%",
  "Early morning irrigation prevents water loss",
  "Drip irrigation saves 40-60% water",
  "Check for leakages regularly",
  "Use moisture sensors for optimal timing",
  "Group plants by water needs",
];

const rainwaterTips = [
  "Install rooftop rainwater harvesting",
  "Build farm ponds for storage",
  "Use check dams in water channels",
  "Practice contour bunding",
  "Maintain percolation tanks",
];

export default function IrrigationPage() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"schedule" | "methods" | "tips">("schedule");

  return (
    <div className="min-h-screen bg-background p-4 pt-20 md:ml-64 md:pt-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">Smart Irrigation Planner</h1>
          <p className="text-muted-foreground">
            Optimize water usage with AI-powered irrigation schedules
          </p>
        </motion.div>

        {/* Water Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          <div className="rounded-2xl border bg-card p-4">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Droplets className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold">12,500L</p>
            <p className="text-sm text-muted-foreground">Water used this week</p>
          </div>
          <div className="rounded-2xl border bg-card p-4">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold">35%</p>
            <p className="text-sm text-muted-foreground">Water saved vs flood</p>
          </div>
          <div className="rounded-2xl border bg-card p-4">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100">
              <Calendar className="h-5 w-5 text-cyan-600" />
            </div>
            <p className="text-2xl font-bold">4</p>
            <p className="text-sm text-muted-foreground">Irrigations this week</p>
          </div>
          <div className="rounded-2xl border bg-card p-4">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
              <Sun className="h-5 w-5 text-amber-600" />
            </div>
            <p className="text-2xl font-bold">3 days</p>
            <p className="text-sm text-muted-foreground">Until next rain forecast</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex gap-2 border-b"
        >
          {(["schedule", "methods", "tips"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "border-b-2 px-4 py-3 text-sm font-medium capitalize transition-colors",
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab === "schedule" ? "Irrigation Schedule" : tab}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        {activeTab === "schedule" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {weeklySchedule.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col gap-3 rounded-2xl border bg-card p-4 md:flex-row md:items-center md:justify-between",
                  item.completed && "bg-muted/50"
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl",
                      item.completed ? "bg-green-100" : "bg-primary/10"
                    )}
                  >
                    {item.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <Droplets className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{item.day}</p>
                    <p className="text-sm text-muted-foreground">{item.crop}</p>
                  </div>
                </div>
                
                {item.crop !== "Rest" && (
                  <div className="flex flex-wrap gap-4 text-sm md:text-right">
                    <div>
                      <p className="text-muted-foreground">Time</p>
                      <p className="font-medium">{item.time}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">{item.duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Method</p>
                      <p className="font-medium">{item.method}</p>
                    </div>
                  </div>
                )}

                {!item.completed && item.crop !== "Rest" && (
                  <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                    Mark Complete
                  </button>
                )}
              </div>
            ))}

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/30 p-4 text-primary transition-colors hover:bg-primary/5">
              <Plus className="h-5 w-5" />
              Add Irrigation Schedule
            </button>
          </motion.div>
        )}

        {activeTab === "methods" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-4 md:grid-cols-2"
          >
            {irrigationMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(selectedMethod === method.id ? null : method.id)}
                className={cn(
                  "cursor-pointer rounded-2xl border bg-card p-6 transition-all",
                  selectedMethod === method.id ? "ring-2 ring-primary" : "hover:shadow-lg"
                )}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{method.name}</h3>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                  <div
                    className={cn(
                      "h-4 w-4 rounded-full border-2",
                      selectedMethod === method.id
                        ? "border-primary bg-primary"
                        : "border-muted"
                    )}
                  />
                </div>

                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Water Saving:</span>
                    <span className="font-medium text-green-600">{method.waterSaving}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Suitable for:</span>
                    <span className="font-medium">{method.suitable}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cost:</span>
                    <span className="font-medium">{method.cost}</span>
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-muted-foreground">Efficiency</span>
                    <span className="font-medium">{method.efficiency}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${method.efficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "tips" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6 md:grid-cols-2"
          >
            <div className="rounded-2xl border bg-card p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Droplets className="h-5 w-5 text-blue-600" />
                Water Saving Tips
              </h3>
              <ul className="space-y-3">
                {waterSavingTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border bg-card p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Waves className="h-5 w-5 text-cyan-600" />
                Rainwater Harvesting
              </h3>
              <ul className="space-y-3">
                {rainwaterTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border bg-gradient-to-br from-primary/10 to-primary/5 p-6 md:col-span-2">
              <h3 className="mb-4 text-lg font-semibold">Drip Irrigation Benefits</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-card p-4">
                  <p className="mb-1 text-3xl font-bold text-primary">50%</p>
                  <p className="text-sm text-muted-foreground">Water Savings</p>
                </div>
                <div className="rounded-xl bg-card p-4">
                  <p className="mb-1 text-3xl font-bold text-primary">20-40%</p>
                  <p className="text-sm text-muted-foreground">Yield Increase</p>
                </div>
                <div className="rounded-xl bg-card p-4">
                  <p className="mb-1 text-3xl font-bold text-primary">30%</p>
                  <p className="text-sm text-muted-foreground">Fertilizer Savings</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
