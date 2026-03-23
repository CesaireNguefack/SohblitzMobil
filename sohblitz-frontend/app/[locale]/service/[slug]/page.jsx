"use client";

import { useParams } from "next/navigation";
import HeaderPages from "@/componenten/headerPages";
import Image from "next/image";
import ButtonReservation from "@/componenten/Cards/KontaktButton";
import { useState,useEffect } from "react";



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

export default function ServiceDetail() {
    const { slug } = useParams();

    const id = slug.split("-")[0];
    const service = services.find((s) => s.id === parseInt(id));

    if (!service) {
        return <div className="p-20 text-center">Service not found</div>;
    }

    
    return (
        <main>
            <HeaderPages
                  title="privacyPage.title"
                  headerTitle="datenschutzPageHeaderInfos.title"
                  subtitle="datenschutzPageHeaderInfos.subtitle"
                   image="privacy.png"
                />

            <section className="pt-22 pb-14 bg-[#f7f8fb] min-h-screen">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

                    {/* 🖼️ LEFT IMAGE */}
                    <ServiceCarousel service={service} />

                    {/* 📝 RIGHT CONTENT */}
                    <div>

                        {/* Title */}
                        <h1 className="text-4xl font-bold text-primary mb-6">
                            {service.title}
                        </h1>

                        {/* Description */}
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            {service.description || "Professionelle Reinigung mit modernen und nachhaltigen Methoden."}
                        </p>

                        {/* Tags */}
                        {service.tags && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {service.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Pricing */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                Preise
                            </h3>

                            <ul className="space-y-3 text-gray-600">
                                {service.pricing.map((item, i) => (
                                    <li key={i} className="flex gap-2 items-start">
                                        <span className="text-primary mt-1">✔</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* CTA */}
                        <div className="flex gap-4">
                            <ButtonReservation />


                            <button className="border border-primary text-primary px-6 py-3 rounded-xl hover:bg-primary hover:text-white transition">
                                Kontakt
                            </button>

                        </div>

                        {/* Extra info */}
                        <p className="mt-8 text-sm text-gray-500">
                            Wir sind in Braunschweig und Umgebung verfügbar – schnell, zuverlässig und 100% chemiefrei.
                        </p>

                    </div>
                </div>
            </section>
        </main>
    );
}

const images = [
  "/images/appointment0.png",
  "/images/price-background.png",
  "/images/doctor-main1.jpg"
];

export  function ServiceCarousel({ service }) {
  const images = service.images || [
    "/images/appointment0.png",
    "/images/price-background.png",
    "/images/doctor-main1.jpg"
  ];

  const [current, setCurrent] = useState(0);

  // 🔥 AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000); // 3 secondes

    return () => clearInterval(interval);
  }, [images.length]);

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative flex justify-center md:justify-start">

      {/* MAIN IMAGE */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl w-[420px] h-[420px]">

        <Image
          src={images[current]}
          alt={service.title}
          fill
          className="object-cover transition duration-700"
        />

        {/* LEFT BUTTON */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:bg-white transition"
        >
          ‹
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:bg-white transition"
        >
          ›
        </button>
      </div>

      {/* BADGE */}
      <div className="absolute -top-6 left-[300px] bg-white shadow-lg rounded-full w-20 h-20 flex items-center justify-center text-xs text-gray-500">
        Premium
      </div>

      {/* THUMBNAILS */}
      <div className="absolute -bottom-16 flex gap-3">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 ${
              current === i ? "border-primary" : "border-transparent"
            }`}
          >
            <Image
              src={img}
              alt="thumb"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* DOTS */}
      <div className="absolute -bottom-28 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer ${
              current === i ? "bg-primary" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}