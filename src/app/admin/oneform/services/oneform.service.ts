import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OneformService {
  prefix: string = environment.API_URL + 'api/Oneform/v1/';
  //prefix = 'http://localhost:49980/api/Oneform/v1/';
  constructor(private httpclient: HttpClient) { }

  public addNewProcess(processname, isactive): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}addprocess?processname=` + processname + `&isactive=` + isactive, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public GetMasterList(): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}getmasterlist`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public GetMasterListById(processid): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}getsectionlistservicewise?productid=` + processid + `&isform=true`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public addSection(addSectionModel): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}addsection`, addSectionModel, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public editSection(addSectionModel): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}addsection`, addSectionModel, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public getFormControls1(): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}getcontroltypelist`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public EditFormControl(section): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}editformcontrol`, section, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public AddFormControl(svm): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}addFormControl`, svm, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public GettextcaseTypeList(): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}gettextcasetypelist`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public DeleteFormControOption(controloption): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}deleteformcontrooption`, controloption, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public CheckControlIfCondition(formcontrol): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}checkcontrolifcondition`, formcontrol, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  // updateApplicationformSectionSequence
  public UpdateApplicationformSectionSequence(section): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}updateApplicationformSectionSequence`, section, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
