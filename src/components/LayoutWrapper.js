"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  console.log("Current Path:", pathname);

  const validPaths = ["/", "/timeline", "/stats"];
 const isFriendDetail = pathname.startsWith("/friend"); 
  const showNavFooter = validPaths.includes(pathname) || isFriendDetail;

  return (
    <>
      {showNavFooter ? (
        <>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </>
      ) : (
        <main>{children}</main>
      )}
    </>
  );
}
