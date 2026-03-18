import { Body, Controller, Post, Res, Get } from '@nestjs/common'
import type { Response } from 'express'
import { UserService } from './user.service'
import { JwtService } from '@nestjs/jwt'

@Controller('user')
export class UserController {
    constructor(private userService:UserService, private jwtService:JwtService){}

    @Post()
    createUser(@Body() data:any){
        return this.userService.createUser(data)
    }

     @Post("login")
  async login(    @Body() body:{email:string,password:string},@Res({ passthrough:true }) res:Response){

    const user = await this.userService.loginUser(body.email,body.password)

    const token = this.jwtService.sign({
      userId: user.id,
      email: user.email
    })

    res.cookie("token", token,{
      httpOnly:true,
      sameSite:"lax",
      secure:false,
      maxAge:1000 * 60 * 60 * 24
    })

    return {message:"Login successful"}
  }

  @Post("logout")
    logout(@Res({ passthrough:true }) res:Response){
    res.clearCookie("token")
    return {message:"Logged out"}
    }


    @Get()
    getUsers(){
        return this.userService.getUsers()
    }
}
