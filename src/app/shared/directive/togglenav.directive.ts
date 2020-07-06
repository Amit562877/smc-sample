import { Directive, HostListener } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

declare const $: any;
@Directive({
  selector: '[appTogglenav]'
})
export class TogglenavDirective {
  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object
  ) { }
  @HostListener('window:keydown', ['$event'])
  onkeydown(event: any) {
    if (isPlatformBrowser(this._platformId)) {
      if (event.keyCode === 66 && event.ctrlKey) {
        if ($('.page-wrapper').hasClass('toggled')) {
          $('.page-wrapper').removeClass('toggled');
        } else {
          $('.page-wrapper').addClass('toggled');
        }
      }
    }
  }
}
