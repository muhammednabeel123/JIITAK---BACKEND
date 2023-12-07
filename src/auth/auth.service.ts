/* eslint-disable prettier/prettier */
import {  HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { user } from 'src/models/user.schema';
import { loginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('users') private readonly _userModel: Model<user>,
        private _jwtService: JwtService,
    ) { }

    async createUser(registerForm: RegisterDto) {
        try {
           
            const { userName, email, password } = registerForm;
            const hashedPassword = await bcrypt.hash(password, 10);
            const existingUser = await this._userModel.findOne({ email });
            console.log(existingUser,"heyesd")

            if (existingUser) {
                return { message:"User Already Registered"}
                throw new UnauthorizedException('User Already Registered');
            } else {
                const user = new this._userModel({
                    userName: userName,
                    email,
                    password: hashedPassword,
                });

                await user.save();

                return { userId: user._id };
            }
        } catch (error) {
            throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async verifyLogin(details: loginDto){
        try {
            const data = await this._userModel.findOne({ email: { $regex: new RegExp(details.email, "i") } })
            if (data) {
                    const paylaod = { sub: data._id, email: data.email }
                    const token = await this._jwtService.signAsync(paylaod)
                    const verifyPass = await bcrypt.compare(details.password, data.password)
                    if (verifyPass) {
                        return { token: token, id: data._id}
                    }
                    else {
                        return {message:"Password is incorrect"}
                       
                    }
            } else {
                return {message:"Email not Found"}
            }
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException(error.message);
        }
    }

    


}
