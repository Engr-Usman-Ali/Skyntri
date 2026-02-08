import React, { useState } from "react";
import { 
  FileText, Download, Calendar, 
  Search, Filter, CheckCircle2, AlertCircle, Info 
} from "lucide-react";

const REPORTS = [
  { id: "REP-001", date: "Feb 07, 2026", type: "Full Analysis", status: "Healthy", condition: "Normal", score: 88 },
  { id: "REP-002", date: "Jan 30, 2026", type: "Scan Only", status: "Warning", condition: "Acne Flare-up", score: 62 },
  { id: "REP-003", date: "Jan 22, 2026", type: "Ingredient Check", status: "Healthy", condition: "N/A", score: 94 },
  { id: "REP-004", date: "Jan 15, 2026", type: "Full Analysis", status: "Warning", condition: "Dryness Detected", score: 55 },
];

export default function HistoryTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleDownload = (reportId) => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative pb-10">
      
      {/* DOWNLOAD NOTIFICATION */}
      {showMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[5000] animate-in slide-in-from-top-2 duration-300">
          <div className="bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700">
            <CheckCircle2 size={14} className="text-emerald-400"/>
            <p className="font-bold text-xs">PDF Report generation started.</p>
          </div>
        </div>
      )}
      
      {/* HEADER & SEARCH */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Clinical History</h2>
          <p className="text-slate-400 text-xs font-medium">Archive of past diagnostic reports</p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14}/>
            <input 
              type="text" 
              placeholder="Search by condition..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-100 rounded-xl outline-none focus:ring-1 focus:ring-blue-500 text-xs font-medium transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 transition-all">
            <Filter size={16}/>
          </button>
        </div>
      </div>

      {/* REPORTS TABLE */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50 bg-slate-50/30">
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Report Detail</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Score</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {REPORTS.filter(r => r.condition.toLowerCase().includes(searchTerm.toLowerCase()) || r.type.toLowerCase().includes(searchTerm.toLowerCase())).map((report) => (
                <tr key={report.id} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${report.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                        <FileText size={16}/>
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 text-sm truncate">{report.type}</p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                          {report.date} • {report.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <div className="flex flex-col items-center gap-1 mx-auto w-fit">
                      <span className={`text-sm font-black ${report.score > 70 ? 'text-emerald-500' : 'text-amber-500'}`}>{report.score}%</span>
                      <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${report.score > 70 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{width: `${report.score}%`}} />
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-1.5">
                      {report.status === 'Healthy' ? <CheckCircle2 size={12} className="text-emerald-500"/> : <AlertCircle size={12} className="text-amber-500"/>}
                      <span className="font-bold text-slate-700 text-[11px] truncate">{report.condition}</span>
                    </div>
                  </td>
                  <td className="p-5 text-right">
                    <button 
                      onClick={() => handleDownload(report.id)}
                      className="p-2.5 bg-slate-900 text-white hover:bg-blue-600 rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center ml-auto"
                    >
                      <Download size={14}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CLOUD SYNC STATUS */}
      <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"/>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Secure Cloud Sync Active</p>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Info size={12}/>
          <p className="text-[10px] font-medium italic">Reports comply with global medical data privacy standards.</p>
        </div>
      </div>
    </div>
  );
}