import { Component, OnInit } from '@angular/core';
import { AuthdataService } from 'src/app/auth/services/authdata.service';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {

  constructor(
    private adataservice: AuthdataService
  ) { }
  createApplicationPermissions: {};
  dashboardPermission: {};
  islogin = false;
  userid: any;
  projectid: any;
  userdata: any;
  ngOnInit() {
    this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (this.adataservice.getUserData()[0]) : '';
    this.userid = this.userdata.uid;
    this.projectid = this.userdata.projectid;
    if (this.userid) {
      this.islogin = true;
    }
    this.dashboardPermission = this.adataservice.getPermission('Student dashboard');
    this.createApplicationPermissions = this.adataservice.getPermission('Create Application');
  }

}
