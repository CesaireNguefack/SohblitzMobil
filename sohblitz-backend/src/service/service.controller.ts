import {Controller,Param, Query, Get } from '@nestjs/common';
import { ServicesService } from './service.service';
 
@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

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