import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import { ReviewFormService } from 'src/app/admin/services/review-form.service';


@Component({
  selector: 'app-reviewform',
  templateUrl: './reviewform.component.html',
  styleUrls: ['./reviewform.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewformComponent implements OnInit, OnDestroy {

  componentDestroyed$: Subject<boolean> = new Subject();
  location: any = Location;
  flag: any;
  downloadunivPDF = false;
  univpdfaval = false;
  applicantId: any;
  universityId: any;
  universityName: any;
  universityIdparam: any;
  universityNameparam: any;
  sectionlist: any = [];
  questionlist: any = [];
  preferencelist: any = [];
  universityButtons: any;
  agnetDetails: any = {};
  constructor(
    private route: ActivatedRoute,
    private reviewFormService: ReviewFormService,
    private mservice: ToastService,
    public loadService: LoaderService,
    public pdfService: PdfService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef,
    private encdec: EncDecService,
  ) { }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.applicantId = String(this.encdec.convertText('dec', params.aid, true));
      this.universityIdparam = String(this.encdec.convertText('dec', params.uid, true));
      this.agnetDetails.agentLogoURL = (params.al) ? JSON.parse(this.encdec.decryptSensitiveV1(params.al)) : '';
      this.agnetDetails.agentOrganization = (params.ao) ? JSON.parse(this.encdec.decryptSensitiveV1(params.ao)) : '';
      this.agnetDetails.agentWebURL = (params.aw) ? JSON.parse(this.encdec.decryptSensitiveV1(params.aw)) : '';
    });
    this.loadService.loadme = true;
    this.universityId = this.universityIdparam;
    this.universityName = this.universityNameparam;
    this.GetReviewFormData();
    this.cd.markForCheck();
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
  public trackByIndex(index: number) {
    return index;
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
