import { Pipe, PipeTransform } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
@Pipe({ name: 'encdec' })
export class EncPipe implements PipeTransform {
    constructor() { }
    transform(convertText: any, conversiontype, replace = false, sensitive = false) {
        try {
            if (!sensitive) {
                if (!replace) {
                    if (conversiontype === 'enc') {
                        return CryptoJS.AES.encrypt(convertText.toString().trim(), environment.encryptKey).toString();
                    } else if (conversiontype === 'dec') {

                        return CryptoJS.AES.decrypt(convertText.toString().trim(), environment.encryptKey).toString(CryptoJS.enc.Utf8);
                    }
                } else {
                    if (conversiontype === 'enc') {
                        return CryptoJS.AES.encrypt(convertText.toString().trim(), environment.encryptKey).toString().replace(/\//g, 'ebh78').replace(/[+]/g, 'plo125').replace(/=/g, 'iisd5545');
                    } else if (conversiontype === 'dec') {

                        return CryptoJS.AES.decrypt(convertText.toString().trim().replace(/ebh78/g, '/').replace(/plo125/g, '+').replace(/iisd5545/g, '='), environment.encryptKey).toString(CryptoJS.enc.Utf8);
                    }
                }
            } else {
                if (conversiontype === 'enc') {
                    const key = CryptoJS.enc.Utf8.parse('55Smc254#!$^4144GUjsgyAihAu54!SM');
                    const iv = CryptoJS.enc.Utf8.parse(environment.encryptKey);
                    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(convertText), environment.encryptKey, key,
                        {
                            keySize: 64,
                            iv,
                            mode: CryptoJS.mode.CBC,
                            padding: CryptoJS.pad.Pkcs7
                        });
                    return encrypted.toString().replace(/\//g, 'ebh78').replace(/[+]/g, 'plo2').replace(/=/g, 'Mgs5');
                } else if (conversiontype === 'dec') {
                    const encrypted = CryptoJS.AES.decrypt(CryptoJS.enc.Utf8.parse(convertText.trim().replace(/ebh78/g, '/').replace(/plo125/g, '+').replace(/iisd5545/g, '=')), environment.encryptKey);
                    return encrypted;
                }
            }

        } catch (e) {
            console.log('Enc-Dec: Error->' + e);
        }
    }
}



