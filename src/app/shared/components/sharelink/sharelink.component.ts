import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Output, EventEmitter, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
import { SecureDocsService } from 'src/app/shared/services/securedocs.service';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { ToastService } from '../../services/message/toast.service';
declare const $: any;
@Component({
  selector: 'app-sharelink',
  templateUrl: './sharelink.component.html',
  styleUrls: ['./sharelink.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharelinkComponent implements OnInit, OnDestroy {
  private location: Location;
  componentDestroyed$: Subject<boolean> = new Subject()
  @Output() setPersmission = new EventEmitter<string>();
  @Output() showBackbtn = new EventEmitter<boolean>();
  @Output() loadsharelink = new EventEmitter<string>();
  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private encdec: EncDecService,
    private secureDocsService: SecureDocsService,
    private authdataService: AuthdataService,
    private mService: ToastService

  ) { }
  permissionslist: any = [];
  permissions: any = {};
  securelink: any = {};
  requestedUsers: any = [];
  securelinkusers: any = [];
  securelinkhistory = [];
  email: any = '';
  permission: any = 'Edit';
  showshare = false;
  userdata: any = {};
  securenotes = [];
  showchat = false;
  showchatbutton = false;
  notsent = false;
  note: any = {};
  linksending = false;
  docowner: any = [];
  closeModel() {
    $('#sharelink').modal('hide');
    $('.modal-backdrop').remove();
  }
  ngOnInit() {
    $(document).on('show.bs.modal', '.modal', function () {
      var zIndex = 1040 + (10 * $('.modal:visible').length);
      $(this).css('z-index', zIndex);
      setTimeout(function () {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
      }, 0);
    });
    this.permissions = this.authdataService.getPermission('Secure link');
    this.showshare = this.permissions.canShare;
    var agentInfo = this.authdataService.getAgentInfo();
    if (agentInfo === null) {
      agentInfo = {
        agentLogoURL: environment.agentLogoURL,
        agentAddress: environment.agentAddress,
        agentContact: environment.agentContact,
        agentWebURL: environment.agentWebURL,
        agentOrganization: environment.agentOrganization,
        companyemail: this.encdec.encryptSensitive(environment.cemail),
        emailpassword: this.encdec.encryptSensitive(environment.cp),
      }
    }
    this.userdata = (this.authdataService.getUserData() != '' && this.authdataService.getUserData() != null) ? (this.authdataService.getUserData()[0]) : '';
    if (isPlatformBrowser(this._platformId)) {
      const paramdata = this.router.url.toString().split('/');
      paramdata.splice(3, 1);
      this.securelink.olink = (window.location.origin + decodeURIComponent(paramdata.join('/'))).toString();
      this.securelink.ulink = window.location.origin + '/program/search/' + this.encdec.convertText('enc', (this.securelink.olink), true);
      this.securelink.accesscode = this.makeid(10);
      this.securelink.codepermission = 'View';
      this.securelink.docowner = (this.userdata) ? this.userdata.email : '';
      this.securelink.linkorigin = window.location.origin;
      this.securelink.linksuffix = decodeURIComponent(paramdata.join('/')).toString();
      this.securelink.createdby = (this.userdata) ? this.userdata.uid : 0;
      this.securelink.projectid = (this.userdata) ? this.userdata.projectid : 0;
      this.securelink.isactive = 1;
      this.securelink.isdeleted = 0;
      this.securelink.canshare = false;
      this.securelink.acceptpasscode = false;
      this.securelink.agentLogo = agentInfo.agentLogoURL;
      this.securelink.agentAddress = agentInfo.agentAddress;
      this.securelink.agentContact = agentInfo.agentContact;
      this.securelink.agentWeb = agentInfo.agentWebURL;
      this.securelink.agentOrganization = agentInfo.agentOrganization;
      this.securelink.agentDetails = this.encdec.encryptSensitiveV1(JSON.stringify(agentInfo));
      this.securelink.isagent = this.permissions.canShare;
    }
    if (isPlatformBrowser(this._platformId)) {
      this.secureDocsService.addSecureLink(this.securelink).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          if (data.outdatalist[0].length > 0) {
            this.securelink = data.outdatalist[0][0];
            if (this.authdataService.getAgentInfo() === null) {
              const adetails = this.securelink.agentDetails;
              this.authdataService.setAgentInfo(JSON.parse(this.encdec.decryptSensitiveV1(adetails)));
            }
            sessionStorage.setItem('securelinkjson', this.encdec.encryptSensitiveV1(JSON.stringify(this.securelink)));
            this.loadsharelink.emit('');
            this.securelinkusers = data.outdatalist[1];
            let emailowner = (this.userdata) ? this.userdata.email : (localStorage.getItem('socialtoken')) ? jwt_decode(localStorage.getItem('socialtoken')).email : '';
            if ((this.securelink.docowner === emailowner) || this.permissions.canShare) {
              this.showshare = true;
              this.showBackbtn.emit(true);

              if ((this.securelink.docowner === emailowner)) {
                this.secureDocsService.getRequests(this.securelink.id, this.securelink.docowner).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
                  if (data.flag) {
                    this.requestedUsers = data.outdatalist[0];
                    if (this.requestedUsers.length > 0) {
                      $('#sharelink').modal('show');
                    }
                    if (data.outdatalist[1].length > 0) {
                      this.setPersmission.emit(data.outdatalist[1][0].permission);
                      if (data.outdatalist[1][0].permission === 'Edit') {
                        this.permissionslist = ['Edit', 'View'];
                      } else {
                        this.permissionslist = ['View'];
                      }
                    }
                    this.cd.markForCheck();
                  }
                });
              } else {
                if (this.securelink.docowner) {
                  if (data.outdatalist.length > 2 && data.outdatalist[2].length > 0) {
                    this.docowner = data.outdatalist[2];
                  }
                }
                this.permissionslist = ['Edit', 'View'];
                this.setPersmission.emit('Edit');
              }
            } else {
              if (!this.authdataService.isAuthenticated() && !this.userdata && !localStorage.getItem('socialtoken') && !localStorage.getItem('passcode')) {
                //$('#loginoptions').modal({ backdrop: 'static', keyboard: false, show: true });
                this.router.navigate(['/program/search/' + this.encdec.convertText('enc', (this.securelink.olink), true)]);
                this.cd.markForCheck();
              } else {
                const permissiondata = localStorage.getItem('passcode');
                const socialtoken = localStorage.getItem('socialtoken');
                if (!this.showshare && permissiondata && !socialtoken) {
                  this.secureDocsService.checkPermissionPasscode(this.securelink.olink, permissiondata, '').pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
                    if (data.flag && data.outdatalist[0].length > 0) {
                      this.showchatbutton = true;

                      //if (data.outdatalist[0][0].codepermission === 'View') {
                      this.setPersmission.emit(data.outdatalist[0][0].codepermission);
                      // $('input').attr('disabled', true);
                      // $('select').attr('disabled', true);
                      // $('textarea').attr('disabled', true);
                      // $('button').attr('disabled', true);
                      // }
                    } else {
                      this.router.navigate(['/program/search/' + this.encdec.convertText('enc', (this.securelink.olink), true)]);
                    }
                    this.cd.markForCheck();
                  });
                } else if (!this.showshare && socialtoken && !permissiondata) {
                  this.email = jwt_decode(socialtoken).email;
                  this.secureDocsService.checkPermission(this.securelink.olink, this.email).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
                    if (data.flag) {
                      if (data.outdatalist[1][0].id > 0) {
                        if (data.outdatalist[0].length === 0 || !data.outdatalist[0][0].isactive) {
                          this.router.navigate(['/program/search/' + this.encdec.convertText('enc', (this.securelink.olink), true)]);
                        } else {
                          this.showchatbutton = true;
                          const socialaccess = data.outdatalist[0][0].permission;
                          if (data.outdatalist.length > 2 && data.outdatalist[2].length > 0) {
                            if (data.outdatalist[2][0].permission === 'Edit') {
                              this.setPersmission.emit(data.outdatalist[0][0].permission);
                            } else {
                              this.setPersmission.emit('View');
                            }
                          }
                          //if (socialaccess && socialaccess === 'View') {

                          // $('input').attr('disabled', true);
                          // $('select').attr('disabled', true);
                          // $('textarea').attr('disabled', true);
                          // $('button').attr('disabled', true);
                          // }
                        }
                      }
                    }
                    this.cd.markForCheck();
                  });
                } else if (!this.showshare && socialtoken && permissiondata) {
                  this.email = jwt_decode(socialtoken).email;
                  this.secureDocsService.checkPermission(this.securelink.olink, this.email).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
                    if (data.flag) {
                      if (data.outdatalist[1][0].id > 0) {
                        if (data.outdatalist[0].length === 0 || !data.outdatalist[0][0].isactive) {
                          this.secureDocsService.checkPermissionPasscode(this.securelink.olink, permissiondata, '').pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
                            if (data.flag && data.outdatalist[0].length > 0) {
                              this.showchatbutton = true;
                              this.cd.markForCheck();

                              // if (data.outdatalist[0][0].codepermission === 'View') {
                              this.setPersmission.emit(data.outdatalist[0][0].codepermission);
                              // $('input').attr('disabled', true);
                              // $('select').attr('disabled', true);
                              // $('textarea').attr('disabled', true);
                              // $('button').attr('disabled', true);
                              //}
                            } else {
                              this.router.navigate(['/program/search/' + this.encdec.convertText('enc', (this.securelink.olink), true)]);
                            }
                            this.cd.markForCheck();
                          });
                        } else {
                          this.showchatbutton = true;
                          // if (data.outdatalist[0][0].permission && data.outdatalist[0][0].permission === 'View') {
                          if (data.outdatalist.length > 2 && data.outdatalist[2].length > 0) {
                            if (data.outdatalist[2][0].permission === 'Edit') {
                              this.setPersmission.emit(data.outdatalist[0][0].permission);
                            } else {
                              this.setPersmission.emit('View');
                            }
                          }
                          // $('input').attr('disabled', true);
                          // $('select').attr('disabled', true);
                          // $('textarea').attr('disabled', true);
                          // $('button').attr('disabled', true);
                          // }
                        }
                      }
                    }
                    this.cd.markForCheck();
                  });
                } else if (!this.showshare && !socialtoken && !permissiondata && this.userdata) {
                  this.secureDocsService.checkPermission(this.securelink.olink, this.userdata.email).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
                    if (data.flag) {
                      if (data.outdatalist[1][0].id > 0) {
                        if (data.outdatalist[0].length === 0 || !data.outdatalist[0][0].isactive) {
                          this.router.navigate(['/program/search/' + this.encdec.convertText('enc', (this.securelink.olink), true)]);
                        } else {
                          this.showchatbutton = true;
                          // if (data.outdatalist[0][0].permission && data.outdatalist[0][0].permission === 'View') {
                          if (data.outdatalist.length > 2 && data.outdatalist[2].length > 0) {
                            if (data.outdatalist[2][0].permission === 'Edit') {
                              this.setPersmission.emit(data.outdatalist[0][0].permission);
                            } else {
                              this.setPersmission.emit('View');
                            }
                          }
                          // $('input').attr('disabled', true);
                          // $('select').attr('disabled', true);
                          // $('textarea').attr('disabled', true);
                          // $('button').attr('disabled', true);
                          // }
                        }
                      }
                    }
                    this.cd.markForCheck();
                  });
                }
              }
            }
            this.cd.markForCheck();
          } else {
            this.mService.generateMessage('ERROR', 'Can\' find link', 'Failed');
          }
        }
      });
    }
  }
  openchat() {
    this.showchat = !this.showchat;
    if (this.showchat) {
      // this.getSecureNotes();
      setTimeout(function () {
        $('#cpanel').scrollTop($('#cpanel').height());
        $('#comment').focus();
      }, 500);
      this.cd.markForCheck();
    }
  }
  // getSecureNotes() {
  //   this.secureDocsService.getSecureNotes(this.securelink.id).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
  //     if (data.flag) {
  //       this.securenotes = data.outdatalist[0];
  //       this.cd.markForCheck();
  //     }
  //   });
  // }
  // manageSecureNotes(secorenote, form) {
  //   if (form.valid) {
  //     this.notsent = true;
  //     secorenote.isdeleted = false;
  //     secorenote.isactive = true;
  //     secorenote.linkid = this.securelink.id;
  //     secorenote.email = (this.userdata) ? this.userdata.email : (this.email) ? this.email : '';
  //     secorenote.createdby = 1;
  //     secorenote.ulink = this.securelink.ulink;
  //     this.cd.markForCheck();
  //     this.secureDocsService.manageSecureNotes(secorenote).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
  //       if (data.flag) {
  //         this.note.id = data.outdatalist[0][0].id;
  //         this.securenotes.push(this.note);
  //         this.note = {};
  //         setTimeout(function () {
  //           $('#cpanel').scrollTop($('#cpanel').height());
  //           $('#comment').focus();
  //         }, 500);
  //         this.notsent = false;
  //         this.cd.markForCheck();
  //       } else {

  //       }
  //     });
  //   }
  // }
  goForAccesscode() {
    this.router.navigate(['/program/search/accesscode/' + this.encdec.convertText('enc', (window.location.origin + decodeURIComponent(this.router.url)), true)]);
  }
  // forward(option) {
  //   if (option === 'G') {
  //     $('#loginoptions').modal('hide');
  //     $('.modal-backdrop').remove();
  //     this.router.navigate(['/program/search/' + this.encdec.convertText('enc', (window.location.origin + decodeURIComponent(this.router.url)))]);
  //   } else {
  //     $('#loginoptions').modal('hide');
  //     $('.modal-backdrop').remove();
  //     this.router.navigate(['/auth/login']);
  //   }
  // }
  addShareLink() {
    // this.secureDocsService.addSecureLink(this.securelink).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
    //   if (data.flag) {
    //     this.securelink = data.outdatalist[0][0];
    //     this.securelinkusers = data.outdatalist[1];
    //   }
    // });
  }
  setPermission(user, index) {
    let emailuser = (this.userdata) ? this.userdata.email : (localStorage.getItem('socialtoken')) ? jwt_decode(localStorage.getItem('socialtoken')).email : '';
    this.secureDocsService.setPermission(this.securelink.id, user.emailid, emailuser).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.securelinkusers.push(user);
        this.requestedUsers.splice(index, 1);
        this.cd.markForCheck();
      }
    });
  }
  editShareLink() {
    if (isPlatformBrowser(this._platformId)) {
      this.securelink.canshare = $('#canshare').is(':checked');
      this.securelink.acceptpasscode = $('#allowaccesscode').is(':checked');
    }
    let emailuser = (this.userdata) ? this.userdata.email : (localStorage.getItem('socialtoken')) ? jwt_decode(localStorage.getItem('socialtoken')).email : '';
    this.secureDocsService.editSecurelinkaccess(this.securelink.id, this.securelink.canshare, this.securelink.acceptpasscode, this.securelink.codepermission, this.securelink.createdby, emailuser).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.cd.markForCheck();
      }
    });
  }
  getShareLinkHistory() {
    let emailuser = (this.userdata) ? this.userdata.email : (localStorage.getItem('socialtoken')) ? jwt_decode(localStorage.getItem('socialtoken')).email : '';
    this.secureDocsService.getSecureListHistory(this.securelink.id, emailuser).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.securelinkhistory = data.outdatalist[0];
        this.cd.markForCheck();
      }
    });
  }
  addShareLinkUser(form) {
    if (form.valid) {
      this.linksending = true;
      const agentInfo = this.authdataService.getAgentInfo();
      let leadname = '';
      if (agentInfo && agentInfo.autoFillJSON) {
        leadname = agentInfo.autoFillJSON.leadfirstname + ' ' + agentInfo.autoFillJSON.leadlastname;
      }
      const secureuser: any = {};
      secureuser.linkid = this.securelink.id;
      secureuser.emailid = this.email;
      secureuser.leadname = (leadname.trim().length > 0) ? leadname : this.email;
      secureuser.ulink = this.securelink.ulink;
      secureuser.createdby = this.userdata.uid;
      secureuser.permission = this.permission;
      secureuser.isactive = 1;
      secureuser.isdeleted = 0;
      secureuser.requesttype = 'system';
      secureuser.agentContact = agentInfo.agentContact;
      secureuser.agentOrganization = agentInfo.agentOrganization;
      secureuser.agentWeb = agentInfo.agentWebURL;
      secureuser.agentLogo = agentInfo.agentLogoURL;
      secureuser.euid = this.encdec.encryptSensitive(agentInfo.companyemail);
      secureuser.epid = this.encdec.encryptSensitive(this.encdec.convertTextThirdParty('dec', agentInfo.emailpassword));
      secureuser.actionby = (this.userdata) ? this.userdata.email : (localStorage.getItem('socialtoken')) ? jwt_decode(localStorage.getItem('socialtoken')).email : '';
      secureuser.accesscode = this.securelink.accesscode;

      this.secureDocsService.addSecureLinkUsers(secureuser).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          if (data.outdata != -1) {
            secureuser.id = data.outdata;
            if (this.securelink.docowner) {
              this.securelinkusers.push(secureuser);
            }
            else {
              this.securelink.docowner = secureuser.emailid;
              this.docowner.push({ email: this.securelink.docowner });
            }
            this.email = '';
            this.permission = 'Edit';
            this.mService.generateMessage('SUCCESS', 'User added successfully', 'SUCCESS');
            this.linksending = false;
            this.cd.markForCheck();
          }
        } else {
          this.linksending = false;
          this.cd.markForCheck();
          this.mService.generateMessage('INFO', data.message, '');
        }
      });
    }
  }
  editShareLinkUser(id, permission, action, actiontype, index) {
    let email = (this.userdata) ? this.userdata.email : (localStorage.getItem('socialtoken')) ? jwt_decode(localStorage.getItem('socialtoken')).email : '';
    this.secureDocsService.removeSecureLinkUsers(id, ((action === 'R') ? true : false), email, permission).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        if (action === 'R' && actiontype === 'P') {
          this.securelinkusers.splice(index, 1);
        } else if (action === 'R' && actiontype === 'R') {
          this.requestedUsers.splice(index, 1);
        }
        this.cd.markForCheck();
      }
    });
  }
  removeDocOwner(emaildoc) {
    let email = (this.userdata) ? this.userdata.email : (localStorage.getItem('socialtoken')) ? jwt_decode(localStorage.getItem('socialtoken')).email : '';
    this.secureDocsService.removedocowner(this.securelink.id, email, emaildoc).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.docowner = [];
        this.securelink.docowner = null;
        this.cd.markForCheck();
      }
    });
  }
  makeid(length) {
    let result = '';
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.cd.markForCheck();
    return result;

  }
  public trackByIndex(index: number) {
    return index;
  }
  ngOnDestroy() {
    if (isPlatformBrowser(this._platformId)) {
      // localStorage.setItem('socialtoken', null);
      // localStorage.setItem('passcode', null);
    }
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
