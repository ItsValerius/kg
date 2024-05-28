import Footer from "@/components/homepage/footer";
import Header from "@/components/homepage/header";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {

  title: {
    default: "KG Knallköpp Golkrath",
    template: "KG Knallköpp Golkrath | %s",
  },
  description: "Website der KG Knallköpp Golkrath e.V.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " grid min-h-screen grid-rows-[64px_1fr_64px] overflow-y-scroll"
        }
      >
        <Header />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
