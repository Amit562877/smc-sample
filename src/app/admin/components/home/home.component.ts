import { Component, OnInit } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AssignPermissionService } from 'src/app/shared/services/assign-permission.service';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/shared/services/message/loader.service';

declare const $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    public assignPermission: AssignPermissionService,
    public adataservice: AuthdataService,
    private router: Router,
    private loadService: LoaderService
  ) { }
  userdata: any;
  useremail: String;
  menudata: any;
  createApplicationPermissions: any = {};
  dashboardPermission: {};
  islogin = false;
  userid: any;
  projectid: any;
  ngOnInit() {

    if (this.adataservice.isAuthenticated()) {
      this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (this.adataservice.getUserData()[0]) : '';
      this.userid = this.userdata.uid;
      this.projectid = this.userdata.projectid;
      if (this.userid) {
        this.islogin = true;
      }
      this.dashboardPermission = this.adataservice.getPermission('Student dashboard');
      this.createApplicationPermissions = this.adataservice.getPermission('Create Application');
      this.userdata = this.adataservice.getUserData();
      this.menudata = this.adataservice.getMenu();
      if (isPlatformBrowser(this._platformId)) {
        $('#close-sidebar').click(() => {
          $('.page-wrapper').removeClass('toggled');
        });
        $('#show-sidebar').click(() => {
          $('.page-wrapper').addClass('toggled');
        });
      }
    } else {
      this.loadService.ispanel = false;
      this.router.navigate(['/auth/login']);
    }
  }
  clickedsdbar(event) {
    if (isPlatformBrowser(this._platformId)) {
      const target = $(event.currentTarget);
      $('.sidebar-submenu').slideUp(200);
      if (
        target.parent()
          .hasClass('active')
      ) {
        $('.sidebar-dropdown').removeClass('active');
        target.parent()
          .removeClass('active');
      } else {
        $('.sidebar-dropdown').removeClass('active');
        target.next('.sidebar-submenu')
          .slideDown(200);
        target.parent()
          .addClass('active');
      }
    }
  }
}
