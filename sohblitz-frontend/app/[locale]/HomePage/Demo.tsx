
import { useTranslations } from "@/lib/TranslationProvider"
import {ButtonContact} from "@/componenten/Cards/KontaktButton";

export default function Demo() {
     const t = useTranslations()
    return (
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">

            {/* Video background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/videos/cleaning.mp4" type="video/mp4" />
            </video>

            {/* Overlay sombre pour lisibilité */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 text-center text-white max-w-3xl px-6">

                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                   {t.demosection.title}
                </h2>

                <p className="text-lg md:text-xl mb-8">
                    {t.demosection.subtitle}
                </p>
                 <ButtonContact />  
            </div>

        </section>
    )
}