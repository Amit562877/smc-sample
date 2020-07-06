import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ExternalFormMappingService {

  constructor(private httpClient: HttpClient) { }
  prefix: string = environment.API_URL + 'api/UniversityOneform/';
  //prefix = 'http://localhost:49980/api/UniversityOneform/v1/';
  public GetAllExternalformdata(productid): Observable<any> {
    return this.httpClient.get<any>(`${this.prefix}v1/getExternalApplicationform?productid=` + productid, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public getApplicantformControl(productid,universityid): Observable<any> {

    return this.httpClient.get<any>(`${this.prefix}v1/getApplicantformControl?productid=` + productid+`&universityid=`+universityid, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public saveApplicationFormData(fvm): Observable<any> {
    return this.httpClient.post<any>(`${this.prefix}v1/saveApplicationFormControl`, fvm, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public saveMappingInfo(formcontrolid,productid,ischecked): Observable<any> {
    return this.httpClient.post<any>(`${this.prefix}v1/savemappinginfo?formcontrolid=` + formcontrolid+`&productid=`+productid+`&ischecked=`+ischecked, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public saveOneFormMappingData(fvm): Observable<any> {
    return this.httpClient.post<any>(`${this.prefix}v2/saveoneFormmappingcontrol`, fvm, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
