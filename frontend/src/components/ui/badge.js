import React from "react";

function Badge({ className = "", variant = "primary", asChild = false, children, ...props }) {

  const badgeClass = `badge bg-${variant} ${className}`;

  const Comp = asChild ? "span" : "span";

  return (
    <Comp className={badgeClass} {...props}>
      {children}
    </Comp>
  );
}

export { Badge };