import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loadme = false;
  loadmesecure = false;
  downloadPDF = false;
  sendmail = false;
  ispanel = false;
  constructor() { }
}
