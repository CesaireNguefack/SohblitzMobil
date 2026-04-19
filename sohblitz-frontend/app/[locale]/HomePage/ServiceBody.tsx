"use client";

import { usePathname } from "next/navigation"
import Link from "next/link";
import { Service, API_URL } from "@/services/dienstApi";
import { useTranslations } from "@/lib/TranslationProvider"


// fonction slug
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");


export default function ServiceBody({ services }: { services: Service[] }) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "de";
  const t = useTranslations()

  return (
    <section
      className="relative py-14 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/price-background.png')" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-6 text-white">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {t.service.title}
          </h1>
         
        </div>
        <br />

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
                        src={service.cover
                          ? `${API_URL}/${service.cover}`
                          : "/images/appointment0.png"}
                        alt={service.title}
                        className="w-full h-52 object-cover transition duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* text */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-white transition">
                        {service.title}
                      </h3>
                       <p className="space-y-2 text-gray-700 text-sm group-hover:text-white/90 transition line-clamp-1">
                        {service.description1}
                      </p>
                       <p className="space-y-2 text-gray-700 text-sm group-hover:text-white/90 transition line-clamp-2">
                        {service.description}
                      </p>
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
          <p> <b>{t.service.footer0}</b> {t.service.footer}</p>
        </div>
      </section>
    </section>
  );
}