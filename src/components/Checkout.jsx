import React, { useState } from "react";
import { ArrowLeft, CreditCard, Truck, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Checkout({ cart, cartTotal, onBack }) {
  const [step, setStep] = useState(1); // 1: Info, 2: Success
  
  if (step === 2) return <SuccessState onBack={onBack} />;

  return (
    <div className="min-h-screen bg-[#F8FAFC] animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold transition-colors mb-10"
        >
          <ArrowLeft size={18} /> Back to Marketplace
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: FORMS (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Truck size={24} />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Shipping Details</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Full Name" placeholder="Husnain ..." />
                <Input label="Email Address" placeholder="husnain@example.com" />
                <div className="md:col-span-2">
                  <Input label="Shipping Address" placeholder="123 Skin Lane, Derma City" />
                </div>
                <Input label="City" placeholder="London" />
                <Input label="Postal Code" placeholder="E1 6AN" />
              </div>
            </section>

            <section className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <CreditCard size={24} />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Payment Method</h3>
              </div>
              
              <div className="space-y-6">
                <Input label="Card Number" placeholder="**** **** **** 1234" />
                <div className="grid grid-cols-2 gap-6">
                  <Input label="Expiry Date" placeholder="MM/YY" />
                  <Input label="CVC" placeholder="***" />
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT: SUMMARY (4 Columns) */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white sticky top-10 shadow-2xl">
              <h3 className="text-xl font-black mb-8 border-b border-white/10 pb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-slate-400 font-medium">
                      {item.qty}x <span className="text-white">{item.name}</span>
                    </span>
                    <span className="font-bold">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-white/10 pt-6 mb-8">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  <span className="text-emerald-400 font-bold">Free</span>
                </div>
                <div className="flex justify-between text-2xl font-black pt-4">
                  <span>Total</span>
                  <span className="text-blue-400">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={() => setStep(2)}
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20"
              >
                Complete Purchase <ShieldCheck size={20} />
              </button>
              
              <p className="text-[10px] text-center text-slate-500 mt-6 uppercase tracking-widest font-bold">
                🔒 Secure SSL Encrypted Payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, placeholder }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{label}</label>
      <input 
        type="text" 
        placeholder={placeholder} 
        className="bg-slate-50 border border-slate-100 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium transition-all"
      />
    </div>
  );
}

function SuccessState({ onBack }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 animate-in zoom-in-95 duration-500">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 mb-4">Order Confirmed!</h2>
        <p className="text-slate-500 font-medium mb-10 leading-relaxed">
          Your medical-grade skincare routine is being prepared. You will receive a tracking link via email shortly.
        </p>
        <button 
          onClick={onBack}
          className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black hover:bg-blue-600 transition-all shadow-xl"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}