import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
@Injectable({
  providedIn: 'root'
})
export class McampuslocationService {
  prefix: string = environment.API_URL;
  suffix: string;
  constructor(
    private httpclient: HttpClient,
    private encdec: EncDecService
  ) { }
  getCampusDetailsforexcel(countryid, universitytypeid, universityid): Observable<any> {
    const objparams = {
      countryid: countryid,
      universityid: universityid,
      universitytypeid: universitytypeid
    };
    return this.httpclient.post<any>(`${this.prefix}api/courseCriteria/v1/getCampusDetailsforexcel`, objparams, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  addCampusDetailsforexcel(univdata): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}university/au/v1/saveUniversity`, univdata, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getUniversity(countryid, universitytypeid, universityid, pageindex, pagesize): Observable<any> {
    const objparams = {
      countryid: countryid,
      universityid: universityid,
      universitytypeid: universitytypeid,
      pageindex,
      pagesize
    };
    return this.httpclient.post<any>(`${this.prefix}university/au/v1/getuniversityforcitystatecountry`, objparams, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
