import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UniversityFormMappingsService } from 'src/app/admin/mappings/services/university-form-mappings.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-university-form-mappings-preview',
  templateUrl: './university-form-mappings-preview.component.html',
  styleUrls: ['./university-form-mappings-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UniversityFormMappingsPreviewComponent implements OnInit, OnDestroy {

  componentDestroyed$: Subject<boolean> = new Subject();
  controllist: any = [];
  originalcontrollist: any = [];
  answerlist: any = [];
  coursepreference: any = [];
  imagelist: any = [];
  imagelist64: any = [];
  masterid: any;
  userid: any;
  id = 0;
  apiurl: any = environment.API_URL_DOC;
  ispages = true;
  iscontrols = false;
  isproperties = false;
  currentProperty: any;
  submitted = false;
  proccedData = [];
  constructor(
    private route: ActivatedRoute,
    private mappingsService: UniversityFormMappingsService,
    public loadService: LoaderService,
    private mservice: ToastService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.masterid = (params.masterid) ? params.masterid.toString() : 0;
      this.userid = (params.userid) ? params.userid.toString() : 0;

    });

    this.loadService.loadme = true;
    this.mappingsService.getAllReferenceImages(this.masterid, this.userid, 'review').pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        data.outdatalist[0].forEach(element => {
          this.imagelist.push(this.apiurl + element.rootpath + '/' + element.filename);
        });
        // $('img.lazy').Lazy();
        if (data.outdatalist[1].length > 0) {
          this.originalcontrollist = JSON.parse(data.outdatalist[1][0].settings);
          this.answerlist = data.outdatalist[2];
          this.coursepreference = data.outdatalist[3];
          this.id = data.outdatalist[1][0].id;
          this.originalcontrollist.forEach(element => {
            let ans: any;
            let ansData: any;
            const elmtype = (element.qtype) ? element.qtype.trim() : '';
            if (elmtype === 'coursepreference') {
              ansData = this.getPreferenceAnswer(element);
            } else {
              ans = this.answerlist.filter(el => el.questionid === element.questionid);
            }

            if (element.type === 'textbox') {
              if (elmtype !== 'coursepreference') {
                ansData = this.getValueForMobileNumber(ans, element);
                if (element.optiondependselectid || element.sequenceinstead) {
                  ansData = this.getDependentQuestionBasedAnswer(element, this.answerlist);
                  if (element.mergeans) {
                    const qid = element.questionid;
                    element.questionid = element.mergequestionid;
                    if (!element.skipfirstans) {
                      ansData += ' ' + this.getDependentQuestionBasedAnswer(element, this.answerlist);
                    }

                    element.questionid = qid;
                  }
                }
                if (element.mergeans && !(element.optiondependselectid || element.sequenceinstead)) {
                  if (!element.skipfirstans) {
                    ansData += this.getMergedAnswer(element, this.answerlist);
                  }
                }
              }
              if (element.Appendvalue) {
                ansData = (ansData && ansData.length > 0) ? ansData += element.Appendvalue : '';
              }
              if (element.condition) {
                if (element.condition === 'Contains') {
                  const valuesdata = element.conditionvalue.split(',');
                  ansData = (valuesdata.indexOf(ansData.trim()) !== -1) ? ansData : '';
                } else if (element.condition === 'Not Contains') {
                  const valuesdata = element.conditionvalue.split(',');
                  ansData = (valuesdata.indexOf(ansData.trim()) === -1) ? ansData : '';
                }
              }
              if (element.boxes.length === 1) {
                element.boxes[0].value = ansData;
              } else {
                element.textalign = 'center';
                element.boxes.forEach((box, index) => {
                  element.boxes[index].value = (ansData.length > index) ? ansData[index] : '';
                });
              }
            } else if (element.type === 'label') {
              if (elmtype !== 'coursepreference') {
                ansData = this.getValueForMobileNumber(ans, element);
                if (element.optiondependselectid || element.sequenceinstead) {
                  ansData = this.getDependentQuestionBasedAnswer(element, this.answerlist);
                  if (element.mergeans) {
                    const qid = element.questionid;
                    element.questionid = element.mergequestionid;
                    if (!element.skipfirstans) {
                      ansData += ' ' + this.getDependentQuestionBasedAnswer(element, this.answerlist);
                    }
                    element.questionid = qid;
                  }
                }
                if (element.mergeans && !(element.optiondependselectid || element.sequenceinstead)) {
                  if (!element.skipfirstans) {
                    ansData += this.getMergedAnswer(element, this.answerlist);
                  }
                }
              }
              if (element.Appendvalue) {
                ansData = (ansData.length > 0) ? ansData += element.Appendvalue : '';
              }
              if (element.condition) {
                if (element.condition === 'Contains') {
                  const valuesdata = element.conditionvalue.split(',');
                  ansData = (valuesdata.indexOf(ansData.trim()) !== -1) ? ansData : '';
                } else if (element.condition === 'Not Contains') {
                  const valuesdata = element.conditionvalue.split(',');
                  ansData = (valuesdata.indexOf(ansData.trim()) === -1) ? ansData : '';
                }
              }
              if (element.boxes.length === 1) {
                element.boxes[0].value = ansData;
              } else {
                element.textalign = 'center';
                element.boxes.forEach((box, index) => {
                  element.boxes[index].value = (ansData.length > index) ? ansData[index] : '';
                });
              }
            } else if (element.type === 'date') {
              let date = '';
              if (element.optiondependselectid || element.sequenceinstead) {
                ansData = this.getDependentQuestionBasedAnswer(element, this.answerlist);
                if (ansData) {
                  date = this.getDateByFormat(ansData, element.format);
                }
              } else {
                date = (ans.length > 0) ? (ans[0].controlvalue.length > 0) ? this.getDateByFormat(ans[0].controlvalue, element.format) : '' : '';
              }
              if (element.Appendvalue) {
                date = (date && date.length > 0) ? date += element.Appendvalue : '';
              }
              if (element.boxes.length === 1) {
                element.boxes[0].value = date;
              } else {
                element.textalign = 'center';
                date = (date) ? date.replace(/[\/]+/g, '') : '';
                element.boxes.forEach((box, index) => {
                  element.boxes[index].value = (date.length > index) ? date[index] : '';
                });
              }
            } else if (element.type === 'radiobutton') {
              if (element.optiondependselectid || element.sequenceinstead) {
                ansData = this.getDependentQuestionBasedAnswer(element, this.answerlist);
                element.boxes.forEach((box, index) => {
                  const conditionvalue = (box.conditionvalue != null) ? box.conditionvalue : '';
                  const regex = new RegExp('\\b' + conditionvalue + '\\b');
                  if (ansData && ansData.length > 0 && (conditionvalue === ansData || ansData.search(regex) !== -1)) {
                    element.boxes[index].value = true;
                  } else {
                    element.boxes[index].value = false;
                  }
                });
              } else {
                element.boxes.forEach((box, index) => {
                  const conditionvalue = (box.conditionvalue != null) ? box.conditionvalue : '';
                  const regex = new RegExp('\\b' + conditionvalue + '\\b');
                  const ansvalue = (ans.length > 0) ? ans[0].controlvalue : '';
                  if (ansvalue && ansvalue.length > 0 && (conditionvalue === ansvalue || ansvalue.search(regex) !== -1)) {
                    element.boxes[index].value = true;
                  } else {
                    element.boxes[index].value = false;
                  }
                });
              }

            } else if (element.type === 'checkbox') {
              if (element.optiondependselectid || element.sequenceinstead ) {
                if(elmtype !== 'coursepreference'){
                  ansData = this.getDependentQuestionBasedAnswer(element, this.answerlist);
                }
                element.boxes.forEach((box, index) => {
                  const conditionvalue = (box.conditionvalue != null) ? box.conditionvalue : '';
                  const regex = new RegExp('\\b' + conditionvalue + '\\b');
                  if (ansData && ansData.length > 0 && (conditionvalue === ansData || ansData.search(regex) !== -1)) {
                    element.boxes[index].value = true;
                  } else {
                    element.boxes[index].value = false;
                  }
                });
              } else {
                element.boxes.forEach((box, index) => {
                  const conditionvalue = (box.conditionvalue != null) ? box.conditionvalue : '';
                  const regex = new RegExp('\\b' + conditionvalue + '\\b');
                  const ansvalue = (ans.length > 0) ? ans[0].controlvalue : '';
                  if (ansvalue && ansvalue.length > 0 && (conditionvalue === ansvalue || ansvalue.search(regex) !== -1)) {
                    element.boxes[index].value = true;
                  } else {
                    element.boxes[index].value = false;
                  }
                });
              }
            }
            this.controllist.push(element);
          });
        }
        this.cd.markForCheck();
        this.loadService.loadme = false;
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
      }
    });
  }
  getPreferenceAnswer(element) {
    let answer = '';
    if (this.coursepreference.length >= parseInt(element.prefer)) {
      switch (element.optiondependselectid) {
        case 'Program code': {
          answer = (this.coursepreference[parseInt(element.prefer) - 1].programcode) ? this.coursepreference[parseInt(element.prefer) - 1].programcode : '';
          break;
        }
        case 'Program title': {
          answer = (this.coursepreference[parseInt(element.prefer) - 1].coursename) ? this.coursepreference[parseInt(element.prefer) - 1].coursename : '';
          break;
        }
        case 'Cricos code': {
          answer = (this.coursepreference[parseInt(element.prefer) - 1].cricoscode) ? this.coursepreference[parseInt(element.prefer) - 1].cricoscode : '';
          break;
        }
        case 'Duration': {
          answer = (this.coursepreference[parseInt(element.prefer) - 1].cricoscode) ? this.coursepreference[parseInt(element.prefer) - 1].cricoscode : '';
          break;
        }
        case 'Intake': {
          answer = (this.coursepreference[parseInt(element.prefer) - 1].intakeidf) ? this.coursepreference[parseInt(element.prefer) - 1].intakeidf : '';
          break;
        }
        case 'Major': {
          answer = (this.coursepreference[parseInt(element.prefer) - 1].major) ? this.coursepreference[parseInt(element.prefer) - 1].major : '';
          break;
        }
        case 'Minor': {
          answer = (this.coursepreference[parseInt(element.prefer) - 1].minor) ? this.coursepreference[parseInt(element.prefer) - 1].minor : '';
          break;
        }
        case 'Discipline': {
          answer = (this.coursepreference[parseInt(element.prefer) - 1].discipline) ? this.coursepreference[parseInt(element.prefer) - 1].discipline : '';
          break;
        }
        case 'Campus': {
          answer = (this.coursepreference[parseInt(element.prefer) - 1].campname) ? this.coursepreference[parseInt(element.prefer) - 1].campname : '';
          break;
        }
      }
    }
    return answer;
  }

  getDependentQuestionBasedAnswer(element, anslist) {
    let answer = '';
    if (!element.sequenceinstead) {
      const optiondependselectid = (element.optiondependselectid) ? element.optiondependselectid : '-1';
      let ans = [];
      // if (element.optionlist) {
      //   let count = 0;
      //   element.optionselected = element.optionlist[0].name;
      //   while (count < element.optionlist.length) {
      //     const procceded = this.proccedData.filter(el => el.questionid == element.questionid && el.controlvalue == element.optionselectid);
      //     if (procceded.length === 0) {
      //       ans = anslist.filter(el => el.questionid == optiondependselectid && el.controlvalue == element.optionselectid);
      //     } 
      //     this.proccedData.push({ questionid: element.questionid, controlvalue: element.optionselectid });
      //     if (ans.length > 0) {
      //       break;
      //     } else {
      //       element.optionselectid = element.optionlist[count].name;
      //       count++;
      //     }
      //   }
      // } else {
      ans = anslist.filter(el => el.questionid == optiondependselectid && el.controlvalue == element.optionselectid);
      // }
      const optionselected = (ans.length > 0) ? ans[0].controlvalue : '';
      let oldsecid = '';
      let oldseqno = '';
      if (optionselected.length > 0 && optionselected == element.optionselectid) {
        oldseqno = (ans.length > 0) ? ans[0].rownumber : '';
        oldsecid = (ans.length > 0) ? ans[0].sectionid : '';
        const ansinner = anslist.filter(el => el.questionid == element.questionid && el.rownumber == oldseqno && el.sectionid == oldsecid);
        answer = (ansinner.length > 0) ? ansinner[0].controlvalue : '';
      }
      if (element.skip) {
        answer = answer.substring(element.skip, element.length);
      }
    } else {
      const ansinner = anslist.filter(el => el.questionid == element.questionid && (el.rownumber + 1) == parseInt(element.sequencenumber));
      answer = (ansinner.length > 0) ? ansinner[0].controlvalue : '';
      if (element.skip) {
        answer = answer.substring(element.skip, element.length);
      }
    }
    return answer;
  }
  getMergedAnswer(element, anslist) {
    let answer = '';
    const ansinner = anslist.filter(el => el.questionid == element.mergequestionid);
    answer = (ansinner.length > 0) ? ansinner[0].controlvalue : '';
    return answer;
  }
  getValueForMobileNumber(ans, element) {
    let ansData = '';
    if (ans.length > 0) {
      const anssplit = (ans[0].controlvalue != null && ans[0].controlvalue.length > 0) ? ans[0].controlvalue.split('-') : '';
      if (anssplit.length > 0) {
        if (ans[0].type === 'mobilenumber') {
          if (element.mobile === 'countrycode') {
            ansData = (anssplit[0]) ? anssplit[0].trim() : '';
          } else if (element.mobile === 'mobile') {
            ansData = (anssplit[1]) ? anssplit[1].trim() : '';
          }
        } else if (ans[0].type === 'phonenumber') {
          if (element.mobile === 'countrycode') {
            ansData = (anssplit[0]) ? anssplit[0].trim() : '';
          } else if (element.mobile === 'areacode') {
            ansData = (anssplit[1]) ? anssplit[1].trim() : '';
          } else if (element.mobile === 'mobile') {
            ansData = (anssplit[2]) ? anssplit[2].trim() : '';
          }
        } else {
          ansData = ans[0].controlvalue;
        }
      } else {
        ansData = '';
      }
    }
    if (element.skip) {
      ansData = ansData.substring(element.skip, element.length);
    } else if (element.allow) {
      ansData = ansData.substring(0, element.allow);
    }
    return ansData;
  }
  getDateByFormat(date, format) {
    const dt = date.split('/');
    const day = dt[0];
    const month = dt[1];
    const year = dt[2];
    switch (format) {
      case 'mm/dd/yyyy':
        {
          date = month + '/' + day + '/' + year;
          break;
        }
      case 'yyyy/dd/mm':
        {
          date = year + '/' + day + '/' + month;
          break;
        }
      case 'yyyy/mm/dd':
        {
          date = year + '/' + month + '/' + day;
          break;
        }
      case 'dd/mm/yy':
        {
          date = day + '/' + month + '/' + year.substring(2, 4);
          break;
        }
      case 'mm/dd/yy':
        {
          date = month + '/' + day + '/' + year.substring(2, 4);
          break;
        }
      case 'yy/mm/dd':
        {
          date = year.substring(2, 4) + '/' + month + '/' + day;
          break;
        }
      case 'yy/dd/mm':
        {
          date = year.substring(2, 4) + '/' + day + '/' + month;
          break;
        }
      case 'dd/mm':
        {
          date = day + '/' + month;
          break;
        }
      case 'mm/yy':
        {
          date = month + '/' + year.substring(2, 4);
          break;
        }
      case 'mm/yyyy':
        {
          date = month + '/' + year;
          break;
        }
      case 'yyyy':
        {
          date = year;
          break;
        }
      case 'mm':
        {
          date = month;
          break;
        }
      case 'dd':
        {
          date = day;
          break;
        }
      case 'yy':
        {
          date = year.substring(2, 4);
          break;
        }
      default:
        {
          date = day + '/' + month + '/' + year;
          break;
        }
    }
    return date;
  }
  public trackByIndex(index: number) {
    return index;
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
