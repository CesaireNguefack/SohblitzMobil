import ButtonContact, { ButtonReservation } from "@/componenten/Cards/KontaktButton";
import ServiceCard from "@/componenten/Cards/ServiceCard";
import { getServices } from "@/services/api"
import { useEffect, useState } from "react";

const services = [
  {
    id: 1,
    title: "Gebäudereinigung",
    pricing: ["25€ – 35€ pro Stunde"]
  },
  {
    id: 2,
    title: "Büro und Praxisreinigung",
    pricing: ["30€ – 40€ pro Stunde"]
  },
  {
    id: 3,
    title: "Bauendreinigung",
    pricing: [
      "Grobreinigung: 4€ – 9€ / m²",
      "Feinreinigung: 5€ – 9.50€ / m²",
      "Sanitär, Geräte und Möbel werden extra berechnet"
    ]
  },
  {
    id: 4,
    title: "Fenster und Glasreinigung",
    pricing: [
      "4€ – 8€ / m² (innen & außen)",
      "Rahmen: +1.45€ pro Fenster",
      "Verschmutzungsgrad / Höhe: +20% – 50%"
    ]
  },
  {
    id: 5,
    title: "Autoinnenreinigung",
    pricing: [
      "Basisreinigung: 40€ – 130€",
      "Intensivreinigung: 130€ – 250€",
      "Ozon Reinigung inklusive",
      "Geruchsbeseitigung: 50€ – 80€"
    ]
  },
  {
    id: 6,
    title: "Polster Reinigung",
    pricing: [
      "Sofa: 20€ – 40€ pro Sitz",
      "Sessel: 25€ – 40€",
      "Bürostuhl: 9€ – 20€"
    ]
  },
  {
    id: 7,
    title: "Teppichreinigung",
    pricing: ["6€ – 9€ pro m²"]
  },
  {
    id: 8,
    title: "Raffstore & Jalousie Reinigung",
    pricing: [
      "20€ – 55€ pro Stück",
      "Je nach Verschmutzung & Höhe: +10% – 45%"
    ]
  }
]

export default function Services(){

 //const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function loadServices() {

      try {

       // const data = await getServices()
        //setServices(data)

      } catch (error) {

        console.error(error)

      } finally {

        setLoading(false)

      }

    }

    loadServices()

  }, [])


    return (
        <section className="pt-10 pb-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-10">
          
          <h2 className="text-4xl font-bold text-center text-slate-800 mb-16">
            Unsere Dienstleistungen
          </h2>
          {loading? (
            <div className="flex justify-center items-center py-40">
                <div className="w-10 h-10 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ): (
            <div className=" pt-10 grid md:grid-cols-4 gap-8">
                {
                    services.map((service) =>(
                            <ServiceCard
                            key={service.id}
                image="🏢"
                date="22.11.2025"
                title={service.title}
                description={service.pricing.join(" • ")}
                onClick={()=>console.log(service.id)}
                />
                    ))
                }
            </div>
          )}
          <div> <br />
                    <ButtonReservation />
                  </div>
        </div>

      </section>
    )
}