import React from "react";

export default function SolutionCard({ icon, title, desc, accent }) {
  return (
    <article className="p-8 bg-white rounded-2xl border border-slate-100 hover:shadow-2xl transition-all duration-300">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br ${accent}`}>
        {icon}
      </div>
      <h4 className="text-xl font-bold text-slate-900 mb-3">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
    </article>
  );
}