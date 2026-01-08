import { HistoricalDataPoint, WaterUsageLog, SensorReadings } from "../types";

/**
 * This service simulates the interaction with Google Sheets via Google Apps Script (Web App).
 * In a real production environment, you would replace the mock returns with actual fetch() calls
 * to your Google Apps Script URL.
 */

// Mock delay to simulate network request
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchSheetData = async (): Promise<{ history: HistoricalDataPoint[], waterUsage: WaterUsageLog[] }> => {
  await delay(800); // Simulate network latency

  // Mock Historical Sensor Data (from Sheet)
  const history: HistoricalDataPoint[] = Array.from({ length: 15 }, (_, i) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() - (15 - i) * 30); // Every 30 mins
    return {
      time: date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      soil: Math.floor(40 + Math.random() * 20),
      temp: Math.floor(28 + Math.random() * 5),
      humidity: Math.floor(60 + Math.random() * 20),
      light: Math.floor(1000 + Math.random() * 4000)
    };
  });

  // Mock Water Usage Data (Last 7 Days)
  const days = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์', 'อาทิตย์'];
  const waterUsage: WaterUsageLog[] = days.map(day => ({
    date: day,
    amount: Math.floor(Math.random() * 2000) + 500 // Random between 500ml - 2500ml
  }));

  return { history, waterUsage };
};

export const logDataToSheet = async (data: SensorReadings): Promise<boolean> => {
  // In real app: await fetch('YOUR_GOOGLE_SCRIPT_URL', { method: 'POST', body: JSON.stringify(data) ... });
  await delay(500);
  console.log("Syncing to Google Sheets:", data);
  return true;
};

export const logWaterUsageToSheet = async (amount: number): Promise<boolean> => {
  await delay(500);
  console.log(`Logged water usage: ${amount}ml to Google Sheets`);
  return true;
};