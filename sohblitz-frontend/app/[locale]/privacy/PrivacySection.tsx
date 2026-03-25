"use client"

import { useTranslations } from "@/lib/TranslationProvider"
import { motion } from "framer-motion"

export default function PrivacySection() {

  const t = useTranslations()
  const data = t?.privacyPage

  const fadeUp = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className="bg-gray-50 py-10">

      <div className="max-w-5xl mx-auto px-6">

        
          <p className="mt-6 text-lg text-gray-600 text-center max-w-3xl mx-auto">
            {data?.intro}
          </p>

        <div className="space-y-12 py-20">

          {data?.sections?.map((section:any, index:number)=>(
            
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-8"
            >

               <h2 className="font-semibold text-slate-800 mb-5 text-[clamp(1.1rem,2.5vw,1.5rem)]">
              {section.title}
            </h2>

              <div className="space-y-3 text-gray-600">

                {section.content.map((text:string,i:number)=>(
                  <p key={i}>{text}</p>
                ))}

              </div>

            </motion.div>

          ))}

        </div>

        <p className="text-center text-gray-400 text-sm mt-16">
          {data?.lastUpdate}
        </p>

      </div>

    </section>
  )
}