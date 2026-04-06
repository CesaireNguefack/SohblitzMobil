"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import Navbar from "@/componenten/Navbar";
import Image from "next/image";
import { ButtonReservation } from "@/componenten/Cards/KontaktButton";
import { useState, useEffect } from "react";
import SplitSection from "@/componenten/SplitSection";

import { Lang, getCurentLanguage } from "@/languages/getcurentlanguage";
import { getServiceById, Service, API_URL } from "@/services/dienstApi";


export default function ServiceDetail() {
  const params = useParams()

  const slug = params.slug as string
  const lang = getCurentLanguage()

  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadService() {
      const id = parseInt(slug.split("-")[0])

      const data = await getServiceById(id, lang as Lang)
      setService(data)
      setLoading(false)
    }

    loadService()
  }, [slug, lang])

  // ⏳ Loading state
  if (loading) {

    return (
      <main>
        <Navbar navState="gradient" showLogo={true} />
        <br />
        <div className="p-20 text-center">Loading ...</div>
      </main>
    )
  }

  // ❌ Not found
  if (!service) {

    return (
      <main>
        <Navbar navState="gradient" showLogo={true} />
        <br />
        <div className="p-20 text-center">Service not found</div>
      </main>
    )
  }

  // ✅ Render
  return (
    <main>
      <Navbar navState="gradient" showLogo={true} />
      <br />
      <SplitSection
        reverse
        left={<ServiceCarousel service={service} />}
        right={<ServiceDescription service={service} />}
      />
    </main>
  )
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");


export function ServiceDescription({ service }: { service: Service }) {
  const slug = `${service.id}-${slugify(service.title)}`;
  const pathname = usePathname()
  const locale = pathname.split("/")[1] || "de"
  const router = useRouter()
  return (
    <div className="w-full max-w-xl mx-auto md:mx-0">

      {/* TITLE */}
      <h1 className="
        text-2xl sm:text-3xl md:text-4xl lg:text-5xl
        font-bold text-primary
        mb-4 md:mb-6
        leading-tight
      ">
        {service.title}
      </h1>

      {/* DESCRIPTION */}
      <p className="
        text-sm sm:text-base md:text-lg
        text-gray-600
        mb-6 md:mb-8
        leading-relaxed
      ">
        {service.description1} <br />
        {service.description}
      </p>

      {/* TAGS */}
      {service.tags && (
        <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
          {service.tags.map((tag, i) => (
            <span
              key={i}
              className="
                bg-primary/10 text-primary
                text-xs sm:text-sm
                px-3 py-1
                rounded-full
                whitespace-nowrap
              "
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* PRICING */}
      <div className="
        bg-white
        rounded-2xl
        shadow-md md:shadow-lg
        p-4 sm:p-5 md:p-6
        mb-6 md:mb-8
      ">
        <h3 className="
          text-lg sm:text-xl md:text-2xl
          font-semibold
          mb-3 md:mb-4
          text-gray-800
        ">
          Preise
        </h3>

        <ul className="space-y-2 md:space-y-3 text-gray-600">
          {service.pricing.map((item, i) => (
            <li key={i} className="flex gap-2 items-start">
              <span className="text-primary mt-1 text-sm md:text-base">✔</span>

              <span className="
                text-sm sm:text-base
                break-words
              ">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="
        flex flex-col sm:flex-row
        gap-3 sm:gap-4
      ">
        <ButtonReservation onClick={() => router.push(`/${locale}/reservation/${slug}`)} />
      </div>

      {/* EXTRA INFO */}
      <p className="
        mt-6 md:mt-8
        text-xs sm:text-sm
        text-gray-500
        leading-relaxed
      ">
        Wir sind in Braunschweig und Umgebung verfügbar – schnell, zuverlässig und 100% chemiefrei.
      </p>

    </div>
  )
}


const defaultImage = "/service_data/images/personel.jpeg";

export function ServiceCarousel({ service }: { service: Service }) {

  const images = service.images && service.images.length > 0
    ? service.images
    : [defaultImage]

  const [current, setCurrent] = useState(0)

  // 🔁 Auto slide
  useEffect(() => {
    if (images.length <= 1) return

    const interval = setInterval(() => {
      setCurrent(prev => (prev === images.length - 1 ? 0 : prev + 1))
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length])

  // 🔒 Sécurité index
  const currentImage = images[current] || images[0]

  const getFullUrl = (path: string) => {
    // if (path.startsWith("http") || path.startsWith("/images")) return path
    return `${API_URL}${path}`
  }


  return (
    <div className="relative flex flex-col items-center md:items-start">

      {/* MAIN IMAGE */}
      <div className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden shadow-2xl">
        <Image
          src={getFullUrl(currentImage)}
          alt={service.title}
          fill

          className="object-cover"
        />

        {/* BUTTONS */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrent(current === 0 ? images.length - 1 : current - 1)
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
            >
              ‹
            </button>

            <button
              onClick={() =>
                setCurrent(current === images.length - 1 ? 0 : current + 1)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* THUMBNAILS */}
      <div className="mt-4 flex gap-3 flex-wrap justify-center">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-14 h-14 rounded-lg overflow-hidden cursor-pointer border-2 ${current === i ? "border-primary" : "border-transparent"
              }`}
          >
            <Image
              src={getFullUrl(img)}
              alt="thumb"
              width={56}
              height={56}

              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* DOTS */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer ${current === i ? "bg-primary" : "bg-gray-300"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}