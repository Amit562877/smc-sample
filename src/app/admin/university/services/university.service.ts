import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  prefix: string = environment.API_URL;
  suffix: string;

  constructor(
    private httpclient: HttpClient,
    private encdec: EncDecService
  ) { }
  public getuniversity(pageindex, pagesize, countryid, universitytypeid): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/australia/university/v1/getUniversity?pageindex=${pageindex}&pagesize=${pagesize}&countryid=${countryid}&universitytypeid=${universitytypeid}`, {
      headers: {
        'Content-Type': 'application/json'
      }

    });
  }
  public getdropdownvalue(): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}courses/au/v1/getDropDownValues`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  public getuniversitybyid(universityid): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}api/australia/university/v1/getIssueUniversityById?uid=${universityid}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  public getAllUniversity(searchstring): Observable<any> {

    return this.httpclient.get<any>(`${this.prefix}api/australia/university/v1/getuniversitysearch?searchstring=${searchstring}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  public globlahints(searchtext, pageindex, pagesize, universityid, searchtype): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}courses/au/v1/globalhints?searchtext=${searchtext}&pageindex=${pageindex}&pagesize=${pagesize}&universityid=${universityid}&searchtype=${searchtype}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public savecontactdetails(campusid, campusname, address, universityid,cricosproviderno,ccity,cstate,campusoverview,longitude,latitude,postcode): Observable<any> {
    let payload={
      campusid,
      campusname,
      address,
      universityid,
      cricosproviderno,
      ccity,
      cstate,
      campusoverview,
      longitude,
      latitude,
      postcode

    }
    return this.httpclient.post<any>(`${this.prefix}api/australia/university/v1/savecontactinfo`,payload, {

    });
  }
  public saveuniversitydetails(universityid, universitydetails): Observable<any> {
    
    let payload = {
      universityid,
      universitydetails
    };
    return this.httpclient.post<any>(`${this.prefix}api/australia/university/v1/saveuniversityinfo`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  public savelogo(formdata):Observable<any>{
    
    return this.httpclient.post<any>(`${this.prefix}api/australia/university/v1/savelogo`, formdata, {});
  }
  

}

