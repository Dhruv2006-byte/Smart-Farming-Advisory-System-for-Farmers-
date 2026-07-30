"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sprout,
  Brain,
  ScanLine,
  Droplets,
  Sun,
  TrendingUp,
  MessageCircle,
  Users,
  ArrowRight,
  Leaf,
  Shield,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Crop Advisor",
    description: "Get personalized crop recommendations based on your soil, climate, and budget.",
    href: "/crop-advisor",
    color: "bg-blue-500",
  },
  {
    icon: ScanLine,
    title: "Disease Detection",
    description: "Upload leaf images to detect diseases and get treatment recommendations instantly.",
    href: "/disease-detection",
    color: "bg-red-500",
  },
  {
    icon: Sun,
    title: "Weather Forecast",
    description: "7-day weather forecast with farming alerts and recommendations.",
    href: "/weather",
    color: "bg-yellow-500",
  },
  {
    icon: TrendingUp,
    title: "Market Prices",
    description: "Real-time mandi prices and market trends for your crops.",
    href: "/market",
    color: "bg-green-500",
  },
  {
    icon: Droplets,
    title: "Smart Irrigation",
    description: "Optimize water usage with AI-powered irrigation schedules.",
    href: "/irrigation",
    color: "bg-cyan-500",
  },
  {
    icon: MessageCircle,
    title: "AI Assistant",
    description: "Ask farming questions in English, Hindi, or Marathi via text or voice.",
    href: "/chat",
    color: "bg-purple-500",
  },
];

const stats = [
  { value: "50K+", label: "Farmers Helped" },
  { value: "95%", label: "Accuracy Rate" },
  { value: "24/7", label: "AI Support" },
  { value: "3", label: "Languages" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
          />
        </div>

        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm font-medium">
              <Leaf className="h-4 w-4 text-primary" />
              <span>Powered by AI for Indian Farmers</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Smart Farming
              <br />
              <span className="text-primary">Advisory System</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Your AI-powered farming companion. Get crop recommendations, detect plant diseases, 
              check weather forecasts, and access market prices - all in one place.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/crop-advisor"
                className="inline-flex items-center gap-2 rounded-xl border bg-card px-8 py-4 text-lg font-semibold text-foreground transition-all hover:bg-muted"
              >
                Try AI Advisor
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary md:text-4xl">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Everything You Need for Smart Farming
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Our comprehensive suite of AI-powered tools helps you make informed decisions 
              and maximize your farm productivity.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={feature.href}
                  className="group block rounded-2xl border bg-card p-6 transition-all hover:shadow-lg"
                >
                  <div className={`mb-4 inline-flex rounded-xl ${feature.color} p-3`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
                Why Choose Smart Farming?
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Shield,
                    title: "Reliable AI Technology",
                    description: "Our AI models are trained on extensive agricultural data to provide accurate recommendations.",
                  },
                  {
                    icon: Zap,
                    title: "Instant Results",
                    description: "Get crop recommendations, disease detection, and market prices in seconds.",
                  },
                  {
                    icon: Users,
                    title: "Farmer Community",
                    description: "Connect with other farmers, share experiences, and learn from experts.",
                  },
                  {
                    icon: Leaf,
                    title: "Sustainable Farming",
                    description: "Learn about organic farming, water conservation, and sustainable practices.",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <benefit.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 p-8">
                <div className="space-y-4">
                  <div className="rounded-2xl bg-card p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <Sprout className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Crop Recommendation</p>
                        <p className="text-sm text-muted-foreground">Wheat - 95% suitable</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-card p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <Sun className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Weather Alert</p>
                        <p className="text-sm text-muted-foreground">Light rain expected tomorrow</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-card p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                        <TrendingUp className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium">Market Update</p>
                        <p className="text-sm text-muted-foreground">Rice prices up by 5%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12"
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Ready to Transform Your Farming?
            </h2>
            <p className="mb-8 text-primary-foreground/80">
              Join thousands of farmers who are already using Smart Farming Advisory System 
              to increase their productivity and profits.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary transition-all hover:bg-white/90 hover:shadow-lg"
            >
              Start Your Journey
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
