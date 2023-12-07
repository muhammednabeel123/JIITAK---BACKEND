import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    readonly userName:string;

    @IsNotEmpty()
    @IsEmail()
    readonly email:string;

    @IsNotEmpty()
    @IsStrongPassword()
    readonly password:string;
}