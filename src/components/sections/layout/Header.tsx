"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Top of the page -
      if (currentScrollY < 20) {
        setIsCompact(false);
      }
      // Scrolling down - compact
      else if (currentScrollY > lastScrollYRef.current) {
        setIsCompact(true);
      }
      // Scrolling up - expanded
      else {
        setIsCompact(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-4 left-6 right-6 z-50 transition-all duration-300`}>
      <nav className={`relative gradient-border mx-auto px-6 rounded-full flex items-center justify-between bg-[#00000]/80 backdrop-blur-md transition-all duration-300 ${isCompact ? 'max-w-2xl py-3 shadow-xl' : 'max-w-full py-3'
        }`}>
        {/*Left Block (Name)*/}
        <span className="text-white font-semibold text-lg pl-2">
          Alexey
        </span>
        {/*Бургер на мобильном*/}
        <button className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
        {/*Center Block*/}
        <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="text-gray-300 hover:text-white transition-colors">
                {item.label}
              </a>
            </li>
          )
          )}
        </ul>
      </nav>
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto bg-neutral-900/95 backdrop-blur-md rounded-2xl p-4">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="block px-4 py-3 text-gray-300 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

