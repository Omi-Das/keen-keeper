import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TimelineProvider } from "@/context/TimelineContext";
import { Toaster } from "react-hot-toast";
import LayoutWrapper from "@/components/LayoutWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 antialiased font-sans">
        <TimelineProvider>
 <LayoutWrapper>
      {children}
    </LayoutWrapper>
          <Toaster /> 
        </TimelineProvider>
      </body>
    </html>
  );
}
