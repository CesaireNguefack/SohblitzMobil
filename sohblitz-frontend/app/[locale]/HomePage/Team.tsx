import {ButtonContact} from "@/componenten/Cards/KontaktButton";
import { useTranslations } from "@/lib/TranslationProvider"

export default function TeamHome(){
        const t = useTranslations()
    return (
        <section
                className="relative bg-fixed bg-center bg-cover py-40 text-white"
                style={{ backgroundImage: "url('/images/p1.jpeg')" }}
            >
                <div className="max-w-6xl mx-auto px-6 text-center">

                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        {t.teamsection.title}
                    </h2>

                    <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
                       {t.teamsection.description}
                     </p>
                     
                    <ButtonContact />   

                </div>
            </section>
    )
}