
export enum SystemMode {
  MANUAL = 'MANUAL',
  AUTO = 'AUTO'
}

export interface SensorReadings {
  soilMoisture: number; // Percentage
  airTemperature: number; // Celsius
  airHumidity: number; // Percentage
  timestamp: string;
}

export interface WeatherForecast {
  temperature: number;
  condition: string; // 'Clear', 'Rain', 'Cloudy'
  rainChance: number; // Percentage
  location: string;
}

export interface HistoricalDataPoint {
  time: string;
  soil: number;
  temp: number;
  humidity: number;
}

export interface WaterUsageLog {
  date: string; // "Mon", "Tue" or "DD/MM"
  amount: number; // mL
}

export interface PumpStatus {
  isOn: boolean;
  lastActive: string | null;
  currentVolumeTriggered: number; // ml currently being watered
}

export interface PlantConfig {
  name: string;
  startDate: string; // ISO Date string YYYY-MM-DD
  harvestDays: number; // Days to harvest
  plotSize: number; // Square meters
  quantity: number; // Number of plants
}

export interface AIRecommendation {
  action: 'WATER' | 'WAIT';
  recommendedTime: string;
  recommendedAmount: number; // ml
  reason: string;
}

export interface AIActivityLog {
  timestamp: string;
  action: 'WATER' | 'WAIT';
  amount: number;
  reason: string;
}

export type ThemeColor = 'emerald' | 'blue' | 'orange' | 'violet';

export interface ThemeConfig {
  id: ThemeColor;
  name: string;
  primary: string;      // e.g. 'emerald'
  bgGradient: string;   // e.g. 'from-emerald-50 to-teal-50'
  buttonClass: string;  // e.g. 'bg-emerald-500 hover:bg-emerald-600'
  textClass: string;    // e.g. 'text-emerald-800'
  borderClass: string;  // e.g. 'border-emerald-200'
}
