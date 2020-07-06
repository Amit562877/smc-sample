import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { VisachecklistService } from 'src/app/services/visachecklist.service';
import { JQueryService } from 'src/app/shared/services/message/jQuery.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { PdfService } from 'src/app/shared/services/pdf.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
declare const $: any;
declare const moment: any;
@Component({
  selector: 'app-fundcalc',
  templateUrl: './fundcalc.component.html',
  styleUrls: ['./fundcalc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FundcalcComponent implements OnInit {
  componentDestroyed$: Subject<boolean> = new Subject();
  constructor(
    public visaService: VisachecklistService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef,
    private jqservice: JQueryService,
    public loadService: LoaderService,
    public pdfService: PdfService,
    private mservice: ToastService,
    private encdec: EncDecService,
  ) { }
  documentcountrylist: any;
  documentrelationshiplist: any = [];
  documentrelationshiplistfixed: any = [1, 2, 3, 4, 15];
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
  inquiryName: any;
  inquiryEmail: any;
  inquiryPhone: any;
  lodgementdetails: any;
  lodgement = false;
  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {

      this.visaService.GetRelationtoyou((this.doccountryid ? this.doccountryid : 0), moment().format('DD-MM-YYYY')).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        const dummyarray = JSON.parse(data.outdatalist[0]).relationshiplist;
        dummyarray.forEach(element => {
          if (this.documentrelationshiplistfixed.includes(element.id)) {
            this.documentrelationshiplist.push(element);
          }
        });
        this.documentcountrylist = JSON.parse(data.outdatalist[2]).countrylist;
        // if (this.doccountryid) {
        //   this.lodgementdetails = JSON.parse(data.outdatalist[1]).lodgementDetails;
        // }
        this.cd.markForCheck();
      });
    }
  }
  getTotalAmount() {
    this.totallivingcost = 0;
    this.totaltravelcoast = 0;
    this.totalschoolfees = 0;
    this.totaltuitionfees = parseFloat(this.tuitionfees);
    this.totallivingcost = this.totallivingcost + parseFloat(this.livingcost);
    this.totaltravelcoast = this.totaltravelcoast + parseFloat(this.travelcoast);
    this.funddata.forEach(element => {
      this.totallivingcost = this.totallivingcost + parseFloat(element.lcoast);
      this.totalschoolfees = this.totalschoolfees + parseFloat(element.schoolcoast);
      this.totaltravelcoast = this.totaltravelcoast + parseFloat(element.tracoast);
    });
    this.nettotal = this.totallivingcost + this.totalschoolfees + this.totaltuitionfees + this.totaltravelcoast + parseFloat(this.graceamount);
    this.cd.markForCheck();
  }

  dobChange(fund, index) {
    if (isPlatformBrowser(this._platformId)) {
      if ((fund.relationid === '1' || fund.relationid === '4') && moment().diff(moment(fund.dateofb), 'years') >= 5) {
        this.funddata[index].schoolcoast = this.lodgementdetails[0].schoolcost;
      } else {
        this.funddata[index].schoolcoast = 0;
      }
      if (fund.relationid === '1' || fund.relationid === '4') {
        this.funddata[index].lcoast = this.lodgementdetails[0].childlivingcost;
      } else if (fund.relationid === '2' || fund.relationid === '3' || fund.relationid === '15') {
        this.funddata[index].lcoast = this.lodgementdetails[0].coapplicantlivingcost;
      } else {
        this.funddata[index].lcoast = 0;
      }
      this.getTotalAmount();
      this.cd.markForCheck();
    }

  }
  createDummyData() {
    this.funddata = [];
    this.funddata.push({ relationid: '', dateofb: '', lcoast: 0, schoolcoast: 0, tracoast: this.lodgementdetails[0].travelcost });
    this.addDatePicker();
    this.getTotalAmount();
    this.cd.markForCheck();
  }
  removeFundData(index) {
    this.funddata.splice(index, 1);
    this.changeCoastValues();
    this.cd.markForCheck();
  }
  changeCoastValues() {
    const dummydata = [];
    this.funddata.forEach(element => {
      element.tracoast = this.travelcoast;
      dummydata.push(element);
    });
    this.funddata = dummydata;
    this.getTotalAmount();
    this.cd.markForCheck();
  }
  openDOB(index) {
    if (isPlatformBrowser(this._platformId)) {
      $('#dob' + index).focus();
    }
  }
  addDatePicker() {
    if (isPlatformBrowser(this._platformId)) {
      setTimeout(() => {
        $('.datepicker').datepicker({
          autoclose: true
        }).change((ev) => {
          $('#' + ev.target.id).val(ev.target.value);
          document.getElementById(ev.target.id).dispatchEvent(new Event('input'));
        });
      }, 500);
    }
    this.cd.markForCheck();
  }
  addFundData() {
    this.funddata.push({ relationid: '', dateofb: '', lcoast: 0, schoolcoast: 0, tracoast: this.lodgementdetails[0].travelcost });
    this.addDatePicker();
    this.changeCoastValues();
    this.cd.markForCheck();
  }
  async gotofc(sendmail, mailTemplate, mailSubject) {
    const country = this.documentcountrylist.filter(el => el.countryid == this.doccountryid);
    const dummyfund = [];
    this.funddata.forEach(element => {
      const rs = this.documentrelationshiplist.filter(el => el.id == element.relationid);
      element.relationid = rs[0].name;
      element.dateofb = element.dateofb.replace(/[\/]+/g, '-');
      dummyfund.push(element);
    });

    const data: any = {};
    data.country = country[0].countryname;
    data.tf = this.tuitionfees;
    data.lc = this.livingcost;
    data.tc = this.travelcoast;
    data.da = this.funddata;
    data.totaltuitionfees = this.totaltuitionfees;
    data.totalschoolfees = this.totalschoolfees;
    data.totallivingcost = this.totallivingcost;
    data.totaltravelcoast = this.totaltravelcoast;
    data.graceamount = this.graceamount;
    data.nettotal = this.nettotal;
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
        url: window.location.origin + '/restrict/fundcalculator/' + this.encdec.convertText('enc', JSON.stringify(data), true),
        format: 'A4',
        height: 0,
        emulateMedia: 'print',
        displayHeaderFooter: true,
        headerTemplate: `` + style + `
          <tr><td><table align="left" width="70%"><tbody><tr><td><img src="` + coursecompareheader + `" alt="Course Compare"></td>
          </tr></tbody></table><table align="right" width="26%"><tbody><tr>
          <td style="padding-right: .5rem!important;"><img src="` + clogo + `" alt="Logo"></td></tr></tbody></table></td></tr>`,
        footerTemplate: `<div style="background: linear-gradient(to right, #137fc3 0%, #244189 100%); display: flex; width: 1150px; padding: 10px;">
                  <div style="align: left; padding: 5px; width: 28%; text-align: start;">
                  <p style="color: white; margin-bottom: 0px; font-size: 9px;font-family: 'Open Sans';">powered by</p>
                  <a style="color: white; ;font-size: 8px;font-family: 'Open Sans';" href="https://searchmycourse.com/" target="_blank" rel="noopener">www.searchmycourse.com</a></div>
                  <div style="margin-top: 10px; width: 28%; text-align: middle;"><a style="color: white; font-size: 12px;font-family: 'Open Sans';" href="tel:+610386573761"><img style="max-width: 100%;height: auto;" src="` + phonemage + `" /> +61 03 8657 3761</a></div>
                  <div style="padding-right: 5px; float: right; margin-top: 10px; width: 44%; text-align: end;"><img style="max-width: 100%;height: auto;" src="` + linkimage + `" /> <a style="color: white; font-size:12px;font-family: 'Open Sans';" href="https://searchmycourse.com/">www.searchmycourse.com</a></div>
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
        mailTo: this.inquiryEmail,
        mailSubject: mailSubject,
        // fileName: this.coursedata.course_id.replace(/\s/g, '').replace(/[\/]+/g, '_').toLowerCase() + '.pdf',
        fileName: 'fundcalculator.pdf',
        mailTemplate: mailTemplate,
        mailBody: ''
      }).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (sendmail != true) {
          const a: any = document.createElement('a');
          document.body.appendChild(a);
          a.style = 'display: none';
          const url = window.URL.createObjectURL(data);
          a.href = url;
          a.download = country[0].countryname + '_fund.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
          this.loadService.downloadPDF = false;
          this.cd.markForCheck();
        } else {
          this.loadService.sendmail = false;
          this.mservice.generateMessage('SUCCESS', 'Mail Sent Successfully', '');
          this.inquiryEmail = '';
          this.inquiryName = '';
          this.inquiryPhone = '';
          this.cd.markForCheck();
        }
      });
    }
  }
  public trackByIndex(index: number) {
    return index;
  }
  getDataOnCountryChange() {
    if (isPlatformBrowser(this._platformId)) {

      this.visaService.GetRelationtoyou((this.doccountryid ? this.doccountryid : 0), moment().format('DD-MM-YYYY')).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (this.doccountryid > 0) {
          this.lodgementdetails = JSON.parse(data.outdatalist[1]).lodgementDetails;
          this.livingcost = this.lodgementdetails[0].mainapplicantlivingcost;
          this.travelcoast = this.lodgementdetails[0].travelcost;

          this.lodgement = true;
        } else {
          this.lodgementdetails = [];
          this.travelcoast = 0;
          this.livingcost = 0;
          this.lodgement = false;
        }
        this.changeCoastValues();
        this.cd.markForCheck();
      });
    }

  }

  sendfuncdEmail() {
    const docmentid = this.documentid;
    this.cd.markForCheck();
  }

  downloadfundpdf() {
    const docmentid = this.documentid;
    this.cd.markForCheck();
  }
}
