/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlModule } from './url/url.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/jiitakn'),
    UrlModule,
    JwtModule.register({
      global: true,
      secret: 'mysecretKey',
      signOptions: { expiresIn: '7d' },
    })
  ],
})
export class AppModule { }
