import { Directive, HostListener, Input } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

declare const $: any;
@Directive({
  selector: '[appScollfocus]'
})
export class ScollfocusDirective {
  @Input() public prefix: any;
  @Input() public index: any;

  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object

  ) { }
  @HostListener('click', ['$event'])
  onclick(event: any) {
    if (isPlatformBrowser(this._platformId)) {
      document.getElementById(this.prefix + '' + this.index).scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }
}
