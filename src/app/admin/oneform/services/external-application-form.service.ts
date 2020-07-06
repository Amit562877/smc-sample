import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExternalApplicationFormService {
  prefix: string = environment.API_URL + 'api/UniversityOneform/v1/';
  //prefix = 'http://localhost:49980/api/UniversityOneform/v1/';
  constructor(private httpClient: HttpClient) { }
  public getAllExternalSectionList(productid): Observable<any> {
    return this.httpClient.get<any>(`${this.prefix}getallexternalsectionlist?productid=` + productid, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public saveSection(payload): Observable<any> {
    return this.httpClient.post<any>(`${this.prefix}saveexternalsection`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public editFormControl(sectionid): Observable<any> {
    return this.httpClient.post<any>(`${this.prefix}editexternalformcontrol?sectionid=` + sectionid, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public addFormControl(svm): Observable<any> {
    return this.httpClient.post<any>(`${this.prefix}addexternalformcontrol`, svm, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public updateApplicationformSectionSequence(svm): Observable<any> {
    return this.httpClient.post<any>(`${this.prefix}updateApplicationformSectionSequence`, svm, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
