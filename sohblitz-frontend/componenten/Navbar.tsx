"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useTranslations } from "@/lib/TranslationProvider"

type Props = {
  navState: "transparent" | "gradient" | "white"
}

export default function Navbar({ navState }: Props) {

  const pathname = usePathname()
  const t = useTranslations()
  const [open, setOpen] = useState(false)

  const locale = pathname.split("/")[1] || "de"

  const linkClass = (path: string) =>
    `transition ${pathname === path
      ? "text-blue-600 font-semibold"
      : "hover:text-blue-500"
    }`

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 py-4
      ${navState === "transparent" && "bg-transparent"}
      ${navState === "gradient" && "bg-gradient-to-r from-[#d7e8f2] via-[#a9c9e4] to-[#6fa6d8] shadow-lg backdrop-blur-md"}
      ${navState === "white" && "bg-white shadow-md"}
      `}
    >

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-10">

        <div className="text-xl font-semibold text-slate-800">
          SOHBLITZ Mobil
        </div>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex gap-8 text-slate-700">

          <Link href={`/${locale}`} className={linkClass("")}>
            {t.navbar.home}
          </Link>

          <Link href={`/${locale}/about`} className={linkClass("/about")}>
            {t.navbar.about}
          </Link>

          <Link href={`/${locale}/impressum`} className={linkClass("/impressum")}>
            {t.navbar.impressum}
          </Link>

          <Link href={`/${locale}/privacy`} className={linkClass("/privacy")}>
            {t.navbar.privacy}
          </Link>

          <Link href={`/${locale}/agb`} className={linkClass("/agb")}>
            {t.navbar.agb}
          </Link>

          <Link href={`/${locale}/contact`} className={linkClass("/contact")}>
            {t.navbar.contact}
          </Link>

        </nav>

        {/* LANGUES */}
        <div className="hidden md:flex gap-4 items-center text-xl">
          <Link href="/de">🇩🇪</Link>
          <Link href="/en">🇬🇧</Link>
          <Link href="/fr">🇫🇷</Link>
        </div>

        {/* BURGER MOBILE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

      </div>

      {/* MENU MOBILE */}
      {open && (
        <div className="md:hidden bg-white shadow-lg flex flex-col items-center gap-6 py-6 text-lg">

          <Link href={`/${locale}`} onClick={() => setOpen(false)}>
            {t.navbar.home}
          </Link>

          <Link href={`/${locale}/about`} onClick={() => setOpen(false)}>
            {t.navbar.about}
          </Link>

          <Link href={`/${locale}/impressum`} onClick={() => setOpen(false)}>
            {t.navbar.impressum}
          </Link>

          <Link href={`/${locale}/privacy`} onClick={() => setOpen(false)}>
            {t.navbar.privacy}
          </Link>

          <Link href={`/${locale}/contact`} onClick={() => setOpen(false)}>
            {t.navbar.contact}
          </Link>

          <div className="flex gap-4 text-xl">
            <Link href="/de">🇩🇪</Link>
            <Link href="/en">🇬🇧</Link>
            <Link href="/fr">🇫🇷</Link>
          </div>

        </div>
      )}

    </header>
  )
}