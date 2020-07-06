import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');
headers = headers.set('notoken', 'true');

@Injectable({
  providedIn: 'root'
})

export class UniversityFormMappingsService {
  prefix: string = environment.API_URL;
  suffix: string;
  constructor(
    private httpclient: HttpClient,
    private encdec: EncDecService, ) { }


  public getAllQuestions(masterid): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/Assessmentform/v1/getAllFormControlType?masterid=${masterid}`, {
      headers
    });
  }
  public getAllMasterPDF(pagesize, pageindex, universityid): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}postfile/v1/getAllMasterPDF?pagesize=${pagesize}&pageindex=${pageindex}&universityid=${universityid}`, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }
  public getAllReferenceImages(id, userid, requesttype): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}postfile/v1/getAllReferenceImages?id=${id}&userid=${userid}&requesttype=${requesttype}`, {
      headers
    });
  }
  public removePDF(id, isactive, isdeleted, ispublished): Observable<any> {
    id = id;
    isdeleted = this.encdec.encryptSensitive(isdeleted);
    isactive = this.encdec.encryptSensitive(isactive);
    ispublished = this.encdec.encryptSensitive(ispublished);
    return this.httpclient.get<any>(`${this.prefix}postfile/v1/editMasterPDF?id=${id}&isactive=${isactive}&isdeleted=${isdeleted}&ispublished=${ispublished}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public uploadPDF(formdata): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}postfile/v1/convertpdftojpeg`, formdata);
  }
  public savePDfSetting(id, masterpdfid, settings, createdby, updatedby): Observable<any> {
    const data: any = {};
    data.id = this.encdec.encryptSensitive(id);
    data.masterpdfid = masterpdfid;
    data.settings = JSON.stringify(settings);
    data.createdby = this.encdec.encryptSensitive(createdby);
    data.updatedby = this.encdec.encryptSensitive(updatedby);
    return this.httpclient.post<any>(`${this.prefix}postfile/v1/addpdfSettings`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
