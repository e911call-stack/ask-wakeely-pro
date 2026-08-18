import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "اسأل وكيلي برو | Ask Wakeely Pro",
  description: "Jordanian Legal Knowledge Platform - منصة معرفة قانونية أردنية",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
