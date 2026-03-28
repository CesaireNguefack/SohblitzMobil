import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ReservationStatus } from '@prisma/client'
import { ReservationService } from './reservation.service';

const status = ReservationStatus.CONFIRMED

@Controller('reservation')
export class ReservationController {
    constructor(private reservationService: ReservationService) { }

    @Post()
    createReservation(@Body() body: any) {
        return this.reservationService.createReservation(body)
    }

    @Get()
    getReservations() {
        return this.reservationService.getReservations()
    }
 
    @Patch("confirm/:id")
    async confirm(@Param("id") id: string) {
        const result= await this.reservationService.updateStatus(Number(id), ReservationStatus.CONFIRMED)

        if(result.status === "error"){
            return result
        }

        return  result
    } 

    @Patch("cancel/:id")
    async cancel(@Param("id") id: string) {
        const result= await this.reservationService.updateStatus(Number(id), ReservationStatus.CANCELLED)

        if(result.status === "error"){
            return result
        }

        return  result
    }

    // ❌ DELETE
    @Delete(":id")
    async delete(@Param("id") id: string) {
        return this.reservationService.deleteReservation(Number(id))
    }
}
