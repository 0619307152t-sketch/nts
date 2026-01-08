
import { GoogleGenAI, Type } from "@google/genai";
import { SensorReadings, WeatherForecast, AIRecommendation, PlantConfig } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to determine growth stage string
const getGrowthStage = (age: number, totalDays: number): string => {
  const progress = (age / totalDays) * 100;
  if (progress < 20) return "Seedling (เพาะกล้า/ตั้งตัว)";
  if (progress < 55) return "Vegetative (ช่วงทำใบ/เติบโต)";
  if (progress < 90) return "Flowering/Fruiting (ออกดอก/ติดผล)";
  return "Harvest Ready (ระยะเก็บเกี่ยว)";
};

// Fallback Logic
const calculateFallbackAdvice = (
  sensors: SensorReadings,
  weather: WeatherForecast,
  plant: PlantConfig
): AIRecommendation => {
  if (weather.rainChance > 60) {
    return {
      action: 'WAIT',
      recommendedTime: 'หลังฝนหยุด',
      recommendedAmount: 0,
      reason: `ฝนมีโอกาสตก ${weather.rainChance}% (ระบบสำรอง)`
    };
  }

  if (sensors.soilMoisture < 35) {
    const amount = plant.quantity * 150; 
    return {
      action: 'WATER',
      recommendedTime: 'ทันที',
      recommendedAmount: amount,
      reason: `ความชื้นต่ำ (${sensors.soilMoisture}%) (ระบบสำรอง)`
    };
  }

  return {
    action: 'WAIT',
    recommendedTime: 'พรุ่งนี้เช้า',
    recommendedAmount: 0,
    reason: `ความชื้นเพียงพอ (${sensors.soilMoisture}%) (ระบบสำรอง)`
  };
};

export const getGardenAdvice = async (
  sensors: SensorReadings,
  weather: WeatherForecast,
  plant: PlantConfig
): Promise<AIRecommendation> => {
  try {
    // Calculate plant age and stage
    const start = new Date(plant.startDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const ageInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const stage = getGrowthStage(ageInDays, plant.harvestDays);

    const prompt = `
      Role: Expert Agronomist AI for Smart Irrigation.
      
      Current Plant Status:
      - Name: ${plant.name}
      - Age: ${ageInDays} days
      - Growth Stage: ${stage}
      - Plot: ${plant.quantity} plants, ${plant.plotSize} sq.m.

      Environment:
      - Soil Moisture: ${sensors.soilMoisture}%
      - Temp: ${sensors.airTemperature}°C
      - Humidity: ${sensors.airHumidity}%
      - Rain Forecast: ${weather.rainChance}% chance of ${weather.condition}

      Task: Decide if we should WATER or WAIT. 
      Logic:
      1. Consider the Growth Stage. (e.g., "Seedling" needs frequent light water, "Fruiting" needs consistent moisture).
      2. Consider Rain. If rain > 60%, usually WAIT.
      3. Calculate Volume (ml) based on Plot Size/Quantity if watering.

      Output JSON: { "action": "WATER"|"WAIT", "recommendedTime": "Short string", "recommendedAmount": int (total ml), "reason": "Short Thai explanation < 15 words" }
    `;

    // Updated to use gemini-3-flash-preview as recommended for general text reasoning tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            action: { type: Type.STRING, enum: ["WATER", "WAIT"] },
            recommendedTime: { type: Type.STRING },
            recommendedAmount: { type: Type.INTEGER },
            reason: { type: Type.STRING }
          },
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response text");
    
    return JSON.parse(jsonText) as AIRecommendation;

  } catch (error: any) {
    console.warn("AI Service Error:", error);
    if (error.status === 429 || (error.message && error.message.includes('429'))) {
       return calculateFallbackAdvice(sensors, weather, plant);
    }
    return calculateFallbackAdvice(sensors, weather, plant);
  }
};
