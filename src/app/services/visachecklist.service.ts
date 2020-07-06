import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');
headers = headers.set('notoken', 'true');

@Injectable({
  providedIn: 'root'
})

export class VisachecklistService {
  prefix: string = environment.API_URL;
  suffix: string;
  constructor(private httpclient: HttpClient) { }
  public getdocumentlist(branchId, companyId, userId): Observable<any> {
    return this.httpclient.post<any>(`${environment.KONDESKAPI_PRODUCT_URL}api/getproduclist`, {
      headers
    });
  }

  public getservicedocumentlist(companyId, serviceidf): Observable<any> {
    return this.httpclient.get<any>(`${environment.KONDESKAPI_PRODUCT_URL}api/v1/product/getservicedocumentlist?companyidf=${companyId}&serviceidf=${serviceidf}&doctypeflag=1`, {
      headers
    });
  }
  public GetRelationtoyou(countryid, date): Observable<any> {
    return this.httpclient.post<any>(`${environment.KONDESKAPI_REPORT_URL}api/v1/report/ManageFund/getManageFundLists?countryidf=${countryid}&effectivedate=${date}`, {
      headers
    });
  }
}
