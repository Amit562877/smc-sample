import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { InternalMailService } from '../../services/internalmail.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';

declare const $: any;
@Component({
  selector: 'app-view-mail',
  templateUrl: './view-mail.component.html',
  styleUrls: ['./view-mail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewMailComponent implements OnInit {
  @Input() mail: any;
  @Input() openReply = false;
  @Input() openReplyall = false;
  @Input() openForward = false;
  @Output() delete = new EventEmitter();
  @Output() success = new EventEmitter();
  @Output() forward = new EventEmitter();
  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private adataservice: AuthdataService,
    private iemailservice: InternalMailService,
    public loadService: LoaderService,
    private mservice: ToastService,
    private cd: ChangeDetectorRef,
  ) { }
  componentDestroyed$: Subject<boolean> = new Subject();
  apiurl = environment.API_URL_DOC;
  userdata: any;
  email: any = {};
  ngOnInit() {
  }
  printMail(divName) {
    if (isPlatformBrowser(this._platformId)) {
      const divToPrint = document.getElementById(divName);
      const newWin = window.open('', 'Print-Window');
      newWin.document.open();
      newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
      newWin.document.close();
      this.cd.markForCheck();
      setTimeout(() => { newWin.close(); }, 10);
    }
  }
  fnopenReply(action) {
    if (action === 'R') {
      this.openReply = true;
      this.openReplyall = false;
    } else {
      this.openReply = false;
      this.openReplyall = true;
    }

    if (isPlatformBrowser(this._platformId)) {
      setTimeout(() => {
        $('.Mailsummernote').summernote({
          placeholder: 'Message Body',
          tabsize: 2,
          height: 150
        });
        this.cd.markForCheck();
      }, 0);
    }
  }
  fnopenForward() {
    this.openReply = false;
    this.openReplyall = false;
    this.forward.emit($('#mailbody').html());
    this.cd.markForCheck();
  }
  deleteMail(id) {
    this.delete.emit(id);
    this.cd.markForCheck();
  }
  fileSlectionChanged(event) {
    const newFileList = Array.from(event.target.files);
    if (isPlatformBrowser(this._platformId)) {
      if (this.email.src) {
        this.email.src = this.email.src.concat(newFileList);
      } else {
        this.email.src = newFileList;
      }
      this.cd.markForCheck();
    }
  }
  removeImage(index) {
    this.email.src.splice(index, 1);
    this.cd.markForCheck();
  }
  public trackByIndex(index: number) {
    return index;
  }
  sendMail(status) {
    if (isPlatformBrowser(this._platformId)) {
      this.email.body = $('.note-editable').html();
    }
    this.userdata = ((this.adataservice.getUserData()[0]));
    this.email.createdby = this.userdata.uid;
    this.email.from = this.userdata.email;
    const formData: FormData = new FormData();
    formData.append('id', (this.mail[0].id) ? this.mail[0].id : 0);
    formData.append('to', this.mail[0].to_user);
    formData.append('cc', (this.openReplyall) ? this.mail[0].cc_users : '');
    formData.append('from', this.email.from);
    formData.append('messagebody', this.email.body.toString());
    formData.append('messagestatus', status);
    formData.append('subject', 'reply - ' + this.mail[0].subject);
    formData.append('createdby', (this.email.createdby) ? this.email.createdby : 1);
    if (this.email.src) {
      for (let i = 0; i < this.email.src.length; i++) {
        formData.append('UploadedImage', this.email.src[i], this.email.src[i].name);
      }
    }
    formData.append('isfile', (this.email.src) ? 'true' : 'false');
    // this.loadService.loadme = true;
    this.iemailservice.sendemail(formData).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.mservice.generateMessage('SUCCESS', 'email sent successfuly.', 'SUCCESS');
        //  this.loadService.loadme = false;
        this.email = {};
        this.openReply = false;
        this.openForward = false;
        this.openReplyall = false;
        $('.note-editable').html('');
        this.success.emit();
        this.cd.markForCheck();

      } else {
        // this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', data.message, 'FAILED');
      }
    });
  }
  cancelMail() {
    this.email = {};
    this.openReply = false;
    this.openReplyall = false;
    this.cd.markForCheck();
  }
}
