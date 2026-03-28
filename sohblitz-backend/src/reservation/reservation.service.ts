import { Injectable } from '@nestjs/common';
import { ReservationStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReservationService {

    constructor(private prisma: PrismaService) { }

    async createReservation(data: {
        name: string, email: string, message: string, date: Date, idService: number, street: string, zipcode: string, city: string
    }) {
        return this.prisma.reservation.create({
            data: {
                ...data,
                date: new Date(data.date),
                status: ReservationStatus.PENDING
            }
        })
    }

    async getReservations() {
        return this.prisma.reservation.findMany({
            include: {
                service: true
            },
            orderBy: {createdAt: "desc"}
        })
    }

    async updateStatus(id: number, status: ReservationStatus) {
        try {
            const updated = await this.prisma.reservation.update({
                where: { id },
                data: { status:status }
            }) 

            return {
                status: "success",
                message: "successfully updated",
                data: updated,
            }
        } catch (err) {
            console.error(err)
            return {
                status: "error",
                message: "Failed : " + err.message,
                data: null,
            }
        }
    }

    async deleteReservation(id: number) {
        const reservation = await this.prisma.reservation.findUnique({
            where: { id },
        })

        if (!reservation) {
            return {
                status: "error",
                message: "Reservation not found",
                data: null, 
            }
        }

        await this.prisma.reservation.delete({
            where: { id },
        })

        return {
            status: "success",
            message: "Reservation deleted",
        }
    }
}
