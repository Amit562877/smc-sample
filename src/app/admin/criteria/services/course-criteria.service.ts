import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class CourseCriteriaService {

  prefix: string = environment.API_URL;
  suffix: string;
  constructor(private httpclient: HttpClient) { }

  public getAllCourseList(universityid: any, studylevelid: any, countryid: any): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/courseCriteria/v1/getCriteria?universityid=${universityid}
    &studylevelid=${studylevelid}&countryid=${countryid}`, {
      reportProgress: true,
      observe: 'events',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public getCourseCriteria(universityid: any, studylevelid: any, countryid: any, pageindex: any, pagesize: any): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/courseCriteria/v1/getCriteriaMapping?universityid=
    ${(universityid) ? universityid : 0}
    &studylevelid=${(studylevelid) ? studylevelid : 0}
    &countryid=${(countryid) ? countryid : 0}&pageindex=${pageindex}&pagesize=${pagesize}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public getCourseCriteria_ForExcel(countryid: any, universitytypeid: any, universityid: any, studylevelid: any): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/courseCriteria/v1/getCriteriaMappingforexcel?countryid=${(countryid) ? countryid : 0}&universitytypeid=${(universitytypeid) ? universitytypeid : 0}&
    &universityid=${(universityid) ? universityid : 0}&studylevelid=${(studylevelid) ? studylevelid : 0}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }


  public getCourseCriteriaByID(criteriaid: any): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/courseCriteria/v1/getCriteriaMappingByID?criteriaid=${criteriaid}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public saveBoards(name: any, type: any, countryid: any): Observable<any> {
    return this.httpclient.post<any>(
      `${this.prefix}api/courseCriteria/v1/saveBoard?id=0&name=${name}&type=${type}&countryid=${countryid}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public saveCriteriaCountry(name: any): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/courseCriteria/v1/saveCriteriaCountry?id=0&name=${name}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public saveInterviewMedia(name: any): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/courseCriteria/v1/saveInterviewMedia?name=${name}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }



  public getBoardandMedia(boardtype: any, countryid: any): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/courseCriteria/v1/getmediainterviewandboarddata?boardtype=${boardtype}&countrytype=${countryid}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  public getBoarddata(boardtype: any, countryid: any): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/courseCriteria/v1/getBoarddata?boardtype=${boardtype}&countrytype=${countryid}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  public deleteCriteriaMapping(criteriaid: any): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/courseCriteria/v1/deleteCriteriaMappingByID?criteriaid=${criteriaid}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public getCriteriaFilter(): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/courseCriteria/v1/getCriteriaFilter`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public saveCriteria(criteria: any, courselist: any): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/courseCriteria/v1/saveCriteria`, JSON.stringify({ criteria, courselist }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public saveboardandinterview(boardandinterviewdata: any): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}api/courseCriteria/v1/saveboardandinterview`, boardandinterviewdata, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
