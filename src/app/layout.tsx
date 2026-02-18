import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.brandName} – ${siteConfig.brandTagline}`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: "Premier advisory and property services for international business formation, residency solutions, and exclusive real estate opportunities.",
  keywords: ["advisory services", "company formation", "residency", "banking", "compliance", "real estate", "international business"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
