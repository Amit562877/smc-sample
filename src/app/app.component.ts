import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoaderService } from './shared/services/message/loader.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { environment } from 'src/environments/environment';
import { JQueryService } from 'src/app/shared/services/message/jQuery.service';

declare const $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(
    private router: Router,
    public loadService: LoaderService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private jqservice: JQueryService

  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if (isPlatformBrowser(this._platformId)) {
          $('[data-toggle="tooltip"]').tooltip('dispose');
          // console.clear();
          if (environment.production) {
            if (window) {
              window.console.log = function () { };
            }
          }
        }
      }
    });
  }
  ngOnInit(): void {
      this.loadService.ispanel = false;
  }

  title = 'Searchmycourse.com';
}
