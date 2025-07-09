import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const trendAnalyses = pgTable("trend_analyses", {
  id: serial("id").primaryKey(),
  query: text("query").notNull(),
  totalMentions: integer("total_mentions").notNull(),
  sentimentScore: integer("sentiment_score").notNull(),
  positivePercentage: integer("positive_percentage").notNull(),
  negativePercentage: integer("negative_percentage").notNull(),
  neutralPercentage: integer("neutral_percentage").notNull(),
  topRegion: text("top_region").notNull(),
  trendDirection: text("trend_direction").notNull(),
  growthPercentage: integer("growth_percentage").notNull(),
  keywords: jsonb("keywords").$type<string[]>().notNull(),
  regionalData: jsonb("regional_data").$type<{ region: string; percentage: number }[]>().notNull(),
  trendData: jsonb("trend_data").$type<{ day: string; mentions: number }[]>().notNull(),
  aiInsights: text("ai_insights").notNull(),
  marketOpportunity: text("market_opportunity").notNull(),
  recommendedStrategy: text("recommended_strategy").notNull(),
  keyInsight: text("key_insight").notNull(),
  viralPrediction: jsonb("viral_prediction").$type<{
    isLikelyToGoViral: boolean;
    confidence: number;
    reason: string;
  }>(),
  competitorAnalysis: jsonb("competitor_analysis").$type<{
    mainCompetitor: string;
    competitorSentiment: number;
    competitorMentions: number;
    advantage: string;
  }>(),
  contentSuggestions: jsonb("content_suggestions").$type<string[]>(),
  campaignTitles: jsonb("campaign_titles").$type<string[]>(),
  naijaSentiment: jsonb("naija_sentiment").$type<{
    pidginPhrases: string[];
    streetSlangAnalysis: string;
  }>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTrendAnalysisSchema = createInsertSchema(trendAnalyses).omit({
  id: true,
  createdAt: true,
});

export const searchQuerySchema = z.object({
  query: z.string().min(1, "Query is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type TrendAnalysis = typeof trendAnalyses.$inferSelect;
export type InsertTrendAnalysis = z.infer<typeof insertTrendAnalysisSchema>;
export type SearchQuery = z.infer<typeof searchQuerySchema>;
