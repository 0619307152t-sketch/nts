
import { HistoricalDataPoint, WaterUsageLog } from "../types";

/**
 * Service สำหรับเชื่อมต่อกับ Google Apps Script (Web App)
 * ตามโครงสร้าง doPost และ doGet ที่ระบุมา
 */

const GOOGLE_SCRIPT_URL: string = "https://script.google.com/macros/s/AKfycbwEFk7miAwDKVfMRD9-HhK-U65lzQ1d_8kiKBX-B8qs2DrUJm8qPnfHpReKMAFoPrd_CA/exec"; 

export const fetchSheetData = async (): Promise<{ history: HistoricalDataPoint[], waterUsage: WaterUsageLog[] }> => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL);
    if (!response.ok) throw new Error("Network response was not ok");
    
    const data = await response.json();
    
    // แปลงข้อมูลให้ตรงกับ Interface ของระบบ (Apps Script ส่ง temp, humidity, soil กลับมา)
    const history = (data.history || []).map((item: any) => ({
      time: item.time,
      soil: Number(item.soil),
      temp: Number(item.temp),
      humidity: Number(item.humidity)
    }));

    return {
      history,
      waterUsage: data.waterUsage || []
    };
  } catch (error) {
    console.error("Error fetching from Google Sheets:", error);
    return { history: [], waterUsage: [] }; 
  }
};

// บันทึกการรดน้ำ
export const logWaterUsageToSheet = async (amount: number): Promise<boolean> => {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: 'water',
        amount: amount
      })
    });
    return true;
  } catch (e) {
    console.error("Log water usage failed:", e);
    return false;
  }
};

// บันทึกค่าจากเซนเซอร์ (สำหรับทดสอบ หรือเรียกจาก Device)
export const logSensorDataToSheet = async (temp: number, humidity: number, soil: number): Promise<boolean> => {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: 'sensor',
        temp: temp,
        humidity: humidity,
        soil: soil
      })
    });
    return true;
  } catch (e) {
    console.error("Log sensor data failed:", e);
    return false;
  }
};
