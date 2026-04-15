"use client"

import { useTranslations } from "@/lib/TranslationProvider";
import Link from "next/link";
import { usePathname } from "next/navigation"

export default function Footer() {
  const t = useTranslations()
  const pathname = usePathname()
  const locale = pathname.split("/")[1] || "de"

  return (
    <footer
      className="text-gray-800 mt-0"
      style={{
        background:
          "linear-gradient(135deg, #d7e8f2 0%, #a9c9e4 50%, #6fa6d8 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold mb-4">Sohblit-Mobli</h2>
            <p className="text-sm leading-relaxed">
              {t.footer.title}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">{t.footer.navigation}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}`} className="hover:underline">
                  {t.navbar.home}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="hover:underline">
                  {t.navbar.about}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/impressum`} className="hover:underline">
                  {t.navbar.impressum}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="hover:underline">
                  {t.navbar.privacy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/agb`} className="hover:underline">
                  {t.navbar.agb}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:underline">
                  {t.navbar.contact}
                </Link>
              </li>

            </ul>
          </div>



          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">{t.navbar.contact}</h3>
            <ul className="space-y-2 text-sm">
              <li>📍 {t.contact.addresse}</li>
              <li>📞 +49 176 48082448</li>
              <li>✉️ sohblitz.mobil@web.de</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/40 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© {new Date().getFullYear()} "YourBrand:" {t.footer.sublime}<Link href="https://sublimeprod.com" target="_blank"    rel="noopener noreferrer" >Sublimeprod</Link> </p>
 
        </div>
      </div>
    </footer>
  );
}
