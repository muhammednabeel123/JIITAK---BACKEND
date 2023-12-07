/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { MongooseModule } from '@nestjs/mongoose';
import { urlSchema } from 'src/models/url.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:'urls',schema:urlSchema},
]),],
  controllers: [UrlController],
  providers: [UrlService]
})
export class UrlModule {}
