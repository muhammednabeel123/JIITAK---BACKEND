/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({ collection: 'users' })
export class user extends Document {

  @Prop()
  userName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

}
export const userSchema = SchemaFactory.createForClass(user);