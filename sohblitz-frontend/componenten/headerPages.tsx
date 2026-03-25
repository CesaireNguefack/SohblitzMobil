"use client"

import Navbar from "@/componenten/Navbar";
import { useTranslations } from "@/lib/TranslationProvider"

type Props = {
    title: string,
    headerTitle: string,
    subtitle: string,
    image: string
}

function getTranslation(obj: any, path: string) {
    return path.split(".").reduce((acc, part) => acc?.[part], obj) ?? path
}

export default function HeaderPages({ title, headerTitle, subtitle, image }: Props) {
    const t = useTranslations()

    let value = t
    let headerTitle_ = t
    let subtitle_ = t

    for (const key of headerTitle?.split(".") ?? []) {
        headerTitle_ = headerTitle_?.[key]
    }

    for (const key of subtitle?.split(".") ?? []) {
        subtitle_ = subtitle_?.[key]
    }


    for (const key of title?.split(".") ?? []) {
        value = value?.[key]
    }

    return (
        <main>
            <Navbar navState="gradient" />

           <section className="pt-14 bg-gray-50 bg-gradient-to-r from-[#d7e8f2] via-[#a9c9e4] to-[#6fa6d8]">

  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 grid md:grid-cols-2 items-center min-h-[100px] gap-6">

    {/* Image */}
    <div className="flex justify-center">
      <img
        src={`/images/${image}`}
        alt="Doctor"
        className="w-[120px] sm:w-[150px] md:w-[250px]"
      />
    </div>

    {/* Texte */}
    <div className="text-slate-800 space-y-4 md:space-y-5 text-center md:text-left">

      <h5 className="font-bold leading-tight whitespace-pre-line text-[clamp(1.5rem,4vw,2.5rem)]">
        {headerTitle_}
      </h5>

      <div>
        <p className="text-slate-600 text-[clamp(0.9rem,2.5vw,1.125rem)]">
          {subtitle_}
        </p>
      </div>

    </div>

  </div>
</section>

<section className="flex justify-center items-center h-[70px]">
  <h1 className="font-bold text-center text-[clamp(1.5rem,4vw,2.5rem)]">
    {value ?? ""}
  </h1>
</section>
        </main>

    )
}