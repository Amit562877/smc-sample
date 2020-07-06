import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitStringVar'
})
export class SplitStringVarPipe implements PipeTransform {

  transform(value: any, separator: any): any {
    if (value) {
      let splits = value.split(separator);
      let mergerdString = '';
      if (splits.length > 1) {

        for (let i = 0; i < splits.length; i++) {
          if (splits[i].length > 0) {
            mergerdString += splits[i].trim() + ', '
          }
        }
        mergerdString = mergerdString.substring(0, mergerdString.length - 2);
        return [mergerdString];
      } else {
        return splits;
      }
    }

  }

}
