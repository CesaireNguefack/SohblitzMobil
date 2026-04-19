"use client";

import { usePathname } from "next/navigation"
import Link from "next/link";
import { Service, getServices } from "@/services/dienstApi";
import { useTranslations } from "@/lib/TranslationProvider"
import HeaderPages from "@/componenten/headerPages";
import { getCurentLanguage, Lang } from "@/languages/getcurentlanguage";  
import { useEffect, useState } from "react"

// fonction slug
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");


export default   function Page(){

 const [services, setServices] = useState<Service[]>([])
 const lang =getCurentLanguage()  

useEffect(() => {
  async function loadServices() {
    const data = (await getServices(lang as Lang)).filter(
        (service) => service.id !== 0
      );
    setServices(data)
  }

  loadServices()
}, [])
  return <main className="bg-white">
      <HeaderPages title={""} headerTitle="contactPageHeaderInfos.title" subtitle ="contactPageHeaderInfos.subtitle" image="appointment1.png"/>
       <ServiceBody services={services} />
    </main>; 
  
 
}


export   function ServiceBody({ services }: { services: Service[] }) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "de";
  const t = useTranslations()

  return (
    <section
      className="relative bg-cover bg-center"
      style={{ backgroundImage: "url('/images/price-background.png')" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-6 text-white">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {t.service.title2}
          </h1>
          <p className="text-[var(--foreground)] font-semibold mb-6">
            (netto, zzgl. MwSt.)
          </p>
        </div>

        <div className="mt-6 text-center mb-16 text-black max-w-3xl mx-auto text-sm opacity-90">
          <label> {t.service.subtitle1} <b> {t.service.subtitle2}</b>. {t.service.besichtigungstermin}.  {t.service.subtitle22} <b>{t.service.subtitle3}</b> {t.service.subtitle4} <b>{t.service.subtitle5}</b> {t.service.subtitle6}
          </label></div>

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