"use client";

import { useRouter, usePathname } from "next/navigation"
import Link from "next/link";

const services = [
  {
    id: 1,
    title: "Gebäudereinigung",
    description:
      "100% chemiefreie Gebäudereinigung mit Dampftechnologie. Ideal für Haushalte, AirBnB und Ferienwohnungen.",
    pricing: ["25€ – 35€ pro Stunde"],
    tags: ["Dampfreinigung", "Allergikerfreundlich", "Hygienisch"]
  },
  {
    id: 2,
    title: "Büro und Praxisreinigung",
    description:
      "Professionelle Reinigung für Büros und Praxen für ein gesundes Arbeitsklima. Desinfektion ohne Chemie.",
    pricing: ["30€ – 40€ pro Stunde"],
    tags: ["Desinfektion", "Arbeitsplatzhygiene"]
  },
  {
    id: 3,
    title: "Bauendreinigung",
    description:
      "Gründliche Reinigung nach Bau oder Renovierung. Entfernt Baustaub, Fett und Verschmutzungen.",
    pricing: [
      "Grobreinigung: 4€ – 9€ / m²",
      "Feinreinigung: 5€ – 9.50€ / m²",
      "Sanitär, Geräte und Möbel werden extra berechnet"
    ],
    tags: ["Neubau", "Renovierung"]
  },
  {
    id: 4,
    title: "Fenster und Glasreinigung",
    description:
      "Streifenfreie Glas- und Fensterreinigung für private Haushalte, Büros und Geschäfte.",
    pricing: [
      "4€ – 8€ / m² (innen & außen)",
      "Rahmen: +1.45€ pro Fenster",
      "Verschmutzungsgrad / Höhe: +20% – 50%"
    ],
    tags: ["Streifenfrei", "Professionell"]
  },
  {
    id: 5,
    title: "Autoinnenreinigung",
    description:
      "Dampfreinigung des Fahrzeuginnenraums ohne Chemie. Entfernt Gerüche, Keime und Schmutz.",
    pricing: [
      "Basisreinigung: 40€ – 130€",
      "Intensivreinigung: 130€ – 250€",
      "Ozon Reinigung inklusive",
      "Geruchsbeseitigung: 50€ – 80€"
    ],
    tags: ["Auto", "Desinfektion"]
  },
  {
    id: 6,
    title: "Polster Reinigung",
    description:
      "Tiefenreinigung von Sofas und Polstern. Entfernt Milben, Flecken und Bakterien.",
    pricing: [
      "Sofa: 20€ – 40€ pro Sitz",
      "Sessel: 25€ – 40€",
      "Bürostuhl: 9€ – 20€"
    ],
    tags: ["Milbenentfernung", "Tiefenreinigung"]
  },
  {
    id: 7,
    title: "Teppichreinigung",
    description:
      "Dampfreinigung von Teppichen für hygienische Sauberkeit und frische Stoffe.",
    pricing: ["6€ – 9€ pro m²"],
    tags: ["Allergikerfreundlich"]
  },
  {
    id: 8,
    title: "Raffstore & Jalousie Reinigung",
    description:
      "Reinigung von Jalousien und Raffstores mit schonender Dampftechnologie.",
    pricing: [
      "20€ – 55€ pro Stück",
      "Je nach Verschmutzung & Höhe: +10% – 45%"
    ],
    tags: ["Sonnenschutz"]
  },

  // 🆕 NOUVEAU SERVICE
  {
    id: 9,
    title: "Stein-, Fassaden- und Dachreinigung",
    description:
      "Entfernung von Moos, Algen und Verschmutzungen auf Terrassen, Fassaden und Dächern mit Hochdruck-Dampf.",
    pricing: [
      "Steinreinigung: 6€ – 16€ / m²",
      "Mit Imprägnierung: 8€ – 12€ / m²",
      "Dachreinigung: 8€ – 30€ / m²"
    ],
    tags: ["Terrasse", "Fassade", "Dach", "Moosentfernung"]
  }
];

// fonction slug
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");


export default function Prices() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "de";

  return (
    <section
      className="relative py-24 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/price-background.png')" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-6 text-white">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Unsere Preise
          </h2>
          <p className="text-[#6f95b2] font-semibold mb-6">
            (netto, zzgl. MwSt.)
          </p>
        </div>

        <div className="mt-6 text-center mb-16 text-primary max-w-3xl mx-auto text-sm opacity-90">
          Fahrtkosten innerhalb Braunschweig: <b>0,35€ / km </b>
          außerhalb Braunschweig: <b>0,65€ / km</b>.
          Mindestbestellwert: <b>50€</b>.
          Rabatte bei Dauerverträgen verfügbar.
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service) => {
            const slug = `${service.id}-${slugify(service.title)}`;
            return (
              <Link
                key={service.id}
                href={`/${locale}/service/${slug}`}
                className="block"
              >
                <div className="group relative bg-white/90 backdrop-blur rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">

                  {/* Gradient hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8fb0c8] to-[#6f95b2] opacity-0 group-hover:opacity-100 transition duration-500"></div>

                  {/* Content */}
                  <div className="relative z-10">

                    {/* image */}
                    <div className="overflow-hidden">
                      <img
                        src="/images/appointment0.png"
                        alt={service.title}
                        className="w-full h-52 object-cover transition duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* text */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-white transition">
                        {service.title}
                      </h3>

                      <ul className="space-y-2 text-gray-700 text-sm group-hover:text-white/90 transition">
                        {service.pricing.map((item, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-primary group-hover:text-white">✔</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {service.tags?.map((tag, i) => (
                        <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>
              </Link>
            );
          })}

        </div>
      </div>
      <section>
        <div className="mt-16 text-center text-sm text-gray-600 max-w-3xl mx-auto space-y-2">
          <p><b>Sohblitz-Mobil:</b> 100% chemiefrei & hygienisch</p>
          <p>Preise variieren je nach Fläche, Verschmutzung und Zugänglichkeit.</p>
          <p>Zusatzleistungen wie Imprägnierung oder Fugenreinigung möglich.</p>
        </div>
      </section>
    </section>
  );
}