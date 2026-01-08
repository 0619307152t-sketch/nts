import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SensorCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  color: string;      // e.g. text-blue-500
  bgColor: string;    // e.g. bg-blue-50
  borderColor: string; // e.g. border-blue-100
  description: string;
}

const SensorCard: React.FC<SensorCardProps> = ({ title, value, unit, icon: Icon, color, bgColor, borderColor, description }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start mb-2">
        <div className={`p-2.5 rounded-xl ${bgColor} ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={`text-[10px] font-semibold px-2 py-1 rounded-full border ${borderColor} ${bgColor} ${color} opacity-80`}>
           LIVE
        </div>
      </div>
      
      <div className="mt-2">
        <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-1">{title}</p>
        <div className="flex items-baseline gap-1">
          <h3 className="text-3xl font-bold text-slate-800 tracking-tight">
            {value}
          </h3>
          <span className="text-sm text-slate-400 font-medium">{unit}</span>
        </div>
        <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
           <span className="w-1 h-1 rounded-full bg-slate-300"></span>
           {description}
        </p>
      </div>
    </div>
  );
};

export default SensorCard;