import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import { HttpClient } from '@angular/common/http';

//declare const $: any;
declare const $: any;
@Injectable({
  providedIn: 'root'
})
export class JQueryService {
  constructor(
    private httpclient: HttpClient
  ) { }
  loadJS(file) {
    const len = $('script').filter(() => {
      return ($(this).attr('src') === file.src);
    }).length;
    if (len === 0) {
      const jsElm = document.createElement('script');
      jsElm.src = file.src;
      jsElm.async = file.async;
      jsElm.defer = file.defer;
      document.head.appendChild(jsElm);
    }
    const inrvl = setInterval(() => {
      const len = $('script').filter(() => {
        return ($(this).attr('src') === file.src);
      }).length;
      if (len > 0) {
        clearInterval(inrvl);
      }
    }, 10);
  }
  loadCSS(file) {
    const len = $('link').filter(() => {
      return ($(this).attr('href') === file.href);
    }).length;
    if (len === 0) {
      const cssElm = document.createElement('link');
      cssElm.href = file.href;
      cssElm.rel = 'stylesheet';
      document.head.appendChild(cssElm);
    }
    const inrvl = setInterval(() => {
      const len = $('link').filter(() => {
        return ($(this).attr('href') === file.href);
      }).length;
      if (len > 0) {
        clearInterval(inrvl);
      }
    }, 10);
  }

  async getBase64ImageFromUrl(imageUrl) {
    try {
      // const res = await fetch(imageUrl);
      // const blob = await res.blob();

      // return new Promise((resolve, reject) => {
      //   const reader = new FileReader();
      //   reader.addEventListener('load', () => {
      //     resolve(reader.result);
      //   }, false);

      //   reader.onerror = () => {
      //     return reject(this);
      //   };
      //   reader.readAsDataURL(blob);
      // });
      return '';
    } catch (e) {
      return '';
    }
  }

}
