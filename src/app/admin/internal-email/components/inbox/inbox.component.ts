import { Component, OnInit, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { ComposeboxComponent } from '../composebox/composebox.component';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { InternalMailService } from '../../services/internalmail.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { JQueryService } from 'src/app/shared/services/message/jQuery.service';
declare const $: any;
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboxComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  constructor(
    private cd: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private _platformId: Object,
    public loadService: LoaderService,
    private mservice: ToastService,
    private iemailservice: InternalMailService,
    private adataservice: AuthdataService,
    private jQueryService: JQueryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }
  @ViewChild(ComposeboxComponent, { static: false }) prop: ComposeboxComponent;
  compprop = new ComposeboxComponent(
    this.cd,
    this._platformId,
    this.loadService,
    this.mservice,
    this.iemailservice,
    this.adataservice
  );
  emailfilter: any = {
    pageindex: 1,
    pagesize: 50
  };
  userdata: any;
  emaillist = [];
  emaildata: any;
  inboxcount = 0;
  openmodal = 0;
  ngOnInit() {
    this.userdata = ((this.adataservice.getUserData()[0]));
    this.emailfilter.email = this.userdata.email;
    this.emailfilter.messagetype = 'inbox';
    this.emailfilter.messagestatus = 1;
    this.emailfilter.isstared = null;
    this.emailfilter.isread = null;
    this.jQueryService.loadJS({ src: 'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote-bs4.min.js', defer: true, async: true });
    this.jQueryService.loadCSS({ href: 'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote-bs4.css' });
    this.getEmailList();
  }

  getEmailList() {
    this.iemailservice.getEmails(this.emailfilter).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.emaillist = (data.outdatalist[0] !== 'No Data Found') ? JSON.parse(data.outdatalist[0]) : [];
        this.inboxcount = JSON.parse(data.outdatalist[1])[0].emailcount;
        this.loadService.loadme = false;
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', data.message, 'FAILED');
      }
      this.cd.markForCheck();
    });
  }
  getEmail(event) {
    this.iemailservice.getemail(event.id, event.tuid, this.userdata.email).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.emaildata = (data.outdatalist[0] !== 'No Data Found') ? JSON.parse(data.outdatalist[0]) : [];
        this.emaildata[0].euid = event.tuid;
        if (event.type === 'draft') {
          setTimeout(() => {
            this.prop.setData(this.emaildata[0]);
          }, 500);
          this.openmodal = 1;
        } else {
          this.openmodal = 2;
        }
        if (isPlatformBrowser(this._platformId)) {
          $('#mailBox').modal('show');
        }
      } else {
        this.mservice.generateMessage('ERROR', data.message, 'FAILED');
      }
      this.cd.markForCheck();
    });
  }
  getNext() {
    this.emailfilter.pageindex = this.emailfilter.pageindex + 1;
    this.getEmailList();
  }
  getPrevious() {
    this.emailfilter.pageindex = this.emailfilter.pageindex - 1;
    this.getEmailList();
  }
  getDrafts() {
    if (this.emailfilter.messagestatus !== 2) {
      this.emailfilter.messagestatus = 2;
      this.emailfilter.pageindex = 1;
      this.emailfilter.messagetype = 'draft';
      this.emailfilter.isstared = null;
      this.getEmailList();
    }
  }
  getInbox() {
    if (this.emailfilter.messagestatus !== 1) {
      this.emailfilter.pageindex = 1;
      this.emailfilter.messagestatus = 1;
      this.emailfilter.messagetype = 'inbox';
      this.emailfilter.isstared = null;
      this.getEmailList();
    }
  }
  getTrash() {
    if (this.emailfilter.messagestatus !== 4) {
      this.emailfilter.pageindex = 1;
      this.emailfilter.messagestatus = 4;
      this.emailfilter.messagetype = 'trash';
      this.emailfilter.isstared = null;
      this.getEmailList();
    }
  }
  getImportant() {
    if (this.emailfilter.messagestatus !== 3) {
      this.emailfilter.pageindex = 1;
      this.emailfilter.messagestatus = 3;
      this.emailfilter.messagetype = 'important';
      this.emailfilter.isstared = null;
      this.getEmailList();
    }
  }
  getSentMail() {
    if (this.emailfilter.messagestatus !== 5) {
      this.emailfilter.pageindex = 1;
      this.emailfilter.messagestatus = 5;
      this.emailfilter.messagetype = 'sent';
      this.emailfilter.isstared = null;
      this.getEmailList();
    }
  }
  getStared() {
    if (this.emailfilter.messagestatus !== 0) {
      this.emailfilter.pageindex = 1;
      this.emailfilter.messagestatus = 0;
      this.emailfilter.messagetype = 'stared';
      this.emailfilter.isstared = true;
      this.getEmailList();
    }
  }
  getReadUnreadStared(status) {
    this.emailfilter.isread = null;
    this.emailfilter.isstared = null;
    if (status === 1) {
      this.emailfilter.isread = true;
    } else if (status === 2) {
      this.emailfilter.isread = false;
    } else if (status === 3) {
      this.emailfilter.isstared = true;
    }
    this.getEmailList();
  }
  openComposeBox() {
    this.openmodal = 1;
  }
  successSent() {
    if (isPlatformBrowser(this._platformId)) {
      this.getEmailList();
      $('#mailBox').modal('hide');
    }
  }
  setStared(event) {
    this.iemailservice.manageStared(this.userdata.email, event.tuid, (event.isstared) ? false : true).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.getEmailList();
      } else {
        this.mservice.generateMessage('ERROR', data.message, 'FAILED');
      }
      this.cd.markForCheck();
    });
  }


  // select/unselect all check boxes
  checkAll(parentname: any, childname: any) {
    if (isPlatformBrowser(this._platformId)) {
      const checkboxes: any = document.getElementsByName(childname);
      const parentbox: any = document.getElementsByName(parentname);
      if (parentbox[0].checked) {
        for (const box of checkboxes) {
          box.checked = true;
        }
      } else {
        for (const box of checkboxes) {
          box.checked = false;
        }
      }
    }
    this.cd.markForCheck();
  }

  clearCheckAll(event) {
    if (isPlatformBrowser(this._platformId)) {
      const checkboxes: any = document.getElementsByName(event.sid);
      const parentbox: any = document.getElementsByName(event.did);
      let checkedboxes = 0;
      for (const box of checkboxes) {
        if (box.checked === true) {
          checkedboxes++;
        }
      }
      if (checkedboxes === checkboxes.length) {
        parentbox[0].checked = true;
      } else {
        parentbox[0].checked = false;
      }
      this.cd.markForCheck();
    }

  }

  emailAction(action) {
    const tuids = [];
    if (isPlatformBrowser(this._platformId)) {

      const checkboxes: any = document.getElementsByName('crs');
      for (const box of checkboxes) {
        if (box.checked === true) {
          tuids.push(box.id);
        }
      }
    }
    if (tuids.length > 0) {
      const courselistids = tuids.join(',');
      this.iemailservice.emailaction(this.userdata.email, courselistids, action, this.emailfilter.messagetype).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.getEmailList();
        } else {
          this.mservice.generateMessage('ERROR', data.message, 'FAILED');
        }
        this.cd.markForCheck();
      });
    }
  }
  removeMail(event) {
    this.iemailservice.emailaction(this.userdata.email, event, 4, this.emailfilter.messagetype).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        if (isPlatformBrowser(this._platformId)) {
          $('#mailBox').modal('hide');
        }
        this.getEmailList();
      } else {
        this.mservice.generateMessage('ERROR', data.message, 'FAILED');
      }
      this.cd.markForCheck();
    });
  }
  undoaction(event) {
    this.iemailservice.emailaction(this.userdata.email, event.id, 4, event.action).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        if (isPlatformBrowser(this._platformId)) {
          $('#mailBox').modal('hide');
        }
        this.getEmailList();
      } else {
        this.mservice.generateMessage('ERROR', data.message, 'FAILED');
      }
      this.cd.markForCheck();
    });
  }
  forward(event) {
    this.openmodal = 1;
    this.compprop.setHtml(event);
    this.cd.markForCheck();
  }
  closeWindow() {
    if (this.prop) {
      this.prop.cancelMail();
      this.cd.markForCheck();
    }
  }
  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
