import { Component, OnInit, ChangeDetectorRef, ViewChild, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PropertybarComponent } from '../propertybar/propertybar.component';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { UniversityFormMappingsService } from '../../services/university-form-mappings.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';

declare const $: any;
@Component({
  selector: 'app-university-form-mappings',
  templateUrl: './university-form-mappings.component.html',
  styleUrls: ['./university-form-mappings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversityFormMappingsComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  @ViewChild(PropertybarComponent, { static: false }) prop: PropertybarComponent;
  questionslist: any = [];
  controllist: any = [];
  imagelist: any = [];
  masterid: any;
  id = 0;
  apiurl: any = environment.API_URL_DOC;
  ispages = true;
  iscontrols = false;
  isproperties = false;
  isconrolsize = false;
  controlname = '';
  controlH = '10px';
  controlW = '10px';
  currentProperty: any;
  submitted = false;
  ispublished = false;
  ispublishclicked = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mappingsService: UniversityFormMappingsService,
    public loadService: LoaderService,
    private mservice: ToastService,
    private cdkchange: ChangeDetectorRef,
    private cd: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private adataservice: AuthdataService,
    private encdec: EncDecService,
  ) { }
  permissions: any = {};
  ngOnInit() {
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.masterid = (params.masterid) ? params.masterid.toString() : 0;
      this.cd.markForCheck();
    });
    this.permissions = this.adataservice.getPermission('University forms');
    this.loadService.loadme = true;
    this.mappingsService.getAllQuestions(this.masterid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.questionslist = data.outdatalist[0];
        this.loadService.loadme = false;
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
      }
      this.cd.markForCheck();
    });
    this.mappingsService.getAllReferenceImages(this.masterid, this.encdec.encryptSensitive(0), 'pdf').pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.imagelist = data.outdatalist[0];
        this.ispublished = (data.outdatalist[4].length > 0) ? data.outdatalist[4][0].ispublished : false;
        if (data.outdatalist[1].length > 0) {
          this.controllist = JSON.parse(data.outdatalist[1][0].settings);
          this.id = data.outdatalist[1][0].id;
          if (isPlatformBrowser(this._platformId)) {
            setTimeout(() => {
              $('.draggable').draggable({
                revert: true, helper: 'clone',
                revertDuration: 0,
                cursor: 'all-scroll',
                cancel: 'button',
              });
              $('.droped').draggable({
                cursor: 'all-scroll',
                cancel: 'input',
              });
              $('.resize').resizable();
              $('.ui-wrapper').css({
                padding: 0,
              });
            }, 100);
          }

        }
        this.loadService.loadme = false;
        this.cd.markForCheck();
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
      }
    });
  }
  // setProps() {

  // }
  public trackByIndex(index: number) {
    return index;
  }
  change(event) {
    if (isPlatformBrowser(this._platformId)) {
      this.newControlDroped(JSON.parse($('#currentprp').val()));
      $('#currentprp').val('');
    }
    this.cd.markForCheck();
  }
  newControlDroped(event) {
    if (event.id) {
      const dummyarray: any = [];
      this.controllist.forEach((element, index) => {
        if (element.id === event.id) {
          element.xPos = event.xPos;
          element.yPos = event.yPos;
        }
        dummyarray.push(element);
      });
      this.controllist = dummyarray;
    } else {
      this.controllist.push(event);
      this.controllist.forEach((element, index) => {
        this.controllist[index].id = 'inp' + (index + 1);
        if (this.controllist[index].boxes) {
          this.controllist[index].boxes.forEach((box, bindex) => {
            this.controllist[index].boxes[bindex].gid = element.id;
            this.controllist[index].boxes[bindex].id = element.id + 'box' + (bindex + 1);
          });
        }
      });
    }
    if (isPlatformBrowser(this._platformId)) {
      setTimeout(() => {
        $('.droped').draggable({
          cursor: 'all-scroll',
          cancel: 'input',
        });
        $('.resize').resizable();
        $('.ui-wrapper').css({
          padding: 0,
        });
      }, 10);
    }
    this.cd.markForCheck();
  }
  assignCurrentProperty(property) {
    this.currentProperty = property;
    this.cdkchange.detectChanges();
    this.isproperties = true;
    this.iscontrols = false;
    this.ispages = false;
    if (this.prop) {
      this.prop.getOptions();
      this.prop.getOptionsDepend();
    }
    this.cd.markForCheck();
  }
  deleteCurrentProperty() {
    const newdata = [];
    if (isPlatformBrowser(this._platformId)) {
      this.controllist.forEach(element => {
        element.height = $('#' + element.id).height();
        element.width = $('#' + element.id).width();
        newdata.push(element);
      });
    }
    this.controllist = newdata;
    this.controllist = this.controllist.filter(d => d.id !== this.currentProperty.id);
    // this.cdkchange.detectChanges();
    this.isproperties = false;
    this.iscontrols = true;
    this.ispages = false;
    if (isPlatformBrowser(this._platformId)) {
      setTimeout(() => {
        $('.droped').draggable({
          cursor: 'all-scroll',
          cancel: 'input',
        });
        $('.resize').resizable();
        $('.ui-wrapper').css({
          padding: 0,
        });
      }, 0);
    }
    this.cd.markForCheck();
  }
  saveSettings() {
    this.submitted = true;
    const newdata = [];
    let missingq = false;
    if (isPlatformBrowser(this._platformId)) {
      this.controllist.forEach(element => {
        if (!element.questionid) {
          $('#' + element.id).addClass('invalid');
          missingq = true;
        } else {
          $('#' + element.id).removeClass('invalid');
          element.height = $('#' + element.id).height();
          element.width = $('#' + element.id).width();
        }
        newdata.push(element);
      });
    }

    this.controllist = newdata;
    if (missingq) {
      this.mservice.generateMessage('WARNING', 'Please select question for the control some of the controls not question selected in the property', 'Missing property');
      this.submitted = false;
      if (isPlatformBrowser(this._platformId)) {
        $('html, body').animate({ scrollTop: $('.invalid:first').offset().top }, 'slow');
      }

    } else {
      this.mappingsService.savePDfSetting(this.id, this.masterid, newdata, 1, 1).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.id = data.outdata;
          this.loadService.loadme = false;
          this.submitted = false;
          missingq = false;
        } else {
          this.loadService.loadme = false;
          this.mservice.generateMessage('ERROR', data.message, 'FAILED');
          this.submitted = false;
          missingq = false;
        }
        this.cd.markForCheck();
      });
    }
    this.cd.markForCheck();
  }
  editMatserPDF() {
    this.ispublished = (this.ispublished) ? false : true;
    this.mappingsService.removePDF(this.masterid, true, false, this.ispublished).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.mservice.generateMessage('SUCCESS', 'File ' + ((!this.ispublished) ? 'unpublished' : 'published') + ' successfuly.', 'SUCCESS');
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', data.message, 'FAILED');
      }
      this.cd.markForCheck();
    });
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
