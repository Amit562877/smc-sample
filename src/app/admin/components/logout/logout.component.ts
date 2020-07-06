import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public loadService: LoaderService,
    private adataservice: AuthdataService
  ) { }

  ngOnInit() {
    this.loadService.loadme = false;
    this.adataservice.setToken('');
    this.adataservice.setUserData('');
    this.adataservice.setMenu('');
    this.adataservice.setPermission('');
    this.adataservice.setAgentInfo('');
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
