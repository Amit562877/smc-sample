import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { VisachecklistService } from 'src/app/services/visachecklist.service';
import { PdfService } from 'src/app/shared/services/pdf.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
declare const performjsAction: any;
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { JQueryService } from 'src/app/shared/services/message/jQuery.service';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
import { ConstantPool } from '@angular/compiler';
declare const $: any;
@Component({
  selector: 'app-course-detail-pdf',
  templateUrl: './course-detail-pdf.component.html',
  styleUrls: ['./course-detail-pdf.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailPdfComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  environment = environment;
  courseid: string;
  universityid: string;
  coursedata: any;
  universitydata: any;
  universityrankingdata: any;
  topcourses: any;
  sviewurl: string;
  searchstring: any;
  isbuttonclicke = false;
  lodgementdetails: any;
  documentlist: any;
  documentcountrylist: any;
  documentrelationshiplist: any = [];
  documentrelationshiplistfixed: any = [1, 2, 3, 4, 15];
  servicedocumentlist: any;
  documentid: any = '';
  doccountryid: any = '';
  docrelationid: any = '';
  funddata: any = [];
  isotherapplicant: any = false;
  tuitionfees: any = 0;
  travelcoast: any = 0;
  livingcost: any = 0;
  totaltuitionfees: any = 0;
  totaltravelcoast: any = 0;
  totallivingcost: any = 0;
  totalschoolfees: any = 0;
  graceamount: any = 2000;
  nettotal: any = 0;
  servicedocuments = false;
  lodgement = false;
  docemailSubmitted = false;
  // ----------- start param document send email ----------//

  favcnt: any;
  showfavcnt: any;
  cid: number;
  uid: number = 0;
  tblname: string;
  check: boolean = true;
  visitcnt: any;
  description: any;
  selectissue: any;
  sid: any;
  aid: any;
  currencyRate: any;
  universitycampus: string;
  viewtype = 'original';
  tmpeditCouncellorFees: any;
  editCouncellorFees: any;
  editCouncellorIntakes: any;
  tmpeditCouncellorIntakes: any;
  editCouncellorEngreq: any;
  tmpeditCouncellorEngreq: any;
  userdata: any;


  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    public loadService: LoaderService,
    public visaService: VisachecklistService,
    public pdfService: PdfService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef,
    private adataservice: AuthdataService,
    private encdec: EncDecService,
    private jQueryService: JQueryService
  ) { }
  agnetDetails: any = {};
  ngOnInit() {
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.courseid = params.courseid.toString();
      this.universityid = params.universityid.toString();
      this.universitycampus = params.universitycampus.toString();
      this.currencyRate = params.currency.toString();
      this.viewtype = params.viewtype.toString();
      this.uid = (params.uid !== 'undefined') ? parseInt(params.uid.toString()) : 0;
      this.agnetDetails.agentLogoURL = (params.al) ? JSON.parse(this.encdec.decryptSensitiveV1(params.al)) : '';
      this.agnetDetails.agentOrganization = (params.ao) ? JSON.parse(this.encdec.decryptSensitiveV1(params.ao)) : '';
      this.agnetDetails.agentWebURL = (params.aw) ? JSON.parse(this.encdec.decryptSensitiveV1(params.aw)) : '';
    });
    this.jQueryService.loadCSS({ href: 'https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css' });
    this.jQueryService.loadCSS({ href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css' });
    this.jQueryService.loadCSS({ href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,600,700|Yellowtail' });
    this.getCourseDetails();
  }
  changeCurrency() {

    let splitCurr = this.currencyRate.split(':');
    let ExchangeRate = splitCurr[0];
    for (let i = 0; i < this.coursedata.course_tuition_fee.fees.length; i++) {
      let feeData = this.coursedata.course_tuition_fee.fees[i];
      if (feeData.name == this.universitycampus) {
        // for (let j = 0; j < feeData.value.international_student.length; j++) {
        let fee = feeData.value.international_student;
        let newFees = (parseFloat(fee.amount) * parseFloat(ExchangeRate)).toFixed(2);
        this.coursedata.course_tuition_fee.fees[i].value.international_student.amount = newFees;
        this.coursedata.course_tuition_fee.fees[i].value.currency = splitCurr[1];
        // }
        this.cd.markForCheck();
      }

    }
    this.cd.markForCheck();
  }
  getCourseDetails() {
    // this.userdata = this.adataservice.getUserData()
    // this.uid = (this.userdata[0]) ? this.userdata[0].uid : 0;

    this.courseService.getCoursesDetailsByProps(this.courseid, this.universityid, this.uid, this.universitycampus).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      try {
        this.coursedata = JSON.parse(data.outdatalist[0]);
        this.cid = this.coursedata[0].courseid;
        this.showfavcnt = (data.outdatalist[4] !== 'No Data Found') ? JSON.parse(data.outdatalist[4]) : [];
        this.coursedata = JSON.parse(this.coursedata[0].coursedata);
        this.changeCurrency();
        this.favcnt = JSON.parse(data.outdatalist[5])
        this.visitcnt = JSON.parse(data.outdatalist[6])

        if (data.outdatalist[8] != 'No Data Found' && data.outdatalist[8].length > 0) {
          this.tmpeditCouncellorFees = JSON.parse(data.outdatalist[8]);
          this.setCouncellorDetails(JSON.parse(data.outdatalist[8]), 'fees');
        } else {
          for (let i = 0; i < this.coursedata.course_tuition_fee.fees.length; i++) {
            let feeData = this.coursedata.course_tuition_fee.fees[i];
            if (feeData.name == this.universitycampus) {
              this.tmpeditCouncellorFees = feeData;
              this.editCouncellorFees = this.tmpeditCouncellorFees;
              this.cd.markForCheck();
              // this.setCouncellorDetails(JSON.parse(this.editCouncellorFees));

            }
            this.cd.markForCheck();
          }
        }
        if (data.outdatalist[9] != 'No Data Found' && data.outdatalist[9].length > 0) {
          this.tmpeditCouncellorIntakes = JSON.parse(data.outdatalist[9]);
          this.setCouncellorDetails(JSON.parse(data.outdatalist[9]), 'intake');
        } else {
          this.tmpeditCouncellorIntakes = this.coursedata.course_intake;
          this.editCouncellorIntakes = $.extend(true, {}, this.tmpeditCouncellorIntakes);
        }
        if (data.outdatalist[10] != 'No Data Found' && data.outdatalist[10].length > 0) {
          this.tmpeditCouncellorEngreq = JSON.parse(data.outdatalist[10]);
          this.setCouncellorDetails(JSON.parse(data.outdatalist[10]), 'engreq');
        } else {
          this.tmpeditCouncellorEngreq = this.coursedata.course_admission_requirement;
          this.editCouncellorEngreq = $.extend(true, {}, this.tmpeditCouncellorEngreq);
        }
        // console.log ("Data==>",JSON.parse(this.coursedata.course_tuition_fee.fees ))
        this.universitydata = JSON.parse(data.outdatalist[1])[0];
        this.universityrankingdata = (data.outdatalist[3] !== 'No Data Found') ? JSON.parse(data.outdatalist[3]) : [];
        if (isPlatformBrowser(this._platformId)) {
          this.sviewurl = `https://www.google.com/maps/embed/v1/streetview?key=AIzaSyCkQ0pVMQyDUzOw0G5OUS71FpqrpbseX6Q
          &location=${this.universitydata.lat},${this.universitydata.long}
          &heading=210
          &pitch=10`;
        }
        this.topcourses = (data.outdatalist[2] !== 'No Data Found') ? JSON.parse(data.outdatalist[2]) : [];
        this.loadService.loadme = false;
        if (isPlatformBrowser(this._platformId)) {
          performjsAction();
        }
        this.cd.markForCheck();
      } catch (e) {
        console.log('error', e);
      }
    });
  }
  setCouncellorDetails(data, type) {
    switch (type) {
      case 'fees':
        this.editCouncellorFees = {
          fees: []
        }
        if (this.viewtype === 'original') {

          let feedata = this.coursedata.course_tuition_fee

          for (let feesData of this.coursedata.course_tuition_fee.fees) {
            if (feesData.name == this.universitycampus) {

              this.editCouncellorFees.fees.push({
                name: feesData.name,
                value: {
                  international_student: {
                    amount: feesData.amount,
                    unit: feesData.unit,
                    duration: feesData.duration,
                    description: feesData.description
                  },
                  currency: feesData.currency
                }
              });
            }
          }

        }
        else {
          for (let feedata of data) {
            if (feedata.name == this.universitycampus) {
              this.editCouncellorFees.fees.push({
                name: feedata.name,
                value: {
                  international_student: {
                    amount: feedata.amount,
                    unit: feedata.unit,
                    duration: feedata.duration,
                    description: feedata.description
                  },
                  currency: feedata.currency
                }
              });
            }
          }


          this.coursedata.course_tuition_fee = this.editCouncellorFees
          this.changeCurrency();

        }
        break;
      case 'intake':
        if (this.viewtype !== 'original') {
          let uniqueCampus = [];
          for (let mcampus of data) {
            if (uniqueCampus.length > 0) {
              if (!uniqueCampus.includes(mcampus.name)) {
                uniqueCampus.push(mcampus.name);
              }
            } else {
              uniqueCampus.push(mcampus.name);
            }

          }
          let newintakes = [];
          for (let uc of uniqueCampus) {
            let ndata = data.filter(val => {
              return (val.name === uc);
            });
            let tmpintake = {
              name: '',
              value: []
            }
            tmpintake.name = ndata[0].name;
            for (let d of ndata) {
              tmpintake.value.push({ actualdate: d.actualdate, month: d.month });
            }
            newintakes.push(tmpintake);
          };
          this.coursedata.course_intake.intake = newintakes;
        }

        break;
      case 'engreq':
        if (this.viewtype !== 'original') {
          this.editCouncellorEngreq = {
            english: []
          }
          for (let d of data) {
            this.editCouncellorEngreq.english.push(d);
          }
          this.coursedata.course_admission_requirement.english = this.editCouncellorEngreq.english;
        }
        break;
    }
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
