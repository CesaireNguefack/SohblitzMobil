"use client"

import {ButtonContact} from "@/componenten/Cards/KontaktButton";
import IconCard from "../../../componenten/Cards/IconCard";
import { useTranslations } from "@/lib/TranslationProvider"
import { FaWhatsapp } from "react-icons/fa";
import { Mail, MapPin } from "lucide-react";

const handleWhatsAppClick = () => {
  window.open("https://wa.me/4917648082448", "_blank");
};

export default function ContactSection() {
    const t = useTranslations()

  return (
    <div
      className="
        relative md:absolute
        left-1/2 md:bottom-0
        -translate-x-1/2 md:translate-y-1/2
        w-[90%] md:w-[65%]
        bg-white/95 backdrop-blur-md
        rounded-2xl shadow-xl
        p-6 md:p-8
        z-50
        mt-10 md:mt-0
      "
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-start text-left md:text-center">
        <IconCard
          icon={<FaWhatsapp className="text-green-500 text-xl" />}
          title="Hotline"
          description={
      <a href="https://wa.me/4917648082448" target="_blank">
        0176 48082448
      </a>
    }
    onClick={handleWhatsAppClick}
        />

        <IconCard
          icon={<Mail />}
          title="Email"
          description="sohblitz.mobil@web.de" 
        />

        <IconCard
          icon={<MapPin />}
          title= {t.contact.iconLocation}
          description={t.contact.addresse}
        />

        <div className="flex justify-center items-center h-full">
          <ButtonContact />
        </div>

      </div>
    </div>
  );
}