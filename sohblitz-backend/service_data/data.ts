
export type Lang = "de" | "fr" | "en"

import "server-only"

export type Service = {
  id: number
  title: string
  description1: string
  description: string
  pricing: string[]
  tags: string[]
  cover: string
  images: string[]
}
 
import de from "./de.json"
import en from "./en.json"
import fr from "./fr.json"

import fs from "fs"
import path from "path"

 
const servicesByLang = {
  de,
  en,
  fr
}


function getImages(serviceId: number) {
  const dir = path.join(process.cwd(), "public/services", String(serviceId))

  if (!fs.existsSync(dir)) {
    return { cover: "", images: [] }
  }

  const files = fs.readdirSync(dir)

  const images = files
    .filter(file => file !== "cover.png")
    .filter(file => file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".jpeg"))
    .sort() 

  return {
    cover: files.includes("cover.png")
      ? `/services/${serviceId}/cover.png`
      : "",
    images: images.map(file => `/services/${serviceId}/${file}`)
  }
}


export function getServicesData(lang: Lang) {
  const services = servicesByLang[lang] || servicesByLang.de

  return services.map(service => {
    const { cover, images } = getImages(service.id)

    return {
      ...service,
      cover,
      images
    }
  })
}


export function getServiceById(id: number, lang: Lang) {
  const services = servicesByLang[lang] || servicesByLang.de

  const service = services.find(s => s.id === id)

  if (!service) return null

  const { cover, images } = getImages(id)

  return {
    ...service,
    cover,
    images
  }
}