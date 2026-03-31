import ContactSection from "@/app/[locale]/HomePage/Contact"
import Image from "next/image"


export default function Hero() {
  return (
    <section
      className="relative   pt-32 md:pt-40 pb-20 md:pb-32 z-10"
      style={{
        background: "linear-gradient(135deg, #d7e8f2 0%, #a9c9e4 50%, #6fa6d8 100%)"
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


      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 items-center px-4 md:px-10">

        {/* LEFT */}
        {/* LEFT  
        <div>
        <h1 className="text-primary text-6xl font-bold leading-tight">
          Professionelle Reinigung <br />
          für Ihren Alltag
        </h1>

        <p className="mt-6 text-gray-600 max-w-md">
          Wir bieten effiziente und professionelle Reinigungsdienstleistungen 
          für Privatpersonen und Unternehmen.
        </p>

        <div className="flex items-center gap-3 mt-8 text-blue-700 cursor-pointer">
          ▶ Entdecken Sie unsere Dienstleistungen
        </div>

      </div>
      */}
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight text-primary">
            Sauberkeit,<br />
            auf die Sie sich verlassen können
          </h1>

          <p className="mt-6 text-gray-600 max-w-md">
            Sohblitz-Mobil bietet schnelle, zuverlässige und gründliche Reinigungsdienste direkt vor Ort in Braunschweig und Umgebung
          </p>
        </div>


        {/* RIGHT IMAGE */}
        <div className="flex justify-center md:justify-end mt-10 md:mt-0">

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


      {/* CONTACT BAR */}
      <ContactSection />

    </section>
  )
}