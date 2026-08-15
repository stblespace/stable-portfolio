"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { navItems } from "@/config/maincfg"

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isCompact, setIsCompact] = useState(false)
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 20) {
        setIsCompact(false)
      } else if (currentScrollY > lastScrollYRef.current) {
        setIsCompact(true)
      } else {
        setIsCompact(false)
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="fixed top-4 left-4 right-4 md:left-6 md:right-6 z-50 transition-all duration-300">
      <nav
        className={`relative gradient-border mx-auto px-6 xxl:px-8! rounded-full flex items-center justify-between bg-[#000000]/80 backdrop-blur-md transition-all duration-300 ${
          isCompact
            ? "max-w-2xl py-3 shadow-xl"
            : "max-w-full xxl:max-w-6xl! 3xl:max-w-7xl! py-3 xxl:py-4!"
        }`}
      >
        <a
          href="/"
          className="flex items-center gap-2.5 xxl:gap-3! pl-1 text-white hover:text-[#D7263D] font-semibold text-lg xxl:text-xl! 3xl:text-2xl! transition-colors"
        >
          <Image
            src="/logo.png"
            alt=""
            width={32}
            height={32}
            className="w-7 h-7 xxl:w-8! xxl:h-8! 3xl:w-9! 3xl:h-9! rounded-lg shrink-0"
            priority
          />
          <span>Alexey</span>
        </a>

        <button
          className="md:hidden text-white p-2 hover:text-[#D7263D] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        <ul className="hidden md:flex items-center gap-2 xxl:gap-3! absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href)
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`block px-4 py-1.5 xxl:px-5! xxl:py-2! rounded-full text-base xxl:text-lg! 3xl:text-xl! transition-colors ${
                    active
                      ? "bg-[#D7263D]/15 text-[#ff6b7a]"
                      : "text-gray-300 hover:text-[#ff6b7a]"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto bg-neutral-900/95 backdrop-blur-md rounded-2xl p-4">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href)
            return (
              <a
                key={item.label}
                href={item.href}
                className={`block px-4 py-3 rounded-xl transition-colors ${
                  active
                    ? "bg-[#D7263D]/15 text-[#ff6b7a]"
                    : "text-gray-300 hover:text-[#ff6b7a]"
                }`}
                aria-current={active ? "page" : undefined}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            )
          })}
        </div>
      )}
    </header>
  )
}
