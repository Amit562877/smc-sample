import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UniversityFormMappingsService } from '../../services/university-form-mappings.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';

@Component({
  selector: 'app-university-form-mappings-preview',
  templateUrl: './university-form-mappings-preview.component.html',
  styleUrls: ['./university-form-mappings-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniversityFormMappingsPreviewComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject()
  controllist: any = [];
  originalcontrollist: any = [];
  answerlist: any = [];
  coursepreference: any = [];
  imagelist: any = [];
  imagelist64: any = [];
  masterid: any;
  userid = 0;
  id = 0;
  apiurl: any = environment.API_URL_DOC;
  ispages = true;
  iscontrols = false;
  isproperties = false;
  currentProperty: any;
  submitted = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mappingsService: UniversityFormMappingsService,
    public loadService: LoaderService,
    private mservice: ToastService,
    private cd: ChangeDetectorRef,
    private encdec: EncDecService,
  ) { }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.masterid = (params.masterid) ? params.masterid.toString() : 0;
      this.cd.markForCheck();
    });

    this.loadService.loadme = true;
    this.mappingsService.getAllReferenceImages(this.masterid, this.encdec.encryptSensitive(this.userid), 'pdf').pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.imagelist = data.outdatalist[0];
        if (data.outdatalist[1].length > 0) {
          this.originalcontrollist = JSON.parse(data.outdatalist[1][0].settings);
          this.answerlist = data.outdatalist[2];
          this.coursepreference = data.outdatalist[3];
          this.id = data.outdatalist[1][0].id;
          this.originalcontrollist.forEach(element => {
            let ans: any;
            let ansData: any;
            if (element.questionid === 113) {
              ansData = this.getPreferenceAnswer(element);
            } else {
              ans = this.answerlist.filter(el => el.questionid === element.questionid);
            }

            if (element.type === 'textbox') {
              if (element.questionid !== 113) {
                ansData = this.getValueForMobileNumber(ans, element);
                if (element.optiondependselectid) {
                  ansData = this.getDependentQuestionBasedAnswer(element, this.answerlist);
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
              if (element.questionid !== 113) {
                ansData = this.getValueForMobileNumber(ans, element);
                if (element.optiondependselectid) {
                  ansData = this.getDependentQuestionBasedAnswer(element, this.answerlist);
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
              let date = (ans.length > 0) ? this.getDateByFormat(ans[0].controlvalue, element.format) : '';
              if (element.boxes.length === 1) {
                element.boxes[0].value = date;
              } else {
                element.textalign = 'center';
                date = date.replace(/[\/]+/g, '');
                element.boxes.forEach((box, index) => {
                  element.boxes[index].value = (date.length > index) ? date[index] : '';
                });
              }
            } else if (element.type === 'radiobutton') {
              element.boxes.forEach((box, index) => {
                const conditionvalue = (box.conditionvalue != null) ? box.conditionvalue : '';
                const ansvalue = (ans.length > 0) ? ans[0].controlvalue : '';
                if (conditionvalue === ansvalue && ansvalue.length > 0) {
                  element.boxes[index].value = true;
                } else {
                  element.boxes[index].value = false;
                }
              });
            } else if (element.type === 'checkbox') {
              element.boxes.forEach((box, index) => {
                const conditionvalue = (box.conditionvalue != null) ? box.conditionvalue : '';
                const ansvalue = (ans.length > 0) ? ans[0].controlvalue : '';
                if (conditionvalue === ansvalue && ansvalue.length > 0) {
                  element.boxes[index].value = true;
                } else {
                  element.boxes[index].value = false;
                }
              });
            }
            this.controllist.push(element);
          });
        }


        this.loadService.loadme = false;
        this.cd.markForCheck()

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
    const optiondependselectid = (element.optiondependselectid) ? element.optiondependselectid : '-1';
    const ans = anslist.filter(el => el.questionid == optiondependselectid && el.controlvalue == element.optionselectid);
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
    return answer;
  }
  getValueForMobileNumber(ans, element) {
    let ansData = '';
    if (ans.length > 0) {
      const anssplit = ans[0].controlvalue.split('-');
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
