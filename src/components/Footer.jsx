import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1B3D2F] text-white py-16 px-6 mt-20 h-[413px]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-4 tracking-tight">KeenKeeper</h2>
        
        <p className="text-gray-300 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 mb-4">
            Social Links
          </p>
          <div className="flex justify-center gap-6">
            <Link href="#" className="hover:text-gray-400 transition">
              <FaInstagram size={20} />
            </Link>
            <Link href="#" className="hover:text-gray-400 transition">
              <FaFacebookF size={20} />
            </Link>
            <Link href="#" className="hover:text-gray-400 transition">
              <FaTwitter size={20} />
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[10px] text-gray-400 uppercase tracking-widest">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
