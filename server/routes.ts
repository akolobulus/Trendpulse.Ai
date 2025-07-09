import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { searchQuerySchema } from "@shared/schema";
import { generateTrendAnalysis, generatePDFReport } from "./services/gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Analyze trends endpoint
  app.post("/api/analyze", async (req, res) => {
    try {
      const { query } = searchQuerySchema.parse(req.body);
      
      // Check if analysis already exists
      const existingAnalysis = await storage.getTrendAnalysisByQuery(query);
      if (existingAnalysis) {
        return res.json(existingAnalysis);
      }

      // Generate new analysis using OpenAI
      const analysisResult = await generateTrendAnalysis(query);
      
      // Store the analysis
      const savedAnalysis = await storage.createTrendAnalysis({
        query,
        ...analysisResult,
      });

      res.json(savedAnalysis);
    } catch (error) {
      console.error("Error analyzing trends:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to analyze trends" 
      });
    }
  });

  // Get analysis by query
  app.get("/api/analysis/:query", async (req, res) => {
    try {
      const { query } = req.params;
      const analysis = await storage.getTrendAnalysisByQuery(query);
      
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }

      res.json(analysis);
    } catch (error) {
      console.error("Error fetching analysis:", error);
      res.status(500).json({ message: "Failed to fetch analysis" });
    }
  });

  // Generate PDF report
  app.post("/api/generate-report", async (req, res) => {
    try {
      const { query } = searchQuerySchema.parse(req.body);
      
      const analysis = await storage.getTrendAnalysisByQuery(query);
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }

      const reportContent = await generatePDFReport(analysis, query);
      
      res.json({ content: reportContent });
    } catch (error) {
      console.error("Error generating report:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to generate report" 
      });
    }
  });

  // Get all analyses
  app.get("/api/analyses", async (req, res) => {
    try {
      const analyses = await storage.getAllTrendAnalyses();
      res.json(analyses);
    } catch (error) {
      console.error("Error fetching analyses:", error);
      res.status(500).json({ message: "Failed to fetch analyses" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
