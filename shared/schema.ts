import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema definition
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Heart health prediction data schema
export const heartPredictions = pgTable("heart_predictions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  gender: integer("gender").notNull(), // 1 for male, 0 for female
  bloodPressure: integer("blood_pressure").notNull(),
  cholesterol: integer("cholesterol").notNull(),
  chestPainType: integer("chest_pain_type").notNull(), // 0-3
  prediction: boolean("prediction").notNull(), // true for heart disease, false for no heart disease
  createdAt: text("created_at").notNull(), // ISO string timestamp
});

export const heartPredictionSchema = createInsertSchema(heartPredictions).omit({
  id: true,
  prediction: true,
  createdAt: true,
});

export const heartPredictionInputSchema = heartPredictionSchema.extend({
  age: z.number().min(18).max(100),
  gender: z.number().min(0).max(1),
  bloodPressure: z.number().min(80).max(250),
  cholesterol: z.number().min(100).max(600),
  chestPainType: z.number().min(0).max(3),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type HeartPredictionInput = z.infer<typeof heartPredictionInputSchema>;
export type HeartPrediction = typeof heartPredictions.$inferSelect;
