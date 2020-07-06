import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UnivOneFormService {

  prefix: string = environment.API_URL + 'api/UniversityOneform/v1/';
  //prefix = 'http://localhost:49980/api/UniversityOneform/v1/';
  constructor(private httpclient: HttpClient) { }
  public getAllProduct(pageIndex, pageSize): Observable<any> {
    var prefix1 = environment.API_URL + 'api/UniversityOneform/v2/'
    return this.httpclient.get<any>(`${prefix1}getallproduct?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public getAllExternalDectionList(productid): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}getallexternalsectionlist?productid=` + productid, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public getalluniversity(): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}getalluniversity`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public saveProduct(payload): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}addproduct`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public deleteProduct(productid): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}deleteproduct?productid=` + productid, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
