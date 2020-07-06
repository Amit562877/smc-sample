import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class InternalMailService {
  prefix: string = environment.API_URL;
  suffix: string;
  constructor(private httpclient: HttpClient) { }

  public sendemail(formdata): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}internalemail/v1/sendemail`, formdata);
  }
  public getEmails(emailFilter): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}internalemail/v1/getEmails`, emailFilter, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public manageStared(emailid, emailboxid, isstared): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}internalemail/v1/manageStared?emailid=${emailid}&emailboxid=${emailboxid}&isstared=${isstared}`);
  }
  public emailaction(emailid, emailboxid, action, actiontype): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}internalemail/v1/emailAction?emailid=${emailid}&emailboxid=${emailboxid}&action=${action}&actiontype=${actiontype}`);
  }
  public getemail(emailboxid, tuid, from_user): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}internalemail/v1/getemail?&emailboxid=${emailboxid}&from_user=${from_user}&tuid=${tuid}`);
  }
  public getuseremail(searchstring): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}internalemail/v1/getuseremail?&searchstring=${searchstring}`);
  }
}
