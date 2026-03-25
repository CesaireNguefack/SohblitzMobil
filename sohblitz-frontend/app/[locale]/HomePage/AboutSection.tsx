import ButtonContact from "@/componenten/Cards/KontaktButton";
import Image from "next/image";
import SplitSection from "@/componenten/SplitSection";

const services = [
  "Gebäudereinigung – Regelmäßige Unterhalts- oder Grundreinigung für Häuser und Wohnungen.",
  "Polsterreinigung – Saubere Sofas, Sessel und Matratzen, hygienisch und schonend.",
  "Autoinnenreinigung – Frischer Innenraum für dein Fahrzeug.",
  "Teppichreinigung – Tiefenreinigung mit mobiler Technik.",
  "Bauendreinigung – Bauschluss- oder Feinreinigung nach Renovierungen.",
  "Büro- und Praxisreinigung – Hygienische Reinigung für Büros und Praxen mit Desinfektion.",
  "Glas- und Fensterreinigung – Streifenfreie Reinigung von Fenstern, Spiegeln und Glasflächen, innen und außen plus Rahmen.",
  "Raffstore- und Jalousiereinigung."
]


export default function AboutSection() {
  return (
    <SplitSection
      left={
        <div className="relative flex justify-center md:justify-start">

          {/* Image principale */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl w-full max-w-[420px]">
            <Image
              src="/images/doctor-main1.jpg"
              alt="doctor consultation"
              width={420}
              height={420}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Badge */}
          <div className="hidden md:flex absolute -top-6 left-[300px] bg-white shadow-md rounded-full w-20 h-20 items-center justify-center text-xs text-gray-500">
            High Quality
          </div>

          {/* Image flottante */}
          <div className="hidden md:block absolute -bottom-10 left-[220px] bg-white rounded-2xl shadow-lg overflow-hidden">
            <Image
              src="/images/appointment0.png"
              alt="doctor"
              width={180}
              height={180}
              className="object-cover"
            />
          </div>
        </div>
      }
      right={
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-6">
            Wer wir sind
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Als Inhaber <b>Emerant Dass Kuietche Soh</b> aus Braunschweig
            sorge ich persönlich für blitzsaubere Ergebnisse – ob privat
            oder gewerblich.
          </p>

          <h3 className="text-xl md:text-2xl font-semibold mb-4">
            Unsere Leistungen
          </h3>

          <ul className="space-y-3">
            {services.map((service, index) => (
              <li key={index} className="flex gap-3 text-gray-700">
                <span className="text-primary font-bold">✓</span>
                <span>{service}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-gray-600">
            Wir kommen mobil zu dir in <b>Braunschweig, Wolfsburg,
            Salzgitter, Gifhorn</b> und Umgebung.
          </p>
        </div>
      }
    />
  );
}