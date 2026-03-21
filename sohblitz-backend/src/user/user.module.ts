import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt'

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports:[PrismaModule,
     JwtModule.register({
      secret:"superSecretKey",
      signOptions:{ expiresIn:"1d" }
    })
  ]
})
export class UserModule {}
