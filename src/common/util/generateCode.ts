/* eslint-disable prettier/prettier */
import { constants } from "../constants";


export class URLShortener {
  private static readonly BASE62_CHARS = constants.BASE_62_VALUES;

  public shortenURL(originalURL: string): string {

    const uniqueID = this.generateUniqueID(originalURL);

    const base62Encoded = this.encodeToBase62(uniqueID);

    const paddingLength = Math.max(0, 8 - base62Encoded.length);
    const padding = this.generatePadding(paddingLength);

    return padding + base62Encoded;
  }

  private generateUniqueID(originalURL: string): number {

    return Math.floor(Math.random() * 1000000); 
  }

  private encodeToBase62(number: number): string {
    let encoded = '';
    const base = URLShortener.BASE62_CHARS.length;

    while (number > 0) {
      const remainder = number % base;
      encoded = URLShortener.BASE62_CHARS.charAt(remainder) + encoded;
      number = Math.floor(number / base);
    }

    return encoded || '0'; 
  }

  private generatePadding(length: number): string {
    let padding = '';
    let lastChar = '';
  
    for (let i = 0; i < length; i++) {
      let charIndex;
      do {
        charIndex = Math.floor(Math.random() * URLShortener.BASE62_CHARS.length);
      } while (URLShortener.BASE62_CHARS[charIndex] === lastChar);
  
      lastChar = URLShortener.BASE62_CHARS[charIndex];
      padding += lastChar;
    }
  
    return padding;
  }
  
}

