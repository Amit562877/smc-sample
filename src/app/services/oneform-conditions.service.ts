import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OneformConditionsService {
  prefix: string = environment.API_URL+'api/';
  //prefix = 'http://localhost:49980/api/';
  constructor(private httpclient: HttpClient) { }

  public GetMasterList(): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}Oneform/v1/getmasterlist`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public GetConditions(processid): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}application/v1/getconditions?productid=` + processid, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public GetSectionFormControlOption(productid): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}application/v1/getsectionformcontroloption?productid=` + productid, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public GetMasterConditions(): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}application/v1/getconditionslist`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public InsertUpdateConditions(param): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}application/v1/insertupdateconditions`, param, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public GetAllConditionType(): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}application/v1/getallconditiontype`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public GetConditionType(Conditionidf): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}application/v1/getconditiontype?Conditionidf=${Conditionidf}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public DeleteCondition(Conditionmapidf): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}application/v1/deletecondition?Conditionmapidf=${Conditionmapidf}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
