import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {

  prefix: string = environment.API_URL;
  suffix: string;
  constructor(private httpclient: HttpClient) { }

  public getDiscipline(pageSize, showme): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/courses/discipline/v1/getdiscipline?pageSize=${pageSize}&showme=${showme}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public addMasterDiscipline(name: any): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/courses/discipline/v1/addmasterdiscipline?name=${name}`, {
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
}
