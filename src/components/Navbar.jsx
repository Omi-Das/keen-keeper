"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, BarChart3 } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const links = [
    { name: "Home", href: "/", icon: <Home size={18} /> },
    { name: "Timeline", href: "/timeline", icon: <Clock size={18} /> },
    { name: "Stats", href: "/stats", icon: <BarChart3 size={18} /> },
  ];

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white border-b sticky top-0 z-50">
    <Link href="/" className="font-bold text-2xl">
  <span className="text-black">Keen</span>
  <span className="text-green-800">Keeper</span>
</Link>

      <div className="flex gap-6">
        {links.map((link) => (
          <Link key={link.name} href={link.href} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${pathname === link.href ? "text-white bg-[#244d3f]" : "text-gray-500"}`}>
            {link.icon} {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
