import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  prefix: string = environment.API_URL;
  suffix: string;
  constructor(private httpClient: HttpClient) { }

  public getStudentHistory1(userid, projectid, usertype): Observable<any> {
    this.suffix = 'api/student/'
    return this.httpClient.get<any>(`${this.prefix}${this.suffix}v1/getStudentHistory?userid=${userid}&projectid=${projectid}&usertype=${usertype}`, {
      headers: {
        'ContentType': 'application/json'
      }
    });
  }
}
