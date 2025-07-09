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
  viralPrediction: {
    isLikelyToGoViral: boolean;
    confidence: number;
    reason: string;
  };
  competitorAnalysis: {
    mainCompetitor: string;
    competitorSentiment: number;
    competitorMentions: number;
    advantage: string;
  };
  contentSuggestions: string[];
  campaignTitles: string[];
  naijaSentiment: {
    pidginPhrases: string[];
    streetSlangAnalysis: string;
  };
}

export async function generateTrendAnalysis(query: string): Promise<TrendAnalysisResult> {
  try {
    const systemPrompt = `You are an AI market intelligence analyst specializing in Nigerian market trends. Generate comprehensive market trend analysis data for the given product/service/topic. Return JSON in this exact format:
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
      "keyInsight": string (key insight about timing or engagement),
      "viralPrediction": {
        "isLikelyToGoViral": boolean,
        "confidence": number (0-100),
        "reason": string
      },
      "competitorAnalysis": {
        "mainCompetitor": string,
        "competitorSentiment": number (1-100),
        "competitorMentions": number,
        "advantage": string
      },
      "contentSuggestions": [string array of 4 social media captions using Nigerian slang],
      "campaignTitles": [string array of 4 catchy campaign titles],
      "naijaSentiment": {
        "pidginPhrases": [string array of 3 pidgin phrases],
        "streetSlangAnalysis": string
      }
    }
    
    Make the data realistic and relevant to the Nigerian market. Use authentic Nigerian pidgin English and street slang where appropriate.`;

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
            keyInsight: { type: "string" },
            viralPrediction: {
              type: "object",
              properties: {
                isLikelyToGoViral: { type: "boolean" },
                confidence: { type: "number" },
                reason: { type: "string" }
              }
            },
            competitorAnalysis: {
              type: "object",
              properties: {
                mainCompetitor: { type: "string" },
                competitorSentiment: { type: "number" },
                competitorMentions: { type: "number" },
                advantage: { type: "string" }
              }
            },
            contentSuggestions: { type: "array", items: { type: "string" } },
            campaignTitles: { type: "array", items: { type: "string" } },
            naijaSentiment: {
              type: "object",
              properties: {
                pidginPhrases: { type: "array", items: { type: "string" } },
                streetSlangAnalysis: { type: "string" }
              }
            }
          },
          required: ["totalMentions", "sentimentScore", "positivePercentage", "negativePercentage", "neutralPercentage", "topRegion", "trendDirection", "growthPercentage", "keywords", "regionalData", "trendData", "aiInsights", "marketOpportunity", "recommendedStrategy", "keyInsight", "viralPrediction", "competitorAnalysis", "contentSuggestions", "campaignTitles", "naijaSentiment"]
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

export async function generateContentIdeas(topic: string): Promise<string[]> {
  try {
    const systemPrompt = `You are a Nigerian social media content creator. Generate 5 viral social media captions for the topic "${topic}". Use authentic Nigerian pidgin English, street slang, and trending hashtags. Make them engaging and shareable.`;

    const response = await genai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            captions: { type: "array", items: { type: "string" } }
          }
        }
      },
      contents: `Generate social media captions for: ${topic}`,
    });

    const result = JSON.parse(response.text || '{"captions": []}');
    return result.captions || [];
  } catch (error) {
    console.error("Failed to generate content ideas:", error);
    throw new Error("Failed to generate content ideas. Please try again.");
  }
}

export async function analyzePidginSentiment(text: string): Promise<{ sentiment: string; confidence: number; translation: string }> {
  try {
    const systemPrompt = `You are an expert in Nigerian pidgin English and street slang. Analyze the sentiment of the given text and provide a translation if needed. Return JSON format:
    {
      "sentiment": "Positive" | "Negative" | "Neutral",
      "confidence": number (0-100),
      "translation": "English translation if pidgin/slang detected"
    }`;

    const response = await genai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            sentiment: { type: "string" },
            confidence: { type: "number" },
            translation: { type: "string" }
          }
        }
      },
      contents: `Analyze this text: "${text}"`,
    });

    const result = JSON.parse(response.text || '{"sentiment": "Neutral", "confidence": 50, "translation": ""}');
    return result;
  } catch (error) {
    console.error("Failed to analyze pidgin sentiment:", error);
    throw new Error("Failed to analyze sentiment. Please try again.");
  }
}

export async function generateCampaignTitles(topic: string): Promise<string[]> {
  try {
    const systemPrompt = `You are a Nigerian marketing expert. Generate 5 catchy, viral campaign titles for "${topic}". Use Nigerian culture references, popular phrases, and make them memorable and shareable.`;

    const response = await genai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            titles: { type: "array", items: { type: "string" } }
          }
        }
      },
      contents: `Generate campaign titles for: ${topic}`,
    });

    const result = JSON.parse(response.text || '{"titles": []}');
    return result.titles || [];
  } catch (error) {
    console.error("Failed to generate campaign titles:", error);
    throw new Error("Failed to generate campaign titles. Please try again.");
  }
}

export async function predictViralPotential(topic: string, recentTrends: any[]): Promise<{ isLikelyToGoViral: boolean; confidence: number; reason: string }> {
  try {
    const systemPrompt = `You are an AI trend analyst specializing in viral content prediction. Analyze the given topic and recent trend data to predict if it will go viral in the next 24 hours. Consider factors like mention growth, sentiment spikes, and engagement patterns.`;

    const response = await genai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            isLikelyToGoViral: { type: "boolean" },
            confidence: { type: "number" },
            reason: { type: "string" }
          }
        }
      },
      contents: `Predict viral potential for: ${topic}. Recent trends: ${JSON.stringify(recentTrends)}`,
    });

    const result = JSON.parse(response.text || '{"isLikelyToGoViral": false, "confidence": 50, "reason": "Insufficient data"}');
    return result;
  } catch (error) {
    console.error("Failed to predict viral potential:", error);
    throw new Error("Failed to predict viral potential. Please try again.");
  }
}
