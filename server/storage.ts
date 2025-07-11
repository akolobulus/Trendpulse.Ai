import { users, trendAnalyses, type User, type InsertUser, type TrendAnalysis, type InsertTrendAnalysis } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createTrendAnalysis(analysis: InsertTrendAnalysis): Promise<TrendAnalysis>;
  getTrendAnalysisByQuery(query: string): Promise<TrendAnalysis | undefined>;
  getAllTrendAnalyses(): Promise<TrendAnalysis[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private trendAnalyses: Map<number, TrendAnalysis>;
  private userIdCounter: number;
  private trendIdCounter: number;

  constructor() {
    this.users = new Map();
    this.trendAnalyses = new Map();
    this.userIdCounter = 1;
    this.trendIdCounter = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createTrendAnalysis(analysis: InsertTrendAnalysis): Promise<TrendAnalysis> {
    const id = this.trendIdCounter++;
    const trendAnalysis: TrendAnalysis = { 
      id, 
      createdAt: new Date(),
      query: analysis.query,
      totalMentions: analysis.totalMentions,
      sentimentScore: analysis.sentimentScore,
      positivePercentage: analysis.positivePercentage,
      negativePercentage: analysis.negativePercentage,
      neutralPercentage: analysis.neutralPercentage,
      topRegion: analysis.topRegion,
      trendDirection: analysis.trendDirection,
      growthPercentage: analysis.growthPercentage,
      keywords: analysis.keywords,
      regionalData: analysis.regionalData,
      trendData: analysis.trendData,
      aiInsights: analysis.aiInsights,
      marketOpportunity: analysis.marketOpportunity,
      recommendedStrategy: analysis.recommendedStrategy,
      keyInsight: analysis.keyInsight,
      viralPrediction: analysis.viralPrediction,
      competitorAnalysis: analysis.competitorAnalysis,
      contentSuggestions: analysis.contentSuggestions,
      campaignTitles: analysis.campaignTitles,
      naijaSentiment: analysis.naijaSentiment
    };
    this.trendAnalyses.set(id, trendAnalysis);
    return trendAnalysis;
  }

  async getTrendAnalysisByQuery(query: string): Promise<TrendAnalysis | undefined> {
    return Array.from(this.trendAnalyses.values()).find(
      (analysis) => analysis.query.toLowerCase() === query.toLowerCase()
    );
  }

  async getAllTrendAnalyses(): Promise<TrendAnalysis[]> {
    return Array.from(this.trendAnalyses.values());
  }
}

export const storage = new MemStorage();
