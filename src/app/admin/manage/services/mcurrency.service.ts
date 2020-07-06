import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class McurrencyService {
  prefix: string = environment.API_URL;
  suffix: string;
  constructor(private httpclient: HttpClient) { }

  public getAllcurrency(pageindex, pagesize): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}v1/currency/getcurrency?pageindex=${pageindex}&pagesize=${pagesize}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
  public addCurrency(currency): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}v1/currency/managecurrency`, currency, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  public getCountryCurrency(): Observable<any> {
    return this.httpclient.get<any>(`${this.prefix}v1/currency/getcurrencycountry`);
  }
  public manageCountry(country): Observable<any> {
    return this.httpclient.post<any>(`${this.prefix}v1/currency/managecountry`, country, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
