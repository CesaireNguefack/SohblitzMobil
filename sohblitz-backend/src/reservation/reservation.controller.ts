import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
 import {Prisma} from '@prisma/client';
 import { ReservationStatus } from '@prisma/client'
import { ReservationService } from './reservation.service';

 const status = ReservationStatus.CONFIRMED

@Controller('reservation')
export class ReservationController {
    constructor(private reservationService:ReservationService){}

    @Post()
    createReservation(@Body() body:any){
        return this.reservationService.createReservation(body)
    }

    @Get()
    getReservations(){
        return this.reservationService.getReservations()
    }

    @Patch('id/status')
    updateStatus(@Param('id') id:number, @Body('status') status:ReservationStatus){
        return this.reservationService.updateStatus(Number(id),status)
    }

}
