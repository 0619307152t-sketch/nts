import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { WaterUsageLog } from '../types';
import { Droplets, BarChart3 } from 'lucide-react';

interface WaterUsageChartProps {
  data: WaterUsageLog[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 text-white p-3 rounded-xl shadow-lg text-xs">
        <p className="text-slate-400 mb-1">{label}</p>
        <div className="flex items-center gap-2">
           <Droplets className="w-3 h-3 text-blue-400" />
           <span className="text-lg font-bold">{payload[0].value}</span>
           <span className="text-slate-400">ml</span>
        </div>
      </div>
    );
  }
  return null;
};

const WaterUsageChart: React.FC<WaterUsageChartProps> = ({ data }) => {
  const total = data.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col h-full min-h-[400px] relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 z-10 relative">
        <div>
           <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
             <BarChart3 className="w-5 h-5 text-slate-400" />
             Water Usage
           </h2>
           <p className="text-xs text-slate-400 pl-7">Weekly consumption log</p>
        </div>
        <div className="text-right">
           <p className="text-[10px] text-slate-400 font-bold uppercase">Total</p>
           <p className="text-lg font-bold text-blue-600">{(total / 1000).toFixed(1)} L</p>
        </div>
      </div>
      
      {/* Chart */}
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, bottom: 0, left: -25 }}>
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>
                <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.7}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            
            <XAxis 
              dataKey="date" 
              stroke="#cbd5e1" 
              fontSize={11} 
              tickMargin={10} 
              axisLine={false} 
              tickLine={false}
              fontWeight={500}
            />
            <YAxis 
              stroke="#cbd5e1" 
              fontSize={10} 
              axisLine={false} 
              tickLine={false} 
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9', radius: 8 }} />
            
            <Bar dataKey="amount" radius={[6, 6, 0, 0]} maxBarSize={50}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="url(#blueGradient)" className="hover:opacity-80 transition-opacity"/>
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WaterUsageChart;