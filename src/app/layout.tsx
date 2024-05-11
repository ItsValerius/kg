import Footer from "@/components/homepage/footer";
import Header from "@/components/homepage/header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen overflow-y-scroll flex flex-col justify-between"}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
