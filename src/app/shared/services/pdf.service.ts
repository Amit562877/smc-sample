import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class PdfService {
  prefix: string = environment.API_URL;
  suffix: string;
  constructor(
    private mservice: ToastService,
    public loadService: LoaderService,
    private httpclient: HttpClient,
    @Inject(PLATFORM_ID) private _platformId: Object

  ) { }
  generatePDF(name, elementid) {
    if (isPlatformBrowser(this._platformId)) {
      document.getElementById(elementid).style.height = 'auto';
      document.getElementById(elementid).style.overflow = 'show';
      this.loadService.downloadPDF = true;
      html2canvas(document.getElementById(elementid), {
        logging: false,
        allowTaint: false,
        scale: 3,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 1);
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        const doc = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        doc.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.save(name + '.pdf');
        this.loadService.downloadPDF = false;
      }).catch(err => {
        this.mservice.generateMessage('ERROR', err, 'FAILED');
      });
    }
  }
  public downloadPDF(pdf) {

    return this.httpclient.post<any>(`${environment.NODE_API_URL}api/getPDFbyURL`, pdf, {
      observe: 'body',
      responseType: 'blob' as 'json'
    });
  }
}
