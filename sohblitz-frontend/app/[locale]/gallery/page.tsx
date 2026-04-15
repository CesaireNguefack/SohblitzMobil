"use client";

import { useEffect, useMemo, useState } from "react";
import HeaderPages from "@/componenten/headerPages";
import { API_URL, Service, getServices } from "@/services/dienstApi";
import { getCurentLanguage, Lang } from "@/languages/getcurentlanguage";

const defaultImage = "/service_data/images/personel.jpeg";

export default function Page() {
  const [services, setServices] = useState<Service[]>([]);
  const lang = getCurentLanguage();

  useEffect(() => {
    async function loadServices() {
      const data = await getServices(lang as Lang);
      setServices(data);
    }
    loadServices();
  }, [lang]);

  const getFullUrl = (path: string) => {
    if (!path) return defaultImage;
    if (path.startsWith("http")) return path;
    return `${API_URL}${path}`;
  };

  // 🔥 Extraire + random toutes les images
  const allImages = useMemo(() => {
    const images = services.flatMap((service) =>
      service.images && service.images.length > 0
        ? service.images
        : [defaultImage]
    );

    // shuffle (random)
    return images.sort(() => Math.random() - 0.5);
  }, [services]);

  return (
    <main className="bg-white min-h-screen">
      <HeaderPages
        title="navbar.gallery"
        headerTitle="contactPageHeaderInfos.title"
        subtitle="contactPageHeaderInfos.subtitle"
        image="appointment1.png"
      />

      {/* 🔥 Section images */}
      <section className=" bg-gray-50 px-6 md:px-16 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">

          {allImages.map((img, index) => {
            const isLarge = index % 5 === 0; // effet chic (random big tiles)

            return (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl group cursor-pointer
                ${isLarge ? "row-span-2" : ""}`}
              >
                <img
                  src={getFullUrl(img)}
                  alt="service"
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />

                {/* overlay effet premium */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition" />
              </div>
            );
          })}

        </div>
      </section>
    </main>
  );
}