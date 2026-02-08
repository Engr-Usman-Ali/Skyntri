import React, { useState } from "react";
import {
  ShoppingCart, Zap, X, Plus, Minus, CheckCircle2,
  Trash2, ArrowRight, Droplets, ShieldCheck,
  Clock, Smartphone, ArrowLeft, User, MapPin, Wallet
} from "lucide-react";

// --- PRODUCT DATA ---
const PRODUCTS = [
  { id: 1, name: "Pure Hydration Cleanser", price: 2800, category: "Dry", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800", tag: "Gently Purifying", details: { volume: "200ml", skinType: "Dry", usage: "Morning & Night" } },
  { id: 2, name: "Vitamin C Glow Serum", price: 4200, category: "Oily", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800", tag: "Brightening", details: { volume: "30ml", skinType: "Oily", usage: "Morning Only" } },
  { id: 3, name: "Ceramide Barrier Cream", price: 3500, category: "Dry", image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800", tag: "Repairing", details: { volume: "50ml", skinType: "Dry", usage: "Nightly" } },
  { id: 4, name: "Niacinamide Pore Refiner", price: 3800, category: "Sensitive", image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=800", tag: "Pore Control", details: { volume: "30ml", skinType: "Sensitive", usage: "Nightly" } },
  { id: 5, name: "BHA Exfoliating Toner", price: 3200, category: "Acne-Prone", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=800", tag: "Clarifying", details: { volume: "120ml", skinType: "Acne-Prone", usage: "3x Weekly" } },
  { id: 6, name: "Mineral UV Shield", price: 3000, category: "All", image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800", tag: "Protection", details: { volume: "50ml", skinType: "All", usage: "Daily" } }
];

const CATEGORIES = ["All", "Oily", "Dry", "Sensitive", "Acne-Prone"];

export default function Marketplace() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productQty, setProductQty] = useState(1);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState("shop");

  const [formData, setFormData] = useState({
    name: "Husnain",
    address: "House #123, Street 4, Mirpur, Azad Kashmir",
    accountNo: "03123456789"
  });

  const addToCart = (product, amount = 1) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + amount } : item);
      return [...prev, { ...product, qty: amount }];
    });
    setIsCartOpen(true);
    setProductQty(1);
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleFinalCheckout = () => {
    const orderEvent = new CustomEvent('skyntriOrderPlaced', {
      detail: { productName: cart.length > 1 ? `${cart[0].name} & more` : cart[0].name }
    });
    window.dispatchEvent(orderEvent);
    setView("success");
  };

  if (view === "success") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700">

        {/* COMPACT ANIMATED TICK */}
        <div className="relative mb-6">
          {/* Soft glow background */}
          <div className="absolute inset-0 bg-emerald-100 rounded-full scale-125 blur-xl opacity-50 animate-pulse"></div>

          {/* The Green Tick Box - Smaller size (w-16) */}
          <div className="relative w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100 animate-success-pop">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" className="animate-check-path" />
            </svg>
          </div>
        </div>

        {/* COMPACT TEXT CONTENT */}
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Order Confirmed</h2>
          <p className="text-slate-500 text-sm font-medium max-w-[280px] mx-auto leading-relaxed">
            Your skincare essentials are being prepared for <span className="text-slate-900 font-bold">{formData.name}</span>.
          </p>
        </div>

        {/* SMALL ORDER SUMMARY BOX */}
        <div className="mt-8 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm w-full max-w-[320px] space-y-2">
          <div className="flex justify-between items-center text-[11px]">
            <span className="font-black text-slate-300 uppercase tracking-widest">Status</span>
            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Processing</span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="font-black text-slate-300 uppercase tracking-widest">Delivery</span>
            <span className="font-bold text-slate-700">Standard (2-4 Days)</span>
          </div>
        </div>

        {/* REFINED ACTION BUTTON */}
        <button
          onClick={() => { setView("shop"); setCart([]); }}
          className="mt-10 px-8 py-3.5 bg-slate-900 text-white rounded-xl font-black text-xs hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-100 flex items-center gap-2"
        >
          Continue Shopping <ArrowRight size={14} />
        </button>

      </div>
    );
  }

  if (view === "checkout") {
    return (
      <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4">
        <button onClick={() => setView("shop")} className="flex items-center gap-2 text-slate-400 font-bold mb-8 hover:text-slate-900 text-sm">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-3xl font-black text-slate-900">Checkout</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup label="Receiver Name" icon={<User size={18} />} value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} />
                <InputGroup label="Easypaisa Number" icon={<Smartphone size={18} />} value={formData.accountNo} onChange={(v) => setFormData({ ...formData, accountNo: v })} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Shipping Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-slate-300" size={18} />
                  <textarea className="w-full p-4 pl-12 bg-white border border-slate-200 rounded-2xl text-sm font-bold min-h-[100px] outline-none focus:border-blue-500" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h4 className="font-black text-lg mb-6">Order Summary</h4>
              <div className="space-y-3 mb-6 max-h-[200px] overflow-y-auto pr-2">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="font-bold text-slate-500">{item.qty}x {item.name}</span>
                    <span className="font-black text-slate-900">Rs. {item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-dashed pt-4 flex justify-between items-center mb-8">
                <span className="font-bold text-slate-400 text-xs">Total Amount</span>
                <span className="text-2xl font-black text-slate-900">Rs. {cartTotal}</span>
              </div>
              <button onClick={handleFinalCheckout} className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all">Confirm Payment</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pb-20">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Marketplace</h2>
          <p className="text-slate-400 font-bold text-xs mt-1 uppercase tracking-widest">Recommended for your skin</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-slate-100 p-1.5 rounded-xl flex gap-1">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-4 py-2 rounded-lg text-[11px] font-black transition-all ${activeFilter === cat ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}>
                {cat}
              </button>
            ))}
          </div>
          <button onClick={() => setIsCartOpen(true)} className="p-3 bg-slate-900 text-white rounded-xl relative hover:bg-blue-600 transition-all">
            <ShoppingCart size={20} />
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-emerald-500 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center border-2 border-white">{cart.length}</span>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.filter(p => activeFilter === "All" || p.category === activeFilter).map(product => (
          <div key={product.id} className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden hover:shadow-xl transition-all group">
            <div onClick={() => setSelectedProduct(product)} className="aspect-[4/3] cursor-pointer overflow-hidden relative">
              <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={product.name} />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[9px] font-black text-blue-600 uppercase tracking-tighter">{product.tag}</div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-slate-900 mb-4 line-clamp-1">{product.name}</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase">Price</p>
                  <p className="text-lg font-black text-slate-900">Rs. {product.price}</p>
                </div>
                <button onClick={() => addToCart(product, 1)} className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-emerald-500 transition-all"><Plus size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in" onClick={() => setSelectedProduct(null)} />
          <div className="relative bg-white w-full max-w-3xl rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in zoom-in-95">
            <div className="md:w-1/2 h-64 md:h-auto">
              <img src={selectedProduct.image} className="w-full h-full object-cover" alt="" />
            </div>
            <div className="p-10 md:w-1/2 space-y-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-black text-slate-900">{selectedProduct.name}</h2>
                <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><X size={20} /></button>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase">Size</p>
                  <p className="text-xs font-bold">{selectedProduct.details.volume}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase">Usage</p>
                  <p className="text-xs font-bold">{selectedProduct.details.usage}</p>
                </div>
              </div>
              <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl">
                <div className="flex items-center gap-4">
                  <button onClick={() => setProductQty(Math.max(1, productQty - 1))} className="text-white hover:text-emerald-400"><Minus size={16} /></button>
                  <span className="text-white font-black">{productQty}</span>
                  <button onClick={() => setProductQty(productQty + 1)} className="text-white hover:text-emerald-400"><Plus size={16} /></button>
                </div>
                <button onClick={() => { addToCart(selectedProduct, productQty); setSelectedProduct(null); }} className="bg-emerald-500 text-white px-6 py-2 rounded-xl font-bold text-sm">Add Rs.{selectedProduct.price * productQty}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <div className={`fixed inset-0 z-[6000] transition-all ${isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-xs" onClick={() => setIsCartOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-500 p-6 flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-900">Your Cart</h3>
            <button onClick={() => setIsCartOpen(false)}><X size={20} /></button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                <img src={item.image} className="w-14 h-14 rounded-lg object-cover" alt="" />
                <div className="flex-1">
                  <p className="font-bold text-xs text-slate-800 line-clamp-1 pr-6">{item.name}</p>
                  <p className="text-xs font-black text-emerald-600 mt-1">Rs. {item.price * item.qty}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateCartQty(item.id, -1)} className="p-1 bg-white border border-slate-200 rounded-md"><Minus size={10} /></button>
                    <span className="text-[10px] font-black">{item.qty}</span>
                    <button onClick={() => updateCartQty(item.id, 1)} className="p-1 bg-white border border-slate-200 rounded-md"><Plus size={10} /></button>
                  </div>
                </div>
                <button onClick={() => setCart(cart.filter(c => c.id !== item.id))} className="absolute top-3 right-3 text-slate-300 hover:text-red-500"><Trash2 size={12} /></button>
              </div>
            ))}
          </div>

          {cart.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase">Subtotal</span>
                <span className="text-xl font-black text-slate-900">Rs. {cartTotal}</span>
              </div>
              <button onClick={() => { setIsCartOpen(false); setView("checkout"); }} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all">
                Proceed to Checkout <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InputGroup({ label, icon, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">{icon}</div>
        <input className="w-full p-4 pl-12 bg-white border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:border-blue-500" value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
}