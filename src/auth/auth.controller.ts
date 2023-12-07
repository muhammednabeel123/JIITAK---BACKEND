/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from "@nestjs/common"
import { AuthService } from './auth.service';
import { RegisterDto } from "./dto/register.dto";
import { loginDto } from "./dto/login.dto";

@Controller('auth')
export class AuthController {

    constructor(private _authService: AuthService) { }

    @Post('register')
    async createUser(@Body() registerForm: RegisterDto) {
        return await this._authService.createUser(registerForm);
    }

    @Post('login')
    async verifyLogin(@Body() loginForm: loginDto) {
        return this._authService.verifyLogin(loginForm)
    }
}
