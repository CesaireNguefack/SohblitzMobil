import Image from "next/image";
import SplitSection from "@/componenten/SplitSection";
import { useTranslations } from "@/lib/TranslationProvider"

export default function AboutSection() {
  const t = useTranslations()
  return (
    <main>



      <SplitSection
        left={
          <div className="relative flex justify-center md:justify-start md:mt-10">

            <div className="relative w-full max-w-[520px]">

              {/* Image principale */}
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/about0.png"
                  alt="doctor consultation"
                  width={420}
                  height={420}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Badge */}
              <div className="
      absolute 
      top-2 right-2
      md:-top-6 md:-right-6
      bg-white shadow-md rounded-full 
      flex items-center justify-center text-center
      text-[10px] md:text-xs text-gray-500
      
      w-14 h-14 
      md:w-20 md:h-20
      p-2
    ">
                {t.about.quality}
              </div>

              {/* Image collègues */}
              <div className="
      absolute 
      bottom-2 right-2
      md:-bottom-10 md:-right-6
      bg-white rounded-2xl shadow-lg overflow-hidden
      w-[120px] 
      md:w-[180px]
    ">
                <Image
                  src="/images/about1.png"
                  alt="doctor"
                  width={180}
                  height={180}
                  className="w-full h-auto object-cover"
                />
              </div>

            </div>
          </div>
        }
        right={
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6 ">
              {t.about.title}
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {t.about.description}
            </p>

            <h3 className="text-xl md:text-2xl font-semibold mb-4">
              {t.about.subtitle}
            </h3>
            <p className="mt-6 text-gray-600">
              {t.about.subdescription}
            </p>
          </div>
        }
      />
    </main>
  );
}