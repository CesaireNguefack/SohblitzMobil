"use client"

import { useTranslations } from "@/lib/TranslationProvider"
import { motion } from "framer-motion"
 
  export default function ImpressumSection() {

  const t = useTranslations()
  const data = t?.impressumPage

  const fadeUp = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className="bg-gray-50 py-20">

      <div className="max-w-5xl mx-auto px-6">

        <div className="space-y-12">

          {data?.sections?.map((section:any, index:number)=>(
            
            <motion.div
              key={index}
              variants={fadeUp}
              
              // 👇 les 2 premiers visibles direct
              initial={index < 2 ? "visible" : "hidden"}
              whileInView="visible"
              
              viewport={{ once: true, margin: "-80px" }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: index * 0.1
              }}
              
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

      </div>

    </section>
  )
}