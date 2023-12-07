/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({ collection: 'urls' })
export class url extends Document {

  @Prop()
  userId:string;

  @Prop()
  originalUrl: string;

  @Prop()
  shortUrl: string;

}
export const urlSchema = SchemaFactory.createForClass(url);
