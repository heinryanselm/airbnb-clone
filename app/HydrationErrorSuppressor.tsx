"use client";

import { useEffect } from "react";

export default function HydrationErrorSuppressor({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0]?.includes?.("Hydration failed because")) {
        return;
      }
      originalError(...args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  return <>{children}</>;
}
