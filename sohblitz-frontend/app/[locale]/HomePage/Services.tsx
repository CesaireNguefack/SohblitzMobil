"use client"
import { getServices,Service } from "@/services/dienstApi";
import ServiceBody from "./ServiceBody";
import { getCurentLanguage, Lang } from "@/languages/getcurentlanguage";  
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default   function ServicesBlock(){

 const [services, setServices] = useState<Service[]>([])
 const lang =getCurentLanguage()  

useEffect(() => {
  async function loadServices() {
    const data = await getServices(lang as Lang)
    setServices(data)
  }

  loadServices()
}, [])
  return <ServiceBody services={services} />
}