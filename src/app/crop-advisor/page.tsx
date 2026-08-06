"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sprout,
  MapPin,
  Tractor,
  Droplets,
  IndianRupee,
  Calendar,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

const states = [
  "Maharashtra", "Punjab", "Haryana", "Uttar Pradesh", "Madhya Pradesh",
  "Rajasthan", "Gujarat", "Karnataka", "Tamil Nadu", "Andhra Pradesh",
  "Telangana", "West Bengal", "Bihar", "Odisha", "Kerala",
];

const soilTypes = [
  { value: "alluvial", label: "Alluvial Soil", description: "Rich in nutrients, best for cereals" },
  { value: "black", label: "Black Soil", description: "High clay content, retains moisture" },
  { value: "red", label: "Red Soil", description: "Rich in iron, good for cotton" },
  { value: "laterite", label: "Laterite Soil", description: "Acidic, suitable for tea/coffee" },
  { value: "desert", label: "Desert Soil", description: "Sandy, needs irrigation" },
  { value: "mountain", label: "Mountain Soil", description: "Thin, suitable for fruits" },
];

const seasons = ["(Monsoon)", "(Winter)", "(Summer)"];

const budgetRanges = [
  { value: "low", label: "Low (Under ₹50,000)", max: 50000 },
  { value: "medium", label: "Medium (₹50,000 - ₹2,00,000)", max: 200000 },
  { value: "high", label: "High (Above ₹2,00,000)", max: 500000 },
];

interface CropRecommendation {
  crop: string;
  confidence: number;
  expectedYield: string;
  investment: number;
  expectedProfit: number;
  fertilizers: string[];
  irrigationMethod: string;
  sowingTime: string;
  harvestTime: string;
  marketDemand: "High" | "Medium" | "Low";
  riskLevel: "Low" | "Medium" | "High";
}

const mockRecommendations: CropRecommendation[] = [
  {
    crop: "Wheat",
    confidence: 92,
    expectedYield: "45-50 quintals/acre",
    investment: 45000,
    expectedProfit: 85000,
    fertilizers: ["Urea", "DAP", "MOP"],
    irrigationMethod: "Drip Irrigation",
    sowingTime: "November - December",
    harvestTime: "March - April",
    marketDemand: "High",
    riskLevel: "Low",
  },
  {
    crop: "Chickpea (Chana)",
    confidence: 87,
    expectedYield: "12-15 quintals/acre",
    investment: 28000,
    expectedProfit: 52000,
    fertilizers: ["DAP", "SSP", "Rhizobium"],
    irrigationMethod: "Sprinkler (2-3 times)",
    sowingTime: "October - November",
    harvestTime: "February - March",
    marketDemand: "High",
    riskLevel: "Low",
  },
  {
    crop: "Mustard",
    confidence: 83,
    expectedYield: "8-12 quintals/acre",
    investment: 22000,
    expectedProfit: 48000,
    fertilizers: ["Urea", "SSP", "Boron"],
    irrigationMethod: "Flood (2 times)",
    sowingTime: "October - November",
    harvestTime: "February - March",
    marketDemand: "Medium",
    riskLevel: "Medium",
  },
];

