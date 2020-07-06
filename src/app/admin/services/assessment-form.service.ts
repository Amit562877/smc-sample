import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');
headers = headers.set('notoken', 'true');

@Injectable({
  providedIn: 'root'
})

export class AssessmentFormService {

  constructor(private httpClient: HttpClient) { }
  prefix: string = environment.API_URL + 'api/Assessmentform/';
  //prefix = 'http://localhost:49980/api/Assessmentform/v1/';

  public getallformcontrolmaster(applicantid): Observable<any> {
    return this.httpClient.get<any>(`${this.prefix}v1/getallformcontrolmaster?applicantid=${applicantid}`, {
      headers
    });
  }

  public getSectionListServiceWise(universityid, isform): Observable<any> {
    return this.httpClient.get<any>(`${this.prefix}v1/getSectionProductwise?universityid=${universityid}&isform=${isform}`, {
      headers
    });
  }
  public getuniversitylist(projectmapid): Observable<any> {
    return this.httpClient.get<any>(`${this.prefix}v1/getuniversitylist?projectmapidf=${projectmapid}`, {
      headers
    });
  }
  public getSectionListServiceWiseV2(universityid, isform, query): Observable<any> {
    return this.httpClient.get<any>(`${this.prefix}v2/getSectionProductwise?universityid=${universityid}&isform=${isform}&query=${query}`, {
      headers
    });
  }

  public getstudylevelcondition(applicantid): Observable<any> {
    return this.httpClient.get<any>(`${this.prefix}v2/getstudylevelcondition?applicantid=${applicantid}`, {
      headers
    });
  }

  public getApplicantSectionControlData(payload): Observable<any> {
    return this.httpClient.post<any>(`${this.prefix}v2/getApplicantSectionControlData?universityid=${payload.productidf}&isform=${payload.isform}&SectionID=${payload.sectionidf}&applicantid=${payload.applicantid}&projectid=${payload.projectid}`, {
      headers
    });
  }

  public getApplicantSectionControlDataV3(payload): Observable<any> {
    return this.httpClient.post<any>(`${this.prefix}v3/getApplicantSectionControlData?universityid=${payload.productidf}&isform=${payload.isform}&SectionID=${payload.sectionidf}&applicantid=${payload.applicantid}&projectid=${payload.projectid}&query=${payload.query}&securelinkid=${payload.securelinkid}`, {
      headers
    });
  }

  public getCaseCadeData(): Observable<any> {
    return this.httpClient.get<any>(`${this.prefix}v1/GetcaseCadeData`, {
      headers
    });
  }
  public CheckDateCondition(payload): Observable<any> {
    return this.httpClient.post<any>(`${this.prefix}v1/CheckDateCondition?ifdate=${payload.ifdate}&targetdays=${payload.targetdays}&targetbetweendays=${payload.targetbetweendays}&targetbetweenvalue=${payload.targetbetweenvalue}&ConditionStateName=${payload.ConditionStateName}&targetvalue=${payload.targetvalue}&target=${payload.target}`, {
      headers
    });
  }
  public saveApplicantDetails(payload): Observable<any> {
    return this.httpClient.post<any>(`${this.prefix}v1/SaveApplicantDetails`, payload, {
      headers
    });
  }
  // getApplicantSectionPendingControlData
  public getApplicantSectionPendingControlData(payload): Observable<any> {
    return this.httpClient.post<any>(`${this.prefix}v1/getApplicantSectionPendingControlData`, payload, {
      headers
    });
  }


  // savemultiplesectionapplicantdetails
  public savemultiplesectionapplicantdetails(objmulrec): Observable<any> {
    return this.httpClient.post<any>(`${this.prefix}v1/savemultiplesectionapplicantdetails`, objmulrec, {
      headers
    });
  }

  // updatemultiplesectionapplicantdetails
  public updatemultiplesectionapplicantdetails(objmulrec): Observable<any> {
    return this.httpClient.post<any>(`${this.prefix}v1/updatemultiplesectionapplicantdetails`, objmulrec, {
      headers
    });
  }

  //getapplicantmultiplesectioncontroldata
  public getapplicantmultiplesectioncontroldata(payload): Observable<any> {
    return this.httpClient.post<any>(`${this.prefix}v1/getapplicantmultiplesectioncontroldata`, payload, {
      headers
    });
  }

  public deleteapplicantformdata(objForm): Observable<any> {
    return this.httpClient.post<any>(`${this.prefix}v1/deleteapplicantformData`, objForm, {
      headers
    });
  }

  public saveApplicantDocuments(objForm): Observable<any> {
    return this.httpClient.post<any>(`${this.prefix}v1/saveApplicantDocuments`, objForm, {
      headers
    });
  }

  public updateverifydata(id, verifyby, enabledisable, isverifyuser): Observable<any> {
    return this.httpClient.get<any>(`${this.prefix}v1/verifydata?id=${id}&verifyby=${verifyby}&enabledisable=${enabledisable}&isverifyuser=${isverifyuser}`, {
      headers
    });
  }

  public autoFormFillRecords(path): Observable<any> {
    return this.httpClient.get(path, {
      headers
    });
  }

  public getfieldhistory(applicantformdataid, applicantidf): Observable<any> {
    return this.httpClient.get<any>(`${this.prefix}v1/getfieldhistory?applicantformdataid=${applicantformdataid}&applicantidf=${applicantidf}`, {
      headers
    });
  }
}
