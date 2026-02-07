import React, { useState } from "react";
import { 
  FileText, Download, Calendar, 
  Search, Filter, CheckCircle2, AlertCircle, Info 
} from "lucide-react";

// Mock Data following SRS Report structure
const REPORTS = [
  { id: "REP-001", date: "Feb 07, 2026", type: "Full Analysis", status: "Healthy", condition: "Normal", score: 88 },
  { id: "REP-002", date: "Jan 30, 2026", type: "Scan Only", status: "Warning", condition: "Acne Flare-up", score: 62 },
  { id: "REP-003", date: "Jan 22, 2026", type: "Ingredient Check", status: "Healthy", condition: "N/A", score: 94 },
  { id: "REP-004", date: "Jan 15, 2026", type: "Full Analysis", status: "Warning", condition: "Dryness Detected", score: 55 },
];

export default function HistoryTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  // Function to handle download click
  const handleDownload = (reportId) => {
    setShowMessage(true);
    // Auto-hide the message after 3 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative">
      
      {/* DOWNLOAD NOTIFICATION MESSAGE */}
      {showMessage && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[5000] animate-in slide-in-from-top-4 duration-300">
          <div className="bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-700">
            <div className="bg-emerald-500 p-1 rounded-full">
              <CheckCircle2 size={16} className="text-white"/>
            </div>
            <p className="font-black text-sm tracking-tight">Report preparation started. Your download will begin shortly.</p>
          </div>
        </div>
      )}
      
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Clinical History</h2>
          <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-xs">Past Reports & Documentation</p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
            <input 
              type="text" 
              placeholder="Search reports..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 transition-all">
            <Filter size={20}/>
          </button>
        </div>
      </div>

      {/* REPORTS LIST */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-50">
              <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Report Detail</th>
              <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Health Score</th>
              <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">Condition</th>
              <th className="p-8 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {REPORTS.filter(r => r.condition.toLowerCase().includes(searchTerm.toLowerCase()) || r.type.toLowerCase().includes(searchTerm.toLowerCase())).map((report) => (
              <tr key={report.id} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0">
                <td className="p-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${report.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      <FileText size={20}/>
                    </div>
                    <div>
                      <p className="font-black text-slate-900">{report.type}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                        <Calendar size={12}/> {report.date} • {report.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-8 text-center">
                  <div className="flex flex-col items-center gap-2 mx-auto w-fit">
                    <span className={`text-xl font-black ${report.score > 70 ? 'text-emerald-500' : 'text-amber-500'}`}>{report.score}%</span>
                    <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${report.score > 70 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{width: `${report.score}%`}} />
                    </div>
                  </div>
                </td>
                <td className="p-8">
                  <div className="flex items-center gap-2">
                    {report.status === 'Healthy' ? <CheckCircle2 size={16} className="text-emerald-500"/> : <AlertCircle size={16} className="text-amber-500"/>}
                    <span className="font-black text-slate-700 text-sm">{report.condition}</span>
                  </div>
                </td>
                <td className="p-8 text-right">
                  <button 
                    onClick={() => handleDownload(report.id)}
                    className="p-4 bg-slate-900 text-white hover:bg-emerald-500 rounded-2xl transition-all shadow-lg active:scale-95 group-hover:shadow-emerald-100 flex items-center justify-center ml-auto"
                  >
                    <Download size={20}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ARCHIVE MESSAGE */}
      <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100/50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"/>
          <p className="text-xs font-bold text-blue-900 uppercase tracking-widest">Cloud Sync Active</p>
        </div>
        <div className="flex items-center gap-2 text-blue-600">
          <Info size={14}/>
          <p className="text-xs font-medium italic">Reports are generated based on clinical image acquisition standards.</p>
        </div>
      </div>
    </div>
  );
}