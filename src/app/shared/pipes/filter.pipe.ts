import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArr'
})
export class ArrayFilterPipe implements PipeTransform {

  transform(items: any, filter?: any): any {
    if (filter && Array.isArray(items)) {
      const filterKeys = Object.keys(filter);
      return items.filter(item =>
        filterKeys.reduce((memo, keyName) =>
          (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === '', true));
    } else {
      return items;
    }
  }

}
@Pipe({
  name: 'filterArrV2'
})
export class ArrayFilterV2Pipe implements PipeTransform {

  transform(items: any, filter?: any): any {
    if (filter && Array.isArray(items)) {
      const filterKeys = Object.keys(filter);
      return items.filter(el => el[filterKeys[0]] === filter[filterKeys[0]]);
    } else {
      return items;
    }
  }

}
