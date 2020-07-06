import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');
headers = headers.set('notoken', 'true');

@Injectable({
  providedIn: 'root'
})

export class CourseService {
  prefix: string = environment.API_URL;
  suffix: string;
  constructor(private httpclient: HttpClient) { }
  public addtofavourite(payload): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/favourites/v1/saveforfavorite`, payload, {
      headers
    });
  }

  public addissue(formData): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/reportissue/v1/save`, formData, {
    });
  }

  public getAllCourses(courseModel): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}courses/au/v1/getCourse`, courseModel, {
      headers
    })
  }


  public getCoursesDetails(courseid): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}courses/au/v1/getCourseDetails?courseid=` + courseid, {
      headers
    });
  }
  public getCoursesDetailsByProps(courseid, universityid, uid, universitycampus): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}courses/au/v2/getCourseDetails?courseid=${courseid}&universityid=${universityid}&uid=${uid}&universitycampus=${universitycampus}`, {
      headers
    });
  }
  public globlahints(searchtext, pageindex, pagesize, universityid, searchtype): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}courses/au/v1/globalhints?searchtext=${searchtext}&pageindex=${pageindex}&pagesize=${pagesize}&universityid=${universityid}&searchtype=${searchtype}`, {
      headers
    });
  }
  public saveCourse(coursedata, userid): Observable<any> {
    const payload = {
      coursedata, userid
    };
    return this.httpclient.post<any>(`${this.prefix}courses/au/v2/saveCourse`, payload, {
      headers
    });
  }
  public saveCourseMappingDetails(courseMappingDetail): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/Assessmentform/v1/SaveCourseMappingDetails`, courseMappingDetail, {
      headers
    });
  }

  public insertProjectMappingDetails(projectId, applicantId, userid): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/Assessmentform/v1/InsertProjectMappingDetails?projectId=${projectId}&applicantId=${applicantId}&userid=${userid}`, {
      headers
    });
  }

  public checkForProjectMapId(projectId, applicantId): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/Assessmentform/v1/checkForProjectMapId?projectId=${projectId}&applicantId=${applicantId}`, {
      headers
    });
  }
  public senddocumentemail(Servicedocument): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}courses/au/v1/documentemail`, Servicedocument, {
      headers
    });
  }

  public downloaddocumentpdf(Servicedocument): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}courses/au/v1/documentdownload`, Servicedocument, {
      headers
    });
  }

  public saveCourseCompare(compareJson): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}courses/au/v1/saveCourseCompare`, compareJson, {
      headers
    });
  }

  public deleteCourseCompare(compareid, ftableid): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}courses/au/v1/deleteCourseCompare?compareid=${compareid}&ftableid=${ftableid}`, {
      headers
    });
  }
  public getCompareData(compareid): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}courses/au/v1/getCourseCompareData?compareid=` + compareid, {
      headers
    });
  }
  public getSelectedCompareCourses(userid, projectid): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}courses/au/v1/getSelectedCompareCourses?userid=${userid}&projectid=${projectid}`, {
      headers
    });
  }

  public getinitialData(): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}courses/au/v1/getInitialData`, {
      headers
    });
  }

  public getDropDownValues(): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}courses/au/v1/getDropDownValues`, {
      headers
    });
  }

  public getCurrencyRates(path): Observable<any> {
    return this.httpclient.get(path, {
      headers
    });
  }

  public getInquiryTemplate(payload): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}courses/au/v1/inquiryemail`, payload, {
      headers
    });
  }

  public getAdvFilteredCourses(payload): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}courses/au/v1/getAdvFilteredCourses`, payload, {
      headers
    });
  }

  public getLeadInquiryTemplate(payload): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}courses/au/v1/leadinquiryemail`, payload, {
      headers
    });
  }
  public sendFeedback(payload): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}courses/au/v1/sendFeedback`, payload, {
      headers
    });
  }
  public getEnglishData(courseid): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}courses/au/v1/getenglishrequirements?courseid=${courseid}`, {
      headers
    });
  }
  public getIntakeData(courseid, campusname): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}courses/au/v1/getintakedata?courseid=${courseid}&campusname=${campusname}`, {
      headers
    });
  }
  public saveCouncellorDetails(payload): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}courses/au/v1/saveCouncellorDetails`, payload, {
      headers
    });
  }
  public getCouncellorDetails(payload): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}courses/au/v1/getCouncellorDetails?courseid=${payload.courseid}&userid=${payload.userid}`, {
      headers
    });
  }
}
