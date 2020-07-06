import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'href' })
export class HrefPipe implements PipeTransform {
  transform(url) {
    try {
      const objdata = JSON.parse(url);
      if (objdata.href) {
        return objdata.href;
      } else {
        return objdata;
      }
    } catch (e) {
      if (url) {
        return url;
      }
      return '';
    }
  }
}

@Pipe({ name: 'errorReason' })
export class ReasonPipe implements PipeTransform {
  transform(reasons) {
    // console.log("Data-->",reason)
    try {
      const data = JSON.parse(reasons)
      if(data.reason){
        return data.reason;
      }else{
        return data
      }
     } catch (e) {
       if(reasons){
         return reasons
       }
       return '';
     
    }
  }
}



@Pipe({ name: 'pageCount' })
export class PageCountPipe implements PipeTransform {
  transform(recordcount: any, pageindex: any, pagesize: any, limit: any = 0) {
    try {
      limit = ((recordcount / (pageindex * pagesize)) > limit && limit > 0) ? limit - 1 : (recordcount / (pageindex * pagesize));
      const range = [];
      for (let i = 0; i <= limit; i++) {
        range.push(i + 1);
      }
      return range;
    } catch (e) {
      return [];
    }
  }
}


@Pipe({ name: 'range' })
export class RangePipe implements PipeTransform {
  transform(limit: any, start: any) {
    try {
      const range = [];
      for (let i = 0; i < limit; i++) {
        range.push(i + 1);
      }
      return range;
    } catch (e) {
      return [];
    }
  }
}


