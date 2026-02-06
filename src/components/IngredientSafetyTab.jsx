import React, { useState, useRef } from "react";
import {
  Search, Upload, AlertCircle, CheckCircle2,
  ShieldAlert, Info, BookOpen, RefreshCw,
  Camera, Type, ArrowLeft
} from "lucide-react";

export default function IngredientSafetyTab() {
  const [step, setStep] = useState("choice"); // choice, upload, manual, results
  const [isScanning, setIsScanning] = useState(false);
  const [manualText, setManualText] = useState("");
  const fileInputRef = useRef(null);

  // REQ-2.6: Overall Safety Rating (Simulated result)
  const productRating = 2;

  // REQ-2.2 & 2.3: Mock Database Results for the frontend demo
  const mockAnalysis = [
    { name: "Aqua", function: "Solvent", status: "safe", risk: "None", citation: "CosIng" },
    { name: "Fragrance (Parfum)", function: "Scenting", status: "irritant", risk: "Common allergen for sensitive skin", citation: "IFRA Standards" },
    { name: "Methylparaben", function: "Preservative", status: "toxic", risk: "Potential endocrine disruptor", citation: "EWG Skin Deep" },
    { name: "Glycerin", function: "Humectant", status: "safe", risk: "None", citation: "CIR" }
  ];

  // Handler to trigger the hidden file input
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Handler when a file is actually selected
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      startAnalysis();
    }
  };

  const startAnalysis = () => {
    setIsScanning(true);
    // REQ-2.1: Simulate OCR Extraction / Processing Delay
    setTimeout(() => {
      setIsScanning(false);
      setStep("results");
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500 pb-20">

      {/* HEADER SECTION */}
      <div className="mb-10 text-left flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Ingredient Safety</h2>
          <p className="text-slate-500 font-medium italic">Advanced AI Label Decoding</p>
        </div>
        {step !== "choice" && (
          <button
            onClick={() => setStep("choice")}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-sm transition-colors"
          >
            <ArrowLeft size={18} /> Back to Choice
          </button>
        )}
      </div>

      {/* STEP 1: INITIAL CHOICE */}
      {step === "choice" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => setStep("upload")}
            className="bg-white p-10 rounded-[2.5rem] border-2 border-slate-100 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-50 transition-all cursor-pointer group text-left"
          >
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Camera size={32} />
            </div>
            <h3 className="text-xl font-black mb-2 text-slate-900">Scan Product Label</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Extract ingredients automatically using Skyntri Vision AI.</p>
          </div>

          <div
            onClick={() => setStep("manual")}
            className="bg-white p-10 rounded-[2.5rem] border-2 border-slate-100 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-50 transition-all cursor-pointer group text-left"
          >
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Type size={32} />
            </div>
            <h3 className="text-xl font-black mb-2 text-slate-900">Manual Entry</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Paste the ingredient list if the label is blurry or damaged.</p>
          </div>
        </div>
      )}

      {/* STEP 2A: UPLOAD / SCANNING UI */}
      {step === "upload" && (
        <div className="bg-white rounded-[3rem] p-12 border border-slate-100 text-center shadow-sm">
          {isScanning ? (
            <div className="py-10">
              <div className="relative w-48 h-64 mx-auto mb-8 bg-slate-100 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] animate-scan-line z-10"></div>
                <div className="flex flex-col items-center justify-center h-full text-slate-300">
                  <Search size={32} className="animate-pulse mb-2" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Analyzing...</span>
                </div>
              </div>
              <p className="font-black text-slate-900 animate-pulse uppercase tracking-widest">Skyntri OCR Engine v1.0 Active</p>
            </div>
          ) : (
            <div className="py-10 max-w-sm mx-auto">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Upload size={32} />
              </div>
              <h3 className="text-2xl font-black mb-2">Upload Photo</h3>
              <p className="text-slate-500 mb-10 text-sm">Ensure the ingredient list is legible for 90% accuracy </p>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
              />

              <button
                onClick={handleUploadClick}
                className="w-full bg-blue-600 text-white py-5 rounded-[1.5rem] font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
              >
                Choose Image
              </button>
            </div>
          )}
        </div>
      )}

      {/* STEP 2B: MANUAL INPUT UI (REQ-2.9) */}
      {step === "manual" && (
        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm text-left">
          {isScanning ? (
            /* --- NEW PROCESSING ANIMATION FOR MANUAL INPUT --- */
            <div className="py-20 text-center animate-in fade-in duration-500">
              <div className="relative w-24 h-24 mx-auto mb-8">
                {/* Pulsing Rings */}
                <div className="absolute inset-0 border-4 border-emerald-500 rounded-full animate-ping opacity-20"></div>
                <div className="absolute inset-0 border-4 border-emerald-100 rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center text-emerald-600">
                  <RefreshCw size={40} className="animate-spin duration-[3000ms]" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Cross-Referencing...</h3>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em] animate-pulse">
                Checking 1,000+ Safe Ingredients
              </p>

              {/* Simulated progress bars */}
              <div className="max-w-xs mx-auto mt-8 space-y-3">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 animate-[loading_2s_ease-in-out_infinite]"></div>
                </div>
              </div>
            </div>
          ) : (
            /* --- ORIGINAL INPUT FORM --- */
            <>
              <h3 className="text-2xl font-black mb-2 text-slate-900">Input Ingredients</h3>
              <p className="text-slate-500 mb-6 text-sm">Paste the text found on the back of your product.</p>
              <textarea
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                className="w-full h-52 p-8 bg-slate-50 border-2 border-slate-100 rounded-[2rem] focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium text-slate-700 placeholder:text-slate-300"
                placeholder="e.g., Water, Butylene Glycol, Niacinamide..."
              />
              <button
                disabled={!manualText.trim()}
                onClick={startAnalysis}
                className="mt-6 w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black hover:bg-emerald-600 disabled:bg-slate-200 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3"
              >
                <ShieldAlert size={20} />
                Run Safety Check
              </button>
            </>
          )}
        </div>
      )}

      {/* STEP 3: RESULTS (REQ-2.2 - REQ-2.10) */}
      {step === "results" && (
        <div className="space-y-8 text-left animate-in slide-in-from-bottom-4 duration-700">

          {/* REQ-2.6: Safety Rating Dashboard */}
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl shadow-slate-200">
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <svg className="w-full h-full rotate-[-90deg]">
                <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
                <circle cx="72" cy="72" r="64" stroke="currentColor" strokeWidth="12" fill="transparent"
                  strokeDasharray={402} strokeDashoffset={402 - (402 * productRating) / 5}
                  strokeLinecap="round"
                  className={productRating <= 2 ? "text-red-500" : "text-emerald-500"}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black">{productRating}/5</span>
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Rating</span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center gap-3 mb-4 justify-center md:justify-start">
                <h3 className="text-3xl font-black tracking-tight">Clinical Report</h3>
                <span className="bg-red-500/20 text-red-400 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] border border-red-500/20">
                  Potentially Irritating
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xl">
                This product contains <span className="text-red-400 font-bold">Methylparaben</span>, which is contraindicated for your <span className="text-blue-400 font-bold italic">Acne-Prone</span> skin profile
              </p>

              {/* REQ-2.8: Alternatives available in Pakistan */}
              <div className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-2xl inline-flex items-center gap-4 text-blue-300 text-xs font-bold w-full md:w-auto">
                <div className="bg-blue-500 p-2 rounded-lg text-white shadow-lg shadow-blue-500/20">
                  <RefreshCw size={16} />
                </div>
                <div>
                  <p className="text-blue-400/60 uppercase text-[9px]">REQ-2.8: Suggestion</p>
                  <p>Alternative found in Pakistan: <span className="underline cursor-pointer hover:text-white">Jenpharm Dermive Oil Free</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* REQ-2.2: Ingredient Breakdown Table */}
          <div className="grid grid-cols-1 gap-4">
            {mockAnalysis.map((ing, i) => (
              <div key={i} className="bg-white border border-slate-100 p-7 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg transition-all duration-300">
                <div className="flex gap-5">
                  <div className={`mt-1 p-2.5 rounded-2xl shrink-0 h-fit ${ing.status === 'safe' ? 'bg-emerald-50 text-emerald-500 shadow-emerald-100 shadow-lg' :
                      ing.status === 'toxic' ? 'bg-red-50 text-red-500 shadow-red-100 shadow-lg' : 'bg-amber-50 text-amber-500 shadow-amber-100 shadow-lg'
                    }`}>
                    {ing.status === 'safe' ? <CheckCircle2 size={24} /> : <ShieldAlert size={24} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-black text-slate-900 text-xl">{ing.name}</h4>
                      <span className="text-[10px] bg-slate-100 text-slate-400 px-2 py-1 rounded-md font-black uppercase tracking-widest">{ing.function}</span>
                    </div>
                    <p className="text-sm text-slate-600 mt-2 font-medium leading-relaxed">
                      {/* REQ-2.7: Risk Explanation */}
                      <span className="font-bold text-slate-800">Safety Note:</span> {ing.risk}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 shrink-0">
                  <span className={`px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest border ${ing.status === 'safe' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      ing.status === 'toxic' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                    {ing.status}
                  </span>
                  {/* REQ-2.10: Citations */}
                  <div className="flex items-center gap-2 text-slate-300 text-[10px] font-bold italic uppercase tracking-tighter">
                    <BookOpen size={14} /> Ref: {ing.citation} Database
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep("choice")}
              className="flex-1 py-6 bg-slate-900 text-white rounded-[1.8rem] font-black hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 uppercase tracking-widest text-sm"
            >
              Analyze Another Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
}