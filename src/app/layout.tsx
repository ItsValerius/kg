import Footer from "@/components/homepage/footer";
import Header from "@/components/homepage/header";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { env } from "@/env";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase:
    env.NODE_ENV === "production"
      ? new URL("https://" + env.VERCEL_PROJECT_PRODUCTION_URL)
      : new URL("http://localhost:300"),
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
