import { Injectable } from "@nestjs/common"
import * as fs from "fs"
import * as path from "path"
import { PrismaService } from 'src/prisma/prisma.service';

type Lang = "de" | "fr" | "en"

@Injectable()
export class ServicesService {

  constructor(private prisma: PrismaService) { }

  async createService(data: { titre: string, description: string, price: number }) {
    return this.prisma.service.create({ data })
  }
 
  async getDBServices() {
    return this.prisma.service.findMany()
  }

  async deleteDBService(id: number) {
    const service = await this.prisma.service.findUnique({
      where: { id },
    })
  

    await this.prisma.reservation.deleteMany({
      where: { idService: id }
    });

    if (!service) {
      return {
        status: "error",
        message: "service not found",
        data: null,
      }
    }

    await this.prisma.service.delete({
      where: { id },
    })

    return {
      status: "success",
      message: "service deleted",
    }
  }

  private getDataPath(file: string) {
    return path.join(process.cwd(), "service_data", file)
  }

  private loadJson(lang: Lang) {
    try {
      const filePath = this.getDataPath(`${lang}.json`)
      return JSON.parse(fs.readFileSync(filePath, "utf-8"))
    } catch {
      const fallback = this.getDataPath("de.json")
      return JSON.parse(fs.readFileSync(fallback, "utf-8"))
    }
  }

  private getImages(serviceId: number) {
    const dir = path.join(
      process.cwd(),
      "service_data",
      "images",
      String(serviceId)
    )

    if (!fs.existsSync(dir)) {
      return { cover: "", images: [] }
    }

    const files = fs.readdirSync(dir)

    const images = files
      .filter(file =>
        file.endsWith(".png") ||
        file.endsWith(".jpg") ||
        file.endsWith(".jpeg")
      )
      .sort()

    return {
      cover: files.includes("cover.png")
        ? `service_data/images/${serviceId}/cover.png`
        : "",
      images: images.map(file => `/service_data/images/${serviceId}/${file}`)
    }
  }

  getServices(lang: Lang) {
    const services = this.loadJson(lang)

    return services.map(service => {
      const { cover, images } = this.getImages(service.id)

      return {
        ...service,
        cover,
        images
      }
    })
  }

  getServiceById(id: number, lang: Lang) {
    const services = this.loadJson(lang)

    const service = services.find(s => s.id === id)
    if (!service) return null

    const { cover, images } = this.getImages(id)

    return {
      ...service,
      cover,
      images
    }
  }
}