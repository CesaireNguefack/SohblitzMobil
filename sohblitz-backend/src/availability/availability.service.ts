import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AvailabilityService {
    constructor(private prisma: PrismaService) {
        console.log("cesaireca")
        console.log(Object.keys(this.prisma));
     }

    // ➕ CREATE
    async createAvailability(data: {
        start: string;
        end: string;
        type: "available" | "blocked";
    }) {
        try {
            const conflict = await this.prisma.availability.findFirst({
                where: {
                    AND: [
                        { start: { lt: new Date(data.end) } },
                        { end: { gt: new Date(data.start) } },
                    ],
                },
            });

            if (conflict) {
                return {
                status: "error",
                message: "Conflit de disponibilité détecté, choisissez une autre date",
                data: null,
            }
                
            }

            const data2 = await this.prisma.availability.create({
                data: {
                    start: new Date(data.start),
                    end: new Date(data.end),
                    type: data.type,
                },
            });
            
             return {
                status: "success",
                message: "Successful created",
                data: data2,
            }
               
        } catch (error) {
             
              return {
                status: "error",
                message: "Erreur lors de la création de la disponibilité",
                data: null,
            }
        }
    }

    // 📥 GET ALL
    async getAvailabilities() {
        return this.prisma.availability.findMany({
            orderBy: { start: "asc" },
        });
    }

    // ✏️ UPDATE
    async updateAvailability(
        id: number,
        data: {
            start?: string;
            end?: string;
            type?: "available" | "blocked";
        }
    ) {
        try {
            const updated = await this.prisma.availability.update({
                where: { id },
                data: {
                    ...(data.start && { start: new Date(data.start) }),
                    ...(data.end && { end: new Date(data.end) }),
                    ...(data.type && { type: data.type }),
                },
            });

            return {
                status: "success",
                message: "Successfully updated",
                data: updated,
            };
        } catch (err: any) {
            console.error(err);
            return {
                status: "error",
                message: "Failed: " + err.message,
                data: null,
            };
        }
    }

    // 🗑️ DELETE
    async deleteAvailability(id: number) {
        try {
            const deleted = await this.prisma.availability.delete({
                where: { id },
            });

            return {
                status: "success",
                message: "Successfully deleted",
                data: deleted,
            };
        } catch (err: any) {
            console.error(err.message);
            return {
                status: "error",
                message: "Failed:  erreur lors de la suppression, veillez actualiser la page" ,
                data: null,
            };
        }
    }

    async getAvailabilitiesByType(type: 'available' | 'blocked') {
  try {
    const data = await this.prisma.availability.findMany({
      where: {
        type,
      },
      orderBy: {
        start: 'asc',
      },
    });

    return {
      status: "success",
      message: "Data fetched successfully",
      data,
    };
  } catch (error) {
    return {
      status: "error",
      message: "Erreur lors de la récupération",
      data: null,
    };
  }
}
}