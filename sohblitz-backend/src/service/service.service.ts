import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServiceService {
    constructor(private prisma:PrismaService){}

    async createService(data:{titre:string,description:string,price:number}){
        return this.prisma.service.create({data})
    }
    
    async getServices(){
        return this.prisma.service.findMany()
    }
}
