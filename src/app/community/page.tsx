"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  MessageCircle,
  Heart,
  Share2,
  Image as ImageIcon,
  Send,
  Search,
  TrendingUp,
  Clock,
  User,
  Filter,
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

const categories = ["All", "Crop Discussion", "Disease Help", "Market Talk", "Success Stories", "General"];

const posts = [
  {
    id: 1,
    author: "Ramesh Patil",
    avatar: "RP",
    location: "Nagpur, Maharashtra",
    category: "Success Stories",
    content: "This year I tried the new wheat variety HD-2967 recommended by the app. Got 52 quintals per acre! Very happy with the results. Thanks to the AI advisor!",
    image: true,
    likes: 45,
    comments: 12,
    time: "2 hours ago",
  },
  {
    id: 2,
    author: "Sunita Devi",
    avatar: "SD",
    location: "Pune, Maharashtra",
    category: "Disease Help",
    content: "Can anyone help identify what's happening to my tomato plants? The leaves are turning yellow from the bottom up. I've attached photos.",
    image: true,
    likes: 23,
    comments: 18,
    time: "4 hours ago",
  },
  {
    id: 3,
    author: "Mahesh Yadav",
    avatar: "MY",
    location: "Amravati, Maharashtra",
    category: "Market Talk",
    content: "Cotton prices are dropping in our local mandi. Should I wait or sell now? Current rate is ₹6,400/quintal.",
    image: false,
    likes: 34,
    comments: 28,
    time: "6 hours ago",
  },
  {
    id: 4,
    author: "Priya Sharma",
    avatar: "PS",
    location: "Nashik, Maharashtra",
    category: "Crop Discussion",
    content: "Planning to start organic farming next season. Anyone has experience with organic certification process? What are the main challenges?",
    image: false,
    likes: 67,
    comments: 41,
    time: "1 day ago",
  },
  {
    id: 5,
    author: "Vijay Kumar",
    avatar: "VK",
    location: "Aurangabad, Maharashtra",
    category: "General",
    content: "Just installed drip irrigation system on my 5-acre farm. Initial investment was high but water usage has reduced by 60%! Highly recommend.",
    image: true,
    likes: 89,
    comments: 35,
    time: "2 days ago",
  },
];

const trendingTopics = [
  "#WheatFarming",
  "#OrganicFarming",
  "#DripIrrigation",
  "#CropPrices",
  "#PestControl",
];

const experts = [
  { name: "Dr. Agrawal", role: "Agricultural Scientist", specialty: "Crop Science" },
  { name: "Shri Deshmukh", role: "Extension Officer", specialty: "Soil Health" },
  { name: "Smt. Kulkarni", role: "Horticulturist", specialty: "Fruit Crops" },
];

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [newPost, setNewPost] = useState("");

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const filteredPosts = selectedCategory === "All" 
    ? posts 
    : posts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background p-4 pt-20 md:ml-64 md:pt-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">Farmer Community</h1>
          <p className="text-muted-foreground">
            Connect with fellow farmers, share experiences, and learn together
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Feed */}
          <div className="lg:col-span-2">
            {/* Create Post */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-2xl border bg-card p-4"
            >
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  You
                </div>
                <div className="flex-1">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your farming experience or ask a question..."
                    className="w-full resize-none rounded-xl border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    rows={3}
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted">
                        <ImageIcon className="h-4 w-4" />
                        Photo
                      </button>
                      <button className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted">
                        <Filter className="h-4 w-4" />
                        Category
                      </button>
                    </div>
                    <button
                      disabled={!newPost.trim()}
                      className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 flex gap-2 overflow-x-auto pb-2"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl border bg-card p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {post.avatar}
                      </div>
                      <div>
                        <p className="font-semibold">{post.author}</p>
                        <p className="text-xs text-muted-foreground">{post.location}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                      {post.category}
                    </span>
                  </div>

                  <p className="mb-3 text-sm leading-relaxed">{post.content}</p>

                  {post.image && (
                    <div className="mb-3 h-48 rounded-xl bg-muted">
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        <ImageIcon className="h-8 w-8" />
                        <span className="ml-2">Image placeholder</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t pt-3">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={cn(
                          "flex items-center gap-1 text-sm transition-colors",
                          likedPosts.includes(post.id)
                            ? "text-red-500"
                            : "text-muted-foreground hover:text-red-500"
                        )}
                      >
                        <Heart
                          className={cn(
                            "h-4 w-4",
                            likedPosts.includes(post.id) && "fill-current"
                          )}
                        />
                        {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                      </button>
                      <button className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary">
                        <MessageCircle className="h-4 w-4" />
                        {post.comments}
                      </button>
                      <button className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary">
                        <Share2 className="h-4 w-4" />
                        Share
                      </button>
                    </div>
                    <span className="text-xs text-muted-foreground">{post.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border bg-card p-6"
            >
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <TrendingUp className="h-5 w-5 text-primary" />
                Trending Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map((topic) => (
                  <button
                    key={topic}
                    className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted/80"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Experts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border bg-card p-6"
            >
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <User className="h-5 w-5 text-primary" />
                Expert Panel
              </h3>
              <div className="space-y-4">
                {experts.map((expert, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {expert.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{expert.name}</p>
                      <p className="text-xs text-muted-foreground">{expert.role}</p>
                    </div>
                    <button className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20">
                      Ask
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-2xl border bg-card p-6"
            >
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <Users className="h-5 w-5 text-primary" />
                Community Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Members</span>
                  <span className="font-semibold">12,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Today</span>
                  <span className="font-semibold">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">New Posts</span>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Questions Answered</span>
                  <span className="font-semibold">456</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
