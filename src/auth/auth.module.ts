import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/models/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'users', schema: userSchema },
  ])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
