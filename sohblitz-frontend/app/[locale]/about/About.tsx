"use client"

import { useTranslations } from "@/lib/TranslationProvider"

export default function AboutSection() {

  const t = useTranslations()
  const data = t?.aboutSection

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Image */}

        <div className="flex justify-center">
          <img
            src="/images/about0.png"
            alt="Cleaning team"
            className="rounded-xl shadow-lg w-[350px] md:w-[450px]"
          />
        </div>

        {/* Texte */}
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-slate-800">
            {data?.title}
          </h2>

          <p className="text-lg text-blue-400 font-semibold">
            {data?.subtitle}
          </p>

          <p className="text-gray-600 leading-relaxed">
            {data?.text1}
          </p>

          <p className="text-gray-600 leading-relaxed">
            {data?.text2}
          </p>

          <p className="text-gray-600 leading-relaxed">
            {data?.text3}
          </p>
        </div>
      </div>

    </section>
  )
}