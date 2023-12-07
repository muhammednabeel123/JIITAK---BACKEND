/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Logger
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class ControllerAuthGuard implements CanActivate {
    private readonly logger = new Logger(ControllerAuthGuard.name)
    constructor(private readonly _jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        this.logger.debug(`Checking for auth token on request body`, request.body)
        const { accessToken } = request.body;
        try {
            const payload = this._jwtService.verify(accessToken);
            console.log(payload)
            request.body.userId = payload.sub;
            // console.log(request)
            return true
        } catch {
            throw new ForbiddenException('Invalid authorization token')
        }
    }
}