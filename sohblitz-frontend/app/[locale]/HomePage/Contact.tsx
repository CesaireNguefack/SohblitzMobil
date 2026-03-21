import ButtonContact from "@/componenten/Cards/KontaktButton";
import IconCard from "../../../componenten/Cards/IconCard";
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"


export default function ContactSection() {
    const pathname = usePathname()

   const locale = pathname.split("/")[1] || "de"
    const router = useRouter()

  return (
    <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-[65%] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-8 z-50">


      <div className="grid md:grid-cols-4 gap-6 items-center text-center">

        <IconCard
          icon="📞"
          title="Hotline"
          description="0176 48082448"
          onClick={() => console.log("Hotline")}
        />

        <IconCard
          icon="📧"
          title="Email"
          description="sohblitz.mobil@web.de"
          onClick={() => console.log("Disponibilité")}
        />

        <IconCard
          icon="📍"
          title="User Standort"
          description="Heinrich-Büssing-Ring 22, 38102 Braunschweig"
          onClick={() => console.log("Localisation")}
        />

        <div>
          <ButtonContact />
        </div>

      </div>

    </div>
  )
}