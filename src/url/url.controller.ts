/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Res, Post, Body ,UseGuards } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlDto } from './dto/url.dto';
import { ControllerAuthGuard } from 'src/auth/guards/controller-auth.guard';

@Controller('')
export class UrlController {

    constructor(private _urlService: UrlService) { }


    @Get(':code')
    async redirectUrl(@Param('code') code: string) {
      const redirectedUrl = await this._urlService.redirectUrl(code);
      return redirectedUrl;
    }

    @UseGuards(ControllerAuthGuard)
    @Post('short')
    async createShortUrl(@Body() body: UrlDto) {
        return this._urlService.createShortUrl(body)
    }
}
