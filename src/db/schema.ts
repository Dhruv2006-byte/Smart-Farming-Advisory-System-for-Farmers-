import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  decimal,
  date,
} from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  password: varchar("password", { length: 255 }),
  state: varchar("state", { length: 100 }),
  district: varchar("district", { length: 100 }),
  village: varchar("village", { length: 100 }),
  language: varchar("language", { length: 10 }).default("en"),
  farmSize: decimal("farm_size", { precision: 10, scale: 2 }),
  soilType: varchar("soil_type", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Farm records
export const farmRecords = pgTable("farm_records", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  cropName: varchar("crop_name", { length: 100 }).notNull(),
  season: varchar("season", { length: 50 }),
  sowingDate: date("sowing_date"),
  harvestDate: date("harvest_date"),
  area: decimal("area", { precision: 10, scale: 2 }),
  yield: decimal("yield", { precision: 10, scale: 2 }),
  status: varchar("status", { length: 50 }).default("growing"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Expenses
export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  farmRecordId: integer("farm_record_id").references(() => farmRecords.id),
  category: varchar("category", { length: 50 }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  date: date("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Income
export const income = pgTable("income", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  farmRecordId: integer("farm_record_id").references(() => farmRecords.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  source: varchar("source", { length: 100 }),
  date: date("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Soil reports
export const soilReports = pgTable("soil_reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  ph: decimal("ph", { precision: 3, scale: 1 }),
  nitrogen: decimal("nitrogen", { precision: 5, scale: 2 }),
  phosphorus: decimal("phosphorus", { precision: 5, scale: 2 }),
  potassium: decimal("potassium", { precision: 5, scale: 2 }),
  organicCarbon: decimal("organic_carbon", { precision: 5, scale: 2 }),
  moisture: decimal("moisture", { precision: 5, scale: 2 }),
  healthScore: integer("health_score"),
  recommendations: jsonb("recommendations"),
  date: date("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Disease detection records
export const diseaseDetections = pgTable("disease_detections", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  imageUrl: text("image_url"),
  diseaseName: varchar("disease_name", { length: 255 }),
  confidence: integer("confidence"),
  cause: text("cause"),
  prevention: text("prevention"),
  organicTreatment: text("organic_treatment"),
  chemicalTreatment: text("chemical_treatment"),
  detectedAt: timestamp("detected_at").defaultNow(),
});

// Irrigation schedules
export const irrigationSchedules = pgTable("irrigation_schedules", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  farmRecordId: integer("farm_record_id").references(() => farmRecords.id),
  date: date("date").notNull(),
  time: varchar("time", { length: 10 }),
  duration: integer("duration"),
  method: varchar("method", { length: 50 }),
  waterAmount: decimal("water_amount", { precision: 10, scale: 2 }),
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Fertilizer schedules
export const fertilizerSchedules = pgTable("fertilizer_schedules", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => farmRecords.id),
  farmRecordId: integer("farm_record_id").references(() => farmRecords.id),
  fertilizerName: varchar("fertilizer_name", { length: 255 }),
  quantity: decimal("quantity", { precision: 10, scale: 2 }),
  applicationDate: date("application_date"),
  method: varchar("method", { length: 50 }),
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Forum posts
export const forumPosts = pgTable("forum_posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 50 }),
  imageUrl: text("image_url"),
  likes: integer("likes").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Forum comments
export const forumComments = pgTable("forum_comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").references(() => forumPosts.id),
  userId: integer("user_id").references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Chat messages
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  message: text("message").notNull(),
  response: text("response"),
  language: varchar("language", { length: 10 }).default("en"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Crop recommendations cache
export const cropRecommendations = pgTable("crop_recommendations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  state: varchar("state", { length: 100 }),
  district: varchar("district", { length: 100 }),
  soilType: varchar("soil_type", { length: 50 }),
  season: varchar("season", { length: 50 }),
  recommendations: jsonb("recommendations"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Weather data cache
export const weatherData = pgTable("weather_data", {
  id: serial("id").primaryKey(),
  location: varchar("location", { length: 255 }),
  data: jsonb("data"),
  forecast: jsonb("forecast"),
  fetchedAt: timestamp("fetched_at").defaultNow(),
});

// Market prices
export const marketPrices = pgTable("market_prices", {
  id: serial("id").primaryKey(),
  crop: varchar("crop", { length: 100 }),
  market: varchar("market", { length: 255 }),
  price: decimal("price", { precision: 10, scale: 2 }),
  unit: varchar("unit", { length: 20 }),
  date: date("date"),
  trend: varchar("trend", { length: 10 }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Notifications
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: varchar("title", { length: 255 }),
  message: text("message"),
  type: varchar("type", { length: 50 }),
  read: boolean("read").default(false),
  scheduledFor: timestamp("scheduled_for"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Expert consultations
export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  expertName: varchar("expert_name", { length: 255 }),
  expertPhone: varchar("expert_phone", { length: 20 }),
  scheduledDate: date("scheduled_date"),
  scheduledTime: varchar("scheduled_time", { length: 10 }),
  type: varchar("type", { length: 20 }), // video, audio, chat
  status: varchar("status", { length: 20 }).default("pending"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});
