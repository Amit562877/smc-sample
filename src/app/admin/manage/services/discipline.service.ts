import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ManageDisciplineService {

  prefix: string = environment.API_URL;
  suffix: string;
  constructor(private httpclient: HttpClient) { }

  public getAllmasterdiscipline(pageindex, pagesize): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/courses/discipline/v1/getmasterdiscipline?pageindex=${pageindex}&pagesize=${pagesize}`);
  }
  public addMasterDiscipline(mdobject): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/courses/discipline/v1/addmasterdiscipline`, mdobject);
  }

  public getDiscipline(pageSize, showme): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/courses/discipline/v1/getdiscipline?pageSize=${pageSize}&showme=${showme}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public addmasterdisciplinemapping(mastermappings): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/courses/discipline/v1/addmasterdisciplinemapping`, mastermappings, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public deletemasterdisciplinemapping(id: any): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/courses/discipline/v1/deletemasterdisciplinemapping?id=${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public deletemasterdiscipline(id: any): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/courses/discipline/v1/deletemasterdiscipline?id=${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
