import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';

@Injectable({
  providedIn: 'root'
})
export class CourseIssueService {
  prefix: string = environment.API_URL;
  suffix: string;
  constructor(
    private httpclient: HttpClient,
    private encdec: EncDecService
  ) { }

  public getCourse(universityid, studylevelid, pageindex, pagesize, issuetype): Observable<any> {

    const objparams = {
      universityid: this.encdec.encryptSensitive(universityid),
      studylevelid: this.encdec.encryptSensitive(studylevelid),
      issuetype: this.encdec.encryptSensitive(issuetype),
      pageindex,
      pagesize
    }
    return this.httpclient.post<any>(`${this.prefix}api/courseCriteria/v1/getCourseforissue`, objparams, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public getCourseforexcel(universityid, studylevelid, issuetype): Observable<any> {

    const objparams = {
      universityid: this.encdec.encryptSensitive(universityid),
      studylevelid: this.encdec.encryptSensitive(studylevelid),
      issuetype: this.encdec.encryptSensitive(issuetype),
    }
    return this.httpclient.post<any>(`${this.prefix}api/courseCriteria/v1/getCourseforexcel`, objparams, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public getCoursebyId(courseid): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/courseCriteria/v1/getCourse?courseid=${courseid}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public saveCourse(coursedata, userid): Observable<any> {
    const payload = {
      coursedata, userid
    };
    return this.httpclient.post<any>(`${this.prefix}courses/au/v2/saveCourse`, payload);
  }
}
