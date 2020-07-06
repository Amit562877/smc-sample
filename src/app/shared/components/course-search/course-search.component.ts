import { Component, OnInit, Renderer2, Input, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Searchhints, Coursedetails } from 'src/app/models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
import { CourseFiltersService } from 'src/app/services/course-filters.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { BroadcastService } from 'src/app/shared/services/broadcast.service';


import { PdfService } from 'src/app/shared/services/pdf.service';
declare const $: any;
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer, PlatformLocation } from '@angular/common';
import { ManageCoursePreferenceService } from 'src/app/admin/oneform/services/manage-course-preference.service';
import { CoursePreferenceService } from 'src/app/admin/services/course-preference.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { JQueryService } from '../../services/message/jQuery.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseSearchComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  @Input() aid: any;
  @Input() pid: any;
  //@Input() ispopup: any = false;
  @Input() passCoursePrefIds: any;
  @Input() passUnivPrefIds: any;
  searchhints = new Searchhints();
  coursedetails = new Coursedetails();
  throttle = 150;
  scrollDistance = 1;
  scrollUpDistance = 2;
  coursehint: any = [];
  coursehintcount: number;
  universityhint: any = [];
  univIds = [];
  applicantId: any;
  fillFormBtnStatus = false;
  courseIdArr = [];
  univIdArr = [];
  projectmapid: number;
  projectId: number;
  stopListening: Function;
  applicantIdHandleMessage: any;
  AddMoreCourses = false;
  AddMoreCoursesFlag = false;
  scrollStatus = true;
  universitytypeid: any = '';
  universityidlistoriginal: any;
  coursePrefLimit: any = [];
  selectedCourses = [];
  selectedStudylevelCount: any = 0;
  selectedTotalCount = [];
  comparedata = [];
  compareid: number;
  courseCompareData: any;
  topbtnFlag: boolean;
  downloadPDF = false;
  ispopup: any = false;

  logoimgflag = true;
  logoimg: any;
  divFocusFlag = false;
  isbuttonclicke = false;
  inputFocusFlag = false;
  permissions: any = {};
  switchFlag = 'O';
  userdata: any;
  userid: any;
  showform: any = false;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private encdec: EncDecService,
    public courseFilterModel: CourseFiltersService,
    private mservice: ToastService,
    public loadService: LoaderService,
    private router: Router, private renderer: Renderer2,
    private service: BroadcastService,
    private adataservice: AuthdataService,
    private coursePrefService: ManageCoursePreferenceService,
    private coursePreferenceService: CoursePreferenceService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    public pdfService: PdfService,
    private cd: ChangeDetectorRef, private jqservice: JQueryService,
  ) {
    this.stopListening = renderer.listen('window', 'message', this.handleMessage.bind(this));
    // let siteurlorign=(platformLocation as any).location.ancestorOrigins[0];

    // if(siteurlorign==undefined)
    // {
    //   siteurlorign=(platformLocation as any).location.origin;
    // }

    // if(siteurlorign=="http://localhost:4200" || siteurlorign=="https://searchmycourse.konze.com" || siteurlorign=="https://searchmycourse.com")
    // {
    //   this.logoimgflag=true;
    //   this.logoimg="../../../../assets/images/smc.png";
    // }
    // else{
    //   this.logoimgflag=false;
    //   this.logoimg="http://localhost:4200/assets/images/aussizz.png";
    // }
  }
  handleMessage(event: Event) {
    if (!this.applicantId) {
      const message = event as MessageEvent;
      if (typeof (message.data) != "object") {
        this.applicantIdHandleMessage = message.data;
        if (this.applicantIdHandleMessage) {
          this.applicantId = this.applicantIdHandleMessage;
          this.checkForProjectMapId();
        }
      }
    }

  }

  bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
      element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + eventName, eventHandler);
    }
  }

  sendMessage = function (msg) {
    window.parent.postMessage(msg, '*');
  };

  ngOnChanges(changes: any) {
    this.checkForProjectMapId()
  }
  topFunction() {
    if (isPlatformBrowser(this._platformId)) {
      $('.search-results').scrollTop = 0;
    }
  }
  ngOnInit() {
    var agentInfo = this.adataservice.getAgentInfo();
    if (agentInfo != null) {
      this.showform = (agentInfo.hidefillform) ? agentInfo.hidefillform : false;
    }
    this.permissions = this.adataservice.getPermission('Councellor');
    this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (this.adataservice.getUserData()[0]) : '';
    this.userid = this.userdata.uid;
    let kondesklead = (sessionStorage.getItem('kondeskleadid')) ? this.encdec.decryptSensitiveV1(sessionStorage.getItem('kondeskleadid')) : undefined;

    if (kondesklead) {
      this.applicantId = kondesklead;
      sessionStorage.setItem('aid_param', this.applicantId);
      sessionStorage.setItem('aid', this.applicantId);
    }
    try {
      $('.dropdown-menu').on('click', function (e) {
        e.stopPropagation();
      });
      this.topbtnFlag = true;
      //let link=this.encdec.convertText('dec', "U2FsdGVkX1/PmZWZk6eMlrXY/qyMRtGxDyFhUvZ/IBU=", true);
      this.clearFilter();
      this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
        if (params.rno && params.rno.indexOf('konze') > -1) {
          this.applicantId = sessionStorage.getItem('aid');
        }
        if (params.rno.indexOf('konze') == -1) {
          sessionStorage.setItem('aid', '');
          sessionStorage.setItem('pid', '');
          sessionStorage.setItem('aid_param', '');
        }
        if (params.aid) {
          this.applicantId = Number(params.aid.toString());
          sessionStorage.setItem('aid_param', this.applicantId);
        }
        this.projectId = Number(params.prid.toString());
        if (this.projectId) {
          sessionStorage.setItem('pid', this.projectId.toString());
        }
        this.ispopup = (params.ispopup) ? params.ispopup : false;
        let pdata = (sessionStorage.getItem('ispopup') != null && !this.ispopup) ? sessionStorage.getItem('ispopup').toString() : '';
        if (pdata.length > 0) {
          this.ispopup = (sessionStorage.getItem('ispopup') === 'true') ? true : false;
          sessionStorage.removeItem('ispopup')
        } else {
          sessionStorage.setItem('ispopup', String(this.ispopup));
        }

        this.fillFormBtnStatus = (this.ispopup) ? false : (this.selectedCourses && this.selectedCourses.length > 0) ? true : false;
      });
      this.checkForProjectMapId();
    } catch (e) {
      this.loadService.loadme = false;
      this.mservice.generateMessage('ERROR', 'FAILED', e);
    }
  }


  checkForProjectMapId() {
    let univIds = '';
    sessionStorage.setItem('univids', univIds);
    this.courseService.checkForProjectMapId(this.projectId, this.applicantId).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        if (data.outdata && data.outdata[0]) {
          this.projectmapid = data.outdata[0].projectmapid;
          this.coursePreferenceService.getMappingCourses(this.projectmapid).pipe(takeUntil(this.componentDestroyed$)).subscribe(datacourse => {
            if (datacourse.flag) {
              this.courseService.getSelectedCompareCourses(this.encdec.encryptSensitive(this.applicantId.toString()), this.encdec.encryptSensitive(this.projectId.toString())).pipe(takeUntil(this.componentDestroyed$)).subscribe(comparedata => {
                //------------------------------------------------------
                this.selectedCourses = datacourse.outdatalist[0];
                if (this.selectedCourses && this.selectedCourses.length > 0) {
                  this.fillFormBtnStatus = true;
                }
                //------------------------------------------------------
                if (comparedata.flag && comparedata.outdatalist[0]) {
                  this.comparedata = [];
                  if (comparedata.outdatalist[1] && comparedata.outdatalist[1][0].compareid != 0) {
                    this.compareid = comparedata.outdatalist[1][0].compareid;
                  }
                  //course compare ischecked field add start

                  for (let cdata of comparedata.outdatalist[0]) {
                    const chk_id = 'compare_' + cdata.id + '_' + cdata.campusid;
                    if (isPlatformBrowser(this._platformId)) {
                      setTimeout(() => {
                        $('#' + chk_id).prop('checked', true);
                      }, 100);
                    }
                    let tmpval = this.selectedCourses.filter(val => {
                      return val.courseid === cdata.id;
                    });
                    if (tmpval && tmpval.length > 0) {
                      this.comparedata.push(tmpval[0]);
                    }

                  }
                  //course compare ischecked field end
                }
              });
              this.cd.markForCheck();

              this.selectedStudylevelCount = datacourse.outdatalist[1];
              this.selectedTotalCount = datacourse.outdatalist[2];
              if (this.selectedStudylevelCount.length > 0) {
                this.cd.markForCheck();
                for (let cc of this.selectedStudylevelCount) {
                  univIds += cc.univid + ',';
                }
              }

              sessionStorage.setItem('univids', univIds);
              this.getAllCourses();
            }
          });
        } else {
          this.selectedCourses = [];
          this.getAllCourses();
        }
      }
    });

  }
  getAllCourses() {
    this.loadService.loadme = true;
    this.courseFilterModel.pageindex = 1;
    this.courseService.getAllCourses(this.courseFilterModel).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        if (data.outdatalist[0] != "No Data Found") {
          this.coursedetails.coursedata = JSON.parse(data.outdatalist[0]);
        } else {
          this.coursedetails.coursedata = [];
        }
        this.coursedetails.coursecount = JSON.parse(data.outdatalist[1])[0].coursecount;
        this.courseService.getDropDownValues().pipe(takeUntil(this.componentDestroyed$)).subscribe(dropDownValues => {
          if (dropDownValues.flag) {
            this.coursedetails.universitylist = (dropDownValues.outdatalist[3] !== 'No Data Found') ? JSON.parse(dropDownValues.outdatalist[3]) : [];
            this.universityidlistoriginal = (dropDownValues.outdatalist[3] !== 'No Data Found') ? JSON.parse(dropDownValues.outdatalist[3]) : [];
            this.coursedetails.intakelist = (dropDownValues.outdatalist[4] !== 'No Data Found') ? JSON.parse(dropDownValues.outdatalist[4]) : [];
            this.coursedetails.countrylist = (dropDownValues.outdatalist[0] !== 'No Data Found') ? JSON.parse(dropDownValues.outdatalist[0]) : [];
            this.coursedetails.statelist = [];
            this.coursedetails.citylist = [];
            this.coursedetails.originalstatelist = (dropDownValues.outdatalist[1] !== 'No Data Found') ? JSON.parse(dropDownValues.outdatalist[1]) : [];
            this.coursedetails.originalcitylist = (dropDownValues.outdatalist[2] !== 'No Data Found') ? JSON.parse(dropDownValues.outdatalist[2]) : [];
            this.coursedetails.educationleveldata = (dropDownValues.outdatalist[5] !== 'No Data Found') ? JSON.parse(dropDownValues.outdatalist[5]) : [];
            this.coursedetails.institutetypelist = (dropDownValues.outdatalist[6] !== 'No Data Found') ? JSON.parse(dropDownValues.outdatalist[6]) : [];
            this.coursedetails.disciplinelist = (dropDownValues.outdatalist[7] !== 'No Data Found') ? JSON.parse(dropDownValues.outdatalist[7]) : [];
            this.cd.markForCheck();
            this.filterstateonload();
            this.filtercityonload();
          }
        });


        this.loadService.loadme = false;
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
      }

    });
    this.getCoursePreferenceLimit();

  }
  filterstateonload() {
    if (this.courseFilterModel.countryid > 0) {
      this.coursedetails.statelist = this.coursedetails.originalstatelist.filter(data => data.countryid === this.courseFilterModel.countryid);
    }
  }
  filtercityonload() {
    if (this.courseFilterModel.stateid > 0) {
      this.coursedetails.citylist = this.coursedetails.originalcitylist.filter(data => data.stateid === this.courseFilterModel.stateid);
    }
  }

  getCoursePreferenceLimit() {
    const pageindex = -1, pagesize = -1;
    this.coursePrefService.getAllUniversityCoursePref(pageindex, pagesize).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.coursePrefLimit = data.outdatalist[0];
        this.cd.markForCheck();
      }
    });
  }
  // getSelectedCourses() {
  //   this.coursePreferenceService.getMappingCourses(this.projectmapid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
  //     if (data.flag) {
  //       this.courseService.getSelectedCompareCourses(this.applicantId, this.projectId).pipe(takeUntil(this.componentDestroyed$)).subscribe(comparedata => {
  //         //------------------------------------------------------
  //         this.selectedCourses = data.outdatalist[0];
  //         //------------------------------------------------------
  //         if (comparedata.flag && comparedata.outdatalist[0]) {
  //           if (comparedata.outdatalist[1] && comparedata.outdatalist[1][0].compareid != 0) {
  //             this.compareid = comparedata.outdatalist[1][0].compareid;
  //           }
  //           //course compare ischecked field add start
  //           this.comparedata = [];
  //           for (let cdata of comparedata.outdatalist[0]) {
  //             const chk_id = 'compare_' + cdata.id + '_' + cdata.campusid;
  //             if (isPlatformBrowser(this._platformId)) {
  //               setTimeout(() => {
  //                 $('#' + chk_id).prop('checked', true);
  //               }, 100);
  //             }
  //             let tmpval = this.selectedCourses.filter(val => {
  //               return val.courseid === cdata.id;
  //             });
  //             if (tmpval && tmpval.length > 0) {
  //               this.comparedata.push(tmpval[0]);
  //             }

  //           }
  //         }
  //         this.cd.markForCheck();
  //       });
  //       this.selectedStudylevelCount = data.outdatalist[1];
  //       this.selectedTotalCount = data.outdatalist[2]
  //       if (this.selectedStudylevelCount && this.selectedStudylevelCount.length > 0) {
  //         this.fillFormBtnStatus = true;
  //       } else {
  //         this.fillFormBtnStatus = false;
  //       }
  //     }
  //   });
  // }
  getSelectedCourses() {
    this.coursePreferenceService.getMappingCourses(this.projectmapid).pipe(takeUntil(this.componentDestroyed$)).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.courseService.getSelectedCompareCourses(this.encdec.encryptSensitive(this.applicantId.toString()), this.encdec.encryptSensitive(this.projectId.toString())).pipe(takeUntil(this.componentDestroyed$)).pipe(takeUntil(this.componentDestroyed$)).subscribe(comparedata => {
          //------------------------------------------------------
          this.selectedCourses = data.outdatalist[0];
          this.cd.markForCheck();
          //------------------------------------------------------
          if (comparedata.flag && comparedata.outdatalist[0]) {
            if (comparedata.outdatalist[1] && comparedata.outdatalist[1][0].compareid != 0) {
              this.compareid = comparedata.outdatalist[1][0].compareid;
            }
            //course compare ischecked field add start
            this.comparedata = [];
            for (let cdata of comparedata.outdatalist[0]) {
              const chk_id = 'compare_' + cdata.id + '_' + cdata.campusid;
              if (isPlatformBrowser(this._platformId)) {
                setTimeout(() => {
                  $('#' + chk_id).prop('checked', true);
                }, 100);
              }
              let tmpval = this.selectedCourses.filter(val => {
                return val.courseid === cdata.id;
              });
              if (tmpval && tmpval.length > 0) {
                this.comparedata.push(tmpval[0]);
              }

            }
          }
        });
        this.selectedStudylevelCount = data.outdatalist[1];
        this.selectedTotalCount = data.outdatalist[2]
        let univIds = '';
        if (this.selectedStudylevelCount.length > 0) {
          this.cd.markForCheck();
          for (let cc of this.selectedStudylevelCount) {
            univIds += cc.univid + ',';
          }
        }
        sessionStorage.setItem('univids', univIds);
        if (this.selectedStudylevelCount && this.selectedStudylevelCount.length > 0) {
          this.fillFormBtnStatus = true;
        } else {
          this.fillFormBtnStatus = false;
        }
      }

    });
  }
  onScrollDown() {
    this.courseFilterModel.pageindex = this.courseFilterModel.pageindex + 1;

    if (this.courseFilterModel.pageindex <= Math.ceil(this.coursedetails.coursecount / this.courseFilterModel.pagesize)) {
      this.courseService.getAllCourses(this.courseFilterModel).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
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
  }
  onUp() {
  }
  getCourseByHint(cname) {
    this.courseFilterModel.searchstring = cname;
    this.getCourseByFilter();
  }
  getCourseByFilter() {
    this.loadService.loadme = true;
    this.searchhints = new Searchhints();
    this.courseFilterModel.pageindex = 1;
    if (this.courseFilterModel.criteriaJSON == undefined || this.courseFilterModel.criteriaJSON.length == 0) {
      this.courseFilterModel.criteriaJSON = [];
    }

    this.courseService.getAllCourses(this.courseFilterModel).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.cd.markForCheck();
      if (data.flag) {
        if (data.outdatalist[0] !== 'No Data Found') {
          this.coursedetails.coursedata = JSON.parse(data.outdatalist[0]);
          for (let course of this.coursedetails.coursedata) {
            course.ischecked = false;
          }
        } else {
          this.coursedetails.coursedata = undefined;
        }
        this.loadService.loadme = false;
      } else {
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
        this.coursedetails.coursedata = undefined;
        this.loadService.loadme = false;
      }
    });
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

  // globalhints(e) {
  //   if (this.courseFilterModel.searchstring.length > 2 || this.courseFilterModel.searchstring.length === 0) {
  //     this.cd.markForCheck();
  //     if (e.which === 13 || this.courseFilterModel.searchstring.length === 0) {
  //       this.getCourseByFilter();
  //     } else {
  //       this.courseService.globlahints(this.courseFilterModel.searchstring, this.searchhints.pageindex,
  //         this.searchhints.pagesize, 0, 'course').pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
  //           if (data.flag && data.outdatalist[0] !== 'No Data Found') {
  //             this.searchhints.coursehint = JSON.parse(data.outdatalist[0]);
  //             this.searchhints.coursehintcount = JSON.parse(data.outdatalist[2])[0].coursecount;
  //             if (this.searchhints.coursehintcount >= (this.searchhints.pageindex * this.searchhints.pagesize)) {
  //               this.searchhints.ismorepage = true;
  //             } else {
  //               this.searchhints.ismorepage = false;
  //             }
  //           } else {
  //             //   this.mservice.generateMessage('ERROR', 'FAILED', data.message);
  //             this.searchhints = new Searchhints();
  //           }
  //         });
  //     }
  //   } else {
  //     this.searchhints = new Searchhints();
  //   }
  // }
  getNextHint() {
    this.searchhints.pageindex = this.searchhints.pageindex + 1;
    this.courseService.globlahints(this.courseFilterModel.searchstring, this.searchhints.pageindex,
      this.searchhints.pagesize, 0, 'course').pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        this.cd.markForCheck();
        if (data.flag && data.outdatalist[0]) {
          this.searchhints.coursehint = this.searchhints.coursehint.concat(JSON.parse(data.outdatalist[0]));
          this.searchhints.coursehintcount = JSON.parse(data.outdatalist[2])[0].coursecount;
          if (this.searchhints.coursehintcount >= (this.searchhints.pageindex * this.searchhints.pagesize)) {
            this.searchhints.ismorepage = true;
          } else {
            this.searchhints.ismorepage = false;
          }
        } else {
          this.mservice.generateMessage('ERROR', 'FAILED', data.message);
        }
      });
  }

  filterstate() {
    this.coursedetails.statelist = this.coursedetails.originalstatelist.filter(data => data.countryid === this.courseFilterModel.countryid);
    this.coursedetails.citylist = [];
    this.courseFilterModel.stateid = 0;
    this.courseFilterModel.cityid = 0;
  }
  filtercity() {
    this.coursedetails.citylist = this.coursedetails.originalcitylist.filter(data => data.stateid === this.courseFilterModel.stateid);
    this.courseFilterModel.cityid = 0;
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
    this.courseFilterModel.universityid = 0;
    this.courseFilterModel.institutetype = 0;
    this.getCourseByFilter();
  }
  getUniversityIds(payload) {
    this.cd.markForCheck();
    if (!this.applicantId) {
      if (this.applicantIdHandleMessage === undefined) {
        this.applicantId = this.getGuid();
      } else {
        this.applicantId = this.applicantIdHandleMessage;
      }
    }
    if (this.applicantId != "") {
      this.sendMessage(this.applicantId);
    }
    if (!sessionStorage.getItem('aid')) {
      sessionStorage.setItem('aid', this.applicantId);
    }
    const coursedetail = payload.coursedetail
    const uid = coursedetail.universityid;
    const cid = coursedetail.id;
    const cname = coursedetail.coursename;
    const chkbx_id = 'chk_' + coursedetail.id + '_' + coursedetail.campusid;

    let limitOfCourses = this.coursePrefLimit.filter(val => {
      return val.univid === uid;
    });
    if (this.selectedStudylevelCount && this.selectedStudylevelCount.length > 0 && coursedetail.ischecked) {

      let countOfCourses = this.selectedStudylevelCount.filter(val => {
        return val.univid === uid;
      });

      if (countOfCourses && countOfCourses.length > 0 && limitOfCourses && limitOfCourses.length > 0) {
        let studyLevelCheck_limit = limitOfCourses.filter(val => {
          return val.studylevelname === coursedetail.studylevelname;
        });
        let studyLevelCheck_selected = countOfCourses.filter(val => {
          return val.name === coursedetail.studylevelname;
        });
        if (studyLevelCheck_limit && studyLevelCheck_limit.length > 0 && studyLevelCheck_limit[0].studylevelname != null) {
          // checks studylevel limit

          if (studyLevelCheck_selected && studyLevelCheck_selected.length > 0) {
            if (studyLevelCheck_selected[0].studylevelcount >= studyLevelCheck_limit[0].preflimit) {
              this.mservice.generateMessage('INFO', 'You can select ' + studyLevelCheck_limit[0].preflimit + ' ' + studyLevelCheck_limit[0].studylevelname + ' course for ' + studyLevelCheck_limit[0].univname, '');
              if (isPlatformBrowser(this._platformId)) {
                setTimeout(() => {
                  $('#' + chkbx_id).prop('checked', false);
                }, 100);
              }
            } else {
              this.makeMeAnimated(chkbx_id, cid, uid, cname);
              if (!this.projectmapid) {
                this.courseService.insertProjectMappingDetails(this.projectId, this.applicantId, this.userid).pipe(takeUntil(this.componentDestroyed$)).subscribe(getdata => {
                  this.projectmapid = getdata.outdata;
                  this.saveCourseDetails(coursedetail);

                });
              } else {
                this.saveCourseDetails(coursedetail);
              }
            }
          } else {
            this.makeMeAnimated(chkbx_id, cid, uid, cname);
            if (!this.projectmapid) {
              this.courseService.insertProjectMappingDetails(this.projectId, this.applicantId, this.userid).pipe(takeUntil(this.componentDestroyed$)).subscribe(getdata => {
                this.projectmapid = getdata.outdata;
                this.saveCourseDetails(coursedetail);

              });
            } else {
              this.saveCourseDetails(coursedetail);
            }
          }

        } else {
          // checks total limit
          this.universityCheckLimit(chkbx_id, cid, uid, cname, coursedetail, limitOfCourses);
        }

      } else {
        this.makeMeAnimated(chkbx_id, cid, uid, cname);
        if (!this.projectmapid) {
          this.courseService.insertProjectMappingDetails(this.projectId, this.applicantId, this.userid).pipe(takeUntil(this.componentDestroyed$)).subscribe(getdata => {
            this.projectmapid = getdata.outdata;
            this.saveCourseDetails(coursedetail);
          });
        } else {
          this.saveCourseDetails(coursedetail);
        }
      }
    } else {
      this.universityCheckLimit(chkbx_id, cid, uid, cname, coursedetail, limitOfCourses);
    }

  }

  universityCheckLimit(chkbx_id, cid, uid, cname, coursedetail, limitOfCourses) {
    this.cd.markForCheck();
    let withoutstudyLevel_limit = this.selectedTotalCount.filter(val => {
      //filter data that contains null as studylevel
      return val.univid === uid;
    });
    if (withoutstudyLevel_limit && withoutstudyLevel_limit.length > 0 && withoutstudyLevel_limit[0].preflimit != null && (withoutstudyLevel_limit[0].totalcourse >= withoutstudyLevel_limit[0].preflimit)) {
      this.mservice.generateMessage('INFO', 'You can select ' + limitOfCourses[0].preflimit + ' course for ' + limitOfCourses[0].univname, '');
      if (isPlatformBrowser(this._platformId)) {
        setTimeout(() => {
          $('#' + chkbx_id).prop('checked', false);
        }, 100);
      }
    } else {
      if (coursedetail.ischecked) {
        this.makeMeAnimated(chkbx_id, cid, uid, cname);
      }

      if (!this.projectmapid) {
        this.courseService.insertProjectMappingDetails(this.projectId, this.applicantId, this.userid).pipe(takeUntil(this.componentDestroyed$)).subscribe(getdata => {
          this.projectmapid = getdata.outdata;
          this.saveCourseDetails(coursedetail);

        });
      } else {
        this.saveCourseDetails(coursedetail);
      }
    }
  }
  saveCourseDetails(coursedetail) {
    let payloadArr;
    payloadArr = {
      courseid: coursedetail.id,
      campusid: coursedetail.campusid,
      universityid: coursedetail.universityid,
      projectmapid: this.projectmapid,
      createdby: this.userid,
      sequence: 0,
      isactive: 1,
      isdelete: 0
    };
    const compareChk_id = 'compare_' + coursedetail.id + '_' + coursedetail.campusid;
    let ischecked = $('#' + compareChk_id).prop('checked');
    this.cd.markForCheck();
    if (ischecked) {
      coursedetail.courseid = coursedetail.id;
      this.removeCourseCompare(coursedetail);
    }
    if (!coursedetail.ischecked) {
      payloadArr.isdelete = 1;
    }
    let courseMappingDetail = {
      mappingDetails: [payloadArr],
      projectmapid: this.projectmapid
    }
    let univIds = '';
    if (this.selectedStudylevelCount.length > 0) {
      this.cd.markForCheck();
      for (let cc of this.selectedStudylevelCount) {
        univIds += cc.univid + ',';
      }
    }
    sessionStorage.setItem('univids', univIds);
    this.courseService.saveCourseMappingDetails(courseMappingDetail).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.loadService.loadme = false;
      this.getSelectedCourses();
    });
  }
  getGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  getAssessmentPrefCourses() {
    this.service.BroadcastCountryName(this.projectmapid);
  }
  makeMeAnimated(chkbx_id, cid, uid, cname) {
    if (isPlatformBrowser(this._platformId)) {
      var cart = $('.count-shopping-cart');
      var imgtodrag = $('#' + chkbx_id).closest('.count-item').find(".count-img-redirect").eq(0);
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
          //$("#anim_" + i).detach()
        });
      }
    }

  }
  removeCourse(coursedetail) {
    let payload = {
      id: coursedetail.courseid,
      campusid: coursedetail.campusid,
      universityid: coursedetail.universityid,
      projectmapid: coursedetail.projectmapid,
      createdby: coursedetail.aid,
      ischecked: false
    }
    this.cd.markForCheck();
    this.saveCourseDetails(payload);


  }

  passUniversityIds() {

    this.loadService.loadme = true;
    let univIds = '';
    //sessionStorage.setItem('aid', this.applicantId);
    //sessionStorage.setItem('pid', this.projectId.toString());
    if (this.selectedStudylevelCount.length > 0) {
      this.cd.markForCheck();
      for (let cc of this.selectedStudylevelCount) {
        univIds += cc.univid + ',';
      }
    }
    univIds = univIds.substring(0, univIds.length - 1);
    if (this.aid && this.pid) {
      this.clearFilter();
      if (isPlatformBrowser(this._platformId)) {
        $('#Fullmodal').modal('toggle');
      }
      this.getAssessmentPrefCourses();
    } else {
      this.router.navigate(['/user/assessment', this.encdec.encryptSensitiveV1(univIds), this.encdec.encryptSensitiveV1(this.projectmapid.toString())]);
    }

  }
  clearCourseSelection() {
    let payloadArr = [];
    this.cd.markForCheck();
    for (let course of this.selectedCourses) {
      payloadArr.push({
        courseid: course.courseid,
        universityid: course.universityid,
        campusid: course.campusid,
        projectmapid: this.projectmapid,
        createdby: this.applicantId,
        sequence: 0,
        isactive: 1,
        isdelete: 1
      });
    }
    let courseMappingDetail = {
      mappingDetails: payloadArr,
      projectmapid: this.projectmapid
    }
    this.courseService.saveCourseMappingDetails(courseMappingDetail).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.loadService.loadme = false;
      this.cd.markForCheck();
      if (this.aid && this.pid) {
        this.clearFilter();
        if (isPlatformBrowser(this._platformId)) {
          $('#Fullmodal').modal('toggle');
        }
        this.getAssessmentPrefCourses();
      } else {
        this.getSelectedCourses();
      }

    });
    this.clearCourseCompare();
  }
  clickCompare(coursedetail) {
    const chk_id = 'compare_' + coursedetail.courseid + '_' + coursedetail.campusid;
    this.cd.markForCheck();
    if (coursedetail.ischecked) {
      if (this.comparedata.length < 4) {

        this.comparedata.push(coursedetail);
        this.saveCourseCompare(coursedetail)
      } else {
        if (isPlatformBrowser(this._platformId)) {
          setTimeout(() => {
            $('#' + chk_id).prop('checked', false);
          }, 100);
        }

        this.mservice.generateMessage('INFO', 'You can compare only 4 courses', '');
      }

    } else {
      this.removeCourseCompare(coursedetail);
    }
    //  this.selectedCourses = this.groupBy.transform(this.comparedata, 'universityname');

  }
  public trackByIndex(index: number) {
    return index;
  }
  saveCourseCompare(coursedetail) {
    let coursedetailarr = [];
    this.cd.markForCheck();
    coursedetailarr.push({
      id: 0,
      userid: this.encdec.encryptSensitive(this.applicantId.toString()),
      ftableid: coursedetail.courseid,
      ftablename: 'tblcourse',
      campusid: coursedetail.campusid,
      projectid: this.encdec.encryptSensitive(this.projectId.toString())
    });

    let compareJson = {
      comparearray: coursedetailarr
    };
    this.courseService.saveCourseCompare(compareJson).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.cd.markForCheck();
      if (data.flag) {
        this.compareid = data.outdata;
        // this.courseService.getCompareData(this.compareid).pipe(takeUntil(this.componentDestroyed$)).subscribe(comparedata => {
        //   if (comparedata.flag) {
        //     //this.courseCompareData = comparedata.outdatalist[0];
        //   }
        // });
      }
    });
  }
  removeCourseCompare(coursedetail) {
    this.cd.markForCheck();
    let ftableid = coursedetail.courseid;
    const chk_id = 'compare_' + coursedetail.courseid + '_' + coursedetail.campusid;
    if (isPlatformBrowser(this._platformId)) {
      $('#' + chk_id).prop('checked', false);
    }
    let removeObj = this.comparedata.filter(val => {
      return val.courseid === coursedetail.courseid;
    })
    let index = this.comparedata.indexOf(removeObj[0]);

    this.comparedata.splice(index, 1);

    if (this.compareid) {
      this.courseService.deleteCourseCompare(this.encdec.encryptSensitive(this.compareid.toString()), ftableid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        this.cd.markForCheck();
        if (data.flag) {
          // this.comparedata = [];
          // this.selectedCourses = this.groupBy.transform(this.comparedata, 'universityname');
        }

      });
    }

  }
  clearCourseCompare() {
    //courseid = -1 means delete all
    let ftableid = -1;
    if (isPlatformBrowser(this._platformId)) {
      this.cd.markForCheck();
      for (let cdata of this.comparedata) {
        const chk_id = 'compare_' + cdata.courseid + '_' + cdata.campusid;
        $('#' + chk_id).prop('checked', false);
      }
    }

    if (this.compareid) {
      this.comparedata = [];
      this.cd.markForCheck();
      this.courseService.deleteCourseCompare(this.encdec.encryptSensitive(this.compareid.toString()), ftableid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      });
    } else {
      this.comparedata = [];
      this.cd.markForCheck();
    }
    if (isPlatformBrowser(this._platformId)) {
      $('#divcart').removeClass('show');
    }
    $('.dropdown-menu').removeClass('show');
  }
  openCompareModal() {
    if (this.comparedata.length >= 2) {
      this.fillFormBtnStatus = false;
      this.topbtnFlag = false;
      this.courseService.getCompareData(this.encdec.encryptSensitive(this.compareid.toString())).pipe(takeUntil(this.componentDestroyed$)).subscribe(comparedata => {
        this.cd.markForCheck();
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
  closeCompareModal() {
    this.fillFormBtnStatus = true;
    this.topbtnFlag = true;
  }
  // downloadPdf() {
  //   this.cd.markForCheck();
  //   if (isPlatformBrowser(this._platformId)) {
  //     this.loadService.loadme = true;
  //     const newcomapreid = this.encdec.encryptSensitive(this.compareid.toString());
  //     this.pdfService.downloadPDF({
  //       url: window.location.origin + '/restrict/compare/' + newcomapreid,
  //       format: 'A4',
  //       height: 0,
  //       emulateMedia: 'print',
  //       printBackground: false,
  //       waitFor: 0
  //     }).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
  //       const a: any = document.createElement('a');
  //       document.body.appendChild(a);
  //       a.style = 'display: none';
  //       const url = window.URL.createObjectURL(data);
  //       a.href = url;
  //       a.download = 'coursecompare.pdf';
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //       this.loadService.loadme = false;
  //     });
  //   }
  // }
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
        skipFirstPageHeaderFooter: true,
        pageranage: '1',
        emuid: this.encdec.encryptSensitiveV1(agentInfo.companyemail),
        empid: this.encdec.encryptSensitiveV1(this.encdec.convertTextThirdParty('dec', agentInfo.emailpassword)),
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
  }
}
