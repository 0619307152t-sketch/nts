
import React from 'react';
import { WeatherForecast, ThemeConfig } from '../types';
import { CloudRain, Sun, Cloud, MapPin, Droplets, CloudLightning, Wind } from 'lucide-react';
import { THAI_PROVINCES } from '../services/weatherService';

interface WeatherWidgetProps {
  weather: WeatherForecast;
  theme: ThemeConfig;
  onLocationChange: (lat: number, lng: number, name: string) => void;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather, theme, onLocationChange }) => {
  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'Rain': return <CloudRain className="w-16 h-16 text-blue-200 drop-shadow-lg animate-bounce" />;
      case 'Cloudy': return <Cloud className="w-16 h-16 text-white/90 drop-shadow-lg" />;
      case 'Foggy': return <Wind className="w-16 h-16 text-slate-200 drop-shadow-lg" />;
      case 'Storm': return <CloudLightning className="w-16 h-16 text-yellow-300 drop-shadow-lg" />;
      default: return <Sun className="w-16 h-16 text-amber-300 drop-shadow-lg animate-pulse" />;
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = THAI_PROVINCES.find(p => p.name === e.target.value);
    if (selected) {
      onLocationChange(selected.lat, selected.lng, selected.name);
    }
  };

  let gradient = `bg-gradient-to-br ${theme.bgGradient}`;
  // Adjust gradient based on weather for realism
  if (weather.condition === 'Rain' || weather.condition === 'Storm') gradient = 'bg-gradient-to-br from-slate-600 to-slate-800';
  if (weather.condition === 'Clear') gradient = 'bg-gradient-to-br from-blue-400 to-sky-400';

  return (
    <div className={`${gradient} rounded-3xl p-6 text-white shadow-lg relative overflow-hidden h-full flex flex-col justify-between transition-all duration-500`}>
      
      {/* Header with Selector */}
      <div className="flex justify-between items-start relative z-20">
         <div className="flex flex-col gap-1">
             <div className="flex items-center gap-1 text-white/90 text-sm font-medium bg-black/20 px-2 py-1 rounded-lg backdrop-blur-sm w-fit">
                <MapPin className="w-3.5 h-3.5" />
                <select 
                  className="bg-transparent border-none outline-none text-white text-xs font-bold appearance-none cursor-pointer pr-4"
                  value={weather.location}
                  onChange={handleSelect}
                  style={{ backgroundImage: 'none' }}
                >
                  {THAI_PROVINCES.map(p => (
                    <option key={p.name} value={p.name} className="text-slate-800">{p.name}</option>
                  ))}
                </select>
                <span className="text-[10px] opacity-70">▼</span>
             </div>
             <p className="text-[10px] text-white/70 ml-1">เลือกพื้นที่เพื่อความแม่นยำ</p>
         </div>
         <div className="text-right">
             <p className="text-5xl font-bold tracking-tighter drop-shadow-sm">{weather.temperature}°</p>
         </div>
      </div>

      {/* Main Icon Center */}
      <div className="flex-1 flex items-center justify-center py-4 relative z-10">
          {getWeatherIcon()}
      </div>

      {/* Footer Info */}
      <div className="grid grid-cols-2 gap-3 relative z-10">
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 border border-white/10 flex flex-col items-center hover:bg-white/30 transition-colors">
              <span className="text-[10px] text-white/80 uppercase font-bold mb-1">Status</span>
              <span className="font-bold text-base">{weather.condition === 'Clear' ? 'Sunny' : weather.condition}</span>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 border border-white/10 flex flex-col items-center hover:bg-white/30 transition-colors">
              <span className="text-[10px] text-white/80 uppercase font-bold mb-1">Rain Chance</span>
              <div className="flex items-center gap-1">
                <Droplets className="w-4 h-4 text-blue-200" />
                <span className="font-bold text-base">{weather.rainChance}%</span>
              </div>
          </div>
      </div>

      {/* Decors */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-black opacity-10 rounded-full blur-2xl pointer-events-none"></div>
    </div>
  );
};

export default WeatherWidget;
