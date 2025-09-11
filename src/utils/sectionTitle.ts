import { usePathname } from "next/navigation";
import React from "react";

export function getSectionTitle(pathname: string) {
  if (pathname.startsWith("/dashboard")) return "Dashboard";
  if (pathname.startsWith("/customers")) return "Customers";
  if (pathname.startsWith("/settings")) return "Settings";
  if (pathname === "/") return "Home";
  return "";
}
