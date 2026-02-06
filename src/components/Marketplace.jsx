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

  // Checkout Form State (Pre-filled for Husnain)
  const [formData, setFormData] = useState({
    name: "Husnain",
    address: "House #123, Street 4, Mirpur, Azad Kashmir",
    accountNo: "03123456789"
  });

  // --- LOGIC ---
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

  // --- NEW: TRIGGER NOTIFICATION EVENT ---
  const handleFinalCheckout = () => {
    // 1. Dispatch custom event for the Header to catch
    const orderEvent = new CustomEvent('skyntriOrderPlaced', {
      detail: {
        productName: cart.length > 1 ? `${cart[0].name} & more` : cart[0].name
      }
    });
    window.dispatchEvent(orderEvent);

    // 2. Switch to success view
    setView("success");
  };

  // --- VIEW: SUCCESS ---
  if (view === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in-95">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-8 animate-bounce"><CheckCircle2 size={48} /></div>
        <h2 className="text-4xl font-black mb-2 text-slate-900">Order Placed!</h2>
        <p className="text-slate-500 mb-8 max-w-sm font-medium">
          Thank you, <b className="text-slate-900">{formData.name}</b>. <br />
          Your order is being processed. Check your notification bell for updates!
        </p>
        <button onClick={() => { setView("shop"); setCart([]); }} className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black hover:bg-blue-600 transition-all shadow-xl active:scale-95">Return to Shop</button>
      </div>
    );
  }

  // --- VIEW: CHECKOUT ---
  if (view === "checkout") {
    return (
      <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-500">
        <button onClick={() => setView("shop")} className="flex items-center gap-2 text-slate-400 font-bold mb-10 hover:text-slate-900 transition-colors">
          <ArrowLeft size={18} /> Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Input Form */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-4xl font-black text-slate-900">Finalize Order</h3>

            <div className="space-y-6">
              <div className="relative">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Receiver Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-4 text-slate-300" size={20} />
                  <input
                    className="w-full p-4 pl-12 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block">Shipping Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-slate-300" size={20} />
                  <textarea
                    className="w-full p-4 pl-12 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 min-h-[100px] font-bold"
                    placeholder="House #, Street, City..."
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>

              {/* Easypaisa Branding */}
              <div className="p-8 bg-slate-900 rounded-[2.5rem] border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2 shadow-lg">
                      <img src="https://cdn.aptoide.com/imgs/5/a/d/5ad0bd9f9704075be3dd8efdbca6313b_icon.jpg?w=128" alt="Easypaisa" className="w-full h-full object-contain" />
                    </div>
                    <span className="font-black text-white text-lg">Easypaisa Wallet</span>
                  </div>
                  <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20 uppercase tracking-tighter">Instant Checkout</span>
                </div>

                <div className="relative z-10">
                  <input
                    type="tel"
                    className="w-full p-5 bg-slate-800 border border-slate-700 rounded-2xl font-black text-2xl tracking-widest text-white outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
                    placeholder="03XX XXXXXXX"
                    value={formData.accountNo}
                    onChange={(e) => setFormData({ ...formData, accountNo: e.target.value })}
                  />
                  <p className="text-[11px] text-slate-400 font-bold mt-4 flex items-center gap-2">
                    <Smartphone size={14} className="text-emerald-500" /> Open Easypaisa app to enter your PIN after confirming.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 sticky top-10">
              <h4 className="font-black text-2xl mb-8 text-slate-900">Summary</h4>
              <div className="space-y-4 mb-8 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-xs font-black text-slate-600 truncate max-w-[150px]">{item.qty}x {item.name}</span>
                    <span className="text-sm font-black text-slate-900">Rs. {item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-dashed pt-6 flex justify-between items-center mb-10">
                <span className="font-black text-slate-400 uppercase text-xs tracking-widest">Grand Total</span>
                <span className="text-4xl font-black text-slate-900 tracking-tighter">Rs. {cartTotal}</span>
              </div>
              <button
                disabled={!formData.name || !formData.address || !formData.accountNo}
                onClick={handleFinalCheckout}
                className="w-full py-6 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 disabled:cursor-not-allowed text-white rounded-3xl font-black text-lg shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                Confirm & Pay <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW: MAIN SHOP ---
  return (
    <div className="relative pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-16">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Marketplace</h2>
          <p className="text-slate-400 font-bold text-sm mt-1 uppercase tracking-widest">Clinical Grade Skincare</p>
        </div>

        <div className="bg-white p-2 rounded-2xl border border-slate-100 flex gap-1 shadow-sm">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeFilter === cat ? "bg-slate-900 text-white shadow-lg" : "text-slate-400 hover:text-slate-900"}`}>
              {cat}
            </button>
          ))}
        </div>

        <button onClick={() => setIsCartOpen(true)} className="px-6 py-4 bg-slate-900 text-white rounded-2xl font-black flex items-center gap-3 relative shadow-xl hover:bg-blue-600 transition-all active:scale-95">
          <ShoppingCart size={20} />
          <span>Cart</span>
          {cart.length > 0 && (
            <span className="bg-emerald-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-black animate-in zoom-in">{cart.length}</span>
          )}
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {PRODUCTS.filter(p => activeFilter === "All" || p.category === activeFilter).map(product => (
          <div key={product.id} className="group bg-white rounded-[3rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
            <div onClick={() => { setSelectedProduct(product); setProductQty(1); }} className="aspect-square cursor-pointer overflow-hidden relative">
              <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
              <div className="absolute top-6 left-6 bg-white/95 px-4 py-2 rounded-2xl text-[10px] font-black text-blue-600 uppercase shadow-sm tracking-widest">{product.tag}</div>
            </div>
            <div className="p-10">
              <h3 className="font-black text-xl text-slate-900 mb-8 leading-tight h-14 overflow-hidden">{product.name}</h3>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</span>
                  <span className="text-2xl font-black text-slate-900">Rs. {product.price}</span>
                </div>
                <button onClick={() => addToCart(product, 1)} className="p-5 bg-slate-900 text-white rounded-2xl hover:bg-emerald-500 transition-all shadow-lg active:scale-90"><Plus size={20} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in" onClick={() => setSelectedProduct(null)} />
          <div className="relative bg-white w-full max-w-4xl rounded-[3.5rem] overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-in zoom-in-95 shadow-2xl">
            <img src={selectedProduct.image} className="w-full md:w-1/2 object-cover" alt="" />
            <div className="p-12 overflow-y-auto w-full bg-white">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tighter">{selectedProduct.name}</h2>
                  <p className="text-blue-600 font-black text-xs uppercase tracking-widest mt-2">{selectedProduct.category} Treatment</p>
                </div>
                <button onClick={() => setSelectedProduct(null)} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors"><X size={20} /></button>
              </div>

              <div className="flex items-center gap-8 mb-10 p-6 bg-slate-50 rounded-[2rem] w-fit">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty</p>
                <div className="flex items-center gap-6">
                  <button onClick={() => setProductQty(Math.max(1, productQty - 1))} className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 rounded-2xl hover:text-emerald-500 transition-all shadow-sm active:scale-90"><Minus size={18} /></button>
                  <span className="text-3xl font-black w-8 text-center">{productQty}</span>
                  <button onClick={() => setProductQty(productQty + 1)} className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 rounded-2xl hover:text-emerald-500 transition-all shadow-sm active:scale-90"><Plus size={18} /></button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="bg-slate-50 p-6 rounded-3xl text-center border border-slate-100"><Droplets size={20} className="mx-auto text-blue-500 mb-2" /><p className="text-[10px] font-black uppercase text-slate-400 mb-1">Size</p><p className="text-xs font-black">{selectedProduct.details.volume}</p></div>
                <div className="bg-slate-50 p-6 rounded-3xl text-center border border-slate-100"><ShieldCheck size={20} className="mx-auto text-emerald-500 mb-2" /><p className="text-[10px] font-black uppercase text-slate-400 mb-1">Safety</p><p className="text-xs font-black">Tested</p></div>
                <div className="bg-slate-50 p-6 rounded-3xl text-center border border-slate-100"><Clock size={20} className="mx-auto text-amber-500 mb-2" /><p className="text-[10px] font-black uppercase text-slate-400 mb-1">Usage</p><p className="text-xs font-black">{selectedProduct.details.usage}</p></div>
              </div>

              <button
                onClick={() => { addToCart(selectedProduct, productQty); setSelectedProduct(null); }}
                className="w-full py-7 bg-slate-900 text-white rounded-[2.5rem] font-black text-xl hover:bg-emerald-500 transition-all flex justify-between px-12 shadow-2xl active:scale-[0.98]"
              >
                <span>Add to Cart</span>
                <span>Rs. {selectedProduct.price * productQty}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar - Refined & Scaled */}
      <div className={`fixed inset-0 z-[4000] ${isCartOpen ? "visible" : "invisible"}`}>
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)} />

        <div className={`absolute right-0 top-0 h-screen w-full max-w-[380px] bg-white p-8 transition-transform transform duration-500 ease-out ${isCartOpen ? "translate-x-0" : "translate-x-full"} shadow-2xl flex flex-col`}>

          {/* Header - Smaller Font */}
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black tracking-tight text-slate-900">Your Cart</h3>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-50 rounded-xl transition-all text-slate-400 hover:text-slate-900"><X size={20} /></button>
          </div>

          {/* Product List - Scaled for 3 items visibility */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                <ShoppingCart size={40} className="mb-3" />
                <p className="font-bold text-sm">Cart is empty</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-4 p-4 bg-slate-50 rounded-[1.5rem] relative group border border-slate-100/50">
                  {/* Smaller Image */}
                  <img src={item.image} className="w-16 h-16 rounded-xl object-cover shadow-sm" alt="" />

                  <div className="flex-1">
                    <p className="font-bold text-slate-900 text-sm leading-tight mb-1 pr-6 line-clamp-1">{item.name}</p>
                    <p className="text-emerald-600 font-black text-xs mb-3">Rs. {item.price * item.qty}</p>

                    {/* Compact Qty Controls */}
                    <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-lg border border-slate-200 w-fit">
                      <button onClick={() => updateCartQty(item.id, -1)} className="text-slate-400 hover:text-red-500"><Minus size={12} /></button>
                      <span className="text-xs font-black w-4 text-center text-slate-900">{item.qty}</span>
                      <button onClick={() => updateCartQty(item.id, 1)} className="text-slate-400 hover:text-emerald-500"><Plus size={12} /></button>
                    </div>
                  </div>

                  {/* Smaller Trash Icon */}
                  <button onClick={() => setCart(cart.filter(c => c.id !== item.id))} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer - Optimized Size */}
          {cart.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <span className="font-black text-slate-400 uppercase text-[10px] tracking-widest">Subtotal</span>
                <span className="text-2xl font-black text-slate-900 tracking-tighter">Rs. {cartTotal}</span>
              </div>

              <button
                onClick={() => { setIsCartOpen(false); setView("checkout"); }}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black flex items-center justify-center gap-3 text-sm hover:bg-emerald-600 transition-all shadow-xl active:scale-95"
              >
                Review & Checkout <ArrowRight size={16} />
              </button>

              <p className="text-center text-[10px] text-slate-400 font-bold mt-4 uppercase tracking-tight">
                Free shipping on clinical orders
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}