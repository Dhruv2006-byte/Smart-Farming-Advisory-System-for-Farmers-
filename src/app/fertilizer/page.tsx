"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FlaskConical,
  Sprout,
  Calculator,
  Leaf,
  Calendar,
  IndianRupee,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";

const crops = [
  { id: "wheat", name: "Wheat", n: 120, p: 60, k: 40 },
  { id: "rice", name: "Rice", n: 100, p: 50, k: 50 },
  { id: "cotton", name: "Cotton", n: 150, p: 60, k: 60 },
  { id: "soybean", name: "Soybean", n: 20, p: 60, k: 40 },
  { id: "maize", name: "Maize", n: 150, p: 70, k: 60 },
  { id: "sugarcane", name: "Sugarcane", n: 250, p: 100, k: 100 },
];

const fertilizers = [
  { name: "Urea", n: 46, p: 0, k: 0, price: 300 },
  { name: "DAP", n: 18, p: 46, k: 0, price: 1450 },
  { name: "MOP", n: 0, p: 0, k: 60, price: 1800 },
  { name: "NPK 20-20-20", n: 20, p: 20, k: 20, price: 2200 },
  { name: "SSP", n: 0, p: 16, k: 0, price: 600 },
];

const organicAlternatives = [
  { name: "Vermicompost", nutrients: "NPK + Micronutrients", quantity: "2-3 tons/acre", price: 5000 },
  { name: "Farm Yard Manure", nutrients: "Organic matter + NPK", quantity: "5-10 tons/acre", price: 2000 },
  { name: "Neem Cake", nutrients: "N + Pest repellent", quantity: "200-400 kg/acre", price: 3500 },
  { name: "Biofertilizers", nutrients: "N-fixing bacteria", quantity: "4-5 kg/acre", price: 400 },
];

export default function FertilizerPage() {
  const [selectedCrop, setSelectedCrop] = useState(crops[0]);
  const [landSize, setLandSize] = useState(1);
  const [showResults, setShowResults] = useState(false);

  const calculateFertilizer = () => {
    const multiplier = landSize;
    return {
      urea: Math.round((selectedCrop.n / 0.46) * multiplier),
      dap: Math.round((selectedCrop.p / 0.46) * multiplier),
      mop: Math.round((selectedCrop.k / 0.60) * multiplier),
    };
  };

  const results = calculateFertilizer();
  const totalCost = (results.urea / 1000 * 300) + (results.dap / 1000 * 1450) + (results.mop / 1000 * 1800);

  return (
    <div className="min-h-screen bg-background p-4 pt-20 md:ml-64 md:pt-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">Fertilizer Calculator</h1>
          <p className="text-muted-foreground">
            Calculate precise fertilizer requirements for your crops
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border bg-card p-6"
          >
            <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold">
              <Calculator className="h-5 w-5 text-primary" />
              Input Details
            </h2>

            <div className="space-y-6">
              {/* Crop Selection */}
              <div>
                <label className="mb-2 block text-sm font-medium">Select Crop</label>
                <div className="grid grid-cols-2 gap-2">
                  {crops.map((crop) => (
                    <button
                      key={crop.id}
                      onClick={() => setSelectedCrop(crop)}
                      className={cn(
                        "rounded-xl border p-3 text-left text-sm transition-all",
                        selectedCrop.id === crop.id
                          ? "border-primary bg-primary/5"
                          : "hover:bg-muted"
                      )}
                    >
                      <p className="font-medium">{crop.name}</p>
                      <p className="text-xs text-muted-foreground">
                        N:{crop.n} P:{crop.p} K:{crop.k}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Land Size */}
              <div>
                <label className="mb-2 block text-sm font-medium">Land Size (acres)</label>
                <input
                  type="number"
                  value={landSize}
                  onChange={(e) => setLandSize(parseFloat(e.target.value) || 0)}
                  className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none"
                  placeholder="e.g., 5"
                />
              </div>

              {/* Nutrient Requirements */}
              <div className="rounded-xl bg-muted p-4">
                <p className="mb-2 text-sm font-medium">Nutrient Requirements (kg/acre)</p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{selectedCrop.n}</p>
                    <p className="text-xs text-muted-foreground">Nitrogen (N)</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-amber-600">{selectedCrop.p}</p>
                    <p className="text-xs text-muted-foreground">Phosphorus (P)</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-red-600">{selectedCrop.k}</p>
                    <p className="text-xs text-muted-foreground">Potassium (K)</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowResults(true)}
                className="w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Calculate Requirements
              </button>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Fertilizer Requirements */}
            <div className="rounded-2xl border bg-card p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <FlaskConical className="h-5 w-5 text-primary" />
                Fertilizer Requirements
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
                  <div>
                    <p className="font-medium">Urea (46% N)</p>
                    <p className="text-sm text-muted-foreground">₹300 per 50kg bag</p>
                  </div>
                  <p className="text-xl font-bold text-blue-600">{results.urea} kg</p>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-amber-50 p-4 dark:bg-amber-900/20">
                  <div>
                    <p className="font-medium">DAP (18-46-0)</p>
                    <p className="text-sm text-muted-foreground">₹1,450 per 50kg bag</p>
                  </div>
                  <p className="text-xl font-bold text-amber-600">{results.dap} kg</p>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-red-50 p-4 dark:bg-red-900/20">
                  <div>
                    <p className="font-medium">MOP (60% K)</p>
                    <p className="text-sm text-muted-foreground">₹1,800 per 50kg bag</p>
                  </div>
                  <p className="text-xl font-bold text-red-600">{results.mop} kg</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-muted p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Estimated Cost</span>
                  <span className="text-2xl font-bold text-primary">₹{Math.round(totalCost).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Application Schedule */}
            <div className="rounded-2xl border bg-card p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Calendar className="h-5 w-5 text-primary" />
                Application Schedule
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Basal Dose (Sowing Time)</p>
                    <p className="text-sm text-muted-foreground">Apply full DAP and 50% MOP</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    2
                  </div>
                  <div>
                    <p className="font-medium">First Top Dressing (30 days)</p>
                    <p className="text-sm text-muted-foreground">Apply 50% Urea and remaining MOP</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Second Top Dressing (60 days)</p>
                    <p className="text-sm text-muted-foreground">Apply remaining 50% Urea</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Organic Alternatives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 rounded-2xl border bg-card p-6"
        >
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <Leaf className="h-5 w-5 text-green-600" />
            Organic Alternatives
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {organicAlternatives.map((alt, index) => (
              <div key={index} className="rounded-xl bg-green-50 p-4 dark:bg-green-900/20">
                <p className="font-medium">{alt.name}</p>
                <p className="text-xs text-muted-foreground">{alt.nutrients}</p>
                <p className="mt-2 text-sm font-semibold">{alt.quantity}</p>
                <p className="text-xs text-muted-foreground">₹{alt.price}/ton</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Important Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:bg-amber-900/20"
        >
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-800 dark:text-amber-200">
            <Info className="h-5 w-5" />
            Important Tips
          </h2>
          <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-200">
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
              Always conduct soil testing before fertilizer application
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
              Apply fertilizers during early morning or late evening
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
              Mix fertilizers well with soil to prevent nutrient loss
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0" />
              Avoid application before heavy rain forecast
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
