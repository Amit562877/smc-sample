import { Component, OnInit } from '@angular/core';
import { SMCAuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthdataService } from '../../services/authdata.service';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';

@Component({
  selector: 'app-appinit',
  templateUrl: './appinit.component.html',
  styleUrls: ['./appinit.component.scss']
})
export class AppinitComponent implements OnInit {

  constructor(
    private authService: SMCAuthService,
    private router: Router,
    public adataservice: AuthdataService,
    private route: ActivatedRoute,
    private encdec: EncDecService,
    private mservice: ToastService
  ) { }
  userdata: any;
  agentInfo: any = {};
  autoFillJSON: any;
  issmcloggedin = false;
  ngOnInit() {
    this.route.queryParamMap.subscribe(queryParams => {
      this.agentInfo = JSON.parse(this.encdec.decryptSensitiveVThirdParty(queryParams.get('agentdata').toString()));
    });
    this.makelogin();
  }
  clear() {
    this.adataservice.setToken('');
    this.adataservice.setUserData('');
    this.adataservice.setMenu('');
    this.adataservice.setPermission('');
    this.adataservice.setAgentInfo('');
    this.makelogin();
  }
  makelogin() {
    sessionStorage.removeItem('ispopup');
    sessionStorage.setItem('kondeskleadid', '');
    //this.agentInfo.agentLogoURL = "https://media-exp1.licdn.com/dms/image/C4D0BAQEaxsjMO7cpsQ/company-logo_200_200/0?e=2159024400&v=beta&t=nFRnDi8j6sKip0l17XCytpfgbSz2HEzeRI_XVrtfxWc";
    let url = (window.location !== window.parent.location)
      ? document.referrer
      : document.location.href;
    let referrerurl = url.match(/:\/\/(.[^/]+)/)[1].trim();
    this.adataservice.setAgentInfo(this.agentInfo);
    if (this.adataservice.isAuthenticated() && !this.adataservice.isTokeExpired()) {
      const token: any = this.adataservice.getDecodedToken();
      if (token.unique_name === this.agentInfo.username) {
        if (referrerurl !== token.actort) {
          this.issmcloggedin = true;
          this.mservice.generateMessage("ERROR", "It seems like you are already logged into SMC through any partner site. Please logout!!", "Conflict")
        } else {
          this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (this.adataservice.getUserData()[0]) : '';
          if (this.agentInfo.leadid) {
            sessionStorage.setItem('kondeskleadid', this.encdec.encryptSensitiveV1(this.agentInfo.leadid));
          }

          this.router.navigate(['/program/course-search/' + this.agentInfo.randomno + '/' + this.userdata.projectid]);
        }
      } else {
        this.authService.LoginThirdparty(this.agentInfo.username, this.agentInfo.apikey, this.agentInfo.userid, referrerurl).subscribe(data => {
          if (data.flag && data.outdata) {
            this.adataservice.setToken(data.outdata);
            this.adataservice.setUserData(data.outdata1);
            this.adataservice.setPermission(data.outdata2);
            this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (this.adataservice.getUserData()[0]) : '';
            if (this.agentInfo.leadid) {
              sessionStorage.setItem('kondeskleadid', this.encdec.encryptSensitiveV1(this.agentInfo.leadid));
            }
            this.router.navigate(['/program/course-search/' + this.agentInfo.randomno + '/' + this.userdata.projectid]);
          }
        });
      }
    } else {
      this.authService.LoginThirdparty(this.agentInfo.username, this.agentInfo.apikey, this.agentInfo.userid, referrerurl).subscribe(data => {
        if (data.flag && data.outdata) {
          this.adataservice.setToken(data.outdata);
          this.adataservice.setUserData(data.outdata1);
          this.adataservice.setPermission(data.outdata2);
          this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (this.adataservice.getUserData()[0]) : '';
          if (this.agentInfo.leadid) {
            sessionStorage.setItem('kondeskleadid', this.encdec.encryptSensitiveV1(this.agentInfo.leadid));
          }
          this.router.navigate(['/program/course-search/' + this.agentInfo.randomno + '/' + this.userdata.projectid]);
        }
      });
    }
  }
}
