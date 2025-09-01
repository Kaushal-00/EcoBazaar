import React from "react";

export default function FeatureCard({ title, children, icon, color = "emerald" }) {
  return (
    <article className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-transform duration-300 text-center">
      <div
        className={`w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-lg bg-${color}-50 text-${color}-600 text-xl`}
      >
        {icon}
      </div>
      <h4 className="font-semibold text-lg text-slate-900">{title}</h4>
      <p className="mt-2 text-sm text-slate-600">{children}</p>
    </article>
  );
}
