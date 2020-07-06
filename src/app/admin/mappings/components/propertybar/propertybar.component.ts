import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Subject } from 'rxjs';

declare const $: any;
@Component({
  selector: 'app-propertybar',
  templateUrl: './propertybar.component.html',
  styleUrls: ['./propertybar.component.scss']
})
export class PropertybarComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  @Input() property: any;
  @Input() questionslist: any;
  @Output() deleteprop = new EventEmitter();
  constructor(
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef
  ) { }
  optionlist: any = [];
  optionlistselect: any = [];
  dependquelist: any = [];
  ismultiple = false;
  questiontype = '';
  ngOnInit() {
    this.questionslist = (this.questionslist) ? JSON.parse(this.questionslist) : [];
    this.getOptions();
    this.getOptionsDepend();
    if (isPlatformBrowser(this._platformId)) {
      setTimeout(() => {
        $('.selectpicker').selectpicker();
      }, 100);
    }
  }

  trackByIndex(index: number) {
    return index;
  }
  addBox(index) {
    const dummy = {};
    for (const prop in this.property.boxes[index]) {
      let data: any;
      if (prop === 'style') {
        const datastyle = {};
        for (const style in this.property.boxes[index][prop]) {
          datastyle[style] = this.property.boxes[index][prop][style];
        }
        data = datastyle;
      } else {
        data = this.property.boxes[index][prop];
      }
      dummy[prop] = data;
    }
    this.property.boxes.splice(index, 0, dummy);
    this.reindex();
    this.cd.markForCheck();
  }
  removeBox(index) {
    this.property.boxes.splice(index, 1);
    this.reindex();
    this.cd.markForCheck();
  }
  reindex() {
    this.property.boxes.forEach((element, i) => {
      this.property.boxes[i].id = 'box' + (i + 1);
    });
    this.cd.markForCheck();
  }
  deleteProperty() {
    this.deleteprop.emit();
  }

  getOptions() {
    const question: any = this.questionslist.filter(el => el.id == this.property.questionid)[0];
    if (question) {
      this.questiontype = question.type;
      this.property.qtype = question.type;
      this.ismultiple = question.ismultipleshow;
      if (question.ismultipleshow) {
        const dummylist = this.questionslist.filter(el => el.id == this.property.questionid)[0];
        this.dependquelist = this.questionslist.filter(el => el.sectionid == dummylist.sectionid && el.optiontextmulti != null);
      } else {
        this.optionlist = (question.optiontext) ? question.optiontext : JSON.parse((question.optiontextmulti) ? question.optiontextmulti : []);
      }
    }
    if ((this.property.type == 'checkbox' || this.property.type == 'radiobutton') && this.ismultiple) {
      this.getDependetOptions();
    }
    this.cd.markForCheck();
  }
  getOptionsDepend() {
    if (this.property.optiondependselectid) {
      const question: any = this.questionslist.filter(el => el.id == this.property.optiondependselectid)[0];
      if (question) {
        this.optionlistselect = JSON.parse((question.optiontextmulti) ? question.optiontextmulti : []);
      } else {
        this.optionlistselect = [];
      }
    } else {
      this.optionlistselect = [];
    }
    // this.property.optionlist = this.optionlistselect;
    this.cd.markForCheck();
  }
  getDependetOptions() {
    const question: any = this.questionslist.filter(el => el.id == this.property.questionid)[0];
    if (question) {
      this.optionlist = [];
      const dummylist = (question.optiontextmulti) ? JSON.parse(question.optiontextmulti) : [];
      dummylist.forEach(element => {
        this.optionlist.push({ optiontext: element.name });
      });
    }
    this.cd.markForCheck();
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
