import { Injectable,UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(private prisma:PrismaService){}

    async createUser(data:{name  :string, email:string, password: string}){
        const hashedPassword = await bcrypt.hash(data.password,10)
        const user = await this.prisma.user.create(
            {
                data:{
                name: data.name, email:data.email,password: hashedPassword
            }
            }
        )

        const {password, ...result} = user
        return result
    }

    async loginUser(email:string,password:string){

    const user = await this.prisma.user.findUnique({
      where:{email}
    })

    if(!user){
      throw new UnauthorizedException("Invalid credentials")
    }

    const passwordMatch = await bcrypt.compare(password,user.password)

    if(!passwordMatch){
      throw new UnauthorizedException("Invalid credentials")
    }

    const {password:_, ...result} = user

    return result
  }

    async getUsers(){
        return this.prisma.user.findMany({
            select:{
                id:true,name:true,email:true,createdAt:true
            }
        })
    }
}
