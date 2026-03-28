import  { ButtonContact,ButtonReservation } from "@/componenten/Cards/KontaktButton";
import ServiceCard from "@/componenten/Cards/ServiceCard";
import { desc } from "framer-motion/client";
import { useEffect, useState } from "react";
import { services } from "@/app/data";

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