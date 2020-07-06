import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { DomSanitizer } from "@angular/platform-browser";
@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {
  transform(collection: any, property: string): any {
    // prevents the application from breaking if the array of objects doesn't exist yet
    if (!collection) {
      return null;
    }
    const groupedCollection = collection.reduce((previous, current) => {
      if (!previous[current[property]]) {
        previous[current[property]] = [current];
      } else {
        previous[current[property]].push(current);
      }

      return previous;
    }, {});

    // this will return an array of objects, each object containing a group of objects
    return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
  }
}

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arr: any[], prop: string, value: string): any {
    if (arr) {
      if (!value) {
        return arr
      } else {
        return arr.filter(obj => { return obj[prop] === value })
      }
    } else {
      return []
    }
  }

}

@Pipe({
  name: 'filterOptionVal'
})
export class FilterPipeOptionval implements PipeTransform {

  transform(arr: any[], prop: string, value: string, updatedDate: any): any {
    if (arr) {
      if (!value) {
        return arr
      } else {
        return arr.filter(obj => { return obj[prop] === value })
      }
    } else {
      return []
    }
  }

}

@Pipe({
  name: 'optionalFiltersec'
})
export class OptionalFiltersec implements PipeTransform {

  transform(items, firstArgument): any {
    const filtered = [];
    for (const value of items) {
      if (value.sectionidf === firstArgument || value.sectionparentidf === firstArgument) {// logic for filtering
        filtered.push(value);
      }
    }
    return filtered;
  }

}

@Pipe({
  name: 'optionalFilter'
})
export class OptionalFilter implements PipeTransform {

  transform(items, firstArgument): any {
    const filtered = [];
    for (const value of items) {
      if (value.sectionidf === firstArgument || value.sectionparentidf === firstArgument) {// logic for filtering
        filtered.push(value);
      }
    }
    return filtered;
  }
}

@Pipe({
  name: 'ControlFilter'
})
export class ControlFilter implements PipeTransform {

  transform(items, productid, visatypesectionmapid, multiplesec): any {
    const filtered = [];
    for (const value of items) {
      if (multiplesec == true) {
        if (value.productidf == productid && value.visatypesectionmapid == visatypesectionmapid) {
          filtered.push(value);
        }
      }
      else {
        if (value.productidf == productid && value.visatypesectionmapid == visatypesectionmapid && value.controltypeidf != 4) {//logic for filtering
          // console.log("val ::",value.a);
          filtered.push(value);
        }
      }
    }
    return filtered;
  }
}

@Pipe({
  name: 'filter3'
})
export class FilterPipe3 implements PipeTransform {

  transform(arr: any[], prop1: string, value1: string, prop2: string, value2: string, prop3: string, value3: string): any {
    if (arr) {
      if (!value1 && !value2 && !value3) {
        return arr
      } else {
        return arr.filter(obj => { return obj[prop1] == value1 && obj[prop2] == value2 && obj[prop3] == value3 })
      }
    } else {
      return []
    }
  }

}
@Pipe({
  name: 'filter4'
})
export class FilterPipe4 implements PipeTransform {

  transform(arr: any[], prop1: string, value1: string, prop2: string, value2: string, prop3: string, value3: string, prop4: string, value4: string): any {
    if (arr) {
      if (!value1 && !value2 && !value3 && !value4) {
        return arr
      } else {
        let controlvalue = arr.filter(obj => { return obj[prop1] == value1 && obj[prop2] == value2 && obj[prop3] == value3 && obj[prop4] == value4 });
        return (controlvalue.length>0)? controlvalue[0].controlvalue:'';
      }
    } else {
      return '';
    }
  }

}
@Pipe({
  name: 'filter2'
})
export class FilterPipe2 implements PipeTransform {

  transform(arr: any[], prop1: string, value1: string, prop2: string, value2: string): any {
    if (arr) {
      if (!value1 && !value2) {
        return arr
      } else {
        return arr.filter(obj => { return obj[prop1] === value1 && obj[prop2] === value2 })
      }
    } else {
      return []
    }
  }

}
@Pipe({
  name: 'orderBy',
  pure: true
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[], column: string): any[] {
    let order = 'asc'
    if (!value || !column || column === '' || order === '') { return value; } // no array
    if (value.length <= 1) { return value; } // array with only one item
    return _.orderBy(value, [column], [order]);
  }
}


@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}

@Pipe({
  name: 'getcommentcount'
})
export class GetCommentCount implements PipeTransform {

  transform(arr: any[], prop1: string, value1: string): any {
    if (arr) {
      if (!value1) {
        return 0;
      } else {
        let countArry = arr.filter(obj => { return obj[prop1] === value1 });
        if (countArry.length > 0) {
          return countArry[0].commentcount;
        }
        return 0;
      }
    } else {
      return [];
    }
  }

}