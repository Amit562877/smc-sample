import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'firstcharacter' })
export class FirstCharacterPipe implements PipeTransform {
    constructor() { }
    transform(strdata) {
        return strdata.charAt(0).toUpperCase();
    }
}
@Pipe({ name: 'firstcharactercolor' })
export class FirstCharacterColorPipe implements PipeTransform {
    constructor() { }
    transform(strdata: any) {
        return colorize(strdata.charAt(0).toUpperCase());
    }
}


function colorize(str) {
    let i = 0;
    let hash = 0;
    // tslint:disable-next-line: no-bitwise
    for (i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash)) { }
    const color = Math.floor(Math.abs((Math.sin(hash) * 11000) % 1 * 16732516)).toString(16);
    return '#' + Array(6 - color.length + 1).join('0') + color;
}
