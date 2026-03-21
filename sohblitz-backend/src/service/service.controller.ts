import { Body, Controller, Post, Get } from '@nestjs/common';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
    constructor(private service:ServiceService){}

    @Post()
    createService(@Body() data:any){
        return this.service.createService(data)
    }

    @Get()
    getServices(){
       return this.service.getServices()
    }
}
