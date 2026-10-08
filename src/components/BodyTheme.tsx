"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const BW_ROUTES = ["/program-za-saucesce", "/novo-groblje"];

export function BodyTheme() {
  const pathname = usePathname();

  useEffect(() => {
    const isBw = BW_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`),
    );
    document.body.classList.toggle("theme-bw", isBw);
    return () => document.body.classList.remove("theme-bw");
  }, [pathname]);

  return null;
}

export function isBwRoute(pathname: string) {
  return BW_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
