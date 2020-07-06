import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Output, EventEmitter, Input } from '@angular/core';

import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { InternalMailService } from '../../services/internalmail.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthdataService } from 'src/app/auth/services/authdata.service';

declare const $: any;
@Component({
  selector: 'app-composebox',
  templateUrl: './composebox.component.html',
  styleUrls: ['./composebox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComposeboxComponent implements OnInit, OnDestroy {
  @Output() success = new EventEmitter();
  constructor(
    private cd: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private _platformId: Object,
    public loadService: LoaderService,
    private mservice: ToastService,
    private iemailservice: InternalMailService,
    private adataservice: AuthdataService,
  ) { }
  emaillist: any = [];
  email: any = {};
  tolist = [];
  olduploads: any = [];
  cclist = [];
  oldfile = [];
  componentDestroyed$: Subject<boolean> = new Subject();
  userdata: any;

  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      setTimeout(() => {
        $('.Mailsummernote').summernote({
          placeholder: 'Message Body',
          tabsize: 2,
          height: 200
        });
      }, 100);

      this.userdata = ((this.adataservice.getUserData()[0]));
      this.email.createdby = this.userdata.uid;
      this.email.from = this.userdata.email;
    }
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
  removeoldImage(index) {
    this.oldfile.splice(index, 1);
    this.cd.markForCheck();
  }
  removeImage(index) {
    this.email.src.splice(index, 1);
    this.cd.markForCheck();
  }
  public trackByIndex(index: number) {
    return index;
  }
  setHtml(html) {
    if (isPlatformBrowser(this._platformId)) {
      setTimeout(() => {
        $('.Mailsummernote').summernote({
          placeholder: 'Message Body',
          tabsize: 2,
          height: 200
        });
      }, 100);
      setInterval(() => {
        if ($('.note-editable').length > 0) {
          $('.note-editable').html(html);
        }
      }, 10);

    }
  }
  setData(data) {
    this.tolist = (data.to_user) ? data.to_user.split(',') : [];
    this.cclist = (data.cc_users) ? data.cc_users.split(',') : [];
    this.email.subject = (data.subject && data.subject !== undefined && data.subject !== '  undefined') ? data.subject : '';
    this.email.id = data.id;
    $('.note-editable').html(data.messagebody);
    this.olduploads = data.ea;
    this.olduploads.forEach(element => {
      if (element.filename) {
        this.oldfile.push(element.filename);
      }
    });
    this.cd.markForCheck();
  }
  sendMail(status) {
    if (isPlatformBrowser(this._platformId)) {
      this.email.body = $('.note-editable').html();
    }


    if (this.tolist.length > 0) {
      this.userdata = ((this.adataservice.getUserData()[0]));
      this.email.createdby = this.userdata.uid;
      this.email.from = this.userdata.email;
      const formData: FormData = new FormData();
      formData.append('id', (this.email.id) ? this.email.id : 0);
      formData.append('to', this.tolist.join(','));
      formData.append('cc', this.cclist.join(','));
      formData.append('from', this.email.from);
      formData.append('messagebody', this.email.body.toString());
      formData.append('messagestatus', status);
      formData.append('subject', (this.email.subject && this.email.subject !== undefined) ? this.email.subject : '');
      formData.append('oldfile', this.oldfile.join(','));
      formData.append('createdby', this.adataservice.getUserId());
      if (this.email.src) {
        for (let i = 0; i < this.email.src.length; i++) {
          formData.append('UploadedImage', this.email.src[i], this.email.src[i].name);
        }
      }
      formData.append('isfile', (this.email.src || this.oldfile.length > 0) ? 'true' : 'false');
      // this.loadService.loadme = true;
      this.iemailservice.sendemail(formData).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.mservice.generateMessage('SUCCESS', (status === 1) ? 'email sent successfuly.' : 'Draft saved successfuly.', 'SUCCESS');
          //  this.loadService.loadme = false;
          this.email = {};
          $('.note-editable').html('');
          this.success.emit();
        } else {
          // this.loadService.loadme = false;
          this.mservice.generateMessage('ERROR', data.message, 'FAILED');
        }
        this.cd.markForCheck();
      });
    } else {
      this.mservice.generateMessage('ERROR', 'Please select at least one recipient.', 'FAILED');
    }

  }
  cancelMail() {
    this.email = {};
    this.tolist = [];
    this.cclist = [];
    this.olduploads = [];
    $('.note-editable').html('');
    this.cd.markForCheck();
  }
  getuseremail(email) {
    this.iemailservice.getuseremail(email).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.emaillist = (data.outdatalist[0]) ? data.outdatalist[0] : [];
        this.cd.markForCheck();
      }
    });
  }

  // multiple entry
  addToList(email) {
    if (this.tolist.filter(elm => elm === email).length === 0) {
      this.tolist.push(email);
      this.emaillist = [];
      this.email.to = '';
    } else {
      this.mservice.generateMessage('ERROR', email + ' is already added in the list', 'Already added');
    }

  }
  removeEmailTo(index) {
    this.tolist.splice(index, 1);
    this.cd.markForCheck();
  }
  addCCList(email) {
    if (this.cclist.filter(elm => elm === email).length === 0) {
      this.cclist.push(email);
      this.emaillist = [];
      this.email.cc = '';
    } else {
      this.mservice.generateMessage('ERROR', email + ' is already added in the list', 'Already added');
    }

  }
  removeEmailCC(index) {
    this.cclist.splice(index, 1);
    this.cd.markForCheck();
  }
  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
