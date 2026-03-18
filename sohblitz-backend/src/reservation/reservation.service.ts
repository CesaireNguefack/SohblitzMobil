import { Injectable } from '@nestjs/common';
import { ReservationStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReservationService {

    constructor(private prisma:PrismaService){}

    async createReservation(data:{
        name:string,email:string, message: string, date: Date,idService:number,street:string,zipcode:string,city:string
    }){
        return this.prisma.reservation.create({
            data:{
                ...data,
                date: new Date(data.date),
                status:ReservationStatus.PENDING
            }
        })
    }

    async getReservations(){
        return this.prisma.reservation.findMany({
            include:{
                service:true
            }
        })
    }

    async updateStatus(id:number, status:ReservationStatus){
        return this.prisma.reservation.update({
            where:{id},
            data:{status}
        })
    }
}
