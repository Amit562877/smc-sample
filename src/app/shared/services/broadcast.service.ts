import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  @Output() click: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() changeData: EventEmitter<any> = new EventEmitter();
  @Output() editSection: EventEmitter<any> = new EventEmitter();
  constructor() { }

  Broadcastchange(data: any) {
    this.change.emit(data);
  }
  Broadcastchangedata(data: any) {
    this.changeData.emit(data);
  }
  BroadcastCountryName(data: any) {
    this.click.emit(data);
  }
  
}
