"use client"
import { logout } from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useTranslations } from "@/lib/TranslationProvider"
import { useState } from "react"
import { usePathname } from "next/navigation";

type Props = {
  navState: "transparent" | "gradient" | "white"
}

export default function AdminNavbar({ navState }: Props) {
  const router = useRouter()
  const t = useTranslations()
  const pathname = usePathname()

  const locale = pathname.split("/")[1] || "de"

  const LogOut = async () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    const data = await logout()
    router.push("/")
    router.refresh()
  };

  const linkClass = (path: string) =>
    `transition ${pathname === path
      ? "text-white-600 font-semibold border-b-1 border-blue-100"
      : "hover:text-blue-100"
    }`;

  const getLocalizedPath = (newLocale: string) => {
    const segments = pathname.split("/")

    if (!["de", "en", "fr"].includes(segments[1])) {
      return `/${newLocale}`
    }

    segments[1] = newLocale
    return segments.join("/")
  }

  const langClass = (lang: string) =>
    `transition cursor-pointer ${locale === lang
      ? "scale-125 ring-2   "
      : "opacity-60 hover:opacity-100"
    }`

  const [open, setOpen] = useState(false)

  return (
    <main>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 py-4

      ${navState === "transparent" && "bg-transparent"}

      ${navState === "gradient" && "bg-gradient-to-r from-[#d7f2e1] via-[#a9c9e4] to-[#6fa6d8] shadow-lg backdrop-blur-md"}

      ${navState === "white" && "bg-white shadow-md"}
      `}
      >

        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-10">

          {/* Logo */}
          <div className="text-xl font-semibold text-slate-800">
            <Link href={`/${locale}`} className={linkClass("/")}>
              SOHBLITZ Mobil
            </Link>
          </div>

          <div className="hidden md:flex text-xl font-semibold text-slate-800">
            Admin:  {t.adminNavbar.dashboard}
          </div>

          {/* Menu */}
          <nav className="hidden md:flex gap-8 text-slate-700">

            {/* <Link href={`/${locale}/administration/services`} className={linkClass("/services")}>
              {t.adminNavbar.services}
            </Link> */}

            <Link href={`/${locale}/administration/availability`} className={linkClass("/services")}>
              {t.adminNavbar.availability}
            </Link>

            <Link href={`/${locale}/administration/reservations`} className={linkClass("/reservations")}>
              {t.adminNavbar.reservations}
            </Link>

            <Link href={`/${locale}/administration/contact`} className={linkClass("/contact")}>
              {t.adminNavbar.contact}
            </Link>
          </nav>

          {/* Language Switcher */}
          <div className="hidden md:flex gap-4 items-center text-xl">

            <Link
              href={getLocalizedPath("de")}
              className={langClass("de")}
              aria-current={locale === "de"}
            >
              🇩🇪
            </Link>

            <Link
              href={getLocalizedPath("en")}
              className={langClass("en")}
              aria-current={locale === "en"}
            >
              🇬🇧
            </Link>

            <Link
              href={getLocalizedPath("fr")}
              className={langClass("fr")}
              aria-current={locale === "fr"}
            >
              🇫🇷
            </Link>


            <button
              onClick={() => LogOut()}
              className="hover:scale-110 transition"
              aria-label="English"
            >
              {t.adminNavbar.logout}
            </button>

          </div>
          {/* BURGER */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>

        </div>
        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden bg-white shadow-lg flex flex-col items-center gap-6 py-6 text-lg">

              {/* <Link href={`/${locale}/administration/services`} className={linkClass("/services")}>
              {t.adminNavbar.services}
            </Link> */}

            <Link href={`/${locale}/administration/availability`} className={linkClass("/services")}>
              {t.adminNavbar.availability}
            </Link>

            <Link href={`/${locale}/administration/reservations`} className={linkClass("/reservations")}>
              {t.adminNavbar.reservations}
            </Link>

            <Link href={`/${locale}/administration/contact`} className={linkClass("/contact")}>
              {t.adminNavbar.contact}
            </Link>

            {/* LANG MOBILE */}
            <div className="flex gap-4 text-xl">

              <Link
                href={getLocalizedPath("de")}
                className={langClass("de")}
                aria-current={locale === "de"}
              >
                🇩🇪
              </Link>

              <Link
                href={getLocalizedPath("en")}
                className={langClass("en")}
                aria-current={locale === "en"}
              >
                🇬🇧
              </Link>

              <Link
                href={getLocalizedPath("fr")}
                className={langClass("fr")}
                aria-current={locale === "fr"}
              >
                🇫🇷
              </Link>
              <button
                onClick={() => LogOut()}
                className="hover:scale-110 transition"
                aria-label="English"
              >
                {t.adminNavbar.logout}
              </button>

            </div>

          </div>
        )}

      </header>
    </main>
  )
}