
import { WeatherForecast } from "../types";

export const THAI_PROVINCES = [
  { name: 'กรุงเทพมหานคร', lat: 13.7563, lng: 100.5018 },
  { name: 'กระบี่', lat: 8.0863, lng: 98.9063 },
  { name: 'กาญจนบุรี', lat: 14.0228, lng: 99.5328 },
  { name: 'กาฬสินธุ์', lat: 16.4353, lng: 103.5065 },
  { name: 'กำแพงเพชร', lat: 16.4828, lng: 99.5227 },
  { name: 'ขอนแก่น', lat: 16.4322, lng: 102.8236 },
  { name: 'จันทบุรี', lat: 12.6112, lng: 102.1039 },
  { name: 'ฉะเชิงเทรา', lat: 13.6888, lng: 101.0713 },
  { name: 'ชลบุรี', lat: 13.3611, lng: 100.9847 },
  { name: 'ชัยนาท', lat: 15.1852, lng: 100.1251 },
  { name: 'ชัยภูมิ', lat: 15.8068, lng: 102.0315 },
  { name: 'ชุมพร', lat: 10.4930, lng: 99.1800 },
  { name: 'เชียงราย', lat: 19.9105, lng: 99.8406 },
  { name: 'เชียงใหม่', lat: 18.7061, lng: 98.9817 },
  { name: 'ตรัง', lat: 7.5645, lng: 99.6239 },
  { name: 'ตราด', lat: 12.2428, lng: 102.5175 },
  { name: 'ตาก', lat: 16.8840, lng: 99.1258 },
  { name: 'นครนายก', lat: 14.2069, lng: 101.2130 },
  { name: 'นครปฐม', lat: 13.8196, lng: 100.0617 },
  { name: 'นครพนม', lat: 17.3920, lng: 104.7696 },
  { name: 'นครราชสีมา', lat: 14.9799, lng: 102.0978 },
  { name: 'นครศรีธรรมราช', lat: 8.4304, lng: 99.9631 },
  { name: 'นครสวรรค์', lat: 15.7036, lng: 100.1372 },
  { name: 'นนทบุรี', lat: 13.8591, lng: 100.4913 },
  { name: 'นราธิวาส', lat: 6.4255, lng: 101.8253 },
  { name: 'น่าน', lat: 18.7830, lng: 100.7816 },
  { name: 'บึงกาฬ', lat: 18.3615, lng: 103.6528 },
  { name: 'บุรีรัมย์', lat: 14.9930, lng: 103.1029 },
  { name: 'ปทุมธานี', lat: 14.0208, lng: 100.5250 },
  { name: 'ประจวบคีรีขันธ์', lat: 11.8041, lng: 99.7963 },
  { name: 'ปราจีนบุรี', lat: 14.0531, lng: 101.3725 },
  { name: 'ปัตตานี', lat: 6.8677, lng: 101.2501 },
  { name: 'พระนครศรีอยุธยา', lat: 14.3532, lng: 100.5684 },
  { name: 'พะเยา', lat: 19.1658, lng: 99.9024 },
  { name: 'พังงา', lat: 8.4411, lng: 98.5255 },
  { name: 'พัทลุง', lat: 7.6167, lng: 100.0740 },
  { name: 'พิจิตร', lat: 16.4428, lng: 100.3488 },
  { name: 'พิษณุโลก', lat: 16.8211, lng: 100.2659 },
  { name: 'เพชรบุรี', lat: 13.1122, lng: 99.9443 },
  { name: 'เพชรบูรณ์', lat: 16.4191, lng: 101.1557 },
  { name: 'แพร่', lat: 18.1446, lng: 100.1403 },
  { name: 'ภูเก็ต', lat: 7.8804, lng: 98.3923 },
  { name: 'มหาสารคาม', lat: 16.1850, lng: 103.3008 },
  { name: 'มุกดาหาร', lat: 16.5436, lng: 104.7244 },
  { name: 'แม่ฮ่องสอน', lat: 19.2971, lng: 97.9675 },
  { name: 'ยโสธร', lat: 15.7931, lng: 104.1453 },
  { name: 'ยะลา', lat: 6.5399, lng: 101.2813 },
  { name: 'ร้อยเอ็ด', lat: 16.0522, lng: 103.6520 },
  { name: 'ระนอง', lat: 9.9529, lng: 98.6300 },
  { name: 'ระยอง', lat: 12.6814, lng: 101.2813 },
  { name: 'ราชบุรี', lat: 13.5283, lng: 99.8134 },
  { name: 'ลพบุรี', lat: 14.7995, lng: 100.6534 },
  { name: 'ลำปาง', lat: 18.2856, lng: 99.4924 },
  { name: 'ลำพูน', lat: 18.5772, lng: 99.0084 },
  { name: 'เลย', lat: 17.4860, lng: 101.7223 },
  { name: 'ศรีสะเกษ', lat: 15.1186, lng: 104.3318 },
  { name: 'สกลนคร', lat: 17.1540, lng: 104.1450 },
  { name: 'สงขลา', lat: 7.1898, lng: 100.5954 },
  { name: 'สตูล', lat: 6.6238, lng: 100.0674 },
  { name: 'สมุทรปราการ', lat: 13.5991, lng: 100.5967 },
  { name: 'สมุทรสงคราม', lat: 13.4098, lng: 100.0023 },
  { name: 'สมุทรสาคร', lat: 13.5475, lng: 100.2744 },
  { name: 'สระแก้ว', lat: 13.8240, lng: 102.0646 },
  { name: 'สระบุรี', lat: 14.5289, lng: 100.9101 },
  { name: 'สิงห์บุรี', lat: 14.8936, lng: 100.3967 },
  { name: 'สุโขทัย', lat: 17.0078, lng: 99.8235 },
  { name: 'สุพรรณบุรี', lat: 14.4746, lng: 100.1177 },
  { name: 'สุราษฎร์ธานี', lat: 9.1342, lng: 99.3334 },
  { name: 'สุรินทร์', lat: 14.8814, lng: 103.4936 },
  { name: 'หนองคาย', lat: 17.8783, lng: 102.7412 },
  { name: 'หนองบัวลำภู', lat: 17.2034, lng: 102.4260 },
  { name: 'อ่างทอง', lat: 14.5896, lng: 100.4551 },
  { name: 'อำนาจเจริญ', lat: 15.8911, lng: 104.6258 },
  { name: 'อุดรธานี', lat: 17.4150, lng: 102.7859 },
  { name: 'อุตรดิตถ์', lat: 17.6254, lng: 100.0993 },
  { name: 'อุทัยธานี', lat: 15.3835, lng: 100.0248 },
  { name: 'อุบลราชธานี', lat: 15.2287, lng: 104.8564 }
];

export const getRealWeather = async (lat: number, lng: number): Promise<WeatherForecast | null> => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code&daily=precipitation_probability_max&timezone=Asia/Bangkok`
    );
    
    if (!response.ok) throw new Error("Weather API Error");
    
    const data = await response.json();
    
    const code = data.current.weather_code;
    let condition = 'Clear';
    if (code >= 1 && code <= 3) condition = 'Cloudy';
    if (code >= 45 && code <= 48) condition = 'Foggy';
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) condition = 'Rain';
    if (code >= 95) condition = 'Storm';

    return {
      temperature: Math.round(data.current.temperature_2m),
      condition: condition,
      rainChance: data.daily.precipitation_probability_max[0] || 0,
      location: '' // จะถูกอัปเดตโดยชื่อจังหวัดใน App.tsx
    };
  } catch (error) {
    console.error("Failed to fetch real weather:", error);
    return null;
  }
};
