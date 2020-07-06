import { Directive, Input, HostListener } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
declare const $: any;
@Directive({
  selector: '[appClearValidation]'
})
export class ClearValidationDirective {
  @Input() public form: any;
  @Input() public resetform: any = false;
  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object
  ) { }

  @HostListener('click', ['$event'])
  onclick(event: any) {
    if (isPlatformBrowser(this._platformId)) {
      const formelements = Object.keys(this.form.controls);
      formelements.forEach(element => {
        const nodeelm: any = $('[data-name=' + element + ']');
        for (const node of nodeelm) {
          node.classList.remove('invalid');
          if ($('#' + element + 'err').length) {
            $('#' + element + 'err').remove();
          }
        }
      });
      if (this.resetform) {
        this.form.reset();
      }
    }
  }
}
