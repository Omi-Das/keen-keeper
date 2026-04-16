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
          <Toaster  position="top-center"
          toastOptions={{
    className: 'max-w-[90%] md:max-w-md mx-auto', 
    style: {
      fontSize: '14px',
      textAlign: 'center',
    },
  }}/> 
        </TimelineProvider>
      </body>
    </html>
  );
}
