import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExternalFormMappingService } from '../../services/external-form-mapping.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-external-form-mapping',
  templateUrl: './external-form-mapping.component.html',
  styleUrls: ['./external-form-mapping.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExternalFormMappingComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  productid: number;
  listexSectionList: any;
  listexQuestionList: any;
  currentPage = 1;
  pagedItems: any = [];
  ngformdata: any;
  totalItems: number;
  ngaformdata: any;
  listSectionList: any;
  listQuestionList: any;
  ApplicationpagedItems = [];
  ApplicationtotalItems: any;
  viewby = 1;
  itemsPerPage = this.viewby;
  maxSize = 1;
  selectedIndex = 1;
  aviewby = 1;
  acurrentPage = 1;
  aitemsPerPage = this.aviewby;
  amaxSize = 1;
  aselectedIndex = 1;
  listSectionListFtr1: any;
  listSectionListFtr2: any;
  studylevelid: number;

  constructor(
    private route: ActivatedRoute,
    private externalFormMappingService: ExternalFormMappingService,
    private mservice: ToastService,
    private loadservice: LoaderService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef
  ) { }

  drop(ev) {
    if (isPlatformBrowser(this._platformId)) {
      ev.preventDefault();
      var data = ev.dataTransfer.getData('text');
      var idx = ev.dataTransfer.getData('templateIdx');
      this.addElement(idx, ev.currentTarget.id);
    }

  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    if (isPlatformBrowser(this._platformId)) {
      ev.dataTransfer.setData('text', ev.target.id);
      var data_index = document.getElementById(ev.target.id).getAttribute('data-index');
      ev.dataTransfer.setData('templateIdx', data_index);
    }

  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.productid = Number(params.productid.toString());
      this.studylevelid = Number(params.studylevelid.toString());
    });
    this.GetAllExternalformdata();
    this.GetAllApplicationformdata();
    this.cd.markForCheck();
  }

  GetAllExternalformdata() {
    const productid = this.productid;

    this.externalFormMappingService.GetAllExternalformdata(productid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.ngformdata = data.outdatalist;
        this.listexSectionList = this.ngformdata[0];
        this.listexQuestionList = this.ngformdata[1];
        for (const fdata of this.ngformdata[0]) {
          if (fdata.sectionparentidf === 0) {
            this.pagedItems.push(fdata);
          }
        }
        // this.pagedItems = $filter('filter')(this.ngformdata.exSectionList, { sectionparentidf: 0 }, true);
        for (let i = 0; i < this.pagedItems.length; i++) {
          this.pagedItems[i].sequence = i + 1;
        }
        this.totalItems = this.pagedItems.length;
      } else {
        this.listexSectionList = [];
        this.listexQuestionList = [];
      }
      this.cd.markForCheck();
    });
  }

  GetAllApplicationformdata() {
    const productidf = 1;
    this.externalFormMappingService.getApplicantformControl(productidf, this.productid).pipe(takeUntil(this.componentDestroyed$)).subscribe(formData => {
      this.ngaformdata = formData.outdatalist;
      this.listSectionList = this.ngaformdata[0];
      this.listQuestionList = this.ngaformdata[1];


      // //multiple section scode
      // this.listSectionListFtr1=this.listSectionList.filter(value=>{
      //   return value.sectionparentidf!==0;
      // });

      // for(let i=0;i<this.listSectionList.length;i++)
      // {
      //   if(this.listSectionList[i].sectionparentidf===0)
      //   {

      //   }
      //   else{
      //     for(let k=0;k<this.listSectionListFtr1.length;k++)
      //     {
      //       if(this.listSectionList[i].sectionparentidf===this.listSectionListFtr1[k].sectionidf)
      //       {
      //         this.listSectionList[i].sectionparentidf=this.listSectionListFtr1[k].sectionparentidf;
      //       }
      //     }
      //   }
      // }
      // //End Multiple Section code

      this.listQuestionList = this.listQuestionList.filter(value => {
        return value.controltypeidf != 15;
      });
      this.ApplicationpagedItems = this.ngaformdata[0].filter(value => {
        return value.sectionparentidf === 0;
      });
      for (var i = 0; i < this.ApplicationpagedItems.length; i++) {
        this.ApplicationpagedItems[i].rowNumber = i + 1;
      }
      for (var i = 0; i < this.listexQuestionList.length; i++) {
        if (this.listexQuestionList[i].formcontrolidf != 0) {
          var item = this.listQuestionList.filter(value => {
            return value.formcontrolid === parseInt(this.listexQuestionList[i].formcontrolidf);
          });
          var index = this.listQuestionList.indexOf(item[0]);
          if (this.listQuestionList[index]) {
            this.listQuestionList[index].isshowhide = 1;
          }
        }
      }

      // this.pagedItems = $filter('filter')(this.ngformdata.exSectionList, { sectionparentidf: 0 }, true);
      for (let i = 0; i < this.ApplicationpagedItems.length; i++) {
        this.ApplicationpagedItems[i].sequence = i + 1;
      }

      this.ApplicationtotalItems = this.ApplicationpagedItems.length;
      this.cd.markForCheck();
    });
  }

  SetPage(pageNo, sectionid) {
    this.currentPage = pageNo;
    this.selectedIndex = pageNo;
    this.cd.markForCheck();
  }

  AsetPage(pageNo, sectionid) {
    this.acurrentPage = pageNo;
    this.aselectedIndex = pageNo;
    this.cd.markForCheck();
  }

  NextPage(pageNo, sectionid) {
    this.currentPage = pageNo;
    this.selectedIndex = pageNo;
    this.cd.markForCheck();
    this.SaveApplicationFormData(sectionid);
  }

  PreviousPage(pageNo, sectionid) {
    this.currentPage = pageNo;
    this.selectedIndex = pageNo;
    this.cd.markForCheck();
  }

  RemoveMap(ngcontrol, index) {
    const item = this.listQuestionList.filter(value => {
      return value.formcontrolid === parseInt(ngcontrol.formcontrolidf, 10);
    });

    const controlindex = this.listQuestionList.indexOf(item[0]);
    this.listQuestionList[controlindex].isshowhide = 0;
    const Exqueitem = this.listexQuestionList.filter(value => {
      return value.formcontrolidf === parseInt(ngcontrol.formcontrolidf, 10);
    });

    const quecontrolindex = this.listexQuestionList.indexOf(Exqueitem[0]);
    this.listexQuestionList[quecontrolindex].formcontrolidf = 0;
    this.cd.markForCheck();
  }

  SaveApplicationFormData(sectionid) {
    this.loadservice.loadme = true;
    const filtered = this.listexQuestionList.filter(value => {
      return value.sectionid === sectionid || value.sectionparentidf === sectionid;
    });

    const fvm = {
      exSectionList: this.listexSectionList,
      exQuestionList: filtered,
    };
    this.externalFormMappingService.saveApplicationFormData(fvm).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.cd.markForCheck();
      this.loadservice.loadme = false;
      if (!data.flag) {
        this.mservice.generateMessage('ERROR', '', data.message);
      }
      else {
        this.mservice.generateMessage('SUCCESS', '', data.message);
      }
    });
  }

  addElement(formcontrolid, questionid) {
    for (var i = 0; i < this.listexQuestionList.length; i++) {
      if (this.listexQuestionList[i].questionid == questionid) {
        this.listexQuestionList[i].formcontrolidf = parseInt(formcontrolid);
      }
    }
    var item = this.listQuestionList.filter(value => {
      return value.formcontrolid === parseInt(formcontrolid);
    });

    var index = this.listQuestionList.indexOf(item[0]);
    this.listQuestionList[index].isshowhide = 1;
    this.cd.markForCheck();
  };

  saveMappingInfo(formcontrolid, ischecked) {

    this.externalFormMappingService.saveMappingInfo(formcontrolid, this.productid, ischecked).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.cd.markForCheck();
      if (data.flag) {
        this.mservice.generateMessage('SUCCESS', '', data.message);
      }
      else {
        this.mservice.generateMessage('ERROR', '', data.message);
      }
    });

  }

  NextPageMainForm(pageNo, sectionid) {
    this.acurrentPage = pageNo;
    this.aselectedIndex = pageNo;
    this.cd.markForCheck();
    this.SaveApplicationMainFormData(sectionid);
  }

  PreviousPageMainForm(pageNo, sectionid) {
    this.acurrentPage = pageNo;
    this.aselectedIndex = pageNo;
    this.cd.markForCheck();
    this.SaveApplicationMainFormData(sectionid);
  }

  SaveApplicationMainFormData(sectionid) {
    this.loadservice.loadme = true;
    const filtered = this.listQuestionList.filter(value => {
      return value.sectionidf === sectionid || value.sectionparentidf === sectionid;
    });

    const fvm = {
      oneQuestionList: filtered,
      productid: this.productid,
      studylevel: this.studylevelid,
      userid: 1
    };
    this.externalFormMappingService.saveOneFormMappingData(fvm).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
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
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
