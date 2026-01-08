
import React, { useState, useEffect } from 'react';
import { SensorReadings, WeatherForecast, AIRecommendation, PlantConfig, ThemeConfig } from '../types';
import { getGardenAdvice } from '../services/geminiService';
import { Brain, Sparkles, Loader2, Droplets, Clock, Info } from 'lucide-react';

interface AIAdvisorProps {
  sensors: SensorReadings;
  weather: WeatherForecast;
  plant: PlantConfig;
  theme: ThemeConfig;
}

const AIAdvisor: React.FC<AIAdvisorProps> = ({ sensors, weather, plant, theme }) => {
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAskAI = async () => {
    setLoading(true);
    try {
      const result = await getGardenAdvice(sensors, weather, plant);
      setRecommendation(result);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  // Initial load
  useEffect(() => {
    const timer = setTimeout(() => {
       handleAskAI();
    }, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full flex flex-col relative">
      
      <div className="flex items-center justify-between mb-4">
         <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full bg-${theme.primary}-100 text-${theme.primary}-600 flex items-center justify-center`}>
                <Brain className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-800">AI Advisor</h3>
         </div>
         <button 
            onClick={handleAskAI} 
            disabled={loading}
            className="text-xs font-medium text-slate-400 hover:text-slate-600 flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg transition-colors"
         >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            Refresh
         </button>
      </div>

      <div className="flex-1">
        {loading || !recommendation ? (
           <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2 min-h-[150px]">
               <Loader2 className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
               <span className="text-sm">Connecting to Gemini...</span>
           </div>
        ) : (
            <div className="space-y-4">
               {/* Main Bubble */}
               <div className={`p-4 rounded-2xl rounded-tl-none relative ${
                   recommendation.action === 'WATER' ? 'bg-blue-50 text-blue-900' : 'bg-slate-50 text-slate-700'
               }`}>
                   <p className="text-sm font-medium leading-relaxed">
                      {recommendation.reason}
                   </p>
               </div>

               {/* Action Grid */}
               <div className="grid grid-cols-2 gap-3">
                   <div className="border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors">
                        <span className="text-xs text-slate-400 uppercase font-bold mb-1">Recommendation</span>
                        <span className={`text-lg font-bold ${recommendation.action === 'WATER' ? 'text-blue-600' : 'text-amber-500'}`}>
                            {recommendation.action === 'WATER' ? 'WATER NOW' : 'WAIT'}
                        </span>
                   </div>
                   <div className="border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors">
                        <span className="text-xs text-slate-400 uppercase font-bold mb-1">Volume</span>
                        <span className="text-lg font-bold text-slate-700">
                            {recommendation.recommendedAmount > 0 ? `${recommendation.recommendedAmount}ml` : '-'}
                        </span>
                   </div>
               </div>
            </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center text-[10px] text-slate-300">
         <span className="flex items-center gap-1"><Info className="w-3 h-3"/> Based on sensors & TMD weather</span>
         {/* Updated model label in UI */}
         <span>Gemini 3 Flash</span>
      </div>
    </div>
  );
};

export default AIAdvisor;
