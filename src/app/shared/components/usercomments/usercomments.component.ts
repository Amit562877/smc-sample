import { Component, OnInit, ChangeDetectorRef, NgZone, ChangeDetectionStrategy, OnDestroy, Input } from '@angular/core';
import { UsercommentService } from 'src/app/services/usercomment.service';
import * as jwt_decode from 'jwt-decode';
import { Inject, PLATFORM_ID } from '@angular/core';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { SecureDocsService } from '../../services/securedocs.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
declare const $: any;
@Component({
  selector: 'app-usercomments',
  templateUrl: './usercomments.component.html',
  styleUrls: ['./usercomments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsercommentsComponent implements OnInit {
  componentDestroyed$: Subject<boolean> = new Subject();
  constructor(
    private adataservice: AuthdataService,
    private secureDocsService: SecureDocsService,
    private cd: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) { }
  @Input() securenotes = [];
  @Input() quesid: any;
  notsent = false;
  note: any = {};
  securelink: any = {};
  userdata: any;
  ngOnInit() {

  }
  userdatainfo = {};
  manageSecureNotes(secorenote, form, quesid) {
    if (form.valid) {

      this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (this.adataservice.getUserData()[0]) : '';
      this.securelink = JSON.parse(sessionStorage.getItem('securelinkjson'));

      const email = (localStorage.getItem('socialtoken')) ? jwt_decode(localStorage.getItem('socialtoken')).email : '';
      this.notsent = true;
      secorenote.isdeleted = false;
      secorenote.isactive = true;
      secorenote.quesid = quesid;
      secorenote.linkid = this.securelink.id;
      secorenote.email = (this.userdata) ? this.userdata.email : (email) ? email : '';
      secorenote.createdby = (this.userdata) ? this.userdata.uid : 0;
      secorenote.ulink = this.securelink.ulink;
      this.cd.markForCheck();
      this.secureDocsService.manageSecureNotes(secorenote).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.note.id = data.outdatalist[0][0].id;
          this.securenotes.push(this.note);
          this.note = {};
          // setTimeout(function () {
          //   $('#cpanel').scrollTop($('#cpanel').height());
          //   $('#comment').focus();
          // }, 500);
          this.notsent = false;
          this.cd.markForCheck();
        } else {

        }
      });
    }
  }
}
