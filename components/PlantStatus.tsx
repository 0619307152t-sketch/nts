import React from 'react';
import { PlantConfig, ThemeConfig } from '../types';
import { Sprout, Calendar, Timer, TreeDeciduous, Ruler, Activity } from 'lucide-react';

interface PlantStatusProps {
  plant: PlantConfig;
  theme: ThemeConfig;
}

const PlantStatus: React.FC<PlantStatusProps> = ({ plant, theme }) => {
  const startDate = new Date(plant.startDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const daysPlanted = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  const progress = Math.min(100, (daysPlanted / plant.harvestDays) * 100);
  
  const harvestDate = new Date(startDate);
  harvestDate.setDate(harvestDate.getDate() + plant.harvestDays);

  // Determine Growth Stage
  let stageName = "เพาะกล้า";
  let stageDesc = "Seedling";
  
  if (progress >= 20 && progress < 55) {
      stageName = "เติบโต/แตกใบ";
      stageDesc = "Vegetative";
  } else if (progress >= 55 && progress < 90) {
      stageName = "ออกดอก/ผล";
      stageDesc = "Fruiting";
  } else if (progress >= 90) {
      stageName = "เก็บเกี่ยว";
      stageDesc = "Harvest";
  }

  return (
    <div className={`bg-gradient-to-br ${theme.bgGradient} rounded-3xl p-6 sm:p-8 shadow-lg text-white relative overflow-hidden h-full min-h-[280px] flex flex-col justify-between group`}>
       
       {/* Background Decoration */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -mr-10 -mt-10 transform group-hover:scale-110 transition-transform duration-1000"></div>
       <div className="absolute bottom-0 left-0 w-40 h-40 bg-black opacity-5 rounded-full blur-2xl -ml-10 -mb-10"></div>
       
       {/* Header Info */}
       <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
                <div className="flex items-center gap-2 text-white/80 mb-2 text-sm font-medium uppercase tracking-wider">
                    <Sprout className="w-4 h-4" />
                    <span>Active Crop</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">{plant.name}</h2>
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/90">
                    <span className="flex items-center gap-1.5 bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm"><TreeDeciduous className="w-3 h-3" /> {plant.quantity} ต้น</span>
                    <span className="flex items-center gap-1.5 bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm"><Ruler className="w-3 h-3" /> {plant.plotSize} m²</span>
                </div>
            </div>
            
            {/* Stage Badge */}
            <div className="bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl shadow-lg hidden sm:block animate-in fade-in">
                <div className="text-right">
                    <div className="flex items-center justify-end gap-1.5 text-white/70 text-[10px] uppercase font-bold mb-0.5">
                        <Activity className="w-3 h-3" /> Current Stage
                    </div>
                    <p className="text-xl font-bold">{stageName}</p>
                    <p className="text-xs text-white/80 opacity-80">{stageDesc}</p>
                </div>
            </div>
          </div>
       </div>

       {/* Progress Section */}
       <div className="relative z-10 mt-6">
           <div className="flex justify-between items-end mb-2">
               <div>
                   <p className="text-5xl font-bold tracking-tighter">{daysPlanted}<span className="text-2xl font-medium text-white/60 ml-1">days</span></p>
               </div>
               <div className="text-right">
                   <p className="text-sm font-bold mb-1">{progress.toFixed(0)}% Complete</p>
                   <p className="text-xs text-white/70">Target: {plant.harvestDays} days</p>
               </div>
           </div>
           
           {/* Custom Progress Bar */}
           <div className="w-full bg-black/20 h-2.5 rounded-full overflow-hidden backdrop-blur-sm">
               <div 
                 className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.6)] rounded-full relative transition-all duration-1000 ease-out"
                 style={{ width: `${progress}%` }}
               >
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 animate-pulse"></div>
               </div>
           </div>
       </div>

       {/* Footer Stats */}
       <div className="relative z-10 grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full"><Calendar className="w-4 h-4" /></div>
                <div>
                    <p className="text-[10px] uppercase text-white/60 font-bold">Start Date</p>
                    <p className="font-semibold text-sm">{startDate.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit'})}</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full"><Timer className="w-4 h-4" /></div>
                <div>
                    <p className="text-[10px] uppercase text-white/60 font-bold">Est. Harvest</p>
                    <p className="font-semibold text-sm">{harvestDate.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: '2-digit'})}</p>
                </div>
            </div>
       </div>
    </div>
  );
};

export default PlantStatus;