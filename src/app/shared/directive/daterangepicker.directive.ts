import { Directive, OnInit, EventEmitter, Input, HostListener, Output } from '@angular/core';

import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

declare const $: any;
declare const moment: any;
@Directive({
  selector: '[appDaterangepicker]'
})
export class DaterangepickerDirective implements OnInit {
  @Input() useme: any;
  @Input() startDate: any;
  @Input() endDate: any;
  @Output() public sectionChange = new EventEmitter<any>();
  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object
  ) { }
  currentele = '';
  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.currentele = this.useme;
      this.startDate = moment(this.startDate);
      this.endDate = moment(this.endDate);

      $('#' + this.useme).daterangepicker({
        startDate: this.startDate,
        endDate: this.endDate,
        ranges: {
          Today: [moment(), moment()],
          Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
          'Last 7 Days': [moment().subtract(6, 'days'), moment()],
          'Last 30 Days': [moment().subtract(29, 'days'), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
          'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
      }, this.cb);
      this.cb(this.startDate, this.endDate);
      $('#' + this.useme).on('apply.daterangepicker', ((ev, picker) => {
        this.raiseEvent(picker);
      }));
    }

  }
  cb(start, end) {
    $('#' + this.currentele + ' span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
  }
  raiseEvent(picker) {
    if (isPlatformBrowser(this._platformId)) {
      this.sectionChange.emit({ startDate: picker.startDate.format('YYYY-MM-DD'), endDate: picker.endDate.format('YYYY-MM-DD') });
    }
  }
}

