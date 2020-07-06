import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Searchhints, Coursedetails } from 'src/app/models/course.model';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
import { CourseFiltersService, ManageAdvanceFilter } from 'src/app/services/course-filters.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { Location } from '@angular/common';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
declare const $: any;
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { PdfService } from 'src/app/shared/services/pdf.service';
import { GroupByPipe } from 'src/app/shared/pipes/oneform.pipe';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdvancedFilterMainComponent } from 'src/app/shared/components/advanced-filter-main/advanced-filter-main.component';
import { JQueryService } from 'src/app/shared/services/message/jQuery.service';
import { truncateSync } from 'fs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  providers: [GroupByPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class CourseListComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  @ViewChild(AdvancedFilterMainComponent, { static: false }) prop: AdvancedFilterMainComponent;
  @Input() uid;
  downloadPDF = false;
  searchhints = new Searchhints();
  coursedetails = new Coursedetails();
  throttle = 150;
  scrollDistance = 1;
  scrollUpDistance = 2;
  coursehint: any = [];
  coursehintcount: number;
  universityhint: any = [];
  isbuttonclicke = false;
  escButton = false;
  divFocusFlag = false;
  inputFocusFlag = false;
  universitytypeid: any = '';
  universityidlistoriginal: any;
  userid: any;
  selectedCourses: any;
  comparedata: any;
  courseCompareData: any;
  compareid: number;
  topbtnFlag: boolean;
  projectid: any;
  userdata: any;
  usertypeid: number;
  advanceFilterFlag = false;
  modalFlag = '';
  permissions: any = {};
  switchFlag = 'O';
  constructor(
    private courseService: CourseService,
    private encdec: EncDecService,
    public courseFilterModel: CourseFiltersService,
    private mservice: ToastService,
    public loadService: LoaderService,
    public groupBy: GroupByPipe,
    @Inject(PLATFORM_ID) private _platformId: Object,
    public pdfService: PdfService,
    private adataservice: AuthdataService,
    private cd: ChangeDetectorRef,
    private jqservice: JQueryService,
    public ManageAdvanceFilter: ManageAdvanceFilter,
  ) { }
  location: any = Location;
  ngOnInit() {
    this.loadService.ispanel = true;
    $('.dropdown-menu').on('click', function (e) {
      e.stopPropagation();
    });
    this.permissions = this.adataservice.getPermission('Councellor');
    this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (this.adataservice.getUserData()[0]) : '';
    this.usertypeid = this.userdata.typeofaccount;
    this.topbtnFlag = true;
    this.userid = this.userdata.uid; // Id of user who is logged in
    this.projectid = (this.userdata.projectid) ? this.userdata.projectid : 0;
    this.selectedCourses = [];
    this.comparedata = [];
    if (this.uid != undefined) {
      this.courseFilterModel.universityid = this.uid;
    } else {
      this.uid = 0;
    }
    try {

      this.loadService.loadme = true;
      this.courseFilterModel.pageindex = 1;
      if (this.courseFilterModel.criteriaJSON == undefined || this.courseFilterModel.criteriaJSON.length == 0) {
        this.courseFilterModel.criteriaJSON = [];
      }
      this.courseService.getAllCourses(this.courseFilterModel).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          if (data.outdatalist[0] !== 'No Data Found') {
            if (this.userid) {
              const newuserid = this.encdec.encryptSensitive(this.userid.toString());
              const newprojectid = this.encdec.encryptSensitive(this.projectid.toString());
              this.courseService.getSelectedCompareCourses(newuserid, newprojectid).pipe(takeUntil(this.componentDestroyed$)).subscribe(comparedata => {
                //------------------------------------------------------
                //get compared selection of user
                this.coursedetails.coursedata = JSON.parse(data.outdatalist[0])
                this.coursedetails.coursecount = JSON.parse(data.outdatalist[1])[0].coursecount;
                this.cd.markForCheck();
                //------------------------------------------------------
                if (comparedata.flag && comparedata.outdatalist[0]) {
                  if (comparedata.outdatalist[1] && comparedata.outdatalist[1][0].compareid != 0) {
                    this.compareid = comparedata.outdatalist[1][0].compareid;
                  }
                  //this.comparedata = comparedata.outdatalist[0];
                  for (let cdata of comparedata.outdatalist[0]) {
                    let newId = 'chk_' + cdata.id + '_' + cdata.campusid;
                    cdata.newId = newId;
                    this.comparedata.push(cdata);
                  }
                  this.selectedCourses = this.groupBy.transform(this.comparedata, 'universityname');
                  this.cd.markForCheck();
                }
              });
            } else {
              this.coursedetails.coursedata = JSON.parse(data.outdatalist[0])
              this.coursedetails.coursecount = JSON.parse(data.outdatalist[1])[0].coursecount;
              this.cd.markForCheck();
            }



            this.courseService.getDropDownValues().pipe(takeUntil(this.componentDestroyed$)).subscribe(dropDownValues => {
              if (dropDownValues.flag) {
                this.coursedetails.universitylist = JSON.parse(dropDownValues.outdatalist[3]);
                this.universityidlistoriginal = JSON.parse(dropDownValues.outdatalist[3]);
                this.coursedetails.intakelist = (dropDownValues.outdatalist[4] !== 'No Data Found') ? JSON.parse(dropDownValues.outdatalist[4]) : [];
                this.coursedetails.countrylist = JSON.parse(dropDownValues.outdatalist[0]);
                this.coursedetails.statelist = [];
                this.coursedetails.citylist = [];
                this.coursedetails.originalstatelist = JSON.parse(dropDownValues.outdatalist[1]);
                this.coursedetails.originalcitylist = JSON.parse(dropDownValues.outdatalist[2]);
                this.coursedetails.educationleveldata = JSON.parse(dropDownValues.outdatalist[5]);
                this.coursedetails.institutetypelist = JSON.parse(dropDownValues.outdatalist[6]);
                this.coursedetails.disciplinelist = JSON.parse(dropDownValues.outdatalist[7]);
                this.coursedetails.postcodelist = JSON.parse(dropDownValues.outdatalist[11]);
                this.cd.markForCheck();
                this.filterstateonload();
                this.filtercityonload();
              }
            });

          }
          this.loadService.loadme = false;
        } else {
          this.loadService.loadme = false;
          this.mservice.generateMessage('ERROR', 'FAILED', data.message);
        }
      });
      if (isPlatformBrowser(this._platformId)) {
        $(document).click(() => {
          if (this.inputFocusFlag == true && this.divFocusFlag == true) {
            $('#hint').hide();
          }
        });

      }

    } catch (e) {
      this.loadService.loadme = false;
      this.mservice.generateMessage('ERROR', 'FAILED', e);
    }

    // this.jqservice.loadJS({src:'assets/js/jquery.magicsearch.min.js',defer: true, async: true})

  }
  getGuid() {
    if (isPlatformBrowser(this._platformId)) {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  }
  onScrollDown() {
    if (this.courseFilterModel.criteriaJSON == undefined || this.courseFilterModel.criteriaJSON.length == 0) {
      this.courseFilterModel.criteriaJSON = [];
    }
    this.courseFilterModel.pageindex = this.courseFilterModel.pageindex + 1;
    if (this.courseFilterModel.pageindex <= Math.ceil(this.coursedetails.coursecount / this.courseFilterModel.pagesize)) {
      this.courseService.getAllCourses(this.courseFilterModel).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          // this.coursedetails.coursedata = this.coursedetails.coursedata.concat(this.encyptcourseid(JSON.parse(data.outdatalist[0])));
          this.coursedetails.coursedata = this.coursedetails.coursedata.concat(JSON.parse(data.outdatalist[0]));
          this.coursedetails.coursecount = JSON.parse(data.outdatalist[1])[0].coursecount;
          this.cd.markForCheck();
        } else {
          this.mservice.generateMessage('ERROR', 'FAILED', data.message);
        }
      });
    }
  }
  getUniversityListByType() {
    if (this.universitytypeid > 0) {
      this.coursedetails.universitylist = this.universityidlistoriginal.filter(u => u.universitytypeid === this.universitytypeid);
    } else {
      this.coursedetails.universitylist = this.universityidlistoriginal;
    }
    this.cd.markForCheck();
  }
  onUp() {
  }
  getCourseByHint(cname) {
    this.courseFilterModel.searchstring = cname;
    this.getCourseByFilter();
  }
  getCourseByFilter() {
    this.advanceFilterFlag = false;
    this.isbuttonclicke = true;
    this.loadService.loadme = true;
    this.searchhints = new Searchhints();
    this.courseFilterModel.pageindex = 1;
    this.courseService.getAllCourses(this.courseFilterModel).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        if (data.outdatalist[0] !== 'No Data Found') {
          // this.coursedetails.coursedata = this.encyptcourseid(JSON.parse(data.outdatalist[0]));
          this.coursedetails.coursedata = JSON.parse(data.outdatalist[0]);
        } else {
          this.coursedetails.coursedata = undefined;
        }
        this.cd.markForCheck();
        this.loadService.loadme = false;
      } else {
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
        this.coursedetails.coursedata = undefined;
        this.loadService.loadme = false;
        this.cd.markForCheck();
      }
    });
  }
  public trackByIndex(index: number) {
    return index;
  }
  getCourseByFilterFees() {
    if (this.courseFilterModel.maxfees === 0) {
      this.courseFilterModel.minfees = 0;
    } else if (this.courseFilterModel.maxfees === 20000) {
      this.courseFilterModel.minfees = 0;
    } else if (this.courseFilterModel.maxfees === 50000) {
      this.courseFilterModel.minfees = 20000;
    } else if (this.courseFilterModel.maxfees === 100000) {
      this.courseFilterModel.minfees = 50000;
    } else if (this.courseFilterModel.maxfees === 100001) {
      this.courseFilterModel.minfees = 100001;
    }
    this.cd.markForCheck();
    // this.getCourseByFilter();
  }

  globalhints(e) {
    this.divFocusFlag = true;
    if (isPlatformBrowser(this._platformId)) {
      $('#hint').show();
    }
    if (isPlatformBrowser(this._platformId)) {
      this.isbuttonclicke = false;
      if (e.which === 27) {
        this.isbuttonclicke = true;
      } else {
        // if (this.courseFilterModel.searchstring.length > 2 || this.courseFilterModel.searchstring.length === 0) {
        if (this.courseFilterModel.searchstring.length > 2) {
          if (e.which === 13 || this.courseFilterModel.searchstring.length === 0) {
            this.getCourseByFilter();
          } else if (e.which !== 40 && e.which !== 38 && e.which !== 37 && e.which !== 39) {
            this.courseService.globlahints(this.courseFilterModel.searchstring, this.searchhints.pageindex,
              this.searchhints.pagesize, 0, 'course').pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
                if (data.flag && data.outdatalist[0] !== 'No Data Found') {
                  this.searchhints.coursehint = JSON.parse(data.outdatalist[0]);
                  // this.encyptcourseid(JSON.parse(data.outdatalist[0]));
                  this.searchhints.coursehintcount = JSON.parse(data.outdatalist[2])[0].coursecount;
                  if (this.searchhints.coursehintcount >= (this.searchhints.pageindex * this.searchhints.pagesize)) {
                    this.searchhints.ismorepage = true;
                  } else {
                    this.searchhints.ismorepage = false;
                  }
                  this.cd.markForCheck();
                  setTimeout(() => {
                    $('#list li:first-child').addClass('active');
                  }, 100);
                } else {
                  this.searchhints = new Searchhints();
                }
              });
          } else if (e.which === 40 || e.which === 38) {
            const current = $('#list li.active');
            switch (e.which) {
              case 38:
                $('#list li.active').prev().addClass('active');
                current.removeClass('active');
                break;
              case 40:
                $('#list li.active').next().addClass('active');
                current.removeClass('active');
                break;
            }
            const container = $('#list');
            const scrollTo = $('#list li.active');
            container.animate({
              scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
            }, 100);
            // $('ul').animate({ scrollTop: $('ul li.active').position().top }, 'slow');
          }
        } else {
          this.searchhints = new Searchhints();
        }
      }
    }
  }

  getNextHint() {
    this.isbuttonclicke = false;
    this.divFocusFlag = false;
    if (this.searchhints.ismorepage) {
      this.searchhints.pageindex = this.searchhints.pageindex + 1;
      this.courseService.globlahints(this.courseFilterModel.searchstring, this.searchhints.pageindex,
        this.searchhints.pagesize, 0, 'course').pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
          if (data.flag && data.outdatalist[0]) {
            this.searchhints.coursehint = this.searchhints.coursehint.concat(JSON.parse(data.outdatalist[0]));
            this.searchhints.coursehintcount = JSON.parse(data.outdatalist[2])[0].coursecount;
            if (this.searchhints.coursehintcount >= (this.searchhints.pageindex * this.searchhints.pagesize)) {
              this.searchhints.ismorepage = true;
            } else {
              this.searchhints.ismorepage = false;
            }
            this.cd.markForCheck();
          } else {
            this.mservice.generateMessage('ERROR', 'FAILED', data.message);
          }
        });
    }
  }

  filterstate() {
    this.coursedetails.statelist = this.coursedetails.originalstatelist.filter(data => data.countryid === this.courseFilterModel.countryid);
    this.coursedetails.citylist = [];
    this.courseFilterModel.stateid = 0;
    this.courseFilterModel.cityid = 0;
    this.cd.markForCheck();
  }
  filtercity() {
    this.coursedetails.citylist = this.coursedetails.originalcitylist.filter(data => data.stateid === this.courseFilterModel.stateid);
    this.courseFilterModel.cityid = 0;
    this.cd.markForCheck();
  }

  filterstateonload() {
    if (this.courseFilterModel.countryid > 0) {
      this.coursedetails.statelist = this.coursedetails.originalstatelist.filter(data => data.countryid === this.courseFilterModel.countryid);
    }
    this.cd.markForCheck();
  }
  filtercityonload() {
    if (this.courseFilterModel.stateid > 0) {
      this.coursedetails.citylist = this.coursedetails.originalcitylist.filter(data => data.stateid === this.courseFilterModel.stateid);
    }
    this.cd.markForCheck();
  }
  clearFilter() {
    this.courseFilterModel.pageindex = 1;
    this.courseFilterModel.pagesize = 20;
    this.courseFilterModel.searchstring = '';
    this.courseFilterModel.studylevelid = 0;
    this.courseFilterModel.minfees = 0;
    this.courseFilterModel.maxfees = 0;
    this.courseFilterModel.countryid = 0;
    this.courseFilterModel.stateid = 0;
    this.courseFilterModel.cityid = 0;
    this.courseFilterModel.duration = 0;
    this.courseFilterModel.coursetype = '';
    this.courseFilterModel.postcode = '';
    if (this.uid != 0) {
      this.courseFilterModel.universityid = this.uid;
    } else {
      this.courseFilterModel.universityid = 0;
    }

    this.courseFilterModel.institutetype = 0;
    this.courseFilterModel.disciplineid = 0;
    this.getCourseByFilter();
    this.filterstate();
    this.filtercity();
    this.cd.markForCheck();
  }
  encyptcourseid(coursemodel) {
    const newcoursemodel = [];
    coursemodel.forEach(element => {
      const processedelement = element;
      processedelement.id = this.encdec.convertText('enc', processedelement.id);
      newcoursemodel.push(processedelement);
    });
    this.cd.markForCheck();
    return newcoursemodel;
  }

  onCourseCompare(event) {
    if (!this.userdata) {
      if (isPlatformBrowser(this._platformId)) {
        setTimeout(() => {
          $('#' + event.coursedetail.newId).prop('checked', false);
        }, 100);
      }
      this.cd.markForCheck();
      $('#loginoptions').modal({ backdrop: 'static', keyboard: false, show: true });
    } else {
      const coursedetail = event.coursedetail;
      const chkbx_id = coursedetail.newId;
      if (coursedetail.ischecked) {
        if (this.comparedata.length < 4) {
          this.makeMeAnimated(chkbx_id);
          this.comparedata.push(coursedetail);
          this.saveCourseCompare(coursedetail)
          this.cd.markForCheck();
        } else {
          if (isPlatformBrowser(this._platformId)) {
            setTimeout(() => {
              $('#' + coursedetail.newId).prop('checked', false);
            }, 100);
          }
          this.cd.markForCheck();
          this.mservice.generateMessage('INFO', 'You can compare only 4 courses', '');
        }

      } else {
        this.removeCourse(coursedetail);
        // let newCompareData = [];

        // for (let cdata of this.comparedata) {
        //   if (cdata.newId !== coursedetail.newId) {
        //     newCompareData.push(cdata);
        //   }
        // }
        // this.comparedata = newCompareData;
        // if (isPlatformBrowser(this._platformId)) {
        //   setTimeout(() => {
        //     $('#' + coursedetail.newId).prop('checked', false);
        //   }, 100);
        // }

      }
      this.selectedCourses = this.groupBy.transform(this.comparedata, 'universityname');

    }

  }
  successLogin() {
    if (isPlatformBrowser(this._platformId)) {
      $('#loginoptions').modal('hide');
      this.ngOnInit();
      if (this.modalFlag === 'advfilter') {
        this.modalFlag = '';
        setTimeout(() => {
          this.getAdavanceFilters();
        }, 100);

      }
    }
  }
  makeMeAnimated(chkbx_id) {
    if (isPlatformBrowser(this._platformId)) {
      var cart = $('.count-shopping-cart');
      var imgtodrag = $('#' + chkbx_id).closest('.count-item').find('.count-img-redirect').eq(0);
      if (imgtodrag) {
        var imgclone = imgtodrag.clone()
          .offset({
            top: imgtodrag.offset().top,
            left: imgtodrag.offset().left
          })
          .css({
            'opacity': '0.5',
            'position': 'absolute',
            'height': '150px',
            'width': '150px',
            'z-index': '100'
          })
          .appendTo($('body'))
          .animate({
            'top': cart.offset().top + 10,
            'left': cart.offset().left + 10,
            'width': 75,
            'height': 75,
          }, 500);
        imgclone.animate({
          'width': 0,
          'height': 0
        }, function () {
          //$('#anim_' + i).detach()
        });
      }
    }
    this.cd.markForCheck();
  }
  saveCourseCompare(coursedetail) {
    this.topbtnFlag = false;
    let coursedetailarr = [];

    coursedetailarr.push({
      id: 0,
      userid: this.encdec.encryptSensitive(this.userid.toString()),
      ftableid: coursedetail.id,
      ftablename: 'tblcourse',
      campusid: coursedetail.campusid,
      projectid: this.encdec.encryptSensitive(this.projectid.toString())
    });

    let compareJson = {
      comparearray: coursedetailarr
    };
    this.courseService.saveCourseCompare(compareJson).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {

        this.compareid = data.outdata;
        const newcomapreid = this.encdec.encryptSensitive(this.compareid.toString());
        this.courseService.getCompareData(newcomapreid).pipe(takeUntil(this.componentDestroyed$)).subscribe(comparedata => {

          if (comparedata.flag) {
            //this.courseCompareData = comparedata.outdatalist[0];
            this.courseCompareData = [];
            for (let cdata of comparedata.outdatalist[0]) {
              if (cdata.coursedata) {
                cdata.coursedata = JSON.parse(cdata.coursedata);
                cdata.coursedata.cid = cdata.courseid;
                cdata.coursedata.uid = cdata.univid;
                cdata.coursedata.univ_name = cdata.univname;
                this.courseCompareData.push(cdata.coursedata);
              }
            }

          }
          this.cd.markForCheck();
        });
      }
    });
  }
  closeAdvancedFilterModel() {
    this.advanceFilterFlag = false;
  }
  clearCourseCompare() {
    //courseid = -1 means delete all
    let ftableid = -1;
    if (isPlatformBrowser(this._platformId)) {
      for (let cdata of this.comparedata) {
        $('#' + cdata.newId).prop('checked', false);
      }
      $('.dropdown-menu').removeClass('show');
    }

    if (this.compareid) {
      const newcomapreid = this.encdec.encryptSensitive(this.compareid.toString());
      this.courseService.deleteCourseCompare(newcomapreid, ftableid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.comparedata = [];
          this.selectedCourses = this.groupBy.transform(this.comparedata, 'universityname');
        }
        this.cd.markForCheck();
      });
    } else {
      this.comparedata = [];
      this.selectedCourses = this.groupBy.transform(this.comparedata, 'universityname');
      this.cd.markForCheck();
    }
    if (isPlatformBrowser(this._platformId)) {
      $('#divcart').removeClass('show');
    }
  }
  removeCourse(coursedetail) {
    let ftableid = coursedetail.id;
    if (isPlatformBrowser(this._platformId)) {
      $('#' + coursedetail.newId).prop('checked', false);
    }
    let removeObj = this.comparedata.filter(val => {
      return val.id === coursedetail.id;
    })
    let index = this.comparedata.indexOf(removeObj[0]);

    this.comparedata.splice(index, 1);
    this.selectedCourses = this.groupBy.transform(this.comparedata, 'universityname');
    if (this.compareid) {
      const newcomapreid = this.encdec.encryptSensitive(this.compareid.toString());
      this.courseService.deleteCourseCompare(newcomapreid, ftableid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.cd.markForCheck();
          // this.comparedata = [];
          // this.selectedCourses = this.groupBy.transform(this.comparedata, 'universityname');
        }

      });
    }

  }
  closeCompareModal() {
    this.topbtnFlag = true;
    this.cd.markForCheck();
  }
  getAdavanceFilters() {
    if (!this.userdata) {
      this.cd.markForCheck();
      $('#loginoptions').modal({ backdrop: 'static', keyboard: false, show: true });
      this.modalFlag = 'advfilter';
    } else {
      this.advanceFilterFlag = true;
      this.prop.initializeJq();
      this.prop.courseCriteriaMoldel = this.courseFilterModel;
      $('#multiModalInner').modal();
      this.cd.markForCheck();
    }

  }
  openCompareModal() {
    if (this.comparedata.length >= 2) {
      const newcomapreid = this.encdec.encryptSensitive(this.compareid.toString());
      this.courseService.getCompareData(newcomapreid).pipe(takeUntil(this.componentDestroyed$)).subscribe(comparedata => {
        if (comparedata.flag) {
          this.courseCompareData = [];
          for (let cdata of comparedata.outdatalist[0]) {
            if (cdata.coursedata) {
              cdata.coursedata = JSON.parse(cdata.coursedata);
              cdata.coursedata.cid = cdata.courseid;
              cdata.coursedata.uid = cdata.univid;
              cdata.coursedata.univ_name = cdata.univname;
              this.courseCompareData.push(cdata.coursedata);
            }
          }
          this.cd.markForCheck();
          if (isPlatformBrowser(this._platformId)) {
            if (this.courseCompareData.length > 0) {
              $('#Fullmodal').modal('toggle');
            }
          }
        }
      });
    } else {
      this.mservice.generateMessage('INFO', 'Please select atleast 2 courses for course compare', '');
    }


  }
  async downloadPdf() {
    var agentInfo = this.adataservice.getAgentInfo();
    if (agentInfo === null) {
      agentInfo = {
        agentLogoURL: environment.agentLogoURL,
        agentAddress: environment.agentAddress,
        agentContact: environment.agentContact,
        agentWebURL: environment.agentWebURL,
        agentOrganization: environment.agentOrganization,
        companyemail: environment.cemail,
        emailpassword: this.encdec.convertTextThirdParty('enc', environment.cp),
      }
    }
    if (isPlatformBrowser(this._platformId)) {

      this.loadService.loadme = true;
      let pageranageAfterSkipHeaderFooterParam = '2-';
      if (environment.production) {
        pageranageAfterSkipHeaderFooterParam = '3-';
      } else {
        pageranageAfterSkipHeaderFooterParam = '2-';
      }
      const newcomapreid = this.encdec.encryptSensitive(this.compareid.toString());

      let agentLogoURL = this.encdec.encryptSensitiveV1(JSON.stringify(agentInfo.agentLogoURL));
      let agentOrganization = this.encdec.encryptSensitiveV1(JSON.stringify(agentInfo.agentOrganization));
      let agentWebURL = this.encdec.encryptSensitiveV1(JSON.stringify(agentInfo.agentWebURL));
      this.pdfService.downloadPDF({
        url: window.location.origin + '/restrict/compare/' + newcomapreid + '/' + agentLogoURL + '/' + agentOrganization + '/' + agentWebURL,
        format: 'A4',
        height: 0,
        emulateMedia: 'print',
        displayHeaderFooter: true,
        issmc: true,
        picon: this.encdec.encryptSensitiveV1(environment.webUrl + '/assets/images/pdfimages/phone-icon.png'),
        licon: this.encdec.encryptSensitiveV1(environment.webUrl + '/assets/images/pdfimages/link-icon.png'),
        ccicon: this.encdec.encryptSensitiveV1(environment.webUrl + '/assets/images/pdfimages/course-compare-header.png'),
        alicon: agentLogoURL,
        agentContact: this.encdec.encryptSensitiveV1(agentInfo.agentContact),
        agentWebURL: this.encdec.encryptSensitiveV1(agentInfo.agentWebURL),
        agentOrganization: this.encdec.encryptSensitiveV1(agentInfo.agentOrganization),
        webUrl: this.encdec.encryptSensitiveV1(environment.webUrl),
        margin: {
          top: '120px',
          bottom: '100px',
          right: 0,
          left: 0
        },
        printBackground: true,
        waitFor: 0,
        emuid: this.encdec.encryptSensitiveV1(agentInfo.companyemail),
        empid: this.encdec.encryptSensitiveV1(this.encdec.convertTextThirdParty('dec', agentInfo.emailpassword)),
        skipFirstPageHeaderFooter: true,
        pageranage: '1',
        pageranageAfterSkipHeaderFooter: pageranageAfterSkipHeaderFooterParam,
      }).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        const a: any = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        const url = window.URL.createObjectURL(data);
        a.href = url;
        a.download = 'coursecompare.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
        this.loadService.loadme = false;
      });
    }
  }

  advancedFilterModel(modelVal) {
    this.courseFilterModel = modelVal;
    this.courseService.getAdvFilteredCourses(modelVal).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (isPlatformBrowser(this._platformId)) {
        $('#multiModalInner').modal('toggle');
      }
      if (data.flag) {
        if (data.outdatalist[0] !== 'No Data Found') {
          this.coursedetails.coursedata = JSON.parse(data.outdatalist[0]);
          this.coursedetails.coursecount = JSON.parse(data.outdatalist[1])[0].coursecount;
          this.cd.markForCheck();
        } else {
          this.coursedetails.coursedata = [];
          this.cd.markForCheck();
        }
      }
    });
  }
  switchView(flag) {
    if (flag === 'O') {
      this.switchFlag = 'O';
      this.courseFilterModel.userid = 0;
    } else {
      this.switchFlag = 'C';
      this.courseFilterModel.userid = this.adataservice.getUserId();
    }
    this.getCourseByFilter();

  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
    this.loadService.ispanel = false;
  }
}
