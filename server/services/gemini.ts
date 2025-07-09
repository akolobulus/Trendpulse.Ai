import { GoogleGenAI } from "@google/genai";

// Using Google Gemini for AI-powered market intelligence
const genai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || "AIzaSyCF8rYAKIyAGiS67VVazM00CPvrpxkJ6O4" 
});

export interface TrendAnalysisResult {
  totalMentions: number;
  sentimentScore: number;
  positivePercentage: number;
  negativePercentage: number;
  neutralPercentage: number;
  topRegion: string;
  trendDirection: string;
  growthPercentage: number;
  keywords: string[];
  regionalData: { region: string; percentage: number }[];
  trendData: { day: string; mentions: number }[];
  aiInsights: string;
  marketOpportunity: string;
  recommendedStrategy: string;
  keyInsight: string;
}

export async function generateTrendAnalysis(query: string): Promise<TrendAnalysisResult> {
  try {
    const systemPrompt = `You are an AI market intelligence analyst. Generate realistic market trend analysis data for the given product/service/topic. Return JSON in this exact format:
    {
      "totalMentions": number,
      "sentimentScore": number (1-100),
      "positivePercentage": number,
      "negativePercentage": number,
      "neutralPercentage": number,
      "topRegion": string,
      "trendDirection": string ("Rising" or "Falling"),
      "growthPercentage": number,
      "keywords": [string array of 6 relevant hashtags/keywords],
      "regionalData": [{"region": string, "percentage": number}] (4 regions),
      "trendData": [{"day": string, "mentions": number}] (7 days),
      "aiInsights": string (brief summary of sentiment and trends),
      "marketOpportunity": string (market opportunity analysis),
      "recommendedStrategy": string (marketing strategy recommendations),
      "keyInsight": string (key insight about timing or engagement)
    }
    
    Make the data realistic and relevant to the Nigerian market where appropriate.`;

    const response = await genai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            totalMentions: { type: "number" },
            sentimentScore: { type: "number" },
            positivePercentage: { type: "number" },
            negativePercentage: { type: "number" },
            neutralPercentage: { type: "number" },
            topRegion: { type: "string" },
            trendDirection: { type: "string" },
            growthPercentage: { type: "number" },
            keywords: { type: "array", items: { type: "string" } },
            regionalData: { 
              type: "array", 
              items: { 
                type: "object", 
                properties: { 
                  region: { type: "string" }, 
                  percentage: { type: "number" } 
                } 
              } 
            },
            trendData: { 
              type: "array", 
              items: { 
                type: "object", 
                properties: { 
                  day: { type: "string" }, 
                  mentions: { type: "number" } 
                } 
              } 
            },
            aiInsights: { type: "string" },
            marketOpportunity: { type: "string" },
            recommendedStrategy: { type: "string" },
            keyInsight: { type: "string" }
          },
          required: ["totalMentions", "sentimentScore", "positivePercentage", "negativePercentage", "neutralPercentage", "topRegion", "trendDirection", "growthPercentage", "keywords", "regionalData", "trendData", "aiInsights", "marketOpportunity", "recommendedStrategy", "keyInsight"]
        }
      },
      contents: `Generate market trend analysis for: ${query}`,
    });

    const result = JSON.parse(response.text || "{}");
    
    // Validate and ensure percentages add up to 100
    const total = result.positivePercentage + result.negativePercentage + result.neutralPercentage;
    if (total !== 100) {
      const ratio = 100 / total;
      result.positivePercentage = Math.round(result.positivePercentage * ratio);
      result.negativePercentage = Math.round(result.negativePercentage * ratio);
      result.neutralPercentage = 100 - result.positivePercentage - result.negativePercentage;
    }

    return result;
  } catch (error) {
    console.error("Failed to generate trend analysis:", error);
    throw new Error("Failed to analyze trends. Please try again.");
  }
}

export async function generatePDFReport(analysis: TrendAnalysisResult, query: string): Promise<string> {
  try {
    const systemPrompt = "Generate a comprehensive market intelligence report in markdown format based on the provided trend analysis data. Include executive summary, key findings, sentiment analysis, regional insights, and recommendations.";

    const response = await genai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
      },
      contents: `Generate a detailed market report for "${query}" based on this data: ${JSON.stringify(analysis)}`,
    });

    return response.text || "";
  } catch (error) {
    console.error("Failed to generate PDF report:", error);
    throw new Error("Failed to generate report. Please try again.");
  }
}
