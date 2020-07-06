import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterLocation'
})
export class AdvancedfilterPipe implements PipeTransform {

  transform(arr: any[], prop1: any, value1: any, prop2: any, value2: any): any {
    if (value2) {
      if (!value1 && !value2) {
        return [];
      } else {
        return value2.filter(obj => { return obj[prop1] === value1 });
      }
    } else {
      return '';
    }
  }

}
