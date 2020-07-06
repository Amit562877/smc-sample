import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EncDecService {
  constructor() { }

  convertText(conversiontype: string, convertText: string, replace = false) {
    try {
      if (conversiontype === 'enc' && replace) {
        return CryptoJS.AES.encrypt(convertText.toString().trim(), environment.encryptKey).toString().replace(/\//g, 'ebh78').replace(/[+]/g, 'plo125').replace(/=/g, 'iisd5545');
      } else if (conversiontype === 'enc' && !replace) {
        return CryptoJS.AES.encrypt(convertText.toString().trim(), environment.encryptKey).toString();
      } else if (conversiontype === 'dec' && replace) {
        return CryptoJS.AES.decrypt(convertText.toString().trim().replace(/ebh78/g, '/').replace(/plo125/g, '+').replace(/iisd5545/g, '='), environment.encryptKey).toString(CryptoJS.enc.Utf8);
      } else if (conversiontype === 'dec' && !replace) {
        return CryptoJS.AES.decrypt(convertText.toString().trim(), environment.encryptKey).toString(CryptoJS.enc.Utf8);
      }
    } catch (e) {
      console.log('Enc-Dec: Error->' + e);
    }
  }

  encryptSensitiveV1(data) {
    const iv = CryptoJS.enc.Utf8.parse('55Smc254#!$^4144GUjsgyAihAu54!SM');
    const key = CryptoJS.enc.Utf8.parse(environment.encryptKey);
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key,
      {
        iv
      });
    return encrypted.toString().replace(/\//g, 'ebh78').replace(/[+]/g, 'plo2').replace(/=/g, 'Mgs5');
  }
  encryptSensitive(data) {

    const key = CryptoJS.enc.Utf8.parse('55Smc254#!$^4144GUjsgyAihAu54!SM');
    const iv = CryptoJS.enc.Utf8.parse(environment.encryptKey);
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), environment.encryptKey, key,
      {
        keySize: 64,
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    return encrypted.toString().replace(/\//g, 'ebh78').replace(/[+]/g, 'plo2').replace(/=/g, 'Mgs5');
  }
  decryptSensitiveV1(data) {
    const iv = CryptoJS.enc.Utf8.parse('55Smc254#!$^4144GUjsgyAihAu54!SM');
    const key = CryptoJS.enc.Utf8.parse(environment.encryptKey);
    const encrypted = CryptoJS.AES.decrypt(data.trim().replace(/ebh78/g, '/').replace(/plo2/g, '+').replace(/Mgs5/g, '='), key,
      {
        iv
      });
    return encrypted.toString(CryptoJS.enc.Utf8);
  }
  decryptSensitive(data) {
    try {
      const encrypted = CryptoJS.AES.decrypt(data.trim().replace(/ebh78/g, '/').replace(/plo2/g, '+').replace(/Mgs5/g, '='));
      return encrypted.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      console.log('enc-dec=>', e);
    }
  }

  decryptSensitiveVThirdParty(data) {
    const iv = CryptoJS.enc.Utf8.parse('55Smc254#!$^4144GUjsgyAihAu54!SM');
    const key = CryptoJS.enc.Utf8.parse(environment.thirdpartyencryptKey);
    const encrypted = CryptoJS.AES.decrypt(data.trim().replace(/ebh78/g, '/').replace(/plo2/g, '+').replace(/Mgs5/g, '='), key,
      {
        iv
      });
    return encrypted.toString(CryptoJS.enc.Utf8);
  }
  decryptSensitiveVThirdPartykondesk(data) {
    try {
      const encrypted = CryptoJS.AES.decrypt(data.trim().replace(/ebh78/g, '/').replace(/plo2/g, '+').replace(/Mgs5/g, '='));
      return encrypted.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      console.log('enc-dec=>', e);
    }
  }
  convertTextThirdParty(conversiontype: string, convertText: string, replace = false) {
    try {
      if (conversiontype === 'enc' && replace) {
        return CryptoJS.AES.encrypt(convertText.toString().trim(), environment.thirdpartyencryptKey).toString().replace(/\//g, 'ebh78').replace(/[+]/g, 'plo125').replace(/=/g, 'iisd5545');
      } else if (conversiontype === 'enc' && !replace) {
        return CryptoJS.AES.encrypt(convertText.toString().trim(), environment.thirdpartyencryptKey).toString();
      } else if (conversiontype === 'dec' && replace) {
        return CryptoJS.AES.decrypt(convertText.toString().trim().replace(/ebh78/g, '/').replace(/plo125/g, '+').replace(/iisd5545/g, '='), environment.thirdpartyencryptKey).toString(CryptoJS.enc.Utf8);
      } else if (conversiontype === 'dec' && !replace) {
        return CryptoJS.AES.decrypt(convertText.toString().trim(), environment.thirdpartyencryptKey).toString(CryptoJS.enc.Utf8);
      }
    } catch (e) {
      console.log('Enc-Dec: Error->' + e);
    }
  }
}
