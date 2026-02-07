import React, { useState } from "react";
import { 
  TrendingUp, Calendar, Zap, Activity, 
  ChevronRight, Target, Flame, CheckCircle2,
  Upload, X, Camera, Loader2, AlertTriangle, Info
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// --- MOCK DATA (Reflecting REQ-5.7 Trends) ---
const progressHistory = [
  { day: 'Day 1', redness: 85, lesions: 90, texture: 40 },
  { day: 'Day 7', redness: 70, lesions: 80, texture: 45 },
  { day: 'Day 14', redness: 55, lesions: 60, texture: 60 },
  { day: 'Day 21', redness: 40, lesions: 35, texture: 75 },
  { day: 'Day 28', redness: 32, lesions: 20, texture: 88 },
];

export default function ProgressTracker() {
  const [showUpload, setShowUpload] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Simulation for REQ-5.6 (Percentage Improvement)
  const overallImprovement = 68; 
  const isDeteriorating = false; // Toggle for REQ-5.10

  const handleAnalysisTrigger = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowUpload(false);
    }, 3000);
  };

  if (showUpload) {
    return (
      <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-500">
        <button onClick={() => setShowUpload(false)} className="mb-6 font-black text-slate-400 hover:text-slate-900 transition-all flex items-center gap-2">
          <ChevronRight size={20} className="rotate-180"/> BACK TO ANALYTICS
        </button>
        <ProgressUploadUI onComplete={handleAnalysisTrigger} isAnalyzing={isAnalyzing} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 1. TOP HEADER & SUMMARY */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Weekly Progress</h2>
          <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-[10px]">Clinical Image Analysis & Metrics</p>
        </div>
        <button 
          onClick={() => setShowUpload(true)}
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-slate-900 transition-all shadow-xl shadow-blue-100 flex items-center gap-3 active:scale-95"
        >
          <Camera size={18}/> New Weekly Scan
        </button>
      </div>

      {/* 2. CLINICAL STATUS CARDS (REQ-5.3, 5.4, 5.5, 5.6) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <AnalysisMetric label="Overall Improvement" val={`${overallImprovement}%`} trend="+5%" color="text-emerald-600" bg="bg-emerald-50" />
        <AnalysisMetric label="Redness Reduction" val="62%" trend="-12%" color="text-blue-600" bg="bg-blue-50" />
        <AnalysisMetric label="Lesion Surface" val="-75%" trend="Significant" color="text-orange-600" bg="bg-orange-50" />
        <AnalysisMetric label="Texture Smoothness" val="+40%" trend="Feature Ext." color="text-purple-600" bg="bg-purple-50" />
      </div>

      {/* 3. FEEDBACK SYSTEM (REQ-5.9 & 5.10) */}
      <div className={`p-6 rounded-[2rem] border flex items-center gap-5 ${isDeteriorating ? "bg-red-50 border-red-100" : "bg-emerald-50 border-emerald-100"}`}>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isDeteriorating ? "bg-red-500 text-white" : "bg-emerald-500 text-white"}`}>
          {isDeteriorating ? <AlertTriangle size={28}/> : <CheckCircle2 size={28}/>}
        </div>
        <div className="flex-1">
          <h4 className={`font-black text-lg ${isDeteriorating ? "text-red-900" : "text-emerald-900"}`}>
            {isDeteriorating ? "Deterioration Detected" : "Excellent Progress, Husnain!"}
          </h4>
          <p className={`text-sm font-medium ${isDeteriorating ? "text-red-700" : "text-emerald-700"}`}>
            {isDeteriorating 
              ? "Significant increase in redness detected. We recommend consulting a professional dermatologist immediately." 
              : "Your skin texture has improved by 40% using the current routine. Keep maintaining your hydration levels!"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 4. SIDE-BY-SIDE COMPARISON (REQ-5.2 & 5.8) */}
        <div className="lg:col-span-5 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-lg text-slate-900">Side-by-Side View</h3>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">OpenCV Sync</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ComparisonCard label="Baseline" date="Jan 10" img="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400" />
            <ComparisonCard label="Current" date="Feb 07" img="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=400" />
          </div>
        </div>

        {/* 5. TREND ANALYTICS (REQ-5.7) */}
        <div className="lg:col-span-7 bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <h3 className="font-black text-lg text-slate-900 mb-8">Recovery Trends</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} />
                <YAxis hide />
                <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="redness" stroke="#2563eb" strokeWidth={4} dot={{r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#fff'}} />
                <Line type="monotone" dataKey="lesions" stroke="#f97316" strokeWidth={4} dot={{r: 6, fill: '#f97316', strokeWidth: 2, stroke: '#fff'}} />
                <Line type="monotone" dataKey="texture" stroke="#a855f7" strokeWidth={4} dot={{r: 6, fill: '#a855f7', strokeWidth: 2, stroke: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-6 justify-center">
            <LegendItem color="bg-blue-600" label="Redness" />
            <LegendItem color="bg-orange-500" label="Lesions" />
            <LegendItem color="bg-purple-500" label="Texture" />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS FOR CLEANER CODE ---

function ProgressUploadUI({ onComplete, isAnalyzing }) {
  const [file, setFile] = useState(null);

  return (
    <div className="bg-white rounded-[3rem] border border-slate-100 p-12 text-center relative overflow-hidden">
      {isAnalyzing && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-50 flex flex-col items-center justify-center">
          <Loader2 className="animate-spin text-blue-600 mb-6" size={50} />
          <h3 className="text-2xl font-black text-slate-900">Clinical Processing...</h3>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">Histogram Analysis & Feature Extraction</p>
        </div>
      )}

      {!file ? (
        <>
          <div className="w-24 h-24 bg-blue-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 text-blue-600">
            <Upload size={40} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-3">Upload Weekly Scan</h3>
          <p className="text-slate-400 font-medium mb-10 max-w-sm mx-auto">Please ensure high-quality lighting for accurate OpenCV color histogram analysis.</p>
          <label className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black text-sm cursor-pointer hover:bg-blue-600 transition-all shadow-2xl inline-block">
            Choose Image
            <input type="file" className="hidden" onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))} />
          </label>
        </>
      ) : (
        <div className="animate-in zoom-in-95">
          <img src={file} className="w-full max-h-[400px] object-cover rounded-[2.5rem] border-8 border-slate-50 mb-8" alt="Preview" />
          <div className="flex gap-4 max-w-md mx-auto">
            <button onClick={onComplete} className="flex-1 bg-emerald-500 text-white py-5 rounded-2xl font-black shadow-xl hover:bg-emerald-600 transition-all">Submit for Analysis</button>
            <button onClick={() => setFile(null)} className="px-8 bg-slate-100 text-slate-400 rounded-2xl font-black hover:text-red-500 transition-all">Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}

function AnalysisMetric({ label, val, trend, color, bg }) {
  return (
    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-50 shadow-sm">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <h4 className={`text-2xl font-black ${color}`}>{val}</h4>
        <span className="text-[10px] font-bold text-slate-400">{trend}</span>
      </div>
    </div>
  );
}

function ComparisonCard({ label, date, img }) {
  return (
    <div className="space-y-3">
      <div className="aspect-[3/4] rounded-[2rem] overflow-hidden shadow-md border-4 border-slate-50">
        <img src={img} className="w-full h-full object-cover" alt={label} />
      </div>
      <div className="text-center">
        <p className="text-xs font-black text-slate-900 uppercase">{label}</p>
        <p className="text-[10px] font-bold text-slate-400">{date}</p>
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{label}</span>
    </div>
  );
}