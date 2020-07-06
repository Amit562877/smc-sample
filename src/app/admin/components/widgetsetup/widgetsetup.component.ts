import { Component, OnInit, OnDestroy, ChangeDetectorRef, PLATFORM_ID, Inject } from '@angular/core';
import { WidgetSettingService } from '../../services/widget-setting.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { ActivatedRoute } from '@angular/router';
import { parse } from 'querystring';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
import { AuthdataService } from 'src/app/auth/services/authdata.service';

declare const $: any;
@Component({
  selector: 'app-widgetsetup',
  templateUrl: './widgetsetup.component.html',
  styleUrls: ['./widgetsetup.component.scss']
})
export class WidgetsetupComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  themecolor: any;
  themecolorid: any;
  themealr: any;
  themealrid: any;
  themeatmb: any;
  themeatmbid: any;
  projectid: any;
  widgetSettings: any;
  cweburl: any;
  dynamicscript: any;
  wtid: any;
  visiblesearchcourse: any;
  leadformvisible: any;
  visiblefundcalculator: any;
  visibledocumentchecklist: any;
  onstartupwidget: any;
  autooccepop: any;
  autowidgetslide: any;
  visachecklist: any;
  anzscovisible: any;
  contactuswhitelabel: any;
  visiblewidget: any;
  txt_site_url: any;
  whitelabeldomain: any;
  weburllst: any;
  ngcount: any;
  domainname: any;
  whitelabellst: any;
  userdata: any;
  userid: any;
  submitted = false;

  ddonstartupwidget = [
    { id: 0, name: "Don't Show " },
    { id: 1, name: "1 Day" }, { id: 2, name: "2 Days" }, { id: 3, name: "3 Days" }, { id: 4, name: "4 Days" },
    { id: 5, name: "5 Days" }, { id: 6, name: "6 Days" }, { id: 7, name: "7 Days" }, { id: 8, name: "8 Days" },
    { id: 9, name: "9 Days" }, { id: 10, name: "10 Days" }, { id: 11, name: "11 Days" },
    { id: 12, name: "12 Days" }, { id: 13, name: "13 Days" }, { id: 14, name: "14 Days" }, { id: 15, name: "15 Days" },
    { id: 16, name: "16 Days" }, { id: 17, name: "17 Days" }, { id: 18, name: "18 Days" }, { id: 19, name: "19 Days" },
    { id: 20, name: "20 Days" }, { id: 21, name: "21 Days" }, { id: 22, name: "22 Days" }, { id: 23, name: "23 Days" },
    { id: 24, name: "24 Days" }, { id: 25, name: "25 Days" }, { id: 26, name: "26 Days" }, { id: 27, name: "27 Days" }, { id: 28, name: "28 Days" },
    { id: 29, name: "29 Days" }, { id: 30, name: "30 Days" }
  ];

  constructor(private route: ActivatedRoute,
    private adataservice: AuthdataService,
    private widgetSettingService: WidgetSettingService,
    private mservice: ToastService,
    private loadservice: LoaderService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef,
    private encdec: EncDecService) { }

  ngOnInit() {
    this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (this.adataservice.getUserData()[0]) : '';
    if (this.userdata != '') {
      this.userid = this.userdata.uid;
      this.projectid = this.userdata.projectid;
    } else {
      this.userid = 1;
      this.projectid = 0;
    }

    this.themesetup();
    this.GetWidgetSettings();
    this.cd.markForCheck();
    this.domainname = "sadda";
  }

  themesetup() {
    /* align */
    $('[data-theme-align-target]').click(function () {
      $(this).addClass('active').siblings().removeClass('active');
      var target = $(this).attr('data-theme-align-target');
      $(target).removeClass(function (index, className) {
        return (className.match(/(^|\s)theme-align-\S+/g) || []).join(' ');
      }).addClass($(this).attr('data-theme-align'));
    });
    /* / align */

    /* v-align */
    $('[data-theme-v-align-target]').click(function () {
      $(this).addClass('active').siblings().removeClass('active');
      var target = $(this).attr('data-theme-v-align-target');
      $(target).removeClass(function (index, className) {
        return (className.match(/(^|\s)theme-v-align-\S+/g) || []).join(' ');
      }).addClass($(this).attr('data-theme-v-align'));
    });
    /* / v-align */


    /* Theme color settings */
    $('[appearance-data-theme-target]').click(function () {
      $(this).addClass('active').siblings().removeClass('active');
      var target = $(this).attr('appearance-data-theme-target');
      $(target).removeClass(function (index, className) {
        return (className.match(/(^|\s)appearance-theme-ctrl-\S+/g) || []).join(' ');
      }).addClass($(this).attr('appearance-data-theme-ctrl'));
    });
    /* / Theme color settings */
  }
  addthemecolor(themeid) {
    this.themecolor = "theme-ctrl-" + themeid;
    this.themecolorid = themeid;
  }

  addthemealr(themealrid) {
    this.themealr = themealrid == 1 ? "theme-align-left" : "theme-align-right";
    this.themealrid = themealrid;
  }

  addthemeatmb(themeatmbid) {
    switch (themeatmbid) {
      case 1:
        this.themeatmb = "theme-v-align-top";
        this.themeatmbid = themeatmbid;
        break;
      case 2:
        this.themeatmb = "theme-v-align-middle";
        this.themeatmbid = themeatmbid;
        break;
      case 3:
        this.themeatmb = "theme-v-align-bottom";
        this.themeatmbid = themeatmbid;
        break;
      default:
        this.themeatmb = "";
        this.themeatmbid = "";
    }
  }

  savewidgetsetting(appearanceform) {
    this.submitted = true;
    if (appearanceform.valid) {
      this.submitted = false;
      const obj = {
        projectid: this.projectid,
        themecolorid: this.themecolorid,
        themecolor: this.themecolor,
        themealrid: this.themealrid,
        allignlr: this.themealr,
        themeatmbid: this.themeatmbid,
        aligntmb: this.themeatmb,
        websiteurl: this.txt_site_url,
        isdeleted: 0,
        userid: 1
      };
      this.widgetSettingService.savewidgetsettings(obj).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        this.cd.markForCheck();
        this.loadservice.loadme = false;
        if (data.flag) {
          this.mservice.generateMessage('SUCCESS', '', data.message);
        }
        else {
          this.mservice.generateMessage('ERROR', '', data.message);
        }
      });
    }

  }

  GetWidgetSettings() {
    const projectid = this.projectid;
    this.widgetSettingService.getwidgetdetails(projectid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {

      if (data.outdatalist[0] != "No Data Found") {
        if (data.outdatalist[0].length > 0) {
          var wSettings = JSON.parse(data.outdatalist[0]);
          this.widgetSettings = wSettings[0];
          this.cweburl = this.widgetSettings.websiteurl;
          var src1 = "\"https://searchmycourse.konze.com/assets/widget/js/smc_widget.js?smckey=" + data.outdata;
          var scriptadd = "<!-- Start of SEARCH MY COURSE Widget script -->\n";
          scriptadd += "<script id=\"smckonze-snippet\" src=" + src1 + "\"></script>\n";
          scriptadd += "<!-- End of  SEARCH MY COURSE Widget script -->\n";

          this.dynamicscript = scriptadd;
          this.wtid = this.widgetSettings.wtid;
          this.themecolor = this.widgetSettings.themecolor;
          this.themecolorid = this.widgetSettings.themecolorid;
          this.themealr = this.widgetSettings.allignlr;
          this.themealrid = this.widgetSettings.themealrid;
          this.themeatmb = this.widgetSettings.aligntmb;
          this.themeatmbid = this.widgetSettings.themeatmbid;
          this.visiblesearchcourse = this.widgetSettings.visiblesearchcourse;
          this.leadformvisible = this.widgetSettings.leadformvisible;
          this.visiblefundcalculator = this.widgetSettings.visiblefundcalculator;
          this.visibledocumentchecklist = this.widgetSettings.visibledocumentchecklist;
          this.onstartupwidget = this.widgetSettings.autosrartup;
          this.autooccepop = this.widgetSettings.autooccepop;
          this.autowidgetslide = this.widgetSettings.autowidgetslide;
          this.visachecklist = this.widgetSettings.visachecklist;
          this.anzscovisible = this.widgetSettings.anzscovisible;
          this.contactuswhitelabel = this.widgetSettings.contactuswhitelabel;
          this.visiblewidget = this.widgetSettings.visiblewidget;
          this.txt_site_url = this.widgetSettings.websiteurl;
          //color
          // $("#themecolor_2").removeClass("active");
          $("#themecolor_" + this.themecolorid).addClass("active");
          $("body").addClass('appearance-theme-ctrl-' + this.themecolorid);
          ////ALIGIN-LEFT-RIGHT

          //$("#themealr_2").removeClass("active");
          $("#themealr_" + this.themealrid).addClass("active");

          if (this.themealrid == 1) {
            $("body").addClass('theme-align-left');
          }
          else {
            $("body").addClass('theme-align-right');
          }
          ////ALIGIN-TOP-MIDDLE-BOTTOM
          //$("#themeatmb_2").removeClass("active");
          $("#themeatmb_" + this.themeatmbid).addClass("active");
          switch (this.themeatmbid) {
            case 1:
              $("body").addClass('theme-v-align-top');
              break;
            case 2:
              $("body").addClass('theme-v-align-middle');
              break;
            case 3:
              $("body").addClass('theme-v-align-bottom');

              break;
            default:
          }

          this.cd.markForCheck();
        } else {
          this.widgetSettings = '';

          this.cd.markForCheck();
          this.mservice.generateMessage('ERROR', 'EMPTY', 'No Record Found');
        }
      }
      else {
        this.widgetSettings = '';
      }

      if (data.outdatalist[1] != "No Data Found") {
        if (data.outdatalist[1].length > 0) {
          this.whitelabellst = JSON.parse(data.outdatalist[1]);
        }
      }
      else {
        this.whitelabellst = [];
      }

    });
  }

  copy() {
    $('#txtscriptarea').select();
    document.execCommand("copy");
    this.mservice.generateMessage('SUCCESS', '', 'Copied');
  }

  UpdateWidgetSettings(type, value) {
    const projectid = this.projectid;
    this.widgetSettingService.updatewidgetsettings(projectid, type, value).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag == true) {
        this.mservice.generateMessage('SUCCESS', '', 'Setting Updated sucessfully');
        this.cd.markForCheck();
      } else {
        this.cd.markForCheck();
        this.mservice.generateMessage('ERROR', 'EMPTY', 'No Record Found');
      }
    });
  }

  UpdateWidgetOtherSettings(type, value) {
    const projectid = this.projectid;
    this.widgetSettingService.updatewidgetothersettings(projectid, type, value).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag == true) {
        this.mservice.generateMessage('SUCCESS', '', 'Setting Updated sucessfully');
        this.cd.markForCheck();
      } else {
        this.cd.markForCheck();
        this.mservice.generateMessage('ERROR', 'EMPTY', 'No Record Found');
      }
    });
  }

  checkurl() {
    const url = this.whitelabeldomain + ".searchmycourse.com";

    this.widgetSettingService.checkurl(url).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag == true) {
        if (data.outdata != "No Data Found") {
          this.weburllst = JSON.parse(data.outdata);
          this.ngcount = this.weburllst.length;

          if (this.ngcount > 0) {
            this.mservice.generateMessage('SUCCESS', '', 'Already exists White label domain');
          }
          else {
            this.whitelabeldomain = url;
            this.savewhitelabelsettings();
            //this.mservice.generateMessage('SUCCESS', '', 'Setting Updated sucessfully');
          }
        }
        else {
          this.ngcount = 0;
          this.whitelabeldomain = url;
          this.savewhitelabelsettings();
        }

        this.cd.markForCheck();
      } else {
        this.cd.markForCheck();
        this.mservice.generateMessage('ERROR', 'EMPTY', 'No Record Found');
      }
    });
  }

  AddUpdateData(weburlform) {
    this.submitted = true;
    if (weburlform.valid) {
      this.submitted = false;
      this.checkurl();
    }
  }

  validwhiteorweburl(type) {
    var isvalid = true;
    if (type == "whitelabeldomain") {
      if (this.whitelabeldomain == "" || this.whitelabeldomain == null) {
        isvalid = false;
      }
      else {
        isvalid = true;
      }
    }
    return isvalid;
  }


  savewhitelabelsettings() {
    const obj = {
      projectid: this.projectid,
      whitelabeldomain: this.whitelabeldomain,
      isactive: 1,
      isdeleted: 0,
      createdby: 1
    };
    this.widgetSettingService.savewhitelabelsettings(obj).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.cd.markForCheck();
      this.loadservice.loadme = false;
      if (data.flag) {
        this.GetWidgetSettings();
        this.mservice.generateMessage('SUCCESS', '', data.message);
      }
      else {
        this.mservice.generateMessage('ERROR', '', data.message);
      }
    });
  }


  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
