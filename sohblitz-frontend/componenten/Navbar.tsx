"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useTranslations } from "@/lib/TranslationProvider"

type Props = {
  navState: "transparent" | "gradient" | "white",
  showLogo: boolean
}

export default function Navbar({ navState, showLogo }: Props) {

  const pathname = usePathname()
  const t = useTranslations()
  const [open, setOpen] = useState(false)

  const locale = pathname.split("/")[1] || "de"

  // ✅ FIX ACTIVE LINK (important)
  const isActive = (path: string) => {
    if (path === "") return pathname === `/${locale}`
    return pathname === `/${locale}${path}`
  }

  const linkClass = (path: string) =>
    `transition ${isActive(path)
      ? "text-blue-600 font-semibold"
      : "hover:text-blue-500"
    }`

  // ✅ LANGUAGE SWITCH (stay on same page)
  const getLocalizedPath = (newLocale: string) => {
    const segments = pathname.split("/")

    if (!["de", "en", "fr"].includes(segments[1])) {
      return `/${newLocale}`
    }

    segments[1] = newLocale
    return segments.join("/")
  }

  // ✅ LANGUAGE ACTIVE STYLE
  const langClass = (lang: string) =>
    `transition cursor-pointer ${locale === lang
      ? "scale-125 ring-2   "
      : "opacity-60 hover:opacity-100 text-primary"
    }`

  return (
    <header
      className={`fixed top-0 w-full z-50 h-14 overflow-visible
  ${navState === "transparent" && "bg-transparent"}
  ${navState === "gradient" && "bg-gradient-to-r from-[#d7e8f2] via-[#a9c9e4] to-[#6fa6d8] shadow-lg backdrop-blur-md"}
  ${navState === "white" && "bg-white shadow-md"}
  `}
    >
      <div className="max-w-7xl mx-auto flex items-center h-full px-4 md:px-10">
        <Logo2 show={showLogo} />


        {/* RIGHT BLOCK → tout à droite */}
        <div className="hidden md:flex items-center gap-8 ml-auto">

          {/* NAV */}
          <nav className="flex gap-6 text-slate-700">
            <Link href={`/${locale}`} className={linkClass("")}>
              {t.navbar.home}
            </Link>

            <Link href={`/${locale}/price`} className={linkClass("/price")}>
              {t.navbar.price}
            </Link>

            <Link href={`/${locale}/gallery`} className={linkClass("/gallery")}>
              {t.navbar.gallery}
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

          {/* LANGUAGES */}
          <div className="flex gap-4 items-center text-xl">
            <Link href={getLocalizedPath("de")} className={langClass("de")}>
              🇩🇪
            </Link>
            <Link href={getLocalizedPath("en")} className={langClass("en")}>
              🇬🇧
            </Link>
            <Link href={getLocalizedPath("fr")} className={langClass("fr")}>
              🇫🇷
            </Link>
          </div>

        </div>

        {/* BURGER (mobile) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden ml-auto text-2xl"
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white shadow-lg flex flex-col items-center gap-6 py-6 text-lg">

          <Link href={`/${locale}`} onClick={() => setOpen(false)}>
            {t.navbar.home}
          </Link>

          <Link href={`/${locale}/price`} onClick={() => setOpen(false)}>
              {t.navbar.price}
            </Link>

            <Link href={`/${locale}/gallery`} onClick={() => setOpen(false)}>
              {t.navbar.gallery}
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

          {/* LANG MOBILE */}
          <div className="flex gap-4 text-xl">

            <Link
              href={getLocalizedPath("de")}
              className={langClass("de")}
              onClick={() => setOpen(false)}
            >
              🇩🇪
            </Link>

            <Link
              href={getLocalizedPath("en")}
              className={langClass("en")}
              onClick={() => setOpen(false)}
            >
              🇬🇧
            </Link>
            <Link
              href={getLocalizedPath("fr")}
              className={langClass("fr")}
              onClick={() => setOpen(false)}
            >
              🇫🇷
            </Link>
          </div>

        </div>
      )}

    </header>
  )
}

import Image from "next/image";

export function Logo({ className = "" }) {
  return (
    <div className={className}>
      <Image
        src="/images/logo.png"
        alt="Sohblitz Mobil Logo"
        width={120}
        height={120}
        className="w-[80px] md:w-[120px] h-auto"
        priority
      />
    </div>
  );
}


export function Logo2({ show = true, className = "" }) {
  if (!show) return null;
  return (
    <div className={className}>
      <Image
        src="/images/logo.png"
        alt="Sohblitz Mobil Logo"
        width={120}
        height={120}
        className="w-[60px] md:w-[70px] h-auto"
        priority
      />
    </div>
  );
}