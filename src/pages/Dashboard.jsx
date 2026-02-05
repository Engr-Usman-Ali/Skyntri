import React, { useState } from "react";
import { Upload, Search, History, ArrowRight, Sparkles } from "lucide-react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import AnalysisModal from "../components/AnalysisModal";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("Overview");
    const [analysisStep, setAnalysisStep] = useState(1); // Track steps 1, 2, 3
    const [selectedImage, setSelectedImage] = useState(null);

    // Function to handle file selection
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setAnalysisStep(2); // Move to scanning
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <main className="flex-1 flex flex-col">
                <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="p-10 max-w-7xl mx-auto w-full">
                    {/* --- OVERVIEW TAB --- */}
                    {activeTab === "Overview" && (
                        <section className="space-y-10">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-100">
                                <div className="relative z-10 max-w-lg">
                                    <h2 className="text-4xl font-black mb-4">Good Morning, Husnain</h2>
                                    <p className="text-blue-100 mb-8 font-medium">Ready to check your skin progress today?</p>
                                    <button
                                        onClick={() => setActiveTab("Analysis")} // Goes to Analysis Tab
                                        className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-all flex items-center gap-2"
                                    >
                                        Start New Analysis <ArrowRight size={18} />
                                    </button>
                                </div>
                                <Sparkles className="absolute right-[-20px] top-[-20px] text-white/10 w-80 h-80 rotate-12" />
                            </div>

                            {/* Action Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <QuickAction
                                    title="Skin Scan"
                                    desc="Detect conditions instantly"
                                    icon={<Upload />}
                                    color="text-blue-600"
                                    bg="bg-blue-50"
                                    onClick={() => setIsModalOpen(true)} // Add this!
                                />
                                <QuickAction
                                    title="Safety Check"
                                    desc="Verify ingredients"
                                    icon={<Search />}
                                    color="text-emerald-600"
                                    bg="bg-emerald-50"
                                    onClick={() => setActiveTab("OCR")} // Link to your OCR tab
                                />
                                <QuickAction
                                    title="Reports"
                                    desc="12 saved results"
                                    icon={<History />}
                                    color="text-amber-600"
                                    bg="bg-amber-50"
                                    onClick={() => setActiveTab("History")} // Link to history
                                />
                            </div>
                        </section>
                    )}
                    {/* --- DEDICATED SKIN ANALYSIS TAB --- */}
                    {activeTab === "Analysis" && (
                        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-12 shadow-sm min-h-[500px] flex flex-col items-center justify-center text-center">
                                
                                {analysisStep === 1 && (
                                    <div className="max-w-md">
                                        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                            <Upload size={40} />
                                        </div>
                                        <h2 className="text-3xl font-black text-slate-900 mb-4">Upload Photo</h2>
                                        <p className="text-slate-500 mb-10">Please provide a clear, well-lit photo of the affected area for the AI to analyze.</p>
                                        
                                        <label className="block border-2 border-dashed border-slate-200 rounded-[2.5rem] p-16 hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group">
                                            <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                                            <div className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl group-hover:scale-105 transition-transform">
                                                Select From Device
                                            </div>
                                        </label>
                                    </div>
                                )}

                                {analysisStep === 2 && (
                                    <ScanningView 
                                        image={selectedImage} 
                                        onComplete={() => setAnalysisStep(3)} 
                                    />
                                )}

                                {analysisStep === 3 && (
                                    <ResultsView 
                                        onReset={() => {
                                            setAnalysisStep(1);
                                            setSelectedImage(null);
                                        }} 
                                    />
                                )}
                            </div>
                        </section>
                    )}

                    {activeTab === "Progress" && <div>Progress Content...</div>}
                    {activeTab === "History" && <div>History Content...</div>}
                </div>
            </main>
        </div>
    );
}

function QuickAction({ title, desc, icon, color, bg, onClick }) { // Add onClick prop
    return (
        <div
            onClick={onClick} // Add this!
            className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-50 transition-all duration-300 cursor-pointer group"
        >
            <div className={`w-14 h-14 ${bg} ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform`}>
                {React.cloneElement(icon, { size: 28 })}
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
        </div>
    );
}



function ScanningView({ image, onComplete }) {
    React.useEffect(() => {
        const timer = setTimeout(onComplete, 4000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="space-y-8">
            <div className="relative w-64 h-64 mx-auto rounded-[3rem] overflow-hidden border-8 border-slate-50 shadow-2xl">
                <img src={image} className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 top-0 h-1.5 bg-blue-400 shadow-[0_0_20px_rgba(59,130,246,1)] animate-scan-line"></div>
            </div>
            <div className="animate-pulse">
                <p className="text-xl font-black text-slate-900">AI Analysis in Progress...</p>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Scanning Dermal Layers</p>
            </div>
        </div>
    );
}

function ResultsView({ onReset }) {
    return (
        <div className="max-w-2xl w-full text-left">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Analysis Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Condition</p>
                    <p className="text-xl font-black text-slate-900">Eczema (Atopic Dermatitis)</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100">
                    <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Confidence</p>
                    <p className="text-xl font-black text-blue-600">94.2% Accurate</p>
                </div>
            </div>
            <button 
                onClick={onReset}
                className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black hover:bg-blue-600 transition-all shadow-xl"
            >
                Start New Scan
            </button>
        </div>
    );
}