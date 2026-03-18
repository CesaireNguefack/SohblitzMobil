"use client"
import { logout } from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/navigation"

import { usePathname } from "next/navigation";

type Props = {
  navState: "transparent" | "gradient" | "white"
}


const changeLanguage = (lang: String) => {
  console.log("Change language to:", lang);
};

export default function AdminNavbar({ navState }: Props) {
      const router = useRouter()
const LogOut = async() => {
     document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
   const data = await logout()
    router.push("/")
    router.refresh()
};


  const pathname = usePathname();
  const linkClass = (path: string) =>
    `transition ${pathname === path
      ? "text-white-600 font-semibold border-b-1 border-blue-100"
      : "hover:text-blue-100"
    }`;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 py-4

      ${navState === "transparent" && "bg-transparent"}

      ${navState === "gradient" && "bg-gradient-to-r from-[#d7f2e1] via-[#a9c9e4] to-[#6fa6d8] shadow-lg backdrop-blur-md"}

      ${navState === "white" && "bg-white shadow-md"}
      `}
    >

      <div className="max-w-7xl mx-auto flex items-center justify-between px-10">

        {/* Logo */}
        <div className="text-xl font-semibold text-slate-800">
          <Link href="/" className={linkClass("/")}>
            SOHBLITZ Mobil 
          </Link>
        </div>
        
        <div className="text-xl font-semibold text-slate-800">
          Admin: Dashboad  
        </div>

        {/* Menu */}
        <nav className="hidden md:flex gap-8 text-slate-700">
         
          <Link href="/admin/dienste" className={linkClass("/services")}>
            Dienste
          </Link>

          <Link href="/admin/buchungen" className={linkClass("/impressum")}>
            Buchungen
          </Link>

          <Link href="/admin/kontakten" className={linkClass("/contact")}>
            Kontakten
          </Link>
        </nav>

        {/* Language Switcher */}
        <div className="flex gap-4 items-center text-xl">

          <button
            onClick={() => changeLanguage("de")}
            className="hover:scale-110 transition"
            aria-label="Deutsch"
          >
            🇩🇪
          </button>

          <button
            onClick={() => changeLanguage("en")}
            className="hover:scale-110 transition"
            aria-label="English"
          >
            🇬🇧
          </button>

          <button
            onClick={() => LogOut()}
            className="hover:scale-110 transition"
            aria-label="English"
          >
            Log out
          </button>

        </div>

      </div>

    </header>
  )
}