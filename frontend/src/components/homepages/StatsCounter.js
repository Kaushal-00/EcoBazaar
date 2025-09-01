import React from "react";

export default function StatsCounter({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-bold text-emerald-600">{value}</div>
      <p className="text-sm text-slate-600">{label}</p>
    </div>
  );
}
