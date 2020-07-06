import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
@Injectable({
  providedIn: 'root'
})
export class ReportIssueService {
  prefix: string = environment.API_URL;
  suffix: string;
  constructor(
    private httpclient: HttpClient,
    private encdec: EncDecService
  ) { }
  public getissue(pageindex: any,pagesize: any ): Observable<any> {
   
    return this.httpclient.get<any>(`${this.prefix}api/reportissue/v1/getAllReportandissue?pageindex=${pageindex}&pagesize=${pagesize}`,{
      headers:{
        'Content-Type': 'application/json'
      }
    })

  }

  

 



 }
