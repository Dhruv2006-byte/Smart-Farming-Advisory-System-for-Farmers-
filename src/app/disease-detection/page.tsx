"use client";

import { useState, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Camera,
  X,
  Leaf,
  AlertTriangle,
  CheckCircle,
  Shield,
  Droplets,
  Sun,
  Wind,
  Loader2,
  Microscope,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DetectionResult {
  disease: string;
  confidence: number;
  cause: string;
  symptoms: string[];
  prevention: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
  pesticides: { name: string; dosage: string }[];
  safetyInstructions: string[];
}

const mockResults: DetectionResult[] = [
  {
    disease: "Late Blight",
    confidence: 94,
    cause: "Fungus-like organism Phytophthora infestans, spreads rapidly in cool, wet conditions",
    symptoms: [
      "Dark brown to black lesions on leaves",
      "White fungal growth on underside of leaves",
      "Brown rot on stems and fruits",
      "Rapid plant collapse in severe cases",
    ],
    prevention: [
      "Use certified disease-free seeds",
      "Ensure proper spacing for air circulation",
      "Avoid overhead irrigation",
      "Remove and destroy infected plant debris",
    ],
    organicTreatment: [
      "Spray copper-based fungicides (Bordeaux mixture)",
      "Apply neem oil solution (5ml/L water)",
      "Use compost tea as foliar spray",
      "Baking soda spray (1 tbsp/L water)",
    ],
    chemicalTreatment: [
      "Apply Mancozeb 75% WP (2.5g/L water)",
      "Spray Metalaxyl + Mancozeb (2g/L water)",
      "Use Chlorothalonil-based fungicides",
    ],
    pesticides: [
      { name: "Mancozeb 75% WP", dosage: "2.5g per liter of water" },
      { name: "Metalaxyl + Mancozeb", dosage: "2g per liter of water" },
      { name: "Copper Oxychloride", dosage: "3g per liter of water" },
    ],
    safetyInstructions: [
      "Wear protective clothing, gloves, and mask while spraying",
      "Avoid spraying during hot hours (10 AM - 4 PM)",
      "Maintain 15-day waiting period before harvest",
      "Do not eat, drink, or smoke while handling pesticides",
      "Wash hands and exposed skin thoroughly after application",
    ],
  },
  {
    disease: "Leaf Spot",
    confidence: 87,
    cause: "Fungal pathogens (Alternaria, Cercospora, Septoria) thriving in humid conditions",
    symptoms: [
      "Small circular to angular spots on leaves",
      "Spots may have yellow halos",
      "Center of spots may fall out creating shot holes",
      "Premature leaf drop in severe infections",
    ],
    prevention: [
      "Rotate crops annually",
      "Use resistant varieties when available",
      "Keep foliage dry by watering at base",
      "Remove infected leaves promptly",
    ],
    organicTreatment: [
      "Apply neem oil (3-5ml/L water)",
      "Use baking soda spray (1 tbsp + few drops soap/L)",
      "Spray diluted milk solution (1:9 with water)",
      "Apply hydrogen peroxide (1 tbsp/L water)",
    ],
    chemicalTreatment: [
      "Spray Carbendazim 50% WP (1g/L water)",
      "Apply Mancozeb 75% WP (2g/L water)",
      "Use Propiconazole-based fungicides",
    ],
    pesticides: [
      { name: "Carbendazim 50% WP", dosage: "1g per liter of water" },
      { name: "Mancozeb 75% WP", dosage: "2g per liter of water" },
      { name: "Propiconazole 25% EC", dosage: "1ml per liter of water" },
    ],
    safetyInstructions: [
      "Always read label instructions before use",
      "Use recommended protective equipment",
      "Keep children and pets away from treated areas",
      "Store pesticides in original containers, away from food",
      "Dispose of empty containers properly",
    ],
  },
];

export default function DiseaseDetectionPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "treatment" | "safety">("overview");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    fileInputRef.current?.click();
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setLoading(true);
    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    // Randomly select a mock result
    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    setResult(randomResult);
    setLoading(false);
  };

  const resetDetection = () => {
    setSelectedImage(null);
    setResult(null);
    setActiveTab("overview");
  };

  return (
    <div className="min-h-screen bg-background p-4 pt-20 md:ml-64 md:pt-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">AI Disease Detection</h1>
          <p className="text-muted-foreground">
            Upload a photo of your crop leaf to detect diseases and get treatment recommendations
          </p>
        </motion.div>

        {!result ? (
          <div className="space-y-6">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border bg-card p-6 md:p-8"
            >
              {!selectedImage ? (
                <div className="text-center">
                  <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    <Microscope className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="mb-2 text-xl font-semibold">Upload Crop Image</h2>
                  <p className="mb-6 text-muted-foreground">
                    Take a clear photo of the affected leaf for best results
                  </p>
                  
                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 px-6 py-4 text-primary transition-colors hover:bg-primary/10 sm:w-auto"
                    >
                      <Upload className="h-5 w-5" />
                      Upload from Gallery
                    </button>
                    <button
                      onClick={handleCameraCapture}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
                    >
                      <Camera className="h-5 w-5" />
                      Take Photo
                    </button>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  <p className="mt-4 text-xs text-muted-foreground">
                    Supported formats: JPG, PNG, WEBP (Max 10MB)
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative mx-auto max-w-md overflow-hidden rounded-xl">
                    <img
                      src={selectedImage}
                      alt="Selected crop"
                      className="h-auto w-full object-cover"
                    />
                    <button
                      onClick={resetDetection}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <button
                      onClick={analyzeImage}
                      disabled={loading}
                      className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Analyzing Image...
                        </>
                      ) : (
                        <>
                          <Microscope className="h-5 w-5" />
                          Analyze Disease
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Tips Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid gap-4 md:grid-cols-3"
            >
              <div className="rounded-xl border bg-card p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Sun className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="mb-1 font-semibold">Good Lighting</h3>
                <p className="text-sm text-muted-foreground">
                  Take photos in natural daylight for best clarity
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Leaf className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="mb-1 font-semibold">Clear Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Ensure the affected area is clearly visible
                </p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Wind className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="mb-1 font-semibold">No Wind</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a calm day to avoid blurry images
                </p>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Result Header */}
            <div className="rounded-2xl border bg-card p-6">
              <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{result.disease}</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Detection Confidence:</span>
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-sm font-semibold text-green-700">
                        {result.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={resetDetection}
                  className="rounded-xl border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Check Another
                </button>
              </div>

              <div className="mb-6 rounded-xl bg-amber-50 p-4 dark:bg-amber-900/20">
                <h3 className="mb-2 font-semibold text-amber-900 dark:text-amber-100">Cause</h3>
                <p className="text-amber-800 dark:text-amber-200">{result.cause}</p>
              </div>

              {/* Tabs */}
              <div className="mb-6 flex gap-2 border-b">
                {(["overview", "treatment", "safety"] as const).map((tab) => (
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
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="mb-3 flex items-center gap-2 font-semibold">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                        Common Symptoms
                      </h3>
                      <ul className="grid gap-2 md:grid-cols-2">
                        {result.symptoms.map((symptom, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
                            <span className="text-sm">{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="mb-3 flex items-center gap-2 font-semibold">
                        <Shield className="h-5 w-5 text-green-600" />
                        Prevention Measures
                      </h3>
                      <ul className="grid gap-2 md:grid-cols-2">
                        {result.prevention.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === "treatment" && (
                  <motion.div
                    key="treatment"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    <div className="rounded-xl border border-green-200 bg-green-50 p-4 dark:bg-green-900/20">
                      <h3 className="mb-3 flex items-center gap-2 font-semibold text-green-800 dark:text-green-200">
                        <Leaf className="h-5 w-5" />
                        Organic Treatment
                      </h3>
                      <ul className="space-y-2">
                        {result.organicTreatment.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:bg-blue-900/20">
                      <h3 className="mb-3 flex items-center gap-2 font-semibold text-blue-800 dark:text-blue-200">
                        <Droplets className="h-5 w-5" />
                        Chemical Treatment
                      </h3>
                      <ul className="space-y-2">
                        {result.chemicalTreatment.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="mb-3 font-semibold">Recommended Pesticides</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-muted">
                            <tr>
                              <th className="px-4 py-2 text-left">Pesticide Name</th>
                              <th className="px-4 py-2 text-left">Dosage</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.pesticides.map((pesticide, index) => (
                              <tr key={index} className="border-b">
                                <td className="px-4 py-2 font-medium">{pesticide.name}</td>
                                <td className="px-4 py-2 text-muted-foreground">{pesticide.dosage}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "safety" && (
                  <motion.div
                    key="safety"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:bg-red-900/20">
                      <h3 className="mb-3 flex items-center gap-2 font-semibold text-red-800 dark:text-red-200">
                        <Shield className="h-5 w-5" />
                        Safety Instructions
                      </h3>
                      <ul className="space-y-3">
                        {result.safetyInstructions.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Expert Suggestion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border bg-gradient-to-br from-primary/5 to-primary/10 p-6"
            >
              <h3 className="mb-4 text-lg font-semibold">Need Expert Help?</h3>
              <p className="mb-4 text-muted-foreground">
                Connect with certified agriculture experts in your area for personalized guidance
              </p>
              <button className="rounded-xl bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                Find Nearby Experts
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
