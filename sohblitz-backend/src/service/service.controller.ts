import { Controller, Delete, Body, Param, Post, Query, Get } from '@nestjs/common';
import { ServicesService } from './service.service';


@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }

  @Post()
  createService(@Body() data: any) {
    return this.servicesService.createService(data)
  }

  @Get("/db")
  getServices() {
    return this.servicesService.getDBServices()
  }

  // ❌ DELETE
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.servicesService.deleteDBService(Number(id))
  }

  @Get()
  getAll(@Query("lang") lang: "de" | "fr" | "en") {
    return this.servicesService.getServices(lang)
  }

  @Get(":id")
  getOne(
    @Param("id") id: string,
    @Query("lang") lang: "de" | "fr" | "en"
  ) {
    return this.servicesService.getServiceById(Number(id), lang)
  }
}