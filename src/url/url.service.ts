/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { constants } from 'src/common/constants';
import { URLShortener } from 'src/common/util/generateCode';
import { url } from 'src/models/url.schema';
import { UrlDto } from './dto/url.dto';
import { isUri } from 'valid-url';
import { IsUrl } from 'class-validator';

@Injectable()
export class UrlService {

    constructor(
        @InjectModel('urls') private readonly _urlModel: Model<url>,
    ) { }

    async redirectUrl(urlCode: string): Promise<any> {
        try {
            const item = await this._urlModel.findOne({ shortUrl: urlCode }).exec();
            if (item) {
                return {url:item.originalUrl};
            } else {
                return {url:constants.ERROR_URL};
            }
        } catch (error) {
            return constants.ERROR_URL;
        }
    }

    async createShortUrl(body: UrlDto) {
        const { originalUrl, userId } = body;
        console.log(originalUrl,"the max")
        try {
            let urlData = await this._urlModel.findOne({ userId, originalUrl }).exec();
            if (urlData) {
                return urlData;
            } else {
                const shortener = new URLShortener();
                const shortUrl = shortener.shortenURL(originalUrl);
                
                const itemToBeSaved = { userId, originalUrl, shortUrl };
                const item = new this._urlModel(itemToBeSaved);

                await item.save();
                return itemToBeSaved
            }
        } catch (err) {
            throw new UnauthorizedException("Invalid User Id")
        }
    }
}
