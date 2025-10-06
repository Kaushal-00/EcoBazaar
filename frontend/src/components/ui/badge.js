// src/components/ui/badge.js
import React from "react";

const badgeVariants = {
  primary: "bg-emerald-500 text-white",
  success: "bg-green-500 text-white", 
  warning: "bg-amber-500 text-white",
  danger: "bg-red-500 text-white",
  secondary: "bg-slate-500 text-white"
};

function Badge({ className = "", variant = "primary", asChild = false, children, ...props }) {
  const baseClasses = "inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full";
  const variantClasses = badgeVariants[variant] || badgeVariants.primary;
  
  const Comp = asChild ? "span" : "span";

  return (
    <Comp className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </Comp>
  );
}

export { Badge };
