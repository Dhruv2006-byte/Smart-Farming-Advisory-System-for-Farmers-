"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Play,
  Clock,
  Star,
  ChevronRight,
  Award,
  CheckCircle,
  Sprout,
  Droplets,
  Leaf,
  Sun,
  Wind,
  Search,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "All Courses", icon: BookOpen },
  { id: "organic", label: "Organic Farming", icon: Leaf },
  { id: "modern", label: "Modern Techniques", icon: Sprout },
  { id: "irrigation", label: "Smart Irrigation", icon: Droplets },
  { id: "sustainable", label: "Sustainability", icon: Sun },
];

const courses = [
  {
    id: 1,
    title: "Introduction to Organic Farming",
    category: "organic",
    thumbnail: "🌱",
    duration: "2.5 hours",
    lessons: 12,
    rating: 4.8,
    students: 3450,
    level: "Beginner",
    description: "Learn the fundamentals of organic farming including composting, natural pest control, and certification processes.",
    completed: false,
  },
  {
    id: 2,
    title: "Drip Irrigation Mastery",
    category: "irrigation",
    thumbnail: "💧",
    duration: "3 hours",
    lessons: 15,
    rating: 4.9,
    students: 2800,
    level: "Intermediate",
    description: "Master drip irrigation systems from design to maintenance. Save water and increase yields.",
    completed: true,
  },
  {
    id: 3,
    title: "Integrated Pest Management (IPM)",
    category: "modern",
    thumbnail: "🐛",
    duration: "4 hours",
    lessons: 20,
    rating: 4.7,
    students: 2100,
    level: "Intermediate",
    description: "Learn eco-friendly pest management techniques that reduce chemical usage while protecting crops.",
    completed: false,
  },
  {
    id: 4,
    title: "Soil Health Management",
    category: "sustainable",
    thumbnail: "🌍",
    duration: "2 hours",
    lessons: 10,
    rating: 4.6,
    students: 1890,
    level: "Beginner",
    description: "Understand soil composition, testing methods, and techniques to improve soil fertility naturally.",
    completed: false,
  },
  {
    id: 5,
    title: "Precision Agriculture with Drones",
    category: "modern",
    thumbnail: "🚁",
    duration: "3.5 hours",
    lessons: 18,
    rating: 4.9,
    students: 1560,
    level: "Advanced",
    description: "Explore how drone technology can revolutionize your farming with crop monitoring and precision spraying.",
    completed: false,
  },
  {
    id: 6,
    title: "Vermicomposting Guide",
    category: "organic",
    thumbnail: "🪱",
    duration: "1.5 hours",
    lessons: 8,
    rating: 4.8,
    students: 4200,
    level: "Beginner",
    description: "Step-by-step guide to creating nutrient-rich vermicompost for your farm.",
    completed: false,
  },
];

const articles = [
  {
    id: 1,
    title: "5 Organic Pest Control Methods That Actually Work",
    readTime: "5 min read",
    category: "Organic",
    image: "🌿",
  },
  {
    id: 2,
    title: "How to Build a Low-Cost Rainwater Harvesting System",
    readTime: "8 min read",
    category: "Water",
    image: "🌧️",
  },
  {
    id: 3,
    title: "Crop Rotation: The Secret to Soil Fertility",
    readTime: "6 min read",
    category: "Soil",
    image: "🔄",
  },
  {
    id: 4,
    title: "Government Schemes Every Farmer Should Know",
    readTime: "10 min read",
    category: "Policy",
    image: "📋",
  },
];

const achievements = [
  { name: "Organic Pioneer", description: "Complete 3 organic farming courses", icon: Leaf, earned: true },
  { name: "Water Warrior", description: "Save 10,000 liters through smart irrigation", icon: Droplets, earned: true },
  { name: "Soil Scientist", description: "Complete soil health course", icon: Sprout, earned: false },
  { name: "Community Expert", description: "Help 50 farmers in community", icon: Sun, earned: false },
];

export default function LearningPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter(
    (course) =>
      (selectedCategory === "all" || course.category === selectedCategory) &&
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-4 pt-20 md:ml-64 md:pt-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">Learning Center</h1>
          <p className="text-muted-foreground">
            Expand your farming knowledge with expert-led courses and resources
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses, articles, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border bg-card py-3 pl-12 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              <category.icon className="h-4 w-4" />
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8 grid gap-4 md:grid-cols-4"
        >
          <div className="rounded-2xl border bg-card p-4">
            <p className="text-sm text-muted-foreground">Courses Completed</p>
            <p className="text-3xl font-bold">3</p>
          </div>
          <div className="rounded-2xl border bg-card p-4">
            <p className="text-sm text-muted-foreground">Hours Learned</p>
            <p className="text-3xl font-bold">12.5</p>
          </div>
          <div className="rounded-2xl border bg-card p-4">
            <p className="text-sm text-muted-foreground">Certificates</p>
            <p className="text-3xl font-bold">2</p>
          </div>
          <div className="rounded-2xl border bg-card p-4">
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <p className="text-3xl font-bold">5 days</p>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="mb-4 text-xl font-semibold">Featured Courses</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer rounded-2xl border bg-card p-4 transition-all hover:shadow-lg"
              >
                <div className="mb-4 flex h-32 items-center justify-center rounded-xl bg-muted text-5xl">
                  {course.thumbnail}
                </div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {course.level}
                  </span>
                  {course.completed && (
                    <span className="flex items-center gap-1 text-xs text-green-600">
                      <CheckCircle className="h-3 w-3" />
                      Completed
                    </span>
                  )}
                </div>
                <h3 className="mb-2 font-semibold group-hover:text-primary">{course.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Articles Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="mb-4 text-xl font-semibold">Latest Articles</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {articles.map((article, index) => (
              <div
                key={article.id}
                className="flex items-center gap-4 rounded-2xl border bg-card p-4 transition-all hover:bg-muted"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-muted text-3xl">
                  {article.image}
                </div>
                <div className="flex-1">
                  <span className="text-xs font-medium text-primary">{article.category}</span>
                  <h3 className="font-semibold leading-tight">{article.title}</h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border bg-card p-6"
        >
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <Award className="h-5 w-5 text-primary" />
            Your Achievements
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3 rounded-xl p-4",
                  achievement.earned
                    ? "bg-primary/10"
                    : "bg-muted opacity-60"
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl",
                    achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted-foreground/20"
                  )}
                >
                  <achievement.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">{achievement.name}</p>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                {achievement.earned && (
                  <CheckCircle className="ml-auto h-5 w-5 text-primary" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
