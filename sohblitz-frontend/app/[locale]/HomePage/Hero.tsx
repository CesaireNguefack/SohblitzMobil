import ContactSection from "@/app/[locale]/HomePage/Contact"
import Image from "next/image"
import {Logo} from "@/componenten/Navbar"
import { useTranslations } from "@/lib/TranslationProvider"

export default function Hero() {
   const t = useTranslations()

  return (
    <section
      className="relative pt-1 md:pt-10 pb-20 md:pb-32 z-10"
      style={{
        background:
          "linear-gradient(135deg, #d7e8f2 0%, #a9c9e4 50%, #6fa6d8 100%)",
      }}
    >
      {/* decorative circles */}
      <svg
        className="absolute right-0 top-0 h-full opacity-30"
        viewBox="0 0 800 800"
        fill="none"
      >
        <circle cx="650" cy="200" r="250" stroke="white" strokeWidth="2" />
        <circle cx="650" cy="200" r="350" stroke="white" strokeWidth="1" />
        <circle cx="650" cy="200" r="450" stroke="white" strokeWidth="1" />
      </svg>

      {/* CONTAINER */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-10">
        
        {/* ✅ LOGO aligné avec le contenu */}
        <div className="mb-8">
          <Logo />
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 items-center">
          
          {/* LEFT */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-primary">
              {t.hero.title}
            </h1>

            <p className="mt-6 text-gray-600 max-w-md">
               {t.hero.subtitle}
               </p>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center md:justify-end mt-10 md:mt-0 gap-4">
            <Image
              src="/images/hero1.png"
              alt="Cleaning"
              width={250}
              height={250}
              className="w-[150px] sm:w-[200px] md:w-[300px]"
            />

            <Image
              src="/images/heroo.png"
              alt="Cleaning"
              width={250}
              height={250}
              className="w-[150px] sm:w-[200px] md:w-[300px]"
            />
          </div>

        </div>
      </div>

      {/* CONTACT BAR */}
      <ContactSection />
    </section>
  );
}