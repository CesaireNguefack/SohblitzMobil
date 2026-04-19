"use client";

import { useEffect, useMemo, useState } from "react";
import HeaderPages from "@/componenten/headerPages";
import { API_URL, Service, getServices } from "@/services/dienstApi";
import { getCurentLanguage, Lang } from "@/languages/getcurentlanguage";

// 👇 IMPORTANT
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const defaultImage = "/service_data/images/personel.jpeg";

export default function Page() {
  const [services, setServices] = useState<Service[]>([]);
  const lang = getCurentLanguage();

  useEffect(() => {
    async function loadServices() {
      const data = (await getServices(lang as Lang)).filter(
        (service) => service.id !== 0
      );
      setServices(data);
    }
    loadServices();
  }, [lang]);

  const getFullUrl = (path: string) => {
    if (!path) return defaultImage;
    if (path.startsWith("http")) return path;
    return `${API_URL}${path}`;
  };

  const allImages = useMemo(() => {
  return services.flatMap((service) => {
    const imgs =
      service.images && service.images.length > 0
        ? service.images
        : [defaultImage];

    return imgs.filter((img) => {
      return !img.includes("cov");
    });
  });
}, [services]);

  return (
    <main className="bg-white min-h-screen">
      <HeaderPages
        title="navbar.gallery"
        headerTitle="contactPageHeaderInfos.title"
        subtitle="contactPageHeaderInfos.subtitle"
        image="appointment1.png"
      />

      {/* 🔥 PHOTO PROVIDER */}
      <PhotoProvider>
        <section className="bg-gray-50 px-6 md:px-16 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">

            {allImages.map((img, index) => {
              const isLarge = index % 5 === 0;

              return (
                <PhotoView key={index} src={getFullUrl(img)}>
                  <div
                    className={`relative overflow-hidden rounded-2xl group cursor-pointer
                    ${isLarge ? "row-span-2" : ""}`}
                  >
                    <img
                      src={getFullUrl(img)}
                      alt="service"
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition" />
                  </div>
                </PhotoView>
              );
            })}

          </div>
        </section>
      </PhotoProvider>
    </main>
  );
}