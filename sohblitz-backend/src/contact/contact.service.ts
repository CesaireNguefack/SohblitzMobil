import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {
    constructor(private prisma: PrismaService) { }
    async createContact(data: { name: string, email: string, phone: string, message: string }) {
        try {
            return await this.prisma.contact.create({
                data: {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    message: data.message,  
                },
            })
        } catch (error) {
            throw new Error("Erreur lors de la création du contact")
        }
    }

    async getContacts() {
        return this.prisma.contact.findMany({
            orderBy: { createdAt: "desc" }
        })
    }

    async deleteContact(id: number) {
        try {
            const deleted = await this.prisma.contact.delete({
                where: { id }
            })

            return {
                status: "success",
                message: "successfully deleted",
                data: deleted,
            }
        } catch (err:any) {
            console.error(err)
            return {
                status: "error",
                message: "Failed : " + err.message,
                data: null,
            }
        }
    }
}
