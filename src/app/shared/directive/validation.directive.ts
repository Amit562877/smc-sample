import { Directive, Injectable, Input, HostListener } from '@angular/core';
declare const $: any;
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Directive({
  selector: '[appValidation]'
})
export class ValidationDirective {

  @Input() public form: any;
  @Input() public validparent: any;
  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object

  ) { }
  issubmitted = false;

  @HostListener('click', ['$event'])
  onWindowScroll(event: any) {
    if (isPlatformBrowser(this._platformId)) {
      this.issubmitted = true;
      const formelements = Object.keys(this.form.controls);
      formelements.forEach(element => {
        this.validateme(element);
      });
      $('.invalid:first').focus();
    }
  }

  @HostListener('window:change', ['$event'])
  valueChange(event: any) {
    if (isPlatformBrowser(this._platformId)) {
      if (this.issubmitted) {
        const formelements = Object.keys(this.form.controls);
        const name = event.target.dataset.name;
        formelements.forEach(element => {
          if (element === name) {
            const nodeelm: any = $('[data-name=' + element + ']');
            for (const node of nodeelm) {
              this.validateme(element);
            }
          }
        });
      }
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyPress(event: any) {
    if (isPlatformBrowser(this._platformId)) {
      if (this.issubmitted) {
        const formelements = Object.keys(this.form.controls);
        const name = event.target.dataset.name;
        formelements.forEach(element => {
          if (element === name) {
            const nodeelm: any = $('[data-name=' + element + ']');
            for (const node of nodeelm) {
              this.validateme(element);
            }
          }
        });
      }
    }
  }

  validateme(element) {
    try {
      if (isPlatformBrowser(this._platformId)) {
        const nodeelm: any = $('[data-name=' + element + ']');
        for (const node of nodeelm) {
          node.addEventListener('window:change', (() => {
            'valueChange()';
          }), false);
          node.addEventListener('window:keyup', (() => {
            'keyPress()';
          }), false);
          if (this.form.controls[element].invalid) {
            $('.invalid:first').focus();
            node.classList.add('invalid');
            const elmentdmold: any = document.getElementById(element + 'err');
            if (!elmentdmold) {
              const elmentdm: any = document.createElement('div');
              elmentdm.classList.add('text-danger');
              elmentdm.setAttribute('id', element + 'err');
              let suffix = '';
              if (this.form.controls[element].errors.required) {
                if (node.dataset.type === 'select') {
                  suffix = ' must be selected!';
                } else {
                  suffix = ' must not be blank!';
                }
              } else if (this.form.controls[element].errors.pattern) {
                if (node.dataset.type === 'select') {
                  suffix = ' must match the format!';
                } else {
                  suffix = ' must match the format!';
                }
              }
              elmentdm.innerHTML = ((node.dataset.prefix) ? node.dataset.prefix : 'Field') + suffix;
              if (this.validparent) {
                $('[data-name=' + element + ']').closest('.' + this.validparent).append(elmentdm);
              } else {
                $('[data-name=' + element + ']').after(elmentdm);
              }
            } else {
              let suffix = '';
              if (this.form.controls[element].errors.required) {
                if (node.dataset.type === 'select') {
                  suffix = ' must be selected!';
                } else {
                  suffix = ' must not be blank!';
                }
              } else if (this.form.controls[element].errors.pattern) {
                if (node.dataset.type === 'select') {
                  suffix = ' must match the format!';
                } else {
                  suffix = ' must match the format!';
                }
              }
              elmentdmold.innerHTML = ((node.dataset.prefix) ? node.dataset.prefix : 'Field') + suffix;
            }
          } else {
            node.classList.remove('invalid');
            if ($('#' + element + 'err').length) {
              $('#' + element + 'err').remove();
            }
          }
        }
      }
    } catch (e) {
      console.log('try-catch error:', e);
    }
  }
}
