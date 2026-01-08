import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HistoricalDataPoint } from '../types';
import { Activity, Droplets, Thermometer } from 'lucide-react';

interface HistoryChartProps {
  data: HistoricalDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-100 text-xs">
        <p className="font-bold text-slate-600 mb-2 pb-1 border-b border-slate-100">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-3 mb-1 last:mb-0">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.stroke }} />
              <span className="text-slate-500 font-medium">{entry.name}</span>
            </div>
            <span className="font-bold text-slate-800">{entry.value}{entry.unit}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const HistoryChart: React.FC<HistoryChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col h-full min-h-[400px] relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4 z-10 relative">
        <div>
           <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
             <Activity className="w-5 h-5 text-slate-400" />
             Sensor Trends
           </h2>
           <p className="text-xs text-slate-400 pl-7">Soil Moisture & Temperature history</p>
        </div>
        
        <div className="flex gap-2">
           <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Soil %
           </div>
           <div className="flex items-center gap-1.5 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div> Temp °C
           </div>
        </div>
      </div>
      
      {/* Chart Container */}
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 5, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="colorSoil" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            
            <XAxis 
              dataKey="time" 
              stroke="#cbd5e1" 
              fontSize={10} 
              tickMargin={10} 
              axisLine={false} 
              tickLine={false} 
              minTickGap={30}
            />
            <YAxis 
              stroke="#cbd5e1" 
              fontSize={10} 
              axisLine={false} 
              tickLine={false} 
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#94a3b8', strokeDasharray: '4 4' }} />
            
            <Area 
              type="monotone" 
              dataKey="soil" 
              name="Moisture" 
              unit="%"
              stroke="#10b981" 
              strokeWidth={2.5}
              fillOpacity={1} 
              fill="url(#colorSoil)" 
            />
            <Area 
              type="monotone" 
              dataKey="temp" 
              name="Temp"
              unit="°C" 
              stroke="#f97316" 
              strokeWidth={2.5}
              fillOpacity={1} 
              fill="url(#colorTemp)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HistoryChart;