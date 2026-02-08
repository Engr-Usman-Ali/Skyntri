import React, { useState } from "react";
import { 
  TrendingUp, Zap, Activity, ChevronRight, CheckCircle2,
  Upload, Camera, Loader2, AlertTriangle
} from "lucide-react";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// --- MOCK DATA ---
const progressHistory = [
  { day: 'D1', redness: 85, lesions: 90, texture: 40 },
  { day: 'D7', redness: 70, lesions: 80, texture: 45 },
  { day: 'D14', redness: 55, lesions: 60, texture: 60 },
  { day: 'D21', redness: 40, lesions: 35, texture: 75 },
  { day: 'D28', redness: 32, lesions: 20, texture: 88 },
];

export default function ProgressTracker() {
  const [showUpload, setShowUpload] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const overallImprovement = 68; 
  const isDeteriorating = false;

  const handleAnalysisTrigger = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowUpload(false);
    }, 2500);
  };

  if (showUpload) {
    return (
      <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button onClick={() => setShowUpload(false)} className="mb-6 font-bold text-slate-400 hover:text-blue-600 transition-all flex items-center gap-2 text-xs">
          <ChevronRight size={14} className="rotate-180"/> BACK TO ANALYTICS
        </button>
        <ProgressUploadUI onComplete={handleAnalysisTrigger} isAnalyzing={isAnalyzing} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* 1. HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Recovery Progress</h2>
          <p className="text-slate-400 text-xs font-medium">Computer Vision Trend Analysis</p>
        </div>
        <button 
          onClick={() => setShowUpload(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-900 transition-all shadow-md shadow-blue-100 flex items-center gap-2"
        >
          <Camera size={14}/> Weekly Scan
        </button>
      </div>

      {/* 2. METRIC GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <AnalysisMetric label="Improvement" val={`${overallImprovement}%`} color="text-emerald-600" />
        <AnalysisMetric label="Redness" val="-62%" color="text-blue-600" />
        <AnalysisMetric label="Lesions" val="-75%" color="text-orange-600" />
        <AnalysisMetric label="Texture" val="+40%" color="text-purple-600" />
      </div>

      {/* 3. FEEDBACK SYSTEM */}
      <div className={`p-5 rounded-2xl border flex items-center gap-4 ${isDeteriorating ? "bg-red-50 border-red-100" : "bg-emerald-50 border-emerald-100"}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isDeteriorating ? "bg-red-500 text-white" : "bg-emerald-500 text-white"}`}>
          {isDeteriorating ? <AlertTriangle size={20}/> : <CheckCircle2 size={20}/>}
        </div>
        <div>
          <h4 className={`font-bold text-sm ${isDeteriorating ? "text-red-900" : "text-emerald-900"}`}>
            {isDeteriorating ? "Alert Detected" : "Excellent Progress!"}
          </h4>
          <p className={`text-[11px] font-medium leading-tight ${isDeteriorating ? "text-red-700" : "text-emerald-700"}`}>
            {isDeteriorating 
              ? "Redness levels have spiked. Consider pausing current active ingredients." 
              : "Texture has improved by 40%. Your moisture barrier looks healthy."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 4. COMPARISON */}
        <div className="lg:col-span-5 bg-white p-6 rounded-[2rem] border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">Visual Sync</h3>
            <span className="text-[9px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">BASELINE VS CURRENT</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ComparisonCard label="Day 1" date="Jan 10" img="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400" />
            <ComparisonCard label="Today" date="Feb 07" img="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=400" />
          </div>
        </div>

        {/* 5. CHART */}
        <div className="lg:col-span-7 bg-white p-6 rounded-[2rem] border border-slate-100">
          <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-6">Dermal Trends</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 9, fontWeight: 'bold', fill: '#94a3b8'}} />
                <YAxis hide />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', fontSize: '10px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="redness" stroke="#2563eb" strokeWidth={3} dot={{r: 4, fill: '#2563eb'}} />
                <Line type="monotone" dataKey="lesions" stroke="#f97316" strokeWidth={3} dot={{r: 4, fill: '#f97316'}} />
                <Line type="monotone" dataKey="texture" stroke="#a855f7" strokeWidth={3} dot={{r: 4, fill: '#a855f7'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-4 justify-center">
            <LegendItem color="bg-blue-600" label="Redness" />
            <LegendItem color="bg-orange-500" label="Lesions" />
            <LegendItem color="bg-purple-500" label="Texture" />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function ProgressUploadUI({ onComplete, isAnalyzing }) {
  const [file, setFile] = useState(null);

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 p-10 text-center relative overflow-hidden shadow-sm">
      {isAnalyzing && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-50 flex flex-col items-center justify-center">
          <Loader2 className="animate-spin text-blue-600 mb-4" size={32} />
          <h3 className="text-lg font-black text-slate-900">ML Feature Extraction...</h3>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[9px] mt-1">Histogram Matching Active</p>
        </div>
      )}

      {!file ? (
        <div className="max-w-xs mx-auto">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
            <Upload size={28} />
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2">Weekly Update</h3>
          <p className="text-slate-400 text-xs font-medium mb-8">Maintain consistent lighting for accurate delta analysis.</p>
          <label className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold text-xs cursor-pointer hover:bg-blue-600 transition-all shadow-md inline-block">
            Choose Scan
            <input type="file" className="hidden" onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))} />
          </label>
        </div>
      ) : (
        <div className="animate-in zoom-in-95">
          <img src={file} className="w-full max-h-60 object-cover rounded-2xl border-4 border-slate-50 mb-6" alt="Preview" />
          <div className="flex gap-3 max-w-xs mx-auto">
            <button onClick={onComplete} className="flex-1 bg-emerald-500 text-white py-3 rounded-xl font-bold text-xs shadow-md hover:bg-emerald-600 transition-all">Submit Scan</button>
            <button onClick={() => setFile(null)} className="px-5 bg-slate-50 text-slate-400 rounded-xl font-bold text-xs hover:text-red-500 transition-all">Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}

function AnalysisMetric({ label, val, color }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-50 shadow-sm">
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <h4 className={`text-xl font-black ${color}`}>{val}</h4>
    </div>
  );
}

function ComparisonCard({ label, date, img }) {
  return (
    <div className="space-y-2">
      <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-sm border border-slate-100">
        <img src={img} className="w-full h-full object-cover grayscale-[0.2]" alt={label} />
      </div>
      <div className="text-center">
        <p className="text-[10px] font-black text-slate-900 uppercase">{label}</p>
        <p className="text-[9px] font-bold text-slate-400">{date}</p>
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{label}</span>
    </div>
  );
}