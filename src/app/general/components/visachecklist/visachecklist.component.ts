import { Component, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { VisachecklistService } from 'src/app/services/visachecklist.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { isPlatformBrowser } from '@angular/common';
import { JQueryService } from 'src/app/shared/services/message/jQuery.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { CourseService } from 'src/app/services/course.service';
import { PdfService } from 'src/app/shared/services/pdf.service';

declare const $: any;

@Component({
  selector: 'app-visachecklist',
  templateUrl: './visachecklist.component.html',
  styleUrls: ['./visachecklist.component.scss']
})
export class VisachecklistComponent implements OnInit {
  componentDestroyed$: Subject<boolean> = new Subject();
  constructor(
    public visaService: VisachecklistService,
    private cd: ChangeDetectorRef,
    public loadService: LoaderService, @Inject(PLATFORM_ID) private _platformId: Object,
    private jqservice: JQueryService,
    private mservice: ToastService,
    private courseService: CourseService,
    public pdfService: PdfService,
  ) { }
  documentlist: any;
  documentid = '';
  servicedocumentlist: any;
  servicedocuments = false;
  docemailSubmitted = false;
  txtname: any;
  txtemail: any;
  txtphone: any;
  documentname: any;

  ngOnInit() {
    this.visaService.getdocumentlist(0, 54, 0).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.documentlist = JSON.parse(data.outdata).productlist;
      // this.documentlist = this.documentlist.filter(val => {
      //   return val.productid === 'P333';
      // });
      this.cd.markForCheck();
    });
  }
  getservicedocumentslist() {
    this.loadService.loadme = true;
    //var productid = this.documentid.slice(1);
    var productid = this.documentid;
    var pid = parseInt(productid);
    this.documentname = this.documentlist.filter(val => {
      return val.productid === pid;
    })[0].productname;

    this.visaService.getservicedocumentlist(54, pid ? pid : 0).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.servicedocumentlist = data.outdatalist[0];
      this.loadService.loadme = false;
      if (this.servicedocumentlist.length > 0) {
        this.servicedocuments = true;
      } else {
        this.servicedocuments = false;
      }
      this.cd.markForCheck();
    });
  }

  documentEmail() {
    const docmentid = this.documentid;
    this.txtname = '';
    this.txtemail = '';
    this.txtphone = '';
    if (isPlatformBrowser(this._platformId)) {
      $('#modalServicedocumentEmail').modal('toggle');
      //console.log('send email' + docmentid);
    }
    this.cd.markForCheck();
  }

  sendMailVisaCheckList(mainform) {
    this.docemailSubmitted = true;
    if (mainform.valid) {
      this.docemailSubmitted = false;
      var docID = parseInt(this.documentid);
      this.documentname = this.documentlist.filter(val => {
        return val.productid === docID;
      })[0].productname;
      const payload = {
        name: this.txtname,
        coursename: this.documentname,
        courseid: 0,
        phoneno: this.txtphone,
        userid: '',
        email: this.txtemail,
        inquirytype: 'visa'
      };
      if (isPlatformBrowser(this._platformId)) {
        $('#modalServicedocumentEmail').modal('toggle');
      }
      this.courseService.getInquiryTemplate(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          const mailTemplate = data.outdata;
          const mailSubject = 'Student Visa Document';

          this.downloadVisaCheckListPdf(true, mailTemplate, mailSubject);
        }
      });
    }
  }

  async downloadVisaCheckListPdf(sendmail, mailTemplate, mailSubject) {
    if (isPlatformBrowser(this._platformId)) {
      const style = `<style>.bg-custom{background-color:#ebf7fe}.bg-secondary-light{background-color:rgba(0,0,0,.1)}.text-custom{color:#2565a7}table{table-layout:fixed}a,body,table,td{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;font-family:'Open Sans';color:#2b2a29;text-decoration:none;font-size:12px}table,td{mso-table-lspace:0;mso-table-rspace:0;vertical-align:top}body{margin:15px 0;padding:0;font-family:'Open Sans';color:#2b2a29}img{max-width:100%;height:auto}td,tr{font-size:12px}ol{font-size:9px;margin-top:0;padding-left:10px}ol.lower-alpha{list-style-type:lower-alpha}.content-block{page-break-inside:avoid}#logo{height:80px;padding-top:20px}.heading{font-size:15px;color:#499340;font-weight:700}.gradient{background:#137fc3;background:-moz-linear-gradient(left,#137fc3 0,#244189 100%);background:-webkit-linear-gradient(left,#137fc3 0,#244189 100%);background:linear-gradient(to right,#137fc3 0,#244189 100%)}@page{size:A4;-webkit-print-color-adjust: exact}@media print{-webkit-print-color-adjust: exact;body{margin:0}.main{background-size:contain;box-shadow:0 0 0 #a4a4a4;width:100%}.heading{font-size:15px;color:#499340;font-weight:700}.gradient{background:#137fc3!important;background:-moz-linear-gradient(left,#137fc3 0,#244189 100%)!important;background:-webkit-linear-gradient(left,#137fc3 0,#244189 100%)!important;background:linear-gradient(to right,#137fc3 0,#244189 100%)!important}}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-size:1rem;font-weight:400;line-height:1.5;color:#212529;text-align:left;background-color:#fff!important}#footer,#header{padding:0!important;-webkit-print-color-adjust: exact!important}</style>`;
      const phonemage = await this.jqservice.getBase64ImageFromUrl('../../../assets/images/pdfimages/phone-icon.png').then(res => {
        return res;
      });
      const linkimage = await this.jqservice.getBase64ImageFromUrl('../../../assets/images/pdfimages/link-icon.png').then(data => {
        return data;
      });
      const coursecompareheader = await this.jqservice.getBase64ImageFromUrl('../../../assets/images/pdfimages/course-compare-header.png').then(res => {
        return res;
      });
      const clogo = await this.jqservice.getBase64ImageFromUrl('../../../assets/images/pdfimages/Search my Course Logo Final.png').then(data => {
        return data;
      });
      if (sendmail != true) {
        this.loadService.downloadPDF = true;
      } else {
        this.loadService.sendmail = true;
      }
      this.cd.markForCheck();
      this.pdfService.downloadPDF({
        url: window.location.origin + '/restrict/visachecklist' + '/' + this.documentid,
        format: 'A4',
        height: 0,
        emulateMedia: 'print',
        displayHeaderFooter: true,
        headerTemplate: `` + style + `
        <tr><td><table align="left" width="70%"><tbody><tr><td><img src="` + coursecompareheader + `" alt="Course Compare" style='height:57px;'></td>
        </tr></tbody></table><table align="right" width="26%"><tbody><tr>
        <td style="padding-right: .5rem!important;float:right;"><img src="` + clogo + `" alt="Logo" style='height:57px;'></td></tr></tbody></table></td></tr>`,
        footerTemplate: `<div style="background: linear-gradient(to right, #137fc3 0%, #244189 100%); display: flex; width: 1150px; padding: 10px;">
                <div style="align: left; padding: 5px; width: 28%; text-align: start;">
                <p style="color: white; margin-bottom: 0px; font-size: 9px;font-family: 'Open Sans';">powered by</p>
                <a style="color: white; ;font-size: 8px;font-family: 'Open Sans';" href="https://searchmycourse.com/">www.searchmycourse.com</a></div>
                <div style="margin-top: 10px; width: 28%; text-align: middle;"><a style="color: white; font-size: 12px;font-family: 'Open Sans';" href="tel:+610386573761"><img style="max-width: 100%;height: auto;" src="` + phonemage + `" /> +61 03 8657 3761</a></div>
                <div style="padding-right: 5px; float: right; margin-top: 10px; width: 44%; text-align: end;"><img style="max-width: 100%;height: auto;" src="` + linkimage + `" /> <a style="color: white; font-size:12px;font-family: 'Open Sans';" href="https://searchmycourse.com/">www.searchmycourse.com
                </a></div>
                </div>`,
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
        pageranageAfterSkipHeaderFooter: '2-',
        sendmail: sendmail,
        mailTo: this.txtemail,
        mailSubject: mailSubject,
        fileName: 'visachecklist.pdf',
        mailTemplate: mailTemplate,
        mailBody: ''
      }).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (sendmail != true) {
          const a: any = document.createElement('a');
          document.body.appendChild(a);
          a.style = 'display: none';
          const url = window.URL.createObjectURL(data);
          a.href = url;
          var docID = parseInt(this.documentid);
          this.documentname = this.documentlist.filter(val => {
            return val.productid === docID;
          })[0].productname;

          a.download = this.documentname + '_detail.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          this.loadService.downloadPDF = false;
          this.cd.markForCheck();
        } else {
          this.loadService.sendmail = false;
          this.mservice.generateMessage('SUCCESS', 'Mail Sent Successfully', '');
          // this.inquiryEmail = '';
          // this.inquiryName = '';
          // this.inquiryPhone = '';
          this.cd.markForCheck();
        }
      });
    }
  }

}
