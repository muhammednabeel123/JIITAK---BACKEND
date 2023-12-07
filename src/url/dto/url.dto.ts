/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class UrlDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl({}, { message: 'Please provide a valid URL' })
  originalUrl: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}