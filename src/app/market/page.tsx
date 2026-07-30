"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  MapPin,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  IndianRupee,
  Calendar,
  Bell,
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
  BarChart,
  Bar,
} from "recharts";

const crops = ["All", "Wheat", "Rice", "Cotton", "Soybean", "Onion", "Tomato", "Potato", "Sugarcane", "Maize", "Banana"];

const markets = ["Nagpur", "Mumbai", "Pune", "Nashik", "Aurangabad", "Amravati", "Yavatmal"];

const marketData = [
  { crop: "Wheat", variety: "Lokwan", price: 2425, yesterday: 2365, unit: "quintal", trend: "up", change: 2.54 },
  { crop: "Rice", variety: "Basmati", price: 3850, yesterday: 3780, unit: "quintal", trend: "up", change: 1.85 },
  { crop: "Cotton", variety: "MCU-5", price: 6620, yesterday: 6650, unit: "quintal", trend: "down", change: -0.45 },
  { crop: "Soybean", variety: "JS-335", price: 4820, yesterday: 4780, unit: "quintal", trend: "up", change: 0.84 },
  { crop: "Onion", variety: "Red", price: 1850, yesterday: 2100, unit: "quintal", trend: "down", change: -11.9 },
  { crop: "Tomato", variety: "Hybrid", price: 2450, yesterday: 2800, unit: "quintal", trend: "down", change: -12.5 },
  { crop: "Potato", variety: "Kufri", price: 1250, yesterday: 1200, unit: "quintal", trend: "up", change: 4.17 },
  { crop: "Sugarcane", variety: "Co-86032", price: 340, yesterday: 340, unit: "ton", trend: "flat", change: 0 },
  { crop: "Maize", variety: "Yellow", price: 2150, yesterday: 2100, unit: "quintal", trend: "up", change: 2.38 },
  { crop: "Banana", variety: "Cavendish", price: 1850, yesterday: 1800, unit: "quintal", trend: "up", change: 2.78 },
];

const priceHistory = [
  { date: "1 Jul", wheat: 2350, rice: 3750, cotton: 6600 },
  { date: "3 Jul", wheat: 2380, rice: 3780, cotton: 6650 },
  { date: "5 Jul", wheat: 2360, rice: 3760, cotton: 6620 },
  { date: "7 Jul", wheat: 2390, rice: 3800, cotton: 6680 },
  { date: "9 Jul", wheat: 2425, rice: 3850, cotton: 6620 },
];

const nearbyMarkets = [
  { name: "Kalmana", distance: "12 km", price: 2400, trend: "up" },
  { name: "Kamthi", distance: "18 km", price: 2410, trend: "up" },
  { name: "Ramtek", distance: "42 km", price: 2380, trend: "down" },
  { name: "Umred", distance: "38 km", price: 2420, trend: "up" },
];

export default function MarketPage() {
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [selectedMarket, setSelectedMarket] = useState("Nagpur");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = marketData.filter(
    (item) =>
      (selectedCrop === "All" || item.crop === selectedCrop) &&
      item.crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-4 pt-20 md:ml-64 md:pt-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">Market Prices</h1>
          <p className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Daily mandi rates and market trends
          </p>
        </motion.div>

        {/* Market Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <div className="flex items-center gap-2 rounded-xl border bg-card px-4 py-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="bg-transparent text-sm font-medium focus:outline-none"
            >
              {markets.map((market) => (
                <option key={market} value={market}>{market}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 rounded-xl border bg-card px-4 py-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{new Date().toLocaleDateString("en-IN")}</span>
          </div>
          <button className="ml-auto flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            <Bell className="h-4 w-4" />
            Set Price Alert
          </button>
        </motion.div>

        {/* Crop Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-wrap gap-2"
        >
          {crops.map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                selectedCrop === crop
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {crop}
            </button>
          ))}
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search crops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border bg-card py-3 pl-12 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </motion.div>

        {/* Market Data Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 grid gap-4"
        >
          {filteredData.map((item, index) => (
            <motion.div
              key={item.crop}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col gap-4 rounded-2xl border bg-card p-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <span className="text-xl font-bold text-primary">
                    {item.crop[0]}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold">{item.crop}</h3>
                  <p className="text-sm text-muted-foreground">{item.variety}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between gap-6 md:justify-end">
                <div className="text-right">
                  <p className="flex items-center gap-1 text-2xl font-bold">
                    <IndianRupee className="h-5 w-5" />
                    {item.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">per {item.unit}</p>
                </div>
                
                <div className="text-right">
                  <div
                    className={cn(
                      "flex items-center gap-1 font-semibold",
                      item.trend === "up" ? "text-green-600" : item.trend === "down" ? "text-red-600" : "text-gray-600"
                    )}
                  >
                    {item.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : item.trend === "down" ? (
                      <ArrowDownRight className="h-4 w-4" />
                    ) : null}
                    {item.change > 0 ? "+" : ""}
                    {item.change}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Yesterday: ₹{item.yesterday}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Price Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 rounded-2xl border bg-card p-6"
        >
          <h3 className="mb-4 text-lg font-semibold">Price Trends (Last 7 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="wheat" stroke="#f59e0b" name="Wheat" strokeWidth={2} />
                <Line type="monotone" dataKey="rice" stroke="#3b82f6" name="Rice" strokeWidth={2} />
                <Line type="monotone" dataKey="cotton" stroke="#8b5cf6" name="Cotton" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Nearby Markets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border bg-card p-6"
        >
          <h3 className="mb-4 text-lg font-semibold">Nearby Markets (Wheat)</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {nearbyMarkets.map((market, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl bg-muted p-4"
              >
                <div>
                  <p className="font-semibold">{market.name}</p>
                  <p className="text-sm text-muted-foreground">{market.distance} away</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{market.price}</p>
                  <p
                    className={cn(
                      "text-sm",
                      market.trend === "up" ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {market.trend === "up" ? "↑" : "↓"} vs today
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
