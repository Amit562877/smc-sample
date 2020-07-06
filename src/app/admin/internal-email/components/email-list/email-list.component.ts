import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailListComponent implements OnInit {
  @Input() emaillist: any;
  @Input() emailtype: any;
  @Input() useremail: any;
  @Output() stared = new EventEmitter();
  @Output() clearcheck = new EventEmitter();
  @Output() removeserve = new EventEmitter();
  @Output() undoserve = new EventEmitter();
  @Output() getmailserve = new EventEmitter();
  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
  }
  setStared(email) {
    this.stared.emit(email);
  }
  clearCheckAll(did, sid) {
    this.clearcheck.emit({ did, sid });
  }
  remove(id) {
    this.removeserve.emit(id);
  }
  getmail(id, tuid, type) {
    this.getmailserve.emit({ id, tuid, type });
  }
  undo(id) {
    this.undoserve.emit({ id, action: 'undo' });
  }
}
