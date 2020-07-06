import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewFormService } from '../../services/review-form.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { PdfService } from 'src/app/shared/services/pdf.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpEventType, HttpResponse, HttpRequest, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BroadcastService } from 'src/app/shared/services/broadcast.service';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
import { JQueryService } from 'src/app/shared/services/message/jQuery.service';
import { AuthdataService } from 'src/app/auth/services/authdata.service';


declare const $: any;
@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewFormComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();



  @Input() applicantId: any;
  @Input() universityIdparam: any;
  ocation: any = Location;
  flag: any;
  downloadunivPDF = false;
  univpdfaval = false;
  universityId: any;
  universityName: any;
  universityNameparam: any;
  sectionlist: any = [];
  questionlist: any = [];
  preferencelist: any = [];
  universityButtons: any;
  prepare = false;
  download = false;
  downloadpr = 0;
  totalsize = 0;
  downloadedsize = 0;
  speed = '';
  constructor(
    private route: ActivatedRoute,
    private reviewFormService: ReviewFormService,
    private mservice: ToastService,
    public loadService: LoaderService,
    public pdfService: PdfService,
    private service: BroadcastService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef,
    private httpclient: HttpClient,
    private encdec: EncDecService,
    private jqservice: JQueryService,
    private router: Router,
    private adataservice: AuthdataService
  ) { }


  ngOnInit() {
    this.loadService.loadme = true;
    this.reviewFormService.getUniversitystudylevelDetails(this.applicantId).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.universityButtons = data.outdata;
        this.universityId = -1;//this.universityButtons[0].id;
        this.universityName = this.universityButtons[0].name;
        //  this.GetReviewFormData();
        this.loadService.loadme = false;
        this.cd.markForCheck();
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', 'ERROR', 'Something went wrong');
      }
    });
  }
  getNewIDandData() {
    this.loadService.loadme = true;
    this.reviewFormService.getUniversitystudylevelDetails(this.applicantId).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.universityButtons = data.outdata;
        this.universityId = -1;//this.universityButtons[0].id;
        this.universityName = this.universityButtons[0].name;
        this.GetReviewFormData();
        this.cd.markForCheck();
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', 'ERROR', 'Something went wrong');
      }
    });
  }
  GoToReviewForm(univid, univname) {
    this.universityId = univid;
    this.universityName = univname;
    this.GetReviewFormData();
  }
  GetReviewFormData() {
    this.loadService.loadme = true;
    this.reviewFormService.getreviewFormData(this.applicantId, this.universityId).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.sectionlist = data.outdata;
        this.questionlist = data.outdata1;
        this.preferencelist = data.outdata2;
        this.univpdfaval = (data.outdatalist[0].length > 0) ? true : false;
        this.cd.markForCheck();
        this.loadService.loadme = false;
      } else {
        this.loadService.loadme = false;
        this.cd.markForCheck();
        this.mservice.generateMessage('ERROR', data.message, 'Failed');
      }
    });
  }

  downloadPdf() {
    this.pdfService.generatePDF(this.universityName, 'mainpdf');
  }
  downloadbyUniversityPDF() {

    if (isPlatformBrowser(this._platformId)) {
      this.loadService.downloadPDF = true;
      this.cd.markForCheck();
      const req = new HttpRequest('POST', `${environment.NODE_API_URL}api/getPDFbyURL`, {
        url: window.location.origin + '/restrict/pdf-university-form-mapping-preview/' + this.encdec.encryptSensitive(this.universityId) + '/' + this.encdec.encryptSensitive(this.applicantId),
        height: 1182,
        emulateMedia: 'screen',
        waitFor: 0
      }, {
        responseType: 'blob' as 'json',
        reportProgress: true,
      });

      this.httpclient.request(req).subscribe(event => {
        $('#progress').modal({ backdrop: 'static', keyboard: false, show: true });
        this.prepare = true;
        this.cd.markForCheck();
        if (event.type === HttpEventType.DownloadProgress) {
          this.download = true;
          this.prepare = false;
          this.totalsize = event.total;
          this.speed = (Math.round((event.loaded - this.downloadedsize) / 1024) < 1024) ? Math.round((event.loaded - this.downloadedsize) / 1024) + '/kbps' : Math.round(((event.loaded - this.downloadedsize) / 1024) / 1024) + '/mbps';
          this.downloadedsize = event.loaded;
          this.totalsize = event.total;
          this.downloadpr = Math.round(100 * event.loaded / event.total);
          this.cd.markForCheck();
        } else if (event instanceof HttpResponse) {
          const a: any = document.createElement('a');
          document.body.appendChild(a);
          a.style = 'display: none';
          const url = window.URL.createObjectURL(event.body);
          a.href = url;
          a.download = this.universityName + '.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          this.loadService.downloadPDF = false;
          this.download = false;
          this.prepare = false;
          this.downloadpr = 0;
          $('#progress').modal('hide');
          this.cd.markForCheck();
        }
      });
    }
  }

  async downloadUniversityPDF() {
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
      this.loadService.downloadPDF = true;
      let pageranageAfterSkipHeaderFooterParam = '2-';

      let agentLogoURL = this.encdec.encryptSensitiveV1(JSON.stringify(agentInfo.agentLogoURL));
      let agentOrganization = this.encdec.encryptSensitiveV1(JSON.stringify(agentInfo.agentOrganization));
      let agentWebURL = this.encdec.encryptSensitiveV1(JSON.stringify(agentInfo.agentWebURL));
      this.cd.markForCheck();
      const req = new HttpRequest('POST', `${environment.NODE_API_URL}api/getPDFbyURL`, {
        url: window.location.origin + '/restrict/review-form/' + this.encdec.convertText('enc', this.applicantId, true) + '/' + this.encdec.convertText('enc', this.universityId, true) + '/' + agentLogoURL + '/' + agentOrganization + '/' + agentWebURL,
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
        waitFor: 1000,
        emuid: this.encdec.encryptSensitiveV1(agentInfo.companyemail),
        empid: this.encdec.encryptSensitiveV1(this.encdec.convertTextThirdParty('dec', agentInfo.emailpassword)),
        skipFirstPageHeaderFooter: true,
        pageranage: '1',
        pageranageAfterSkipHeaderFooter: pageranageAfterSkipHeaderFooterParam
      }, {
        responseType: 'blob' as 'json',
        reportProgress: true,
      });

      this.httpclient.request(req).subscribe(event => {
        $('#progress').modal('show');
        this.prepare = true;
        this.cd.markForCheck();
        if (event.type === HttpEventType.DownloadProgress) {
          this.download = true;
          this.prepare = false;
          this.totalsize = event.total;
          this.speed = (Math.round((event.loaded - this.downloadedsize) / 1024) < 1024) ? Math.round((event.loaded - this.downloadedsize) / 1024) + '/kbps' : Math.round(((event.loaded - this.downloadedsize) / 1024) / 1024) + '/mbps';
          this.downloadedsize = event.loaded;
          this.totalsize = event.total;
          this.downloadpr = Math.round(100 * event.loaded / event.total);
          this.cd.markForCheck();
        } else if (event instanceof HttpResponse) {
          const a: any = document.createElement('a');
          document.body.appendChild(a);
          a.style = 'display: none';
          const url = window.URL.createObjectURL(event.body);
          a.href = url;
          a.download = this.universityName + '.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          this.loadService.downloadPDF = false;
          this.download = false;
          this.prepare = false;
          this.downloadpr = 0;
          $('#progress').modal('hide');
          this.cd.markForCheck();
        }
      });
    }
  }
  public trackByIndex(index: number) {
    return index;
  }
  editAssessmentForm(secid) {
    if (secid !== '') {
      sessionStorage.setItem('oneformSection', secid)
      this.router.navigate(['/user/assessment/' + this.encdec.encryptSensitiveV1(this.universityIdparam) + '/' + this.encdec.encryptSensitiveV1(this.applicantId)]);
    } else {
      this.router.navigate(['/user/assessment/' + this.encdec.encryptSensitiveV1(this.universityIdparam) + '/' + this.encdec.encryptSensitiveV1(this.applicantId)]);
    }
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
    this.loadService.ispanel = false;
  }
}