export default function CropAdvisorPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    state: "",
    district: "",
    village: "",
    soilType: "",
    farmSize: "",
    waterAvailable: "",
    budget: "",
    previousCrop: "",
    season: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    setShowResults(true);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.state && formData.district && formData.village;
      case 2:
        return formData.soilType && formData.farmSize;
      case 3:
        return formData.waterAvailable && formData.budget && formData.season;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 pt-20 md:ml-64 md:pt-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">AI Crop Advisor</h1>
          <p className="text-muted-foreground">
            Get personalized crop recommendations based on your farm conditions
          </p>
        </motion.div>

        {!showResults ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border bg-card p-6 md:p-8"
          >
            {/* Progress Steps */}
            <div className="mb-8 flex items-center justify-between">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-colors",
                      step >= s
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={cn(
                        "mx-2 h-1 w-12 md:w-24 transition-colors",
                        step > s ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Location */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold">Farm Location</h2>
                
                <div>
                  <label className="mb-2 block text-sm font-medium">State</label>
                  <select
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">District</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => handleInputChange("district", e.target.value)}
                    placeholder="Enter district name"
                    className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Village</label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => handleInputChange("village", e.target.value)}
                    placeholder="Enter village name"
                    className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Soil & Farm */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold">Soil & Farm Details</h2>

                <div>
                  <label className="mb-2 block text-sm font-medium">Soil Type</label>
                  <div className="grid gap-3 md:grid-cols-2">
                    {soilTypes.map((soil) => (
                      <button
                        key={soil.value}
                        onClick={() => handleInputChange("soilType", soil.value)}
                        className={cn(
                          "rounded-xl border p-4 text-left transition-all",
                          formData.soilType === soil.value
                            ? "border-primary bg-primary/5"
                            : "hover:bg-muted"
                        )}
                      >
                        <p className="font-medium">{soil.label}</p>
                        <p className="text-xs text-muted-foreground">{soil.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Farm Size (acres)</label>
                  <input
                    type="number"
                    value={formData.farmSize}
                    onChange={(e) => handleInputChange("farmSize", e.target.value)}
                    placeholder="e.g., 5"
                    className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Previous Crop (Optional)</label>
                  <input
                    type="text"
                    value={formData.previousCrop}
                    onChange={(e) => handleInputChange("previousCrop", e.target.value)}
                    placeholder="e.g., Rice, Cotton"
                    className="w-full rounded-xl border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Resources & Season */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold">Resources & Season</h2>

                <div>
                  <label className="mb-2 block text-sm font-medium">Water Availability</label>
                  <div className="grid gap-3 md:grid-cols-3">
                    {["Abundant", "Moderate", "Limited"].map((option) => (
                      <button
                        key={option}
                        onClick={() => handleInputChange("waterAvailable", option)}
                        className={cn(
                          "rounded-xl border p-3 text-center text-sm font-medium transition-all",
                          formData.waterAvailable === option
                            ? "border-primary bg-primary/5"
                            : "hover:bg-muted"
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Budget Range</label>
                  <div className="space-y-2">
                    {budgetRanges.map((range) => (
                      <button
                        key={range.value}
                        onClick={() => handleInputChange("budget", range.value)}
                        className={cn(
                          "w-full rounded-xl border p-3 text-left text-sm transition-all",
                          formData.budget === range.value
                            ? "border-primary bg-primary/5"
                            : "hover:bg-muted"
                        )}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Current Season</label>
                  <div className="grid gap-3 md:grid-cols-3">
                    {seasons.map((season) => (
                      <button
                        key={season}
                        onClick={() => handleInputChange("season", season)}
                        className={cn(
                          "rounded-xl border p-3 text-center text-sm font-medium transition-all",
                          formData.season === season
                            ? "border-primary bg-primary/5"
                            : "hover:bg-muted"
                        )}
                      >
                        {season}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="rounded-xl border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!isStepValid()}
                  className="ml-auto rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepValid() || loading}
                  className="ml-auto inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Get Recommendations"
                  )}
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recommended Crops</h2>
              <button
                onClick={() => {
                  setShowResults(false);
                  setStep(1);
                }}
                className="rounded-xl border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                Start Over
              </button>
            </div>

            <div className="grid gap-6">
              {mockRecommendations.map((rec, index) => (
                <motion.div
                  key={rec.crop}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl border bg-card p-6"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <Sprout className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{rec.crop}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">AI Confidence:</span>
                          <span className="text-sm font-semibold text-primary">{rec.confidence}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-medium",
                          rec.riskLevel === "Low"
                            ? "bg-green-100 text-green-700"
                            : rec.riskLevel === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        )}
                      >
                        {rec.riskLevel} Risk
                      </span>
                    </div>
                  </div>

                  <div className="mb-4 grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl bg-muted p-4">
                      <p className="text-sm text-muted-foreground">Expected Yield</p>
                      <p className="text-lg font-semibold">{rec.expectedYield}</p>
                    </div>
                    <div className="rounded-xl bg-muted p-4">
                      <p className="text-sm text-muted-foreground">Investment Required</p>
                      <p className="text-lg font-semibold">{formatCurrency(rec.investment)}</p>
                    </div>
                    <div className="rounded-xl bg-muted p-4">
                      <p className="text-sm text-muted-foreground">Expected Profit</p>
                      <p className="text-lg font-semibold text-green-600">
                        {formatCurrency(rec.expectedProfit)}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="mb-2 text-sm font-medium">Recommended Fertilizers</p>
                      <div className="flex flex-wrap gap-2">
                        {rec.fertilizers.map((fert) => (
                          <span
                            key={fert}
                            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                          >
                            {fert}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium">Irrigation Method</p>
                      <p className="text-sm text-muted-foreground">{rec.irrigationMethod}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Sow: {rec.sowingTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Harvest: {rec.harvestTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span>Market: {rec.marketDemand} Demand</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
