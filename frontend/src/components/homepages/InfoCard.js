import React from "react";

export default function InfoCard({ title, children, icon, color = "emerald" }) {
  return (
    <article className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-transform duration-300">
      <div className="flex flex-col items-center text-center gap-3">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${color}-50 text-${color}-600 text-xl`}
        >
          {icon}
        </div>
        <h4 className="font-semibold text-lg text-slate-900">{title}</h4>
        <p className="text-sm text-slate-600">{children}</p>
      </div>
    </article>
  );
}
