import { Body, Controller, Delete, Get, Query, Param, Patch, Post } from '@nestjs/common';
import { ReservationStatus } from '@prisma/client'
import { ReservationService } from './reservation.service';
import { EmailService } from '../mail/email.service';

const status = ReservationStatus.CONFIRMED

@Controller('reservation')
export class ReservationController {
    constructor(private reservationService: ReservationService, private emailService: EmailService) { }

    @Post()
    async createReservation(@Body() body: any) {
        try {
            console.log("Creating reservation with data:", body);
            const reservation = await this.reservationService.createReservation(body);

            const reservationData = await this.reservationService.findById(reservation.id);

            if (reservationData.status !== "success") {
                return reservationData
            }

            // 📩 mail client
            //  await this.emailService.sendUserConfirmation(reservation);
            console.log("Sending confirmation email to user..." + reservationData.data);
            await this.emailService.sendUserConfirmedEmail(reservationData.data);


            // 📩 mail admin
            //await this.emailService.sendAdminNotification(reservation);
            await this.emailService.notifyAdmin(reservationData.data);

            return {
                success: true,
                data: reservationData.data,
            };

        } catch (error) {
            console.error(error);

            return {
                success: false,
                message: 'Erreur lors de la réservation',
            };
        }
    }

    @Get()
    getReservations() {
        return this.reservationService.getReservations()
    }

    @Patch("confirm/:id")
    async confirm(@Param("id") id: string) {
        const reservationData = await this.reservationService.findById(Number(id));
        
        if (reservationData.status === "error") {
            return reservationData
        }
        
        if ( reservationData.data?.status === ReservationStatus.CONFIRMED) {
            reservationData.message = "was already confirmed"
            return reservationData
        }

        const result = await this.reservationService.updateStatus(Number(id), ReservationStatus.CONFIRMED)

        await this.emailService.sendConfirmedEmail(reservationData.data);
        result.message = "successfully confirmed"
        return reservationData
    }

   

    @Patch("cancel/:id")
    async cancel(@Param("id") id: string) {
         const reservationData = await this.reservationService.findById(Number(id));
        if (reservationData.status === "error" ) {
            return reservationData
        }
        if (reservationData.data?.status === ReservationStatus.CANCELLED) {
              reservationData.message = "was already cancelled"
            return reservationData
        }
        const result = await this.reservationService.updateStatus(Number(id), ReservationStatus.CANCELLED)

        await this.emailService.sendCancelledNotification(reservationData.data);
        result.message = "successfully cancelled"
        return result
    }

    // ❌ DELETE
    @Delete(":id")
    async delete(@Param("id") id: string) {
        return this.reservationService.deleteReservation(Number(id))
    }
}
