
import React, { useState } from 'react';
import { SystemMode, PumpStatus, PlantConfig, AIActivityLog, ThemeConfig } from '../types';
import { Power, Settings, FlaskConical, Save, BrainCircuit, X, Zap, MousePointer2, Send } from 'lucide-react';
import { logSensorDataToSheet } from '../services/sheetService';

interface ControlPanelProps {
  mode: SystemMode;
  pumpStatus: PumpStatus;
  waterVolume: number;
  plantConfig: PlantConfig;
  aiLog: AIActivityLog | null;
  theme: ThemeConfig;
  onToggleMode: () => void;
  onTogglePump: () => void;
  onVolumeChange: (volume: number) => void;
  onUpdatePlant: (config: PlantConfig) => void;
  onRefresh: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  mode, 
  pumpStatus, 
  waterVolume,
  plantConfig,
  aiLog,
  theme,
  onToggleMode, 
  onTogglePump,
  onVolumeChange,
  onUpdatePlant,
  onRefresh
}) => {
  const isAuto = mode === SystemMode.AUTO;
  const [isEditing, setIsEditing] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [editConfig, setEditConfig] = useState<PlantConfig>(plantConfig);

  const handleSavePlant = () => {
    onUpdatePlant(editConfig);
    setIsEditing(false);
  };

  const handleSimulateData = async () => {
    setIsSimulating(true);
    // ส่งค่าสุ่มไปทดสอบที่ Google Sheets
    const randomSoil = Math.floor(30 + Math.random() * 40);
    const randomTemp = Math.floor(25 + Math.random() * 10);
    const randomHumid = Math.floor(50 + Math.random() * 30);
    
    await logSensorDataToSheet(randomTemp, randomHumid, randomSoil);
    
    // หน่วงเวลาเล็กน้อยเพื่อให้ Sheets ประมวลผลก่อนรีเฟรช
    setTimeout(() => {
        onRefresh();
        setIsSimulating(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full flex flex-col relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-400" />
            Control Panel
          </h2>
          <div className="flex gap-3">
             <button 
                onClick={handleSimulateData}
                disabled={isSimulating}
                className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 flex items-center gap-1 hover:bg-emerald-100 transition-colors disabled:opacity-50"
             >
                <Send className="w-3 h-3" />
                {isSimulating ? 'Sending...' : 'Test Sensors'}
             </button>
             <button 
                onClick={() => isEditing ? handleSavePlant() : setIsEditing(true)}
                className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
              >
                {isEditing ? 'Save' : 'Edit Plant'}
              </button>
          </div>
      </div>

      {/* Plant Config Form Overlay */}
      {isEditing && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 p-6 flex flex-col gap-3 overflow-y-auto animate-in fade-in slide-in-from-bottom-4">
             <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-slate-700">Edit Plant Profile</h3>
                <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5"/></button>
             </div>
             
             <div className="space-y-3">
               <div>
                 <label className="text-xs text-slate-500 font-bold uppercase mb-1 block">Name</label>
                 <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                   value={editConfig.name} onChange={e => setEditConfig({...editConfig, name: e.target.value})} />
               </div>
               
               <div className="grid grid-cols-2 gap-3">
                 <div>
                   <label className="text-xs text-slate-500 font-bold uppercase mb-1 block">Start Date</label>
                   <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                     value={editConfig.startDate} onChange={e => setEditConfig({...editConfig, startDate: e.target.value})} />
                 </div>
                 <div>
                   <label className="text-xs text-slate-500 font-bold uppercase mb-1 block">Harvest (Days)</label>
                   <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                     value={editConfig.harvestDays} onChange={e => setEditConfig({...editConfig, harvestDays: parseInt(e.target.value)})} />
                 </div>
               </div>
             </div>
             
             <button onClick={handleSavePlant} className={`mt-4 w-full ${theme.buttonClass} text-white py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-transform`}>Save Changes</button>
        </div>
      )}

      <div className="space-y-5">
        
        {/* Mode Switch */}
        <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl">
           <button 
              onClick={!isAuto ? onToggleMode : undefined}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${isAuto ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
           >
              <BrainCircuit className="w-4 h-4" />
              Auto AI
           </button>
           <button 
              onClick={isAuto ? onToggleMode : undefined}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${!isAuto ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
           >
              <MousePointer2 className="w-4 h-4" />
              Manual
           </button>
        </div>

        {/* AI Log Display (Only in Auto) */}
        {isAuto && (
          <div className={`bg-gradient-to-br from-blue-50 to-slate-50 p-4 rounded-2xl border border-blue-100 flex flex-col justify-between min-h-[140px] relative overflow-hidden`}>
             <div className="absolute right-0 top-0 -mr-4 -mt-4 w-20 h-20 bg-blue-100 rounded-full opacity-50 blur-xl"></div>
             <div className="relative z-10">
                <p className="text-xs font-bold text-blue-500 uppercase mb-2">AI Status Log</p>
                {aiLog ? (
                    <div>
                       <div className="flex items-baseline gap-2 mb-1">
                          <span className={`text-lg font-bold ${aiLog.action === 'WATER' ? 'text-blue-700' : 'text-amber-600'}`}>
                             {aiLog.action === 'WATER' ? 'Action: WATER' : 'Action: WAIT'}
                          </span>
                          {aiLog.action === 'WATER' && <span className="text-sm font-medium text-slate-500">({aiLog.amount}ml)</span>}
                       </div>
                       <p className="text-sm text-slate-600 leading-relaxed bg-white/60 p-2 rounded-lg backdrop-blur-sm">"{aiLog.reason}"</p>
                       <p className="text-[10px] text-slate-400 mt-2 text-right">{aiLog.timestamp}</p>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-slate-500 text-sm italic mt-4">
                       <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                       Analyzing sensors...
                    </div>
                )}
             </div>
          </div>
        )}

        {/* Manual Controls */}
        <div className={`space-y-4 transition-all duration-300 ${isAuto ? 'opacity-30 pointer-events-none blur-[1px]' : 'opacity-100'}`}>
            
            {/* Volume Slider */}
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                   <span className="font-medium text-slate-600 flex items-center gap-1"><FlaskConical className="w-4 h-4"/> Water Volume</span>
                   <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-xs">{waterVolume} ml</span>
                </div>
                <input 
                    type="range" min="100" max="2000" step="100" 
                    value={waterVolume} onChange={(e) => onVolumeChange(parseInt(e.target.value))}
                    className={`w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-slate-600 hover:accent-slate-800`}
                />
            </div>

            {/* Main Pump Button */}
            <button
                onClick={onTogglePump}
                className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all ${
                   pumpStatus.isOn 
                   ? 'bg-blue-500 text-white shadow-blue-200 ring-4 ring-blue-100' 
                   : 'bg-white border-2 border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-600'
                }`}
            >
                <Power className={`w-6 h-6 ${pumpStatus.isOn ? 'animate-pulse' : ''}`} />
                {pumpStatus.isOn ? `DISPENSING...` : 'START PUMP'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
