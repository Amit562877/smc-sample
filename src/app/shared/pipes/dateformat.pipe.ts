import { Pipe, PipeTransform } from '@angular/core';
declare const moment: any;

@Pipe({ name: 'datepipe' })

export class DatePipe implements PipeTransform {
    constructor() { }
    transform(date: any) {
        try {
            return moment.utc(date).local().format();
        } catch (e) {
            console.log('date error->' + e);
        }
    }
}



