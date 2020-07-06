import { Component, OnInit, ChangeDetectorRef, NgZone, ChangeDetectionStrategy, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentFormService } from '../../services/assessment-form.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { OrderByPipe } from '../../../shared/pipes/oneform.pipe';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { Location } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BroadcastService } from 'src/app/shared/services/broadcast.service';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
import { SecureDocsService } from 'src/app/shared/services/securedocs.service';
import * as jwt_decode from 'jwt-decode';
import { ReviewFormComponent } from '../review-form/review-form.component';
import { environment } from 'src/environments/environment';
declare const $: any;
@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.scss'],
  providers: [OrderByPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssessmentFormComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();


  @ViewChild(ReviewFormComponent, { static: false }) rform: ReviewFormComponent;
  constructor(
    private route: ActivatedRoute,
    private assessmentFormService: AssessmentFormService,
    public loadService: LoaderService,
    private orderByPipe: OrderByPipe,
    private mservice: ToastService,
    private location: Location,
    private router: Router,
    private cd: ChangeDetectorRef,
    private service: BroadcastService,
    private adataservice: AuthdataService,
    private encdec: EncDecService,
    private secureDocsService: SecureDocsService,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) { }
  setPermissionFlag = 'View';
  showBackbtnFlag = false;
  public addrKeys: string[];
  public addr: object;
  history: any = [];
  hquestion: any = '';
  updatedDate: any;
  productidf: string;
  isform: boolean;
  sectionidf: string;
  sectionList: any;
  tmpSectopnList: any;
  applicantidf: any;
  ngformdata: any;
  listDynamicApplicantVisaType: any;
  listDynamicApplicantformControl: any;
  listsectionmultiplecontrol: any;
  checkfinallist: any;
  listfBindControlField: any;
  listDynamicApplicantControlOption: any;
  listDynamicApplicantControlOptionCascade = [];
  ngIFConditions: any;
  ngDOConditions: any;
  pagedItems = [];
  fcontryearlist: any;
  MultipleControlvalue: any;
  listIsmultiple = [];
  totalItems: any;
  MultipleSectionList: any;
  FinalMultipleControllist: any;
  divSectiondisplayList: boolean;
  DocumentList: any;
  sectionlist2: any;
  ngCascasefield: any;
  tmpngCascadedata: any;
  ngCascadedata: any;
  ngCopyValueList: any;
  ngCheckbindvalue: any;
  ngCheckbindvalue1: any;
  ngCheckbindvalue2: any;
  ngCheckbindvalue3: any;
  nglistbindcontrol: any;
  listBindValuefromfields: any;
  ngcheckbindmultiple1: any;
  ngcheckbindmultiple2: any;
  ngcheckbindmultiple3: any;
  ngcheckbindmultiple4: any;
  ngIFTmp: any;
  loadsharelink = true;
  ngIFTmpTarget: any;
  ngAndOrControlList: any;
  ngIFControlList = [];
  ngDOControlList = [];
  ngCompareControl: any;
  checkSectioncnt: any;
  checkMainSectioncnt: any;
  tmpCopyFromControl: any;
  ngAndOrControlListMultiple: any;
  controllist: any;
  BindDocumentList: any;
  SectionDocumentList = [];
  BindMultipleDocumentList: any;
  tmpBindMultipleDocumentList: any;
  textformat = 'lowercase';
  viewby = 1;
  currentPage = 1;
  itemsPerPage = this.viewby;
  maxSize = 1; // Number of pager buttons to show
  selectedIndex = 1;
  sectionm: any;
  docid: any;
  filepath: any;
  divViewDocument: boolean;
  Date = [];
  Year = [];
  Month = [];
  mainsectionid = 1;
  filtered: any;
  filteredvisatype: any;
  divCancelDocument: boolean;
  divMultiViewDocument: boolean;
  pendingquestion = [];
  divformadd: boolean;
  divformlist: boolean;
  pendingquestioncontrols = [];
  pendingquestioncontrolslist = [];
  pendingmultiplequestioncontrols = [];
  pendingmultiplequestioncontrolslist = [];
  pendingmultiplequestion = [];
  multiplecontrollist = [];
  BlankSectionListMultiple = [];
  getFillControlList = [];
  checkduplidatesection = [];
  PendingMultipleSectionList = [];
  PendingMultipleSectionList1 = [];
  pendingsectionsfilter = [];
  checkSection = [];
  tmppendingMainsectionslist = [];
  pendingsections = [];
  checkSectionvalue = [];
  pendingMainsectionslist = [];
  pendingMainsections = [];
  checkMainSectionvalue = [];
  pendingsectionslist = [];
  checkmultiplesectionlist = [];
  pendingrequiredmultiplecontrol = [];
  rownumber = 0;
  registerForm: FormGroup;
  tmpSectionDocument: any;
  assignedAgentId: any;
  diverror: boolean;
  NoButtonClick: any;
  PendingQuestinSave: any;
  ContinueReview: any;
  closeDynamicform: any;
  UpdateApplicantStatus: any;
  submitted = false;
  tmpOptionList: any;
  action = '';
  MControlvalue: any;
  tmpcontrolvalueshowdl: any;
  ngformdataMultiple: any;
  isDocumentExist: any;
  ControlvalueEdit: any;
  tmpcontrolvalueEdit: any;
  InsertControlvalue: any;
  Controls: any;
  tmpMultipleControlvalue: any;
  tmpcontrolvalueMul: any;
  tmpcontrolvalue: any;
  listsectionids: any;
  listdocumentcontrols: any;
  Mainlistdocumentcontrols: any;
  projectid: any;
  pagenotfound: any;
  mastercontroll: any;
  studylevelquery: any;
  secid: any;
  userdata: any;
  visiblefundcalculator: any;
  uid: any;
  pid: string;
  aid: string;
  multiplseCreatedby: any;
  multisectionclick: any;
  secArrMul: any;
  OpenDocumentFlagVerifydata: any;
  ngpredefinedcolumnvalue: any;
  sameAsAboveOption = false;
  currentAddresSectionObj = [];
  sameAsAboveOptionIsChecked = false;
  securelink: any = {};
  securenotes = [];
  notsent = false;
  note: any = {};
  userdatainfo = {};
  showchat = false;
  showchatbutton = false;
  commentquesid = '';
  pidenc: any = '';
  aidenc: any = '';
  isrefreshquestion = false;
  commentsCountList = [];
  ngOnInit() {
    this.loadService.ispanel = true;
    this.loadService.loadme = true;
    this.multiplseCreatedby = 0;
    this.docid = 0;
    this.projectid = 0;
    this.pagenotfound = false;
    this.visiblefundcalculator = true;
    this.multisectionclick = false;
    this.OpenDocumentFlagVerifydata = true;

    // this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
    //   this.productidf = params.pid.toString();
    //   this.applicantidf = parseInt(params.aid.toString(), 10);
    //   if (params.secid) {
    //     this.secid = parseInt(params.secid.toString(), 10);
    //   }

    // });

    ////Encrpted Code For User//////////////
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.productidf = String(this.encdec.decryptSensitiveV1(params.pid));
      this.applicantidf = String(this.encdec.decryptSensitiveV1(params.aid));
      this.aidenc = String(params.pid);
      this.pidenc = String(params.aid);
      let secid = (sessionStorage.getItem('oneformSection')) ? String(sessionStorage.getItem('oneformSection')) : undefined;
      if (secid) {
        this.secid = parseInt(secid.toString(), 10);
        sessionStorage.removeItem('oneformSection')
      }
    });


    ////END Encrpted Code For User//////////////



    // this.GetCalender();
    // this.GetAllFormControlMaster();
    // //this.GetAllCascadeData();
    // this.GetStudyLevelCondition();
    // this.setUserInfo();
    this.cd.markForCheck();
  }

  setUserInfo() {
    this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (this.adataservice.getUserData()[0]) : '';
    if (this.userdata) {
      this.uid = this.userdata.uid;
      this.cd.markForCheck();
    }
  }
  sameasAboveFunction(subsec) {
    let currentAddressQues = this.listDynamicApplicantformControl.filter(val => {
      return val.sectionidf === this.currentAddresSectionObj[0].sectionidf;
    });
    let mailingAddressQues = this.listDynamicApplicantformControl.filter(val => {
      return val.sectionidf === subsec.sectionidf;
    });

    if (this.sameAsAboveOptionIsChecked) {
      for (let que of mailingAddressQues) {
        let answer = [];
        answer = currentAddressQues.filter(val => {
          return val.question.toLowerCase() === que.question.toLowerCase();
        });
        if (answer.length > 0) {
          que.controlvalue = answer[0].controlvalue;
        }
        this.cd.markForCheck();
      }
    } else {
      for (let que of mailingAddressQues) {
        let answer = [];
        answer = currentAddressQues.filter(val => {
          return val.question.toLowerCase() === que.question.toLowerCase();
        });
        if (answer.length > 0) {
          que.controlvalue = '';
        }
        this.cd.markForCheck();
      }
    }

  }
  setAddress(addrObj) {
    //We are wrapping this in a NgZone to reflect the changes
    //to the object in the DOM.
    this.cd.markForCheck();
    var addressline1 = '';
    var Address = addrObj.ngaddressdetailvalue;
    var addressid = parseInt(addrObj.tmpaddressid);
    if (Address != null && Address != undefined) {
      if (Address.name != null && Address.name != undefined) {

        addressline1 =
          (Address.name != '' && Address.name != undefined ? Address.name + ', ' : '') +
          (Address.neighborhood != '' && Address.neighborhood != undefined ? Address.neighborhood + ', ' : '');

        var addressline2 =
          (Address.route != '' && Address.route != undefined ? Address.route + ', ' : '') +
          (Address.sublocality_level_3 != '' && Address.sublocality_level_3 != undefined ? Address.sublocality_level_3 + ', ' : '') +
          (Address.sublocality_level_2 != '' && Address.sublocality_level_2 != undefined ? Address.sublocality_level_2 + ', ' : '') +
          (Address.sublocality_level_1 != '' && Address.sublocality_level_1 != undefined ? Address.sublocality_level_1 + ', ' : '');
        this.cd.markForCheck();
        var adderssline2list = this.listDynamicApplicantformControl.filter((item) => {
          return item.addressfield === addressid && item.googleaddressfield === 2;
        });
        this.cd.markForCheck();
        if (adderssline2list.length > 0) {

          this.listDynamicApplicantformControl.filter(function (item) {
            return item.addressfield === addressid && item.googleaddressfield === 2;
          })[0].controlvalue = addressline2;
        }

        var countrylist = this.listDynamicApplicantformControl.filter(function (item) {
          return item.addressfield === addressid && item.googleaddressfield === 3;
        });
        if (countrylist.length > 0) {
          this.listDynamicApplicantformControl.filter(function (item) {
            return item.addressfield === addressid && item.googleaddressfield === 3;
          })[0].controlvalue = Address.country.toUpperCase();
        }

        var statelist = this.listDynamicApplicantformControl.filter(function (item) {
          return item.addressfield === addressid && item.googleaddressfield === 4;
        });
        this.cd.markForCheck();
        if (statelist.length > 0) {
          this.tmpngCascadedata = this.ngCascadedata.filter((val) => {
            return val.cascadename === Address.country.toUpperCase();
          });
          this.cd.markForCheck();
          if (this.tmpngCascadedata.length > 0) {
            for (var b = 0; b < this.tmpngCascadedata.length; b++) {
              this.listDynamicApplicantControlOptionCascade.push({
                controloptionid: 0,
                formcontrolid: this.listDynamicApplicantformControl.filter(function (item) {
                  return item.addressfield === addressid && item.googleaddressfield === 4;
                })[0].formcontrolid,
                helpblock: '',
                isconditional: false,
                optiontext: this.tmpngCascadedata[b].name,
                optionvalue: this.tmpngCascadedata[b].id,
                productidf: this.productidf,
                sectionidf: 0,
                sectionparentidf: 0,
                visatypesectionmapid: 0
              });
            }
            this.cd.markForCheck();
          }
          this.cd.markForCheck();
          this.listDynamicApplicantformControl.filter(function (item) {
            return item.addressfield === addressid && item.googleaddressfield === 4;
          })[0].controlvalue = Address.administrative_area_level_1.toUpperCase();
          this.cd.markForCheck();
        }
        this.cd.markForCheck();
        var localitylist = this.listDynamicApplicantformControl.filter(function (item) {
          return item.addressfield === addressid && item.googleaddressfield === 5;
        });
        if (localitylist.length > 0) {
          this.listDynamicApplicantformControl.filter(function (item) {
            return item.addressfield === addressid && item.googleaddressfield === 5;
          })[0].controlvalue = Address.locality.toUpperCase();
        }
        this.cd.markForCheck();
        var pincodelist = this.listDynamicApplicantformControl.filter(function (item) {
          return item.addressfield === addressid && item.googleaddressfield === 6;
        });
        if (pincodelist.length > 0) {
          this.listDynamicApplicantformControl.filter(function (item) {
            return item.addressfield === addressid && item.googleaddressfield === 6;
          })[0].controlvalue = Address.postal_code;
        }
        this.cd.markForCheck();
        setTimeout(() => {
          this.listDynamicApplicantformControl.filter(function (item) {
            return item.formcontrolid === addressid && item.googleaddressfield === 1;
          })[0].controlvalue = addressline1;
          this.cd.markForCheck();
        }, 1);
      }
    }
    else {
      //$("#txtaddress" + index).focus();
    }

  }
  datepickerNew(index, controlid, ngControl) {
    if (isPlatformBrowser(this._platformId)) {
    // $.noConflict();  
     
      $('#' + controlid + '' + index).datepicker({
        format: 'dd/mm/yyyy',
        todayBtn: 'linked',
        todayHighlight: true,
        autoclose: true,
      }).on('changeDate', (e) => {
        ngControl.controlvalue = e.target.value;
        this.ApplyConditions(ngControl);
      });
     $('#' + controlid + '' + index).datepicker("show");
    }

  }

  demoDataBind(value) {
    this.mservice.generateMessage('INFO', 'INFO', value);
  }

  bindsummernote(index, controlType) {
    if (isPlatformBrowser(this._platformId)) {
      const Id = controlType + index;
      $('#' + Id).summernote({
        disableDragAndDrop: true,
        placeholder: '',
        tabsize: 2,
        height: 200,
        callbacks: {
          // onChange: function (contents, $editable) {
          //   console.log('onChange:', contents, $editable);
          // }
          // onImageUpload: function (files, editor, welEditable) {
          //   // console.log("BINDSUMMERNOTE");
          //   this.sendFile(files[0], this);
          // }
        }
      });
    }

  }

  // GetStudyLevelCondition() {
  //   const applicantid = this.applicantidf;
  //   this.assessmentFormService.getstudylevelcondition(applicantid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
  //     if (data.outdatalist.length > 0) {
  //       this.pagenotfound = false;
  //       this.studylevelquery = data.outdatalist[0][0];
  //       if ((data.outdatalist[0][1])[0].leadidf.toString().length == 36) {
  //         // GUID
  //         sessionStorage.setItem('aid', (data.outdatalist[0][1])[0].leadidf);
  //       } else {
  //         sessionStorage.setItem('aid_param', (data.outdatalist[0][1])[0].leadidf);
  //       }
  //       sessionStorage.setItem('pid', (data.outdatalist[0][1])[0].projectidf);
  //       this.GetAllSection();
  //       this.cd.markForCheck();
  //     } else {

  //       this.loadService.loadme = false;
  //       this.studylevelquery = '';
  //       this.pagenotfound = true;
  //       this.cd.markForCheck();
  //       this.mservice.generateMessage('ERROR', 'EMPTY', 'No Record Found');
  //     }
  //   });
  // }
  GetStudyLevelCondition() {
    const applicantid = this.applicantidf;
    this.assessmentFormService.getstudylevelcondition(applicantid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.outdatalist.length > 0) {
        this.pagenotfound = false;
        this.studylevelquery = data.outdatalist[0];

        if (data.outdatalist[1]) {
          sessionStorage.setItem('aid', data.outdatalist[1][0].leadidf);
          sessionStorage.setItem('pid', data.outdatalist[1][0].projectidf);
        }

        this.GetAllSection();
        this.cd.markForCheck();
      } else {

        this.loadService.loadme = false;
        this.studylevelquery = '';
        this.pagenotfound = true;
        this.cd.markForCheck();
        this.mservice.generateMessage('ERROR', 'EMPTY', 'No Record Found');
      }
    });
  }
  GetAllSection() {
    const universityidf = this.productidf;
    const isform = this.isform;
    const query = this.studylevelquery;
    this.assessmentFormService.getSectionListServiceWiseV2(universityidf, isform, query).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.outdata.length > 0) {
        this.pagenotfound = false;
        this.sectionList = data.outdata;
        for (let i = 0; i < this.sectionList.length; i++) {
          this.sectionList[i].sequence = i + 1;
        }
        this.tmpSectopnList = this.sectionList;
        this.totalItems = this.tmpSectopnList.length;
        if (!this.isrefreshquestion) {
          this.sectionidf = this.sectionList[0].sectionidf;
        } else {
          this.isrefreshquestion = false;
        }
        // this.sectionidf = '2';

        // GetAllOptionConditionData();
        this.GetSectionformdata('P');
        this.cd.markForCheck();
      } else {

        this.loadService.loadme = false;
        this.pagenotfound = true;
        this.cd.markForCheck();
        this.mservice.generateMessage('INFO', 'Form hasn\'t been set for the selected university', 'Note');
      }
    });
  }
  GetSectionformdata(type) {
    this.loadService.loadme = true;
    const productidf = this.productidf;
    let sectionidf = this.sectionidf;
    if (this.secid) {
      sectionidf = this.secid;
      this.currentPage = (this.tmpSectopnList.filter(val => { return val.sectionidf === this.secid }))[0].sequence;
      this.secid = undefined;
    }

    const isform = this.isform;
    const applicantid = this.applicantidf;
    const projectid = this.projectid;
    const query = this.studylevelquery;
    if (sessionStorage.getItem('securelinkjson')) {
      this.securelink = JSON.parse(this.encdec.decryptSensitiveV1(sessionStorage.getItem('securelinkjson')));
    }
    const payload = {
      productidf,
      isform,
      sectionidf,
      applicantid,
      projectid,
      query,
      securelinkid: this.securelink.id
    };
    this.assessmentFormService.getApplicantSectionControlDataV3(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.ngformdata = data.outdata;
      this.listDynamicApplicantVisaType = this.ngformdata.listDynamicApplicantVisaType;
      this.listDynamicApplicantformControl = this.ngformdata.listDynamicApplicantformControl;
      this.checkfinallist = this.listDynamicApplicantformControl;
      this.listsectionmultiplecontrol = this.ngformdata._listmultiplesectioncontrol;
      this.listfBindControlField = this.ngformdata._listfcontrolbindfromfield;
      this.listDynamicApplicantControlOption = this.ngformdata.listDynamicApplicantControlOption;
      this.listDynamicApplicantControlOptionCascade = this.ngformdata.listDynamicApplicantControlOption;
      this.ngIFConditions = this.ngformdata._ControlIFcondtionmapping;
      this.ngDOConditions = this.ngformdata._ControlDOconditionmapping;
      this.ngpredefinedcolumnvalue = this.ngformdata._listpredefinedcolumnvalue.filter(val => {
        return val.RowNumber === -1;
      });
      this.commentsCountList = this.ngformdata.listcomments;
      for (var w = 0; w < this.listDynamicApplicantformControl.length; w++) {
        for (var q = 0; q < this.ngpredefinedcolumnvalue.length; q++) {
          if (this.listDynamicApplicantformControl[w].controlvalue.toString() == '') {
            if (this.listDynamicApplicantformControl[w].predefinedfieldname.toString().toUpperCase() == this.ngpredefinedcolumnvalue[q].columnname.toString().toUpperCase()
              && this.listDynamicApplicantformControl[w].formpredefinedmodulename.toString().toUpperCase() == this.ngpredefinedcolumnvalue[q].modulename.toString().toUpperCase()) {
              if (this.listDynamicApplicantformControl[w].controltypeidf == 5) {
                if (this.ngpredefinedcolumnvalue[q].columnvalue == "1") {
                  this.listDynamicApplicantformControl[w].controlvalue = "Yes";
                }
                else {
                  this.listDynamicApplicantformControl[w].controlvalue = "No";
                }
              }
              if (this.listDynamicApplicantformControl[w].controltypeidf == 10) {
                this.listDynamicApplicantformControl[w].controlvalue = this.ngpredefinedcolumnvalue[q].columnvalue;
              }
              else {
                this.listDynamicApplicantformControl[w].controlvalue = this.ngpredefinedcolumnvalue[q].columnvalue;
              }
            }
          }
        }
      }

      this.pagedItems = this.ngformdata.listDynamicApplicantVisaType.filter(val => {
        return val.sectionparentidf === 0;
      });
      // this.pagedItems = $filter('filter')(this.ngformdata.listDynamicApplicantVisaType, { sectionparentidf: 0 }, true);
      for (let i = 0; i < this.pagedItems.length; i++) {
        this.pagedItems[i].rowNumber = i + 1;
      }

      for (let i = 0; i < this.listDynamicApplicantformControl.length; i++) {
        this.listDynamicApplicantformControl[i].controlvaluecheckbox = {};
      }

      for (let i = 0; i < this.listDynamicApplicantVisaType.length; i++) {
        this.listDynamicApplicantVisaType[i].multiplesec = false;
      }

      for (let i = 0; i < this.listsectionmultiplecontrol.length; i++) {
        this.listDynamicApplicantformControl.push(this.listsectionmultiplecontrol[i]);
      }

      for (let j = 0; j < this.listDynamicApplicantformControl.length; j++) {
        // for text editor fill value
        if (this.listDynamicApplicantformControl[j].ControlTypeName === 'texteditor') {
          const id = '#cntrl_' + this.listDynamicApplicantformControl[j].formcontrolid;
          const controlValue = this.listDynamicApplicantformControl[j].controlvalue;

          if (isPlatformBrowser(this._platformId)) {
            if (this.listDynamicApplicantformControl[j].isenabledisable !== 0
              || this.listDynamicApplicantformControl[j].isreadonly === true) {
              setTimeout(() => {
                $(id).summernote('disable');
                $(id).summernote('code', controlValue);
              }, 100);
            } else {
              setTimeout(() => {
                $(id).summernote('code', controlValue);
              }, 100);
            }
          }

        }

        if (this.listDynamicApplicantformControl[j].ControlTypeName === 'checkBoxZone') {
          for (let k = 0; k < this.listDynamicApplicantControlOption.length; k++) {
            if (this.listDynamicApplicantControlOption[k].formcontrolid === this.listDynamicApplicantformControl[j].formcontrolid) {
              if (isPlatformBrowser(this._platformId)) {
                const id = '#cntrl_chk_' + this.listDynamicApplicantControlOption[k].controloptionid;
                let status = this.getcheckboxvalue(this.listDynamicApplicantformControl[j], this.listDynamicApplicantControlOption[k]);
                setTimeout(() => {
                  $(id).prop('checked', status);
                }, 100);
              }

            }

          }

        }
      }
      // setTimeout(() => {
      //   $('#cntrl_chk_3').prop('checked',true );
      // }, 2000);
      for (let k = 0; k < this.listDynamicApplicantformControl.length; k++) {
        this.listDynamicApplicantformControl[k].fcontrolyear = [];
        if (this.listDynamicApplicantformControl[k].isdateyearvalidation === true) {
          const currentYear = new Date().getFullYear();
          const tmpyear = [];
          let minyear = currentYear + parseInt(this.listDynamicApplicantformControl[k].minyear, 10);
          let maxyear = currentYear + parseInt(this.listDynamicApplicantformControl[k].maxyear, 10);
          if (maxyear === 0) { maxyear = currentYear; }
          if (minyear === 0) { minyear = currentYear; }
          let start = 0, end = 0;
          if (minyear < maxyear) {
            start = minyear;
            end = maxyear;
          } else {
            start = maxyear;
            end = minyear;
          }
          for (let i = start; i <= end; i++) {
            tmpyear.push(i);
          }

          for (let j = 0; j < tmpyear.length; j++) {
            this.fcontryearlist.push({
              formcontrolidf: this.listDynamicApplicantformControl[k].formcontrolid,
              controloptiontext: tmpyear[j],
            });
          }
        }
      }
      this.MultipleControlvalue = this.ngformdata._listmultiplesectioncontrolvalue;
      for (let u = 0; u < this.listDynamicApplicantformControl.length; u++) {
        this.ApplyCondition(this.listDynamicApplicantformControl[u], '0');
      }
      let list1 = this.listDynamicApplicantformControl.filter(val => {
        return val.ismultiple === true
      });

      for (let i = 0; i < this.listDynamicApplicantformControl.length; i++) {
        for (let j = 0; j < list1.length; j++) {

          if (list1[j].formcontrolid == this.listDynamicApplicantformControl[i].formcontrolid) {
            this.listIsmultiple.push({
              formcontrolid: list1[j].formcontrolid,
              isrequired: this.listDynamicApplicantformControl[i].isrequired,
              sectionidf: this.listDynamicApplicantformControl[i].sectionidf
            });
            this.listDynamicApplicantformControl[i].isrequired = false;
          }
        }
      }

      // this.totalItems = this.pagedItems.length;
      this.MultipleSectionList = this.ngformdata._listMultipleSection;
      this.rownumber = this.MultipleSectionList.length;

      this.FinalMultipleControllist = this.MultipleControlvalue;
      this.divSectiondisplayList = true;
      debugger;
      let tmpMultipleControlvalue = [];
      for (let i = 0; i < this.listsectionmultiplecontrol.length; i++) {
        let answerJson = this.MultipleControlvalue.filter(val => { return val.formcontrolid === this.listsectionmultiplecontrol[i].formcontrolid });
        tmpMultipleControlvalue = tmpMultipleControlvalue.concat(answerJson)
      }
      this.MultipleControlvalue = tmpMultipleControlvalue;
      if (type == 'P') {
        if (this.OpenDocumentFlagVerifydata) {
          this.OpenUploaddocument();
          if (this.DocumentList.length > 0) {
            if (isPlatformBrowser(this._platformId)) {
              $('#modeldocumentupload').modal('toggle');
            }
          }
        }
        else {
          this.OpenDocumentFlagVerifydata = false;
        }
      } else if (type == 'D') {
        this.OpenUploaddocument();
        this.ViewDocument(parseInt(this.docid), 0);
      } else if (type == 'M') {
        this.OpenUploaddocument();
        //this.ViewDocument(parseInt(this.docid));
      }

      if (isPlatformBrowser(this._platformId)) {
        setTimeout(() => {
          if ($(document).find('#split-aside-resize').length > 0) {
            (() => {
              (() => {
                return $('#split-aside-resize').resizable({
                  minWidth: 500,
                  handles: 'e'
                }).resize((val) => {
                  let width;
                  width = val.style.width;
                  return val.style['flex'] = "0 0" + width;
                });
              });

            }).call(this);
          }
        }, 100);
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
        }, 10);
      }
      // Same as Above start
      let tmpSAB = this.ngformdata.listDynamicApplicantVisaType.filter(val => {
        return val.sectionname.toLowerCase().indexOf('current address') > -1;
      });
      let agentSectionId = this.ngformdata.listDynamicApplicantVisaType.filter(val => {
        return val.sectionname.toLowerCase() === 'agent details';
      });
      let visaDetailsId = this.ngformdata.listDynamicApplicantVisaType.filter(val => {
        return val.sectionname.toLowerCase() === 'dependent 1';
      });
      let tmpSAB1 = this.ngformdata.listDynamicApplicantVisaType.filter(val => {
        return val.sectionname.toLowerCase().indexOf('mailing address') > -1;
      });

      if (tmpSAB.length > 0 && tmpSAB1.length > 0) {
        this.currentAddresSectionObj = tmpSAB;
        this.sameAsAboveOption = true;
      }
      let agentinfo = this.adataservice.getAgentInfo();
      let autofillfields = (agentinfo && agentinfo.autoFillJSON) ? agentinfo.autoFillJSON : undefined;
      let sessionAutoFillRecords = (autofillfields) ? autofillfields : {};
      let mappingAutoFillRecords;
      this.assessmentFormService.autoFormFillRecords('../../../../assets/AutoFillFields_Mapping.json').pipe(takeUntil(this.componentDestroyed$)).subscribe(mapdata => {
        mappingAutoFillRecords = mapdata;
        let newMapping = [];
        for (let map of mappingAutoFillRecords) {
          let tmpvar = sessionAutoFillRecords[map.key];
          if (tmpvar != undefined) {
            newMapping.push({ question: map.question, answer: tmpvar, type: map.type });
          }
        }
        for (let ngControl of this.listDynamicApplicantformControl) {
          let controlval;
          if (agentSectionId != undefined && agentSectionId.length > 0 && ngControl.sectionidf === agentSectionId[0].sectionidf) {
            controlval = newMapping.filter(val => {
              return val.question.toLowerCase() === ngControl.question.toLowerCase() && val.type === 'user';
            });
          } else if (visaDetailsId != undefined && visaDetailsId.length > 0 && ngControl.sectionidf === visaDetailsId[0].sectionidf) {
            controlval = newMapping.filter(val => {
              return val.question.toLowerCase() === ngControl.question.toLowerCase() && val.type === 'secondaryapplicant';
            });
          } else {
            controlval = newMapping.filter(val => {
              return val.question.toLowerCase() === ngControl.question.toLowerCase() && val.type === 'lead';
            });
          }

          if (controlval != undefined && controlval.length > 0) {

            if (ngControl.controltypeidf === 16) {
              // contact number
              if (ngControl.phonenumber === null) {
                ngControl.phonenumber = controlval[0].answer;
              }
            } else {
              if (ngControl.controlvalue.length == 0) {
                ngControl.controlvalue = controlval[0].answer;
              }
            }

          }
        }
        this.cd.markForCheck();
      });


      this.cd.markForCheck();
      this.cd.markForCheck();
      this.loadService.loadme = false;
    });
  }
  AcceptNumericOnly(event, allowPeriod, allowPlus) {
    var keyCode = event.which ? event.which : event.keyCode;
    if ((keyCode >= 48 && keyCode <= 57) ||         //lets allow only numerics 
      ((allowPeriod == true) && (keyCode == 46)) || ((allowPlus == true) && (keyCode == 43))  //allow period or plus symbol conditionally based on the control's choice
    ) {
      return true;
    }

    return false;
  };
  loadsharelinkfn(event) {
    this.securelink = JSON.parse(this.encdec.decryptSensitiveV1(sessionStorage.getItem('securelinkjson')));
    this.isform = true;
    this.sectionidf = '0';
    this.GetCalender();
    this.GetAllFormControlMaster();
    //this.GetAllCascadeData();
    this.GetStudyLevelCondition();
    this.setUserInfo();
  }
  setPersmission(event) {
    this.setPermissionFlag = event;

  }
  showBackbtn(event) {
    this.showBackbtnFlag = event;
  }
  isDisabled() {
    if (this.setPermissionFlag === 'View') {
      return true;
    } else {
      return false;
    }
  }

  openchat(quesid) {
    this.showchat = !this.showchat;
    if (this.showchat) {
      this.openChatFun(quesid);
    }
  }
  openChatFun(quesid) {
    this.getSecureNotes(quesid);
    this.note = {};
    setTimeout(function () {
      $('#cpanel').scrollTop($('#cpanel').height());
      // $('#cpanel').slideToggle();
      $('#comment').focus();
    }, 500);
    this.cd.markForCheck();
  }

  //#region 
  historyfn(quesid, hquestion) {
    this.hquestion = hquestion;
    this.assessmentFormService.getfieldhistory(quesid, this.applicantidf).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.history = data.outdata;
        // this.history.forEach(element => {
        //   var date = new Date(element.updatedon+' UTC');
        //   console.log(element.updatedon+' UTC')
        //   console.log(date.toString())
        // });
        this.cd.markForCheck();
      } else {
        this.history = [];
        this.cd.markForCheck();
      }
    })
  }

  //#endregion
  getSecureNotes(quesid) {
    this.commentquesid = quesid;
    this.secureDocsService.getSecureNotes(this.securelink.id, quesid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.securenotes = data.outdatalist[0];
        this.cd.markForCheck();
      }
    });
  }
  closeComment() {
    this.note = {};
    $('#cpanel').toggle();
    // this.showchat = true;
  }

  manageSecureNotes(secorenote, form) {
    if (form.valid) {
      var agentInfo = this.adataservice.getAgentInfo();
      if (agentInfo === null) {
        agentInfo = {
          agentLogoURL: environment.agentLogoURL,
          agentAddress: environment.agentAddress,
          agentContact: environment.agentContact,
          agentWebURL: environment.agentWebURL,
          agentOrganization: environment.agentOrganization,
          companyemail: environment.cemail,
          emailpassword: this.encdec.convertTextThirdParty('enc', environment.cp),
        }
      }
      this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (this.adataservice.getUserData()[0]) : '';
      this.securelink = JSON.parse(this.encdec.decryptSensitiveV1(sessionStorage.getItem('securelinkjson')));

      const email = (localStorage.getItem('socialtoken')) ? jwt_decode(localStorage.getItem('socialtoken')).email : '';
      this.notsent = true;
      secorenote.isdeleted = false;
      secorenote.isactive = true;
      secorenote.quesid = this.commentquesid;
      secorenote.linkid = this.securelink.id;
      secorenote.email = (this.userdata) ? this.userdata.email : (email) ? email : '';
      secorenote.createdby = (this.userdata) ? this.userdata.uid : 0;
      secorenote.euid = this.encdec.encryptSensitive(agentInfo.companyemail);
      secorenote.epid = this.encdec.encryptSensitive(this.encdec.convertTextThirdParty('dec', agentInfo.emailpassword));
      secorenote.ulink = this.securelink.ulink;
      this.cd.markForCheck();
      this.secureDocsService.manageSecureNotes(secorenote).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.note.id = data.outdatalist[0][0].id;
          this.securenotes.push(this.note);
          this.note = {};
          let commentcount = this.commentsCountList.filter(val => {
            return val.visatypeformcontrolid === this.commentquesid
              ;
          });
          if (commentcount.length == 0) {
            this.commentsCountList.push({ commentcount: 1, visatypeformcontrolid: this.commentquesid });
            this.commentsCountList = this.commentsCountList.splice(0)
            this.cd.markForCheck();
          } else {
            commentcount[0].commentcount++;
            let commentcountlist = this.commentsCountList.filter(val => {
              return val.visatypeformcontrolid !== this.commentquesid
                ;
            });
            commentcountlist.push(commentcount[0]);
            this.commentsCountList = commentcountlist;
          }


          // setTimeout(function () {
          //   $('#cpanel').scrollTop($('#cpanel').height());
          //   $('#comment').focus();
          // }, 500);
          this.notsent = false;
          this.cd.markForCheck();
        } else {

        }
      });
    }
  }
  ApplyConditions(ngControltmp) {
    this.ApplyCondition(ngControltmp, '1');
  }
  DisableEnterEvent(event) {
    var keyCode = event.which ? event.which : event.keyCode;
    if (keyCode == 13) {
      return false;
    } else {
      return true;
    }

    return false;
  };
  OpenUploaddocument() {
    // console.log("this.BindDocumentList ", this.BindDocumentList);
    this.SectionDocumentList = this.BindDocumentList;
    this.sectionm = this.sectionList.filter(val => { return val.sequence === this.currentPage && val.isshowhide === 0 });
    this.DocumentList = this.SectionDocumentList.filter(val => { return (val.sectionidf === this.sectionm[0].sectionidf || val.sectionparentidf === this.sectionm[0].sectionidf) && val.ismultiple == false; })
    if (this.DocumentList.length > 0) {
      this.docid = this.DocumentList[0].formcontrolid.toString();
      this.ShowDocument();
    } else {
      if (this.BindDocumentList.length > 0) {
        this.docid = this.BindDocumentList[0].formcontrolid.toString();
        this.ShowDocument();
      }
    }
  }
  ShowDocument() {
    // $('#split-aside').show();
    let selectdocument = this.SectionDocumentList.filter(val => { return val.formcontrolid === parseInt(this.docid, 10) });
    if (selectdocument.length > 0) {
      this.filepath = selectdocument[0].filepath;
      if (isPlatformBrowser(this._platformId)) {
        $('#iframedocument').attr('src', this.filepath);
        this.docid = selectdocument[0].formcontrolid.toString();
      }

    }
    this.divViewDocument = true;
  }
  GetCalender() {
    for (let i = 1; i <= 31; i++) {
      this.Date.push({
        id: i,
        name: i
      });
    }
    for (let i = 1900; i <= 2035; i++) {
      this.Year.push({
        id: i,
        name: i
      });
    }
    this.Month = [{ id: 1, name: 'JAN' }, { id: 2, name: 'FEB' }, { id: 3, name: 'MAR' }, { id: 4, name: 'APR' }, { id: 5, name: 'MAY' }, { id: 6, name: 'JUN' }, { id: 6, name: 'JUL' },
    { id: 8, name: 'AUG' }, { id: 9, name: 'SEP' }, { id: 10, name: 'OCT' }, { id: 11, name: 'NOV' }, { id: 12, name: 'DEC' }];
  }
  GetAllCascadeData() {
    const productidf = this.productidf;
    const isform = this.isform;
    this.assessmentFormService.getCaseCadeData().pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.ngCascadedata = data.outdata;
      this.cd.markForCheck();
    });
  }
  openuploaddocument() {
    if (isPlatformBrowser(this._platformId)) {
      $('#modeldocumentuploadlistFinal').modal('toggle');
      this.OpenUploaddocument();
      this.divViewDocument = false;
      this.divCancelDocument = false;
    }

  }
  CancelDocument(docid, rownumber) {
    if (isPlatformBrowser(this._platformId)) {
      if (docid != 0) {
        $("#btn" + docid + '' + rownumber).show();
      }
      if (docid == 0) {
        for (var i = 0; i < this.BindDocumentList.length; i++) {
          $("#btn" + this.BindDocumentList[i].formcontrolid).show();
        }
      }
    }

    this.BindDocumentList = this.SectionDocumentList;
    this.BindMultipleDocumentList = this.tmpBindMultipleDocumentList
    this.divViewDocument = false;
    this.divCancelDocument = false;
  }

  setFile(element) {
    var array = element.target.id.split('_');
    var formData = new FormData();
    formData.append('file', element.target.files[0]);
    formData.append('formcontrolid', array[0]);
    formData.append('sectionidf', array[1]);
    formData.append('productidf', array[2]);
    formData.append('applicantidf', this.applicantidf);
    formData.append('rownumber', '0');

    this.assessmentFormService.saveApplicantDocuments(formData).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.GetSectionformdata('M');
        this.cd.markForCheck();
      }
    });
  }
  setFile1(eve) {
    var formcontrolid = eve.target.id;
    formcontrolid = formcontrolid.replace('file_', '');
    if (formcontrolid > 0) {
      this.docid = formcontrolid;
    }
    if (this.docid == '') {
      if (isPlatformBrowser(this._platformId)) {
        this.docid = $('#ddldocumentlist').val();
      }
    }
    if (this.docid == '' || this.docid == null) {
      return false;
    }
    var file = this.BindDocumentList.filter(value => { return value.formcontrolid === parseInt(this.docid, 10) });
    var formData = new FormData();
    var controldocid = parseInt(this.docid);
    formData.append('file', eve.target.files[0]);
    formData.append('formcontrolid', this.docid);
    formData.append("sectionidf", file[0].sectionidf);
    formData.append("productidf", file[0].productidf);
    formData.append("applicantidf", this.applicantidf);

    this.assessmentFormService.saveApplicantDocuments(formData).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.GetSectionformdata('D');
        this.cd.markForCheck();
      }
    });
  }
  setPage(pageNo, sectionid, subSectionForm) {
    this.OpenDocumentFlagVerifydata = true;
    this.submitted = true;
    if (subSectionForm.valid || subSectionForm.disabled) {
      this.submitted = false;
      this.loadService.loadme = true;
      this.currentPage = pageNo;
      this.selectedIndex = pageNo;
      this.mainsectionid = sectionid;
      if (isPlatformBrowser(this._platformId)) {
        $("#asec").attr("data-toggle", "tab");
      }
      this.sectionidf = this.tmpSectopnList[this.selectedIndex - 1].sectionidf;
      this.SaveApplicantData(sectionid, this.applicantidf);
    }
  }
  NextPage(pageNo, sectionid, subSectionForm) {
    this.OpenDocumentFlagVerifydata = true;
    this.submitted = true;
    if (subSectionForm.valid || subSectionForm.disabled) {
      this.loadService.loadme = true;
      for (var i = 0; i < this.listDynamicApplicantVisaType.length; i++) {
        if ((this.listDynamicApplicantVisaType[i].sectionidf === sectionid || this.listDynamicApplicantVisaType[i].sectionparentidf == sectionid) && this.listDynamicApplicantVisaType[i].multiplesec == true) {
          this.listDynamicApplicantVisaType[i].ismultiple = true;
        }
      }
      this.sectionidf = this.tmpSectopnList[pageNo - 1].sectionidf;
      this.SaveApplicantData(sectionid, this.applicantidf);
      this.currentPage = pageNo;
      this.selectedIndex = pageNo;
      this.mainsectionid = sectionid;
      this.submitted = false;
    }

  }
  PreviousPage(pageNo, sectionid, subSectionForm) {
    this.submitted = true;
    if (subSectionForm.valid || subSectionForm.disabled) {
      this.submitted = false;
      this.loadService.loadme = true;
      this.currentPage = pageNo;
      this.selectedIndex = pageNo;
      this.mainsectionid = sectionid;
      this.sectionidf = this.tmpSectopnList[this.selectedIndex - 1].sectionidf;
      //this.GetSectionformdata("P");
      this.SaveApplicantData(sectionid, this.applicantidf);
    }

  }
  FinalSaveApplicantData(sectionid, subSectionForm) {
    this.submitted = true;
    if (subSectionForm.valid || subSectionForm.disabled) {
      this.submitted = false;
      this.loadService.loadme = true;
      this.filtered = this.listDynamicApplicantformControl.filter(value => {
        return value.sectionidf === sectionid || value.sectionparentidf === sectionid;
      });
      this.filtered = this.filtered.filter(value => {
        return value.ismultiple === false;
      });
      this.filteredvisatype = this.listDynamicApplicantVisaType.filter(value => {
        return value.sectionidf === sectionid || value.sectionparentidf === sectionid;
      });
      for (let j = 0; j < this.filtered.length; j++) {
        if (this.filtered[j].ControlTypeName == 'texteditor') {
          let id = '#cntrl_' + this.filtered[j].formcontrolid;
          if (isPlatformBrowser(this._platformId)) {
            this.filtered[j].controlvalue = $(id).summernote('code');
          }
        }
      }
      const fvm = {
        listDynamicApplicantVisaType: this.filteredvisatype,
        listDynamicApplicantformControl: this.filtered,
        ApplicantID: this.applicantidf,
        type: 'S',
        projectid: this.projectid,
        userid: this.uid
      };
      if (this.setPermissionFlag !== 'View') {
        this.assessmentFormService.saveApplicantDetails(fvm).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
          if (data.flag) {
            this.cd.markForCheck();
            this.loadService.loadme = false;
            this.mservice.generateMessage('SUCCESS', '', data.message);
            //this.GetSectionPendingformdata('F');
            this.divformadd = false;
            this.divformlist = true;
          } else {
            this.loadService.loadme = false;
            this.mservice.generateMessage('ERROR', '', data.message);
          }
          //this.router.navigate(['/user/review-form/' + this.encdec.encryptSensitiveV1('View') + '/', this.encdec.encryptSensitiveV1(this.applicantidf), this.encdec.encryptSensitiveV1(this.productidf)]);
        });
      } else {
        // this.router.navigate(['/user/review-form/' + this.encdec.encryptSensitiveV1('View') + '/', this.encdec.encryptSensitiveV1(this.applicantidf), this.encdec.encryptSensitiveV1(this.productidf)]);
      }

    }
  }
  getReviewForm() {
    this.rform.getNewIDandData();
  }
  GetSectionPendingformdata(type) {
    const productidf = this.productidf;
    const sectionidf = this.sectionidf;
    const applicantidf = this.applicantidf;
    const isform = this.isform;
    const payload = {
      productidf,
      applicantidf,
      isform,
      sectionidf
    };
    this.assessmentFormService.getApplicantSectionPendingControlData(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.ngformdata = data.outdata;
      //this.listDynamicApplicantVisaType = this.ngformdata.listDynamicApplicantVisaType;
      this.listDynamicApplicantformControl = this.ngformdata.listDynamicApplicantformControl;
      this.checkfinallist = this.listDynamicApplicantformControl;
      this.listsectionmultiplecontrol = this.ngformdata._listmultiplesectioncontrol;

      this.listfBindControlField = this.ngformdata._listfcontrolbindfromfield;
      this.listDynamicApplicantControlOption = this.ngformdata.listDynamicApplicantControlOption;
      this.listDynamicApplicantControlOptionCascade = this.ngformdata.listDynamicApplicantControlOption;
      this.ngIFConditions = this.ngformdata._ControlIFcondtionmapping;
      this.ngDOConditions = this.ngformdata._ControlDOconditionmapping;

      this.pagedItems = this.ngformdata.listDynamicApplicantVisaType.filter(val => {
        return val.sectionparentidf === 0;
      });

      for (var i = 0; i < this.pagedItems.length; i++) {
        this.pagedItems[i].rowNumber = i + 1;
      }

      for (var i = 0; i < this.listDynamicApplicantVisaType.length; i++) {
        this.listDynamicApplicantVisaType[i].multiplesec = false;
      }

      for (var i = 0; i < this.listsectionmultiplecontrol.length; i++) {
        this.listDynamicApplicantformControl.push(this.listsectionmultiplecontrol[i]);
      }

      for (var k = 0; k < this.listDynamicApplicantformControl.length; k++) {
        this.listDynamicApplicantformControl[k].fcontrolyear = [];
        if (this.listDynamicApplicantformControl[k].isdateyearvalidation == true) {
          var currentYear = new Date().getFullYear();
          let tmpyear = [];
          var minyear = currentYear + parseInt(this.listDynamicApplicantformControl[k].minyear);
          var maxyear = currentYear + parseInt(this.listDynamicApplicantformControl[k].maxyear);
          if (maxyear == 0) { maxyear = currentYear; }
          if (minyear == 0) { minyear = currentYear; }
          var start = 0, end = 0;
          if (minyear < maxyear) {
            start = minyear;
            end = maxyear;
          }
          else {
            start = maxyear;
            end = minyear;
          }
          for (var i = start; i <= end; i++) {
            tmpyear.push(i);
          }
          for (var j = 0; j < tmpyear.length; j++) {
            this.fcontryearlist.push({
              formcontrolidf: this.listDynamicApplicantformControl[k].formcontrolid,
              controloptiontext: tmpyear[j],
            });
          }
        }
      }
      //if (type != 'S') {
      //setTimeout(function () {
      this.MultipleControlvalue = this.ngformdata._listmultiplesectioncontrolvalue;
      for (var u = 0; u < this.listDynamicApplicantformControl.length; u++) {
        this.ApplyCondition(this.listDynamicApplicantformControl[u], '0');
      }

      // this.totalItems = this.pagedItems.length;
      this.MultipleSectionList = this.ngformdata._listMultipleSection;
      this.rownumber = this.MultipleSectionList.length;

      this.FinalMultipleControllist = this.MultipleControlvalue;
      //  $rootScope.loading = false;
      this.divSectiondisplayList = true;
      if (isPlatformBrowser(this._platformId)) {
        setTimeout(() => {
          //jsload();

          $('[data-toggle="tooltip"]').tooltip();
        }, 100);
      }


      if (type == 'P') {

        this.OpenUploaddocument();
        if (isPlatformBrowser(this._platformId)) {
          if (this.DocumentList.length > 0) {
            $('#modeldocumentupload').modal('toggle');
          }
        }

      } else if (type == 'D') {
        this.OpenUploaddocument();
        this.ViewDocument(parseInt(this.docid, 10), 0);
      } else if (type == 'M') {
        this.OpenUploaddocument();
        //this.ViewDocument(parseInt(this.docid));
      } else if (type == 'F') {
        this.GetPendingFormData();
      }
      this.cd.markForCheck();
    });
  }
  GetPendingFormData() {
    const productidf = this.productidf;
    const sectionidf = this.sectionidf;
    const applicantidf = this.applicantidf;
    const isform = this.isform;

    this.pendingquestioncontrols = [];
    this.pendingquestioncontrolslist = [];

    this.pendingquestion = [];

    this.pendingmultiplequestioncontrols = [];
    this.pendingmultiplequestioncontrolslist = [];

    this.pendingmultiplequestion = [];

    this.multiplecontrollist = this.listDynamicApplicantformControl.filter(value => {
      return value.ismultiple === true && value.controltypeidf !== 15;
    });

    this.BlankSectionListMultiple = [];
    for (var i = 0; i < this.multiplecontrollist.length; i++) {
      this.getFillControlList = this.MultipleControlvalue.filter(value => {
        return value.formcontrolid == this.multiplecontrollist[i].formcontrolid && (value.controlvalue != '' && value.controlvalue != null);
      });

      if (this.getFillControlList.length <= 0) {
        this.checkduplidatesection = this.BlankSectionListMultiple.filter(value => {
          return value.sectionidf === this.multiplecontrollist[i].sectionidf;
        });

        if (this.checkduplidatesection.length <= 0) {
          this.BlankSectionListMultiple.push({
            sectionidf: this.multiplecontrollist[i].sectionidf
          });
        }
      }
    }
    this.PendingMultipleSectionList = [];
    if (this.BlankSectionListMultiple.length > 0) {
      for (var i = 0; i < this.BlankSectionListMultiple.length; i++) {
        this.PendingMultipleSectionList1 = this.MultipleSectionList.filter(value => {
          return value.sectionidf === this.BlankSectionListMultiple[i].sectionidf;
        });

        if (this.PendingMultipleSectionList1.length <= 0) {
          this.PendingMultipleSectionList.push({
            sectionidf: this.BlankSectionListMultiple[i].sectionidf,
            rownumber: 0,
          });
        } else {
          this.PendingMultipleSectionList.push(this.PendingMultipleSectionList1[0]);
        }

      }
    }

    this.pendingmultiplequestioncontrols = this.FinalMultipleControllist.filter(value => {
      return value.isshowhide === 0 && (value.controlvalue === '' || value.controlvalue === null) && value.rownumber === 0;
    });

    this.pendingquestioncontrols = this.listDynamicApplicantformControl.filter(value => {
      return value.isshowhide === 0 && (value.controlvalue === '' || value.controlvalue === null); //&& value.ismultiple == false;
    });

    this.pendingquestioncontrols = this.pendingquestioncontrols.filter(value => {
      return value.controltypeidf !== 7 && value.controltypeidf !== 15;
    });

    for (var i = 0; i < this.pendingquestioncontrols.length; i++) {
      this.pendingsectionsfilter = [];

      var checksectionidf = this.pendingquestioncontrols[i].sectionidf;
      var checkvisatypesectionmapid = this.pendingquestioncontrols[i].visatypesectionmapid;

      this.pendingquestioncontrolslist = this.checkfinallist.filter(value => {
        return value.controltypeidf === 15 && value.isshowhide === 0 && value.sectionidf === checksectionidf;
      });

      if (this.pendingquestioncontrolslist.length > 0) {
        this.checkSection = this.pendingquestion.filter(value => {
          return value.formcontrolidf === this.pendingquestioncontrolslist[0].formcontrolidf;
        });

        if (this.checkSection.length <= 0) {
          this.pendingquestion.push(this.pendingquestioncontrolslist[0]);
        }
      }
      this.pendingquestion.push(this.pendingquestioncontrols[i]);
    }

    this.tmppendingMainsectionslist = [];
    this.pendingsections = [];
    for (var i = 0; i < this.pendingquestion.length; i++) {
      this.pendingsections.length = 0;
      this.pendingsections = [];

      this.pendingsections = this.listDynamicApplicantVisaType.filter(value => {
        return value.sectionidf === this.pendingquestion[i].sectionidf && value.isshowhide === 0;
      });

      this.checkSectionvalue = this.tmppendingMainsectionslist.filter(value => {
        return value.sectionidf === this.pendingquestion[i].sectionidf;
      });
      if (this.checkSectionvalue.length <= 0) {
        if (this.pendingsections[0] != undefined) {
          this.tmppendingMainsectionslist.push(this.pendingsections[0]);
        }
      }
    }
    this.tmppendingMainsectionslist = this.orderByPipe.transform(this.tmppendingMainsectionslist, 'rowNumber');

    this.pendingMainsectionslist = [];
    this.pendingMainsections = [];
    for (var i = 0; i < this.tmppendingMainsectionslist.length; i++) {

      this.pendingMainsections.length = 0;
      this.pendingMainsections = [];


      this.pendingMainsections = this.pagedItems.filter(value => {
        return (value.sectionidf === this.tmppendingMainsectionslist[i].sectionparentidf || value.sectionidf === this.tmppendingMainsectionslist[i].sectionidf) && value.isshowhide === 0;
      });

      this.checkMainSectionvalue = this.pendingMainsectionslist.filter(value => {
        return value.sectionidf === this.tmppendingMainsectionslist[i].sectionparentidf;
      });
      if (this.checkMainSectionvalue.length <= 0) {
        if (this.pendingMainsections.length > 0) {
          this.pendingMainsectionslist.push(this.pendingMainsections[0]);
        }
      }
      //this.pagedItems                    
    }
    this.pendingMainsectionslist = this.orderByPipe.transform(this.pendingMainsectionslist, 'rowNumber');
    this.pendingsectionslist = [];
    this.pendingsectionslist.length = 0;


    if (this.PendingMultipleSectionList.length > 0) {
      for (var i = 0; i < this.tmppendingMainsectionslist.length; i++) {
        if (this.tmppendingMainsectionslist[i].ismultiple == true) {

          this.checkmultiplesectionlist = this.PendingMultipleSectionList.filter(value => {
            return value.sectionidf === this.tmppendingMainsectionslist[i].sectionidf;
          });
          if (this.checkmultiplesectionlist.length > 0) {
            this.pendingsectionslist.push(this.tmppendingMainsectionslist[i]);
          }
        } else {
          this.pendingsectionslist.push(this.tmppendingMainsectionslist[i]);
        }
      }
    } else {
      //this.pendingsectionslist.push(this.tmppendingMainsectionslist);
      this.pendingsectionslist = this.tmppendingMainsectionslist;
    }


    if (this.MultipleControlvalue.length > 0) {
      for (var i = 0; i < this.MultipleControlvalue.length; i++) {
        var whatIndex = null;
        for (let k = 0; k < this.pendingsectionslist.length; k++) {
          if (this.pendingsectionslist[k].sectionidf === this.MultipleControlvalue[i].sectionidf
            && this.pendingsectionslist[k].sectionparentidf === this.MultipleControlvalue[i].sectionparentidf) {
            whatIndex = k;
          }
        }

        if (whatIndex != null) {
          this.pendingsectionslist.splice(whatIndex, 1);
        }
      }
    }

    if (this.MultipleControlvalue.length > 0) {
      for (var i = 0; i < this.MultipleControlvalue.length; i++) {
        var whatIndex = null;

        for (let k = 0; k < this.pendingquestion.length; k++) {
          if (this.pendingquestion[k].sectionidf === this.MultipleControlvalue[i].sectionidf
            && this.pendingquestion[k].sectionparentidf === this.MultipleControlvalue[i].sectionparentidf) {
            whatIndex = k;
          }
        }

        if (whatIndex != null) {
          this.pendingquestion.splice(whatIndex, 1);
        }
      }
    }

    if (this.pendingquestion.length > 0) {
      this.pendingrequiredmultiplecontrol = [];
      var list1 = this.pendingquestion.filter(value => {
        return value.ismultiple === true;
      });

      for (var i = 0; i < this.pendingquestion.length; i++) {
        for (var j = 0; j < list1.length; j++) {

          if (list1[j].formcontrolid == this.pendingquestion[i].formcontrolid) {
            this.pendingrequiredmultiplecontrol.push({
              formcontrolid: list1[j].formcontrolid,
              isrequired: this.pendingquestion[i].isrequired,
              sectionidf: this.pendingquestion[i].sectionidf
            });
            this.pendingquestion[i].isrequired = false;
          }
        }
      }
      if (isPlatformBrowser(this._platformId)) {
        $('#modelpendingControls').modal('show');
      }
      //this.getAgent();

    }
    if (isPlatformBrowser(this._platformId)) {
      setTimeout(() => {
        $('[data-toggle="tooltip"]').tooltip();
      }, 100);
    }

  }
  ViewDocument(docid, rownumber) {
    if (docid != null) {
      if (isPlatformBrowser(this._platformId)) {
        if (rownumber != 0) {
          $('#btn' + docid + '' + rownumber).hide();
        }

        const selectdocument = this.SectionDocumentList.filter(val => {
          return val.formcontrolid === parseInt(docid, 10);
        });

        if (selectdocument.length > 0) {
          this.filepath = selectdocument[0].filepath;
          $('#iframedocument').attr('src', this.filepath);
        }
        this.BindDocumentList = this.SectionDocumentList.filter(val => {
          return val.formcontrolid === parseInt(docid, 10);
        });
        if (this.BindDocumentList.length > 0) {
          this.BindMultipleDocumentList = [];
          this.docid = this.BindDocumentList[0].formcontrolid.toString();
        } else {
          this.BindMultipleDocumentList = this.tmpBindMultipleDocumentList.filter(val => {
            return val.formcontrolid === parseInt(docid) && val.rownumber === rownumber
          });
          if (this.BindMultipleDocumentList.length > 0) {
            this.filepath = this.BindMultipleDocumentList[0].filepath;
            $('#iframedocument').attr('src', this.filepath);
          }
          this.docid = 0;
        }
      }



    }
    this.divViewDocument = true;
    this.divCancelDocument = true;
  }
  SaveApplicantData(sectionid, applicantid) {
    this.filtered = this.listDynamicApplicantformControl.filter(val => {
      return val.sectionidf === sectionid || val.sectionparentidf === sectionid;
    });

    this.filtered = this.filtered.filter(val => {
      return val.ismultiple === false;
    });
    this.filteredvisatype = this.listDynamicApplicantVisaType.filter(val => {
      return val.sectionidf === sectionid || val.sectionparentidf === sectionid;
    });

    // for setting value of textEditor
    for (let j = 0; j < this.filtered.length; j++) {
      if (isPlatformBrowser(this._platformId)) {
        if (this.filtered[j].ControlTypeName == 'texteditor') {
          let id = '#cntrl_' + this.filtered[j].formcontrolid;
          this.filtered[j].controlvalue = $(id).summernote('code');
        }
      }

    }
    const email = (localStorage.getItem('socialtoken')) ? jwt_decode(localStorage.getItem('socialtoken')).email : '';
    var fvm = {
      listDynamicApplicantVisaType: this.filteredvisatype,
      listDynamicApplicantformControl: this.filtered,
      ApplicantID: parseInt(applicantid),
      type: 'S',
      projectid: this.projectid,
      userid: this.uid,
      editedby: (this.userdata) ? this.userdata.email : (email) ? email : ''
    };
    if (this.setPermissionFlag != 'View') {
      this.assessmentFormService.saveApplicantDetails(fvm).pipe(takeUntil(this.componentDestroyed$)).subscribe(msg => {
        if (msg.flag) {
          this.loadService.loadme = false;
          this.mservice.generateMessage('SUCCESS', '', msg.message);
          this.GetSectionformdata("P");
          this.cd.markForCheck();
        } else {
          this.loadService.loadme = false;
          this.mservice.generateMessage('ERROR', '', msg.message);
        }
      })
    } else {
      this.GetSectionformdata("P");
    }
    // }
  }
  ApplyCondition(ngControltmp, callfrom) {
    try {
      this.sectionlist2 = [];

      this.ngCascasefield = this.listDynamicApplicantformControl.filter(val => { return val.cascadeidf === ngControltmp.formcontrolid });
      if (this.ngCascasefield.length > 0) {
        for (let c = 0; c < this.ngCascasefield.length; c++) {
          for (let q = this.listDynamicApplicantControlOptionCascade.length - 1; q >= 0; q--) {
            if (this.listDynamicApplicantControlOptionCascade[q].formcontrolid === this.ngCascasefield[c].formcontrolid) {
              this.listDynamicApplicantControlOptionCascade.splice(q, 1);
            }
          }
          this.tmpngCascadedata = this.ngCascadedata.filter(val => { return val.cascadename === ngControltmp.controlvalue });
          if (this.tmpngCascadedata.length > 0) {
            for (let b = 0; b < this.tmpngCascadedata.length; b++) {
              this.listDynamicApplicantControlOptionCascade.push({
                controloptionid: 0,
                formcontrolid: this.ngCascasefield[c].formcontrolid,
                helpblock: '',
                isconditional: false,
                optiontext: this.tmpngCascadedata[b].name,
                optionvalue: this.tmpngCascadedata[b].id,
                productidf: this.productidf,
                sectionidf: 0,
                sectionparentidf: 0,
                visatypesectionmapid: 0
              });
            }
            // this.cd.detectChanges();
            this.updatedDate = new Date();
          }
        }
        // this.ngCascadedata
      }

      if (ngControltmp.iscascade === true) {
        var cascadeidf = ngControltmp.cascadeidf;
      }

      if (ngControltmp.ControlTypeName === 'text') {
        if (ngControltmp.textcasename === 'UpperCase') {
          ngControltmp.controlvalue = String(ngControltmp.controlvalue).toUpperCase();
        } else if (ngControltmp.textcasename === 'LowerCase') {
          ngControltmp.controlvalue = String(ngControltmp.controlvalue).toLowerCase();
        }
      }
      if (callfrom === '1') {
        if (ngControltmp.isskip === true) {
          if (ngControltmp.controlvalue === '' || ngControltmp.controlvalue === null) {
            ngControltmp.skipquestiontext = 'Fill Later';
          } else {
            ngControltmp.skipquestiontext = '';
          }
          if (isPlatformBrowser(this._platformId)) {
            setTimeout(() => {
              $("#cntrl_" + ngControltmp.formcontrolid).focus();
            }, 10);
          }

        } else {
          ngControltmp.skipquestiontext = '';
        }
      }
      if (ngControltmp.ControlTypeName === 'datetime') {
        let date = '';
        let month = '';
        let year = '';
        if (ngControltmp.date !== null) {
          if (ngControltmp.date === 'Date') {
            date = '';
          } else {
            date = ngControltmp.date;
          }
        }
        if (ngControltmp.month !== null) {
          if (ngControltmp.month === 'Month') {
            month = '';
          } else {
            month = ngControltmp.month;
          }
        }
        if (ngControltmp.year !== null) {
          if (ngControltmp.year === 'Year') {
            year = '';
          } else {
            year = ngControltmp.year;
          }
        }
        // alert(date);
        if (date === '' && month === '' && year === '') {
          ngControltmp.controlvalue = '';
        } else {
          ngControltmp.controlvalue = date + '-' + month + '-' + year;
        }
      }
      this.ngCopyValueList = this.listDynamicApplicantformControl.filter(val => { return val.copyvaluefromfield == ngControltmp.formcontrolid });

      if (this.ngCopyValueList.length > 0) {
        for (let i = 0; i < this.ngCopyValueList.length; i++) {
          this.listDynamicApplicantformControl.filter((item) => {
            return item.formcontrolid === this.ngCopyValueList[i].formcontrolid;
          })[0].controlvalue = ngControltmp.controlvalue;

          // Cascading values from copy value
          this.ngCascasefield = this.listDynamicApplicantformControl.filter(val => { return val.cascadeidf === this.ngCopyValueList[i].formcontrolid });
          if (this.ngCascasefield.length > 0) {
            for (let c = 0; c < this.ngCascasefield.length; c++) {
              for (let q = this.listDynamicApplicantControlOptionCascade.length - 1; q >= 0; q--) {
                if (this.listDynamicApplicantControlOptionCascade[q].formcontrolid === this.ngCascasefield[c].formcontrolid) {
                  this.listDynamicApplicantControlOptionCascade.splice(q, 1);
                }
              }
              this.tmpngCascadedata = this.ngCascadedata.filter(val => { return val.cascadename === ngControltmp.controlvalue });

              if (this.tmpngCascadedata.length > 0) {
                for (let b = 0; b < this.tmpngCascadedata.length; b++) {
                  this.listDynamicApplicantControlOptionCascade.push({
                    controloptionid: 0,
                    formcontrolid: this.ngCascasefield[c].formcontrolid,
                    helpblock: '',
                    isconditional: false,
                    optiontext: this.tmpngCascadedata[b].name,
                    optionvalue: this.tmpngCascadedata[b].id,
                    productidf: this.productidf,
                    sectionidf: 0,
                    sectionparentidf: 0,
                    visatypesectionmapid: 0
                  });
                }
              }
            }
          }

          this.listDynamicApplicantformControl.filter((item) => {
            return item.formcontrolid === this.ngCopyValueList[i].formcontrolid;
          })[0].date = ngControltmp.date;

          this.listDynamicApplicantformControl.filter((item) => {
            return item.formcontrolid === this.ngCopyValueList[i].formcontrolid;
          })[0].month = ngControltmp.month;
          this.listDynamicApplicantformControl.filter((item) => {
            return item.formcontrolid === this.ngCopyValueList[i].formcontrolid;
          })[0].year = ngControltmp.year;

          this.listDynamicApplicantformControl.filter((item) => {
            return item.formcontrolid === this.ngCopyValueList[i].formcontrolid;
          })[0].countrycode = ngControltmp.countrycode;

          this.listDynamicApplicantformControl.filter((item) => {
            return item.formcontrolid === this.ngCopyValueList[i].formcontrolid;
          })[0].areacode = ngControltmp.areacode;

          this.listDynamicApplicantformControl.filter((item) => {
            return item.formcontrolid === this.ngCopyValueList[i].formcontrolid;
          })[0].phonenumber = ngControltmp.phonenumber;

        }
      }

      if (this.listfBindControlField.length > 0) {
        this.ngCheckbindvalue = this.listfBindControlField.filter(val => { return val.bindfromcontrolidf === ngControltmp.formcontrolid });
        this.ngCheckbindvalue1 = this.listfBindControlField.filter(val => { return val.bindconcatecontrolidf1 === ngControltmp.formcontrolid });
        this.ngCheckbindvalue2 = this.listfBindControlField.filter(val => { return val.bindconcatecontrolidf2 === ngControltmp.formcontrolid });
        this.ngCheckbindvalue3 = this.listfBindControlField.filter(val => { return val.bindconcatecontrolidf3 === ngControltmp.formcontrolid });


        if (this.ngCheckbindvalue.length <= 0) {
          if (this.ngCheckbindvalue1.length > 0) {
            this.ngCheckbindvalue.push(this.ngCheckbindvalue1);
          } else if (this.ngCheckbindvalue2.length > 0) {
            this.ngCheckbindvalue.push(this.ngCheckbindvalue2);
          } else if (this.ngCheckbindvalue3.length > 0) {
            this.ngCheckbindvalue.push(this.ngCheckbindvalue3);
          }
        }

        if (this.ngCheckbindvalue.length > 0) {
          for (let i = 0; i < this.ngCheckbindvalue.length; i++) {
            this.nglistbindcontrol = this.listfBindControlField.filter(val => { return val.formcontrolidf === this.ngCheckbindvalue[i].formcontrolidf });

            for (let k = 0; k < this.nglistbindcontrol.length; k++) {

              if (this.listBindValuefromfields.length > 0) {
                let whatIndex = null;
                for (let b = 0; b < this.listBindValuefromfields.length; b++) {
                  if (this.listBindValuefromfields[b].formcontrolid === this.ngCheckbindvalue[i].formcontrolidf
                    && this.listBindValuefromfields[b].bindfromcontrolidf === this.nglistbindcontrol[k].bindfromcontrolidf
                    && this.listBindValuefromfields[b].bindconcatecontrolidf1 === this.nglistbindcontrol[k].bindconcatecontrolidf1
                    && this.listBindValuefromfields[b].bindconcatecontrolidf2 === this.nglistbindcontrol[k].bindconcatecontrolidf2
                    && this.listBindValuefromfields[b].bindconcatecontrolidf3 === this.nglistbindcontrol[k].bindconcatecontrolidf3) {
                    whatIndex = b;
                  }
                }


                if (whatIndex != null) {
                  this.listBindValuefromfields.splice(whatIndex, 1);
                  whatIndex = null;
                  for (let b = 0; b < this.listBindValuefromfields.length; b++) {
                    if (this.listBindValuefromfields[b].formcontrolid === this.ngCheckbindvalue[i].formcontrolidf
                      && this.listBindValuefromfields[b].bindfromcontrolidf === this.nglistbindcontrol[k].bindfromcontrolidf
                      && this.listBindValuefromfields[b].bindconcatecontrolidf1 === this.nglistbindcontrol[k].bindconcatecontrolidf1
                      && this.listBindValuefromfields[b].bindconcatecontrolidf2 === this.nglistbindcontrol[k].bindconcatecontrolidf2
                      && this.listBindValuefromfields[b].bindconcatecontrolidf3 === this.nglistbindcontrol[k].bindconcatecontrolidf3) {
                      whatIndex = b;
                    }
                  }

                  if (whatIndex != null) {
                    this.listBindValuefromfields.splice(whatIndex, 1);
                  }

                  whatIndex = null;
                  for (let b = 0; b < this.listBindValuefromfields.length; b++) {
                    if (this.listBindValuefromfields[b].formcontrolid === this.ngCheckbindvalue[i].formcontrolidf
                      && this.listBindValuefromfields[b].bindfromcontrolidf === this.nglistbindcontrol[k].bindfromcontrolidf
                      && this.listBindValuefromfields[b].bindconcatecontrolidf1 === this.nglistbindcontrol[k].bindconcatecontrolidf1
                      && this.listBindValuefromfields[b].bindconcatecontrolidf2 === this.nglistbindcontrol[k].bindconcatecontrolidf2
                      && this.listBindValuefromfields[b].bindconcatecontrolidf3 === this.nglistbindcontrol[k].bindconcatecontrolidf3) {
                      whatIndex = b;
                    }
                  }
                  if (whatIndex != null) {
                    this.listBindValuefromfields.splice(whatIndex, 1);
                  }
                }
              }

              let spearator = '';
              spearator = this.nglistbindcontrol[k].bindbetweenseparator;
              let bindcnt = 0;
              if (this.nglistbindcontrol[k].bindfromcontrolidf > 0) {
                this.ngcheckbindmultiple1 = this.MultipleControlvalue.filter(val => { return val.formcontrolid === this.nglistbindcontrol[k].bindfromcontrolidf });

                if (this.ngcheckbindmultiple1.length > 0) {
                  bindcnt = 1;
                }
              }

              if (this.nglistbindcontrol[k].bindconcatecontrolidf1 > 0) {
                this.ngcheckbindmultiple2 = this.MultipleControlvalue.filter(val => { return val.formcontrolid === this.nglistbindcontrol[k].bindconcatecontrolidf1 });
                if (this.ngcheckbindmultiple2.length > 0) {
                  bindcnt = 1;
                }
              }

              if (this.nglistbindcontrol[k].bindconcatecontrolidf2 > 0) {
                this.ngcheckbindmultiple3 = this.MultipleControlvalue.filter(val => { return val.formcontrolid === this.nglistbindcontrol[k].bindconcatecontrolidf2 });
                if (this.ngcheckbindmultiple3.length > 0) {
                  bindcnt = 1;
                }
              }

              if (this.nglistbindcontrol[k].bindconcatecontrolidf3 > 0) {
                this.ngcheckbindmultiple4 = this.MultipleControlvalue.filter(val => { return val.formcontrolid === this.nglistbindcontrol[k].bindconcatecontrolidf3 });
                if (this.ngcheckbindmultiple4.length > 0) {
                  bindcnt = 1;
                }
              }

              if (bindcnt == 1) {
                for (let o = 0; o < 5; o++) {
                  let text = '';
                  let text1 = '';
                  let text2 = '';
                  let text3 = '';

                  if (this.ngcheckbindmultiple1 !== null) {
                    if (this.ngcheckbindmultiple1.length - 1 >= o) {
                      text = this.ngcheckbindmultiple1[o].controlvalue;
                    }
                  }
                  if (this.ngcheckbindmultiple2 !== null) {
                    if (this.ngcheckbindmultiple2.length - 1 >= o) {
                      text1 = this.ngcheckbindmultiple2[o].controlvalue;
                    }
                  }
                  if (this.ngcheckbindmultiple3 !== null) {
                    if (this.ngcheckbindmultiple3.length - 1 >= o) {
                      text2 = this.ngcheckbindmultiple3[o].controlvalue;
                    }
                  }
                  if (this.ngcheckbindmultiple4 !== null) {
                    if (this.ngcheckbindmultiple4.length - 1 >= o) {
                      text3 = this.ngcheckbindmultiple4[o].controlvalue;
                    }
                  }
                  let Bindtext = '';
                  Bindtext = text;
                  if (text1 != '') {
                    if (Bindtext != '') {
                      Bindtext = Bindtext + spearator;
                    }
                    Bindtext = Bindtext + ' ' + text1;
                  }
                  if (text2 != '') {
                    if (Bindtext != '') {
                      Bindtext = Bindtext + spearator;
                    }
                    Bindtext = Bindtext + ' ' + text2;
                  }
                  if (text3 != '') {
                    if (Bindtext != '') {
                      Bindtext = Bindtext + spearator;
                    }
                    Bindtext = Bindtext + ' ' + text3;
                  }

                  if (Bindtext !== null && Bindtext.trim() !== '') {
                    const data = {
                      formcontrolid: this.ngCheckbindvalue[i].formcontrolidf,
                      optiontext: Bindtext,
                      bindfromcontrolidf: this.nglistbindcontrol[k].bindfromcontrolidf,
                      bindconcatecontrolidf1: this.nglistbindcontrol[k].bindconcatecontrolidf1,
                      bindconcatecontrolidf2: this.nglistbindcontrol[k].bindconcatecontrolidf2,
                      bindconcatecontrolidf3: this.nglistbindcontrol[k].bindconcatecontrolidf3,
                    }

                    this.listBindValuefromfields.push(data);
                  }
                }
              } else {
                let text = '';
                if (this.nglistbindcontrol[k].bindfromcontrolidf > 0) {
                  text = this.listDynamicApplicantformControl.filter((item) => {
                    return item.formcontrolid === this.nglistbindcontrol[k].bindfromcontrolidf;
                  })[0].controlvalue;
                }

                let text1 = '';
                if (this.nglistbindcontrol[k].bindconcatecontrolidf1 > 0) {
                  text1 = this.listDynamicApplicantformControl.filter((item) => {
                    return item.formcontrolid === this.nglistbindcontrol[k].bindconcatecontrolidf1;
                  })[0].controlvalue;
                }
                let text2 = '';
                if (this.nglistbindcontrol[k].bindconcatecontrolidf2 > 0) {
                  text2 = this.listDynamicApplicantformControl.filter((item) => {
                    return item.formcontrolid === this.nglistbindcontrol[k].bindconcatecontrolidf2;
                  })[0].controlvalue;
                }
                let text3 = '';
                if (this.nglistbindcontrol[k].bindconcatecontrolidf3 > 0) {
                  text3 = this.listDynamicApplicantformControl.filter((item) => {
                    return item.formcontrolid === this.nglistbindcontrol[k].bindconcatecontrolidf3;
                  })[0].controlvalue;
                }

                let Bindtext = '';
                Bindtext = text;
                if (text1 != '') {
                  if (Bindtext != '') {
                    Bindtext = Bindtext + spearator;
                  }
                  Bindtext = Bindtext + ' ' + text1;
                }
                if (text2 != '') {
                  if (Bindtext != '') {
                    Bindtext = Bindtext + spearator;
                  }
                  Bindtext = Bindtext + ' ' + text2;
                }
                if (text3 != '') {
                  if (Bindtext != '') {
                    Bindtext = Bindtext + spearator;
                  }
                  Bindtext = Bindtext + ' ' + text3;
                }

                if (Bindtext !== null && Bindtext.trim() !== '') {
                  const data = {
                    formcontrolid: this.ngCheckbindvalue[i].formcontrolidf,
                    optiontext: Bindtext,
                    bindfromcontrolidf: this.nglistbindcontrol[k].bindfromcontrolidf,
                    bindconcatecontrolidf1: this.nglistbindcontrol[k].bindconcatecontrolidf1,
                    bindconcatecontrolidf2: this.nglistbindcontrol[k].bindconcatecontrolidf2,
                    bindconcatecontrolidf3: this.nglistbindcontrol[k].bindconcatecontrolidf3,
                  }

                  this.listBindValuefromfields.push(data);
                }
              }
            }

          }
        }
      }

      if (ngControltmp.ControlTypeName === 'phonenumber') {
        let countrycode = '';
        let areacode = '';
        let phonenumber = '';
        if (ngControltmp.countrycode !== null) {
          countrycode = ngControltmp.countrycode;
        }
        if (ngControltmp.areacode !== null) {
          areacode = ngControltmp.areacode;
        }
        if (ngControltmp.phonenumber !== null) {
          phonenumber = ngControltmp.phonenumber;
        }
        if (ngControltmp.countrycode !== null && ngControltmp.areacode !== null && ngControltmp.phonenumber !== null) {
          // ngControltmp.isrequired == false;
          this.listDynamicApplicantformControl.filter((item) => {
            return item.formcontrolid === ngControltmp.formcontrolid;
          })[0].isrequired = false;
        }
        if (countrycode === '' && areacode === '' && phonenumber === '') {
          ngControltmp.controlvalue = '';
        }
        else {
          ngControltmp.controlvalue = countrycode + '-' + areacode + '-' + phonenumber;
        }

      }

      if (ngControltmp.ControlTypeName === 'mobilenumber') {
        let countrycode = '';
        let phonenumber = '';
        if (ngControltmp.countrycode !== null) {
          countrycode = ngControltmp.countrycode;
        }
        if (ngControltmp.phonenumber !== null) {
          phonenumber = ngControltmp.phonenumber;
        }
        if (countrycode === '' && phonenumber === '') {
          ngControltmp.controlvalue = '';
        }
        else {
          ngControltmp.controlvalue = countrycode + '-' + phonenumber;
        }
      }
      this.ngIFTmp = this.ngIFConditions.filter(val => { return val.sourcecontrolidf === ngControltmp.formcontrolid });
      this.ngIFTmpTarget = this.ngIFConditions.filter(val => { return val.targetcontrolidf === ngControltmp.formcontrolid });
      this.ngAndOrControlList = [];
      let sourcecontrolid = 0;
      let targetcontrolid = 0;
      let strAndCondition = '';
      let strORCondition = '';
      let isAndORCondition = 0;
      let strconditionjoin = '';
      var strAppendcondition = '';

      for (let k = 0; k < this.ngIFTmpTarget.length; k++) {
        this.ngIFControlList = this.ngIFConditions.filter(val => { return val.formcontrolmapidf === this.ngIFTmpTarget[k].formcontrolmapidf });
        this.ngDOControlList = this.ngDOConditions.filter(val => { return val.formcontrolmapidf === this.ngIFTmpTarget[k].formcontrolmapidf });

        isAndORCondition = 0;
        strAppendcondition = '';
        strAndCondition = '';
        for (let p = 0; p < this.ngIFControlList.length; p++) {

          if (this.ngIFControlList[p].controljoinopt === 'AND') {
            strAppendcondition = ' && ';
          } else if (this.ngIFControlList[p].controljoinopt === 'OR') {
            strAppendcondition = ' ) || ( ';
          } else {
            strAppendcondition = ')';
          }
          if (this.ngIFControlList[p].controljoinopt !== '') {
            isAndORCondition = 1;
          }

          if (isAndORCondition === 1) {
            this.ngAndOrControlList = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngIFControlList[p].sourcecontrolidf });
          }

          if (this.ngIFControlList[p].target === 2) {
            this.ngCompareControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngIFTmpTarget[p].sourcecontrolidf });

            if (this.ngCompareControl.length > 0) {
              let controltypename = ngControltmp.ControlTypeName;
              let controlconditionvalue = ngControltmp.controlvalue;
              if (isAndORCondition === 1) {
                controltypename = this.ngAndOrControlList[0].ControlTypeName;
                controlconditionvalue = this.ngAndOrControlList[0].controlvalue;
              }
              if (controltypename === 'datetime') {
                let ifdate = controlconditionvalue;
                let targetdays = this.ngIFTmpTarget[p].targetdays;
                let targetbetweendays = this.ngIFTmpTarget[p].targetbetweendays;
                let targetbetweenvalue = this.ngIFTmpTarget[p].targetbetweenvalue;
                let ConditionStateName = this.ngIFTmpTarget[p].ConditionStateName;
                let targetvalue = this.ngCompareControl[0].controlvalue;
                let target = this.ngIFControlList[p].target;

                let payload = {
                  ifdate,
                  targetdays,
                  targetbetweendays,
                  targetbetweenvalue,
                  ConditionStateName,
                  targetvalue,
                  target
                }
                this.assessmentFormService.CheckDateCondition(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(msg => {
                  if (isPlatformBrowser(this._platformId)) {
                    if (isAndORCondition === 1) {
                      if (msg === '1') {
                        if (strAndCondition === '') {
                          strAndCondition = '(1==1' + strAppendcondition;
                        } else {
                          strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                        }
                      } else {
                        if (strAndCondition === '') {
                          strAndCondition = '(1==2' + strAppendcondition;
                        } else {
                          strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                        }
                      }
                    } else {
                      if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                        if (msg === '1') {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isshowhide = 1;
                        } else {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isshowhide = 0;
                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                        if (msg === '1') {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isshowhide = 0;
                        } else {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isshowhide = 1;
                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                        if (msg === '1') {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isenabledisable = 0;
                        } else {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isenabledisable = 1;
                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                        if (msg === '1') {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isenabledisable = 1;
                        } else {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isenabledisable = 0;
                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                        if (msg === '1') {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isrequired = 1;
                        } else {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isrequired = 0;
                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                        if (msg === '1') {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isrequired = 0;
                        } else {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isrequired = 1;
                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                        if (msg === '1') {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });

                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });

                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                        } else {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });

                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });

                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                        if (msg === '1') {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });

                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });

                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                        } else {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                        if (msg === '1') {
                          let tmpControlvalue = '';
                          this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                          })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                        if (msg === '1') {

                          $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                          $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                          $('#btnConditionDialogSave').show();
                          $('#btnConditionDialogClose').show();

                          $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                          $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                          // $compile($('#btnConditionDialogSave'))(this);

                          $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                          $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                          // $compile($('#btnConditionDialogClose'))(this);

                          //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                          if (callfrom === '1') {
                            $('#divconditionDialog').modal('toggle');
                          }

                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                        if (msg === '1') {
                          $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                          $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                          $('#btnConditionDialogSave').hide();
                          $('#btnConditionDialogClose').show();

                          $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                          $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                          // $compile($('#btnConditionDialogClose'))(this);
                          if (callfrom === '1') {
                            $('#divconditionDialog').modal('toggle');
                          }
                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                        if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                          $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                          $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                          $('#btnConditionDialogSave').hide();
                          $('#btnConditionDialogClose').show();

                          $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                          $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                          // $compile($('#btnConditionDialogClose'))(this);

                          if (callfrom === '1') {
                            $('#divconditionDialog').modal('toggle');
                          }
                        }
                      }
                    }
                  }
                });

              } else if (this.ngIFControlList[p].ConditionStateName === 'Is Equal To') {

                if (isPlatformBrowser(this._platformId)) {
                  if (isAndORCondition === 1) {
                    if (String(this.ngAndOrControlList[0].controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==1' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                      }
                    } else {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==2' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                      }
                    }
                  } else {
                    if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      }
                      else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });

                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }

                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {

                        let tmpControlvalue = '';
                        this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                        })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                      if (ngControltmp.controlvalue.filter(val => { return val === val.toLowerCase }) === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                      if (ngControltmp.controlvalue.filter(val => { return val === val.toLowerCase }) === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                      if (ngControltmp.controlvalue.filter(val => { return val === val.toLowerCase }) === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                }

              } else if (this.ngIFControlList[p].ConditionStateName === 'Less Than') {
                if (isAndORCondition === 1) {
                  if (String(this.ngAndOrControlList[0].controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (isPlatformBrowser(this._platformId)) {

                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                }
              } else if (this.ngIFControlList[p].ConditionStateName === 'Greater Than') {
                if (isAndORCondition === 1) {

                  if (String(this.ngAndOrControlList[0].controlvalue).toLowerCase() > String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                }
              }
              else if (this.ngIFControlList[p].ConditionStateName == 'Is Not Equal To') {
                if (isAndORCondition === 1) {
                  if (String(this.ngAndOrControlList[0].controlvalue).toLowerCase() !== String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                }
              } else if (this.ngIFControlList[p].ConditionStateName == 'Contains') {
                if (isAndORCondition === 1) {

                  if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(this.ngAndOrControlList[0].controlvalue).toLowerCase()) != -1) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {

                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                }
              } else if (this.ngIFControlList[p].ConditionStateName === 'Does not Contain') {
                if (isAndORCondition === 1) {

                  if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(this.ngAndOrControlList[0].controlvalue).toLowerCase())) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {

                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                }
              } else if (this.ngIFControlList[p].ConditionStateName === 'Starts With') {
                if (isAndORCondition === 1) {

                  if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(this.ngAndOrControlList[0].controlvalue).toLowerCase())) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                }
              } else if (this.ngIFControlList[p].ConditionStateName == "Doesn't Start With") {
                if (isAndORCondition === 1) {
                  if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(this.ngAndOrControlList[0].controlvalue).toLowerCase()))) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                }
              } else if (this.ngIFControlList[p].ConditionStateName === 'Ends With') {
                if (isAndORCondition === 1) {
                  if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(this.ngAndOrControlList[0].controlvalue).toLowerCase())) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                }
              } else if (this.ngIFControlList[p].ConditionStateName == 'Doesn\'t End With') {
                if (isAndORCondition === 1) {
                  if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(this.ngAndOrControlList[0].controlvalue).toLowerCase()))) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                }
              } else if (this.ngIFControlList[p].ConditionStateName == 'Is Empty') {
                if (isAndORCondition === 1) {
                  if (this.ngAndOrControlList[0].controlvalue === '') {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (ngControltmp.controlvalue === '') {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (ngControltmp.controlvalue === '') {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (ngControltmp.controlvalue === '') {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (ngControltmp.controlvalue === '') {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (ngControltmp.controlvalue === '') {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (ngControltmp.controlvalue === '') {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (ngControltmp.controlvalue === '') {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (ngControltmp.controlvalue === '') {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (ngControltmp.controlvalue === '') {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (ngControltmp.controlvalue === '') {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (ngControltmp.controlvalue === '') {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (isPlatformBrowser(this._platformId)) {
                      if (ngControltmp.controlvalue === '') {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                }
              }
              this.cd.markForCheck();
            }
          }
        }

        if (isAndORCondition === 1) {
          var stcondition = eval(strAndCondition);
          if (isPlatformBrowser(this._platformId)) {
            if (stcondition == true) {
              if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                for (var i = 0; i < this.listDynamicApplicantformControl.length; i++) {
                  if (this.listDynamicApplicantformControl[i].formcontrolid == this.ngDOControlList[0].targetfieldidf) {
                    this.listDynamicApplicantformControl[i].isshowhide = 1;
                  }
                }
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                })[0].isshowhide = 0;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                })[0].isenabledisable = 0;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                })[0].isenabledisable = 1;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                })[0].isrequired = 1;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                })[0].isrequired = 0;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                if (this.checkSectioncnt.length > 0) {
                  this.listDynamicApplicantVisaType.filter((item) => {
                    return item.sectionidf === this.ngDOControlList[0].sectionidf;
                  })[0].isshowhide = 1;
                }
                this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                if (this.checkMainSectioncnt.length > 0) {
                  this.sectionList.filter((item) => {
                    return item.sectionidf === this.ngDOControlList[0].sectionidf;
                  })[0].isshowhide = 1;
                }
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                if (this.checkSectioncnt.length > 0) {
                  this.listDynamicApplicantVisaType.filter((item) => {
                    return item.sectionidf === this.ngDOControlList[0].sectionidf;
                  })[0].isshowhide = 0;
                }
                this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                if (this.checkMainSectioncnt.length > 0) {
                  this.sectionList.filter((item) => {
                    return item.sectionidf === this.ngDOControlList[0].sectionidf;
                  })[0].isshowhide = 0;
                }
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                let tmpControlvalue = '';
                this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                $('#btnConditionDialogSave').show();
                $('#btnConditionDialogClose').show();

                $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                // $compile($('#btnConditionDialogSave'))(this);

                $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                // $compile($('#btnConditionDialogClose'))(this);

                //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                if (callfrom === '1') {
                  $('#divconditionDialog').modal('toggle');
                }
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                $('#btnConditionDialogSave').hide();
                $('#btnConditionDialogClose').show();

                $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                // $compile($('#btnConditionDialogClose'))(this);

                if (callfrom === '1') {
                  $('#divconditionDialog').modal('toggle');
                }
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                $('#btnConditionDialogSave').hide();
                $('#btnConditionDialogClose').show();

                $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                // $compile($('#btnConditionDialogClose'))(this);

                if (callfrom === '1') {
                  $('#divconditionDialog').modal('toggle');
                }
              }
            } else {
              if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                })[0].isshowhide = 0;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                })[0].isshowhide = 1;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                })[0].isenabledisable = 1;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                })[0].isenabledisable = 0;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                })[0].isrequired = 0;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                })[0].isrequired = 1;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                if (this.checkSectioncnt.length > 0) {
                  this.listDynamicApplicantVisaType.filter((item) => {
                    return item.sectionidf === this.ngDOControlList[0].sectionidf;
                  })[0].isshowhide = 0;
                }
                this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                if (this.checkMainSectioncnt.length > 0) {
                  this.sectionList.filter((item) => {
                    return item.sectionidf === this.ngDOControlList[0].sectionidf;
                  })[0].isshowhide = 0;
                }
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                if (this.checkSectioncnt.length > 0) {
                  this.listDynamicApplicantVisaType.filter((item) => {
                    return item.sectionidf === this.ngDOControlList[0].sectionidf;
                  })[0].isshowhide = 1;
                }
                this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                if (this.checkMainSectioncnt.length > 0) {
                  this.sectionList.filter((item) => {
                    return item.sectionidf === this.ngDOControlList[0].sectionidf;
                  })[0].isshowhide = 1;
                }
              }
            }
          }
        }
      }

      var strAppendcondition = '';
      let ControlisMultiple = 0;
      for (let j = 0; j < this.ngIFTmp.length; j++) {
        this.ngIFControlList = this.ngIFConditions.filter(val => { return val.formcontrolmapidf === this.ngIFTmp[j].formcontrolmapidf });
        this.ngDOControlList = this.ngDOConditions.filter(val => { return val.formcontrolmapidf === this.ngIFTmp[j].formcontrolmapidf });

        isAndORCondition = 0;
        strAppendcondition = '';
        strAndCondition = '';
        ControlisMultiple = 0;
        for (let i = 0; i < this.ngIFControlList.length; i++) {
          ControlisMultiple = 0;
          if (this.ngIFControlList[i].controljoinopt == 'AND') {
            strAppendcondition = ' && ';
          } else if (this.ngIFControlList[i].controljoinopt == 'OR') {
            strAppendcondition = ' ) || ( ';
          } else {
            strAppendcondition = ')';
          }

          if (this.ngIFControlList[i].controljoinopt != '') {
            isAndORCondition = 1;
          }
          this.ngAndOrControlListMultiple = this.MultipleControlvalue.filter(val => { return val.formcontrolid === this.ngIFControlList[i].sourcecontrolidf });
          if (this.ngAndOrControlListMultiple.length > 0) {
            ControlisMultiple = 0;
          }
          if (isAndORCondition === 1) {
            this.ngAndOrControlList = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngIFControlList[i].sourcecontrolidf });
          }
          if (this.ngIFControlList[i].target === 1) {

            let controltypename = ngControltmp.ControlTypeName;
            let controlconditionvalue = ngControltmp.controlvalue;
            if (isAndORCondition === 1) {
              controltypename = this.ngAndOrControlList[0].ControlTypeName;
              controlconditionvalue = this.ngAndOrControlList[0].controlvalue;
            }

            if (controltypename == 'datetime') {
              let ifdate = controlconditionvalue;
              let targetdays = this.ngIFControlList[i].targetdays;
              let targetbetweendays = this.ngIFControlList[i].targetbetweendays;
              let targetbetweenvalue = this.ngIFControlList[i].targetbetweenvalue;
              let ConditionStateName = this.ngIFControlList[i].ConditionStateName;
              let targetvalue = this.ngIFControlList[i].targetvalue;
              let target = this.ngIFControlList[i].target;
              const payload = {
                ifdate,
                targetdays,
                targetbetweendays,
                targetbetweenvalue,
                ConditionStateName,
                targetvalue,
                target
              };
              this.assessmentFormService.CheckDateCondition(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(msg => {
                if (isPlatformBrowser(this._platformId)) {
                  if (isAndORCondition === 1) {
                    if (msg === '1') {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==1' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                      }
                    } else {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==2' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                      }
                    }
                  } else {
                    if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                      if (msg === '1') {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                      if (msg === '1') {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                      if (msg === '1') {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      }
                      else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                      if (msg === '1') {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                      if (msg === '1') {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      }
                    }
                    else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                      if (msg === '1') {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                      if (msg === '1') {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                      if (msg === '1') {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                      if (msg === '1') {
                        let tmpControlvalue = '';
                        this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                        })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                      if (msg === '1') {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);
                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                      if (msg === '1') {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {

                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                  this.cd.markForCheck();
                }
              });

            } else if (this.ngIFControlList[i].ConditionStateName === 'Is Equal To') {
              if (isPlatformBrowser(this._platformId)) {
                if (isAndORCondition === 1) {
                  if (ControlisMultiple === 1) {
                    let comparevaluematch = 0;
                    for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {

                      if (String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                        comparevaluematch = 1;
                      }
                    }

                    if (comparevaluematch === 1) {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==1' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                      }
                    } else {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==2' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                      }
                    }
                  } else {
                    if (String(this.ngAndOrControlList[0].controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==1' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                      }
                    } else {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==2' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                      }
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            } else if (this.ngIFControlList[i].ConditionStateName === 'Is Not Equal To') {
              if (isPlatformBrowser(this._platformId)) {
                if (isAndORCondition === 1) {

                  if (String(this.ngAndOrControlList[0].controlvalue).toLowerCase() != String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {

                    if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else {
                      if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else {
                      if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            } else if (this.ngIFControlList[i].ConditionStateName === 'Contains') {
              if (isPlatformBrowser(this._platformId)) {
                if (isAndORCondition === 1) {
                  if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(this.ngAndOrControlList[0].controlvalue).toLowerCase()) != -1) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {

                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase()) != -1) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else {
                      if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase()) != -1) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else {
                      if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            } else if (this.ngIFControlList[i].ConditionStateName === 'Less Than') {
              if (isPlatformBrowser(this._platformId)) {
                if (isAndORCondition === 1) {

                  if (String(this.ngAndOrControlList[0].controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else {

                      if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else {

                      if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            } else if (this.ngIFControlList[i].ConditionStateName === 'Greater Than') {
              if (isPlatformBrowser(this._platformId)) {
                if (isAndORCondition === 1) {
                  if (String(this.ngAndOrControlList[0].controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else {
                      if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else {
                      if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            } else if (this.ngIFControlList[i].ConditionStateName === 'Contains') {
              if (isPlatformBrowser(this._platformId)) {

                if (isAndORCondition === 1) {
                  if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(this.ngAndOrControlList[0].controlvalue).toLowerCase()) != -1) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (String(ngControltmp.controlvalue).toLowerCase().indexOf(String(this.ngIFControlList[i].targetvalue).toLowerCase()) !== -1) {
                      //if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (String(ngControltmp.controlvalue).toLowerCase().indexOf(String(this.ngIFControlList[i].targetvalue).toLowerCase()) !== -1) {
                      //if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase()) != -1) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else {
                      if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase()) != -1) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else {
                      if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            } else if (this.ngIFControlList[i].ConditionStateName === 'Does not Contain') {
              if (isPlatformBrowser(this._platformId)) {
                if (isAndORCondition === 1) {
                  if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(this.ngAndOrControlList[0].controlvalue).toLowerCase()) === -1) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (String(ngControltmp.controlvalue).toLowerCase().indexOf(String(this.ngIFControlList[i].targetvalue).toLowerCase()) === -1) {
                      //if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (String(ngControltmp.controlvalue).toLowerCase().indexOf(String(this.ngIFControlList[i].targetvalue).toLowerCase()) === -1) {
                      //if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase()) === -1) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else {
                      if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase()) === -1) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else {
                      if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            } else if (this.ngIFControlList[i].ConditionStateName === 'Starts With') {
              if (isPlatformBrowser(this._platformId)) {

                if (isAndORCondition === 1) {
                  if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(this.ngAndOrControlList[0].controlvalue).toLowerCase())) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase())) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else {
                      if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase())) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else {
                      if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            } else if (this.ngIFControlList[i].ConditionStateName === "Doesn't Start With") {
              if (isPlatformBrowser(this._platformId)) {
                if (isAndORCondition === 1) {
                  if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(this.ngAndOrControlList[0].controlvalue).toLowerCase()))) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase()))) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else {
                      if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase()))) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else {
                      if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            } else if (this.ngIFControlList[i].ConditionStateName === 'Ends With') {
              if (isPlatformBrowser(this._platformId)) {
                if (isAndORCondition === 1) {
                  if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(this.ngAndOrControlList[0].controlvalue).toLowerCase())) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(this.ngIFControlList[i].targetvalue).toLowerCase())) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else {
                      if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(this.ngIFControlList[i].targetvalue).toLowerCase())) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else {
                      if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            } else if (this.ngIFControlList[i].ConditionStateName === 'Doesn\'t End With') {
              if (isPlatformBrowser(this._platformId)) {
                if (isAndORCondition === 1) {
                  if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(this.ngAndOrControlList[0].controlvalue).toLowerCase()))) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {

                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            } else if (this.ngIFControlList[i].ConditionStateName === 'Is Empty') {
              if (isPlatformBrowser(this._platformId)) {
                if (isAndORCondition === 1) {
                  if (this.ngAndOrControlList[0].controlvalue === '') {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (ngControltmp.controlvalue === '') {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (ngControltmp.controlvalue === '') {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (ngControltmp.controlvalue === '') {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (ngControltmp.controlvalue === '') {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (ngControltmp.controlvalue === '') {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (ngControltmp.controlvalue === '') {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (ngControltmp.controlvalue === '') {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (ngControltmp.controlvalue === '') {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (ngControltmp.controlvalue === '') {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (ngControltmp.controlvalue === '') {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (ngControltmp.controlvalue === '') {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (ngControltmp.controlvalue === '') {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            }
          } else if (this.ngIFControlList[i].target === 0) {
            let controltypename = ngControltmp.ControlTypeName;
            let controlconditionvalue = ngControltmp.controlvalue;
            if (isAndORCondition === 1) {
              controltypename = this.ngAndOrControlList[0].ControlTypeName;
              controlconditionvalue = this.ngAndOrControlList[0].controlvalue;
            }

            if (controltypename == 'datetime') {
              let ifdate = controlconditionvalue;
              let targetdays = this.ngIFControlList[i].targetdays;
              let targetbetweendays = this.ngIFControlList[i].targetbetweendays;
              let targetbetweenvalue = this.ngIFControlList[i].targetbetweenvalue;
              let ConditionStateName = this.ngIFControlList[i].ConditionStateName;
              let targetvalue = this.ngIFControlList[i].targetvalue;
              let target = this.ngIFControlList[i].target;
              const payload = {
                ifdate,
                targetdays,
                targetbetweendays,
                targetbetweenvalue,
                ConditionStateName,
                targetvalue,
                target
              };
              if (isPlatformBrowser(this._platformId)) {
                this.assessmentFormService.CheckDateCondition(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(msg => {
                  if (isAndORCondition === 1) {
                    if (msg === '1') {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==1' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                      }
                    } else {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==2' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                      }
                    }
                  } else {
                    if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                      if (msg === '1') {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                      if (msg === '1') {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                      if (msg === '1') {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                      if (msg === '1') {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                      if (msg === '1') {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                      if (msg === '1') {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                      if (msg === '1') {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                      if (msg === '1') {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                      if (msg === '1') {
                        let tmpControlvalue = '';
                        this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                        })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                      if (msg === '1') {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                      if (msg === '1') {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                  this.cd.markForCheck();
                });
              }

            } else if (this.ngIFControlList[i].ConditionStateName === 'Is Equal To') {
              if (isPlatformBrowser(this._platformId)) {
                if (isAndORCondition === 1) {
                  if (ControlisMultiple === 1) {
                    let comparevaluematch = 0;
                    for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                      if (String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                        comparevaluematch = 1;
                      }
                    }
                    if (comparevaluematch === 1) {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==1' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                      }
                    } else {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==2' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                      }
                    }
                  } else {
                    if (String(this.ngAndOrControlList[0].controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==1' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                      }
                    } else {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==2' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                      }
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    let dvalue = ngControltmp.controlvalue.toLowerCase().split('~');
                    if (dvalue.includes(String(this.ngIFControlList[i].targetvalue).toLowerCase())) {
                      try {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      }
                      catch (error) {
                      }
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  }
                  else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                    else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      } if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);
                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();
                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            } else if (this.ngIFControlList[i].ConditionStateName === 'Is Not Equal To') {
              if (isPlatformBrowser(this._platformId)) {
                if (isAndORCondition === 1) {
                  if (String(this.ngAndOrControlList[0].controlvalue).toLowerCase() != String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {

                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else {
                      if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else {
                      if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (String(ngControltmp.controlvalue).toLowerCase() !== String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            } else if (this.ngIFControlList[i].ConditionStateName === 'Less Than') {
              if (isPlatformBrowser(this._platformId)) {
                if (isAndORCondition === 1) {
                  if (String(this.ngAndOrControlList[0].controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (String(ngControltmp.controlvalue).toLowerCase() < String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            } else if (this.ngIFControlList[i].ConditionStateName === 'Greater Than') {
              if (isPlatformBrowser(this._platformId)) {
                if (isAndORCondition === 1) {
                  if (String(this.ngAndOrControlList[0].controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (String(ngControltmp.controlvalue).toLowerCase() > String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            } else if (this.ngIFControlList[i].ConditionStateName === 'Contains') {
              if (isPlatformBrowser(this._platformId)) {
                if (isAndORCondition === 1) {
                  if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(this.ngAndOrControlList[0].controlvalue).toLowerCase()) != -1) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (String(ngControltmp.controlvalue).toLowerCase().indexOf(String(this.ngIFControlList[i].targetvalue).toLowerCase()) !== -1) {
                      //if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (String(ngControltmp.controlvalue).toLowerCase().indexOf(String(this.ngIFControlList[i].targetvalue).toLowerCase()) !== -1) {
                      //if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            } else if (this.ngIFControlList[i].ConditionStateName === 'Does not Contain') {
              if (isPlatformBrowser(this._platformId)) {
                if (isAndORCondition === 1) {
                  if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(this.ngAndOrControlList[0].controlvalue).toLowerCase()) === -1) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    //if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                    if (String(ngControltmp.controlvalue).toLowerCase().indexOf(String(this.ngIFControlList[i].targetvalue).toLowerCase()) === -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    //if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                    if (String(ngControltmp.controlvalue).toLowerCase().indexOf(String(this.ngIFControlList[i].targetvalue).toLowerCase()) === -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (String(ngControltmp.controlvalue).toLowerCase().indexOf(String(this.ngIFControlList[i].targetvalue).toLowerCase()) === -1) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (String(ngControltmp.controlvalue).toLowerCase().indexOf(String(this.ngIFControlList[i].targetvalue).toLowerCase()) === -1) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            } else if (this.ngIFControlList[i].ConditionStateName === 'Starts With') {
              if (isPlatformBrowser(this._platformId)) {
                if (isAndORCondition === 1) {
                  if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(this.ngAndOrControlList[0].controlvalue).toLowerCase())) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            } else if (this.ngIFControlList[i].ConditionStateName === "Doesn't Start With") {
              if (isPlatformBrowser(this._platformId)) {
                if (isAndORCondition === 1) {
                  if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(this.ngAndOrControlList[0].controlvalue).toLowerCase()))) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            } else if (this.ngIFControlList[i].ConditionStateName === 'Ends With') {
              if (isPlatformBrowser(this._platformId)) {
                if (isAndORCondition === 1) {
                  if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(this.ngAndOrControlList[0].controlvalue).toLowerCase())) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            } else if (this.ngIFControlList[i].ConditionStateName === 'Doesn\'t End With') {
              if (isPlatformBrowser(this._platformId)) {
                if (isAndORCondition === 1) {
                  if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(this.ngAndOrControlList[0].controlvalue).toLowerCase()))) {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (!(String(this.ngIFControlList[i].targetvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            } else if (this.ngIFControlList[i].ConditionStateName === 'Is Empty') {
              if (isPlatformBrowser(this._platformId)) {
                if (isAndORCondition === 1) {
                  if (this.ngAndOrControlList[0].controlvalue === '') {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==1' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                    }
                  } else {
                    if (strAndCondition === '') {
                      strAndCondition = '(1==2' + strAppendcondition;
                    } else {
                      strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                    }
                  }
                } else {
                  if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                    if (ngControltmp.controlvalue === '') {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                    if (ngControltmp.controlvalue === '') {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isshowhide = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                    if (ngControltmp.controlvalue === '') {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                    if (ngControltmp.controlvalue === '') {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isenabledisable = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                    if (ngControltmp.controlvalue === '') {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                    if (ngControltmp.controlvalue === '') {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 0;
                    } else {
                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                      })[0].isrequired = 1;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                    if (ngControltmp.controlvalue === '') {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                    if (ngControltmp.controlvalue === '') {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 0;
                      }
                    } else {
                      this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkSectioncnt.length > 0) {
                        this.listDynamicApplicantVisaType.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                      this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                      if (this.checkMainSectioncnt.length > 0) {
                        this.sectionList.filter((item) => {
                          return item.sectionidf === this.ngDOControlList[0].sectionidf;
                        })[0].isshowhide = 1;
                      }
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                    if (ngControltmp.controlvalue === '') {
                      let tmpControlvalue = '';
                      this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                      this.listDynamicApplicantformControl.filter((item) => {
                        return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                      })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                    if (ngControltmp.controlvalue === '') {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').show();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                      $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogSave'))(this);

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                    if (ngControltmp.controlvalue === '') {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                    if (ngControltmp.controlvalue === '') {
                      $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                      $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                      $('#btnConditionDialogSave').hide();
                      $('#btnConditionDialogClose').show();

                      $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                      $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                      // $compile($('#btnConditionDialogClose'))(this);

                      if (callfrom === '1') {
                        $('#divconditionDialog').modal('toggle');
                      }

                    }
                  }
                }
              }
            }
          } else if (this.ngIFControlList[i].target === 2) {
            if (isPlatformBrowser(this._platformId)) {
              this.ngCompareControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngIFTmp[j].targetcontrolidf });
              if (this.ngCompareControl.length > 0) {
                let controltypename = ngControltmp.ControlTypeName;
                let controlconditionvalue = ngControltmp.controlvalue;
                if (isAndORCondition === 1) {
                  controltypename = this.ngAndOrControlList[0].ControlTypeName;
                  controlconditionvalue = this.ngAndOrControlList[0].controlvalue;
                }
                if (controltypename == 'datetime') {
                  let ifdate = controlconditionvalue;
                  let targetdays = this.ngIFTmp[j].targetdays;
                  let targetbetweendays = this.ngIFTmp[j].targetbetweendays;
                  let targetbetweenvalue = this.ngIFTmp[j].targetbetweenvalue;
                  let ConditionStateName = this.ngIFTmp[j].ConditionStateName;
                  let targetvalue = this.ngCompareControl[0].controlvalue;
                  let target = this.ngIFControlList[i].target;

                  const payload = {
                    ifdate,
                    targetdays,
                    targetbetweendays,
                    targetbetweenvalue,
                    ConditionStateName,
                    targetvalue,
                    target
                  };
                  this.assessmentFormService.CheckDateCondition(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(msg => {
                    if (isAndORCondition === 1) {
                      if (msg === '1') {
                        if (strAndCondition === '') {
                          strAndCondition = '(1==1' + strAppendcondition;
                        } else {
                          strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                        }
                      } else {
                        if (strAndCondition === '') {
                          strAndCondition = '(1==2' + strAppendcondition;
                        } else {
                          strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                        }
                      }
                    } else {
                      if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                        if (msg === '1') {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isshowhide = 1;
                        } else {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isshowhide = 0;
                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                        if (msg === '1') {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isshowhide = 0;
                        } else {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isshowhide = 1;
                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                        if (msg === '1') {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isenabledisable = 0;
                        } else {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isenabledisable = 1;
                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                        if (msg === '1') {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isenabledisable = 1;
                        } else {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isenabledisable = 0;
                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                        if (msg === '1') {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isrequired = 1;
                        } else {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isrequired = 0;
                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                        if (msg === '1') {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isrequired = 0;
                        } else {
                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                          })[0].isrequired = 1;
                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                        if (msg === '1') {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                        } else {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                        if (msg === '1') {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                        } else {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                        if (msg === '1') {
                          let tmpControlvalue = '';
                          this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                          this.listDynamicApplicantformControl.filter((item) => {
                            return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                          })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                        if (msg === '1') {
                          $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                          $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                          $('#btnConditionDialogSave').show();
                          $('#btnConditionDialogClose').show();

                          $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                          $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                          // $compile($('#btnConditionDialogSave'))(this);

                          $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                          $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                          // $compile($('#btnConditionDialogClose'))(this);

                          //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                          if (callfrom === '1') {
                            $('#divconditionDialog').modal('toggle');
                          }

                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                        if (msg === '1') {
                          $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                          $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                          $('#btnConditionDialogSave').hide();
                          $('#btnConditionDialogClose').show();

                          $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                          $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                          // $compile($('#btnConditionDialogClose'))(this);

                          if (callfrom === '1') {
                            $('#divconditionDialog').modal('toggle');
                          }

                        }
                      } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                        if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                          $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                          $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                          $('#btnConditionDialogSave').hide();
                          $('#btnConditionDialogClose').show();

                          $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                          $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                          // $compile($('#btnConditionDialogClose'))(this);

                          if (callfrom === '1') {
                            $('#divconditionDialog').modal('toggle');
                          }

                        }
                      }
                    }
                    this.cd.markForCheck();
                  });

                } else if (this.ngIFControlList[i].ConditionStateName === 'Is Equal To') {
                  if (isAndORCondition === 1) {
                    if (ControlisMultiple === 1) {
                      let comparevaluematch = 0;
                      for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                        if (String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase() === String(this.ngIFControlList[i].targetvalue).toLowerCase()) {
                          comparevaluematch = 1;
                        }
                      }
                      if (comparevaluematch === 1) {
                        if (strAndCondition === '') {
                          strAndCondition = '(1==1' + strAppendcondition;
                        } else {
                          strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                        }
                      } else {
                        if (strAndCondition === '') {
                          strAndCondition = '(1==2' + strAppendcondition;
                        } else {
                          strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                        }
                      }
                    } else {
                      if (String(this.ngAndOrControlList[0].controlvalue).toLowerCase() == String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        if (strAndCondition === '') {
                          strAndCondition = '(1==1' + strAppendcondition;
                        } else {
                          strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                        }
                      } else {
                        if (strAndCondition === '') {
                          strAndCondition = '(1==2' + strAppendcondition;
                        } else {
                          strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                        }
                      }
                    }
                  } else {
                    if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                      if (ngControltmp.controlvalue.filter(val => { return val === val.toLowerCase }) === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                      if (ngControltmp.controlvalue.filter(val => { return val === val.toLowerCase }) === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                      if (ngControltmp.controlvalue.filter(val => { return val === val.toLowerCase }) === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                      if (ngControltmp.controlvalue.filter(val => { return val === val.toLowerCase }) === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                      if (ngControltmp.controlvalue.filter(val => { return val === val.toLowerCase }) === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                      if (ngControltmp.controlvalue.filter(val => { return val === val.toLowerCase }) === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                      if (ControlisMultiple === 1) {
                        let comparevaluematch = 0;
                        for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                          if (String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase() == String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                            comparevaluematch = 1;
                          }
                        }
                        if (comparevaluematch === 1) {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                        } else {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                        }
                      } else {

                        if (ngControltmp.controlvalue.filter(val => { return val === val.toLowerCase }) === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                        } else {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                      if (ControlisMultiple === 1) {
                        let comparevaluematch = 0;
                        for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                          if (String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase() == String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                            comparevaluematch = 1;
                          }
                        }
                        if (comparevaluematch === 1) {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                        } else {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                        }
                      } else {

                        if (ngControltmp.controlvalue.filter(val => { return val === val.toLowerCase }) === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                        } else {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                      if (ngControltmp.controlvalue.filter(val => { return val === val.toLowerCase }) === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        let tmpControlvalue = '';
                        this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                        })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                      if (ngControltmp.controlvalue.filter(val => { return val === val.toLowerCase }) === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                      if (ngControltmp.controlvalue.filter(val => { return val === val.toLowerCase }) === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                      if (ngControltmp.controlvalue.filter(val => { return val === val.toLowerCase }) === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                } else if (this.ngIFControlList[i].ConditionStateName === 'Is Not Equal To') {
                  if (isAndORCondition === 1) {
                    if (String(this.ngAndOrControlList[0].controlvalue).toLowerCase() !== String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==1' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                      }
                    } else {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==2' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                      }
                    }
                  } else {
                    if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                      if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                      if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                      if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                      if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                      if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                      if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                      if (ControlisMultiple === 1) {
                        let comparevaluematch = 0;
                        for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                          if (String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                            comparevaluematch = 1;
                          }
                        }
                        if (comparevaluematch === 1) {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                        } else {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                        }
                      } else {

                        if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                        } else {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                      if (ControlisMultiple === 1) {
                        let comparevaluematch = 0;
                        for (let h = 0; h < this.ngAndOrControlListMultiple.length; h++) {
                          if (String(this.ngAndOrControlListMultiple[h].controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                            comparevaluematch = 1;
                          }
                        }
                        if (comparevaluematch === 1) {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                        } else {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                        }
                      } else {

                        if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 0;
                          }
                        } else {
                          this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkSectioncnt.length > 0) {
                            this.listDynamicApplicantVisaType.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                          this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                          if (this.checkMainSectioncnt.length > 0) {
                            this.sectionList.filter((item) => {
                              return item.sectionidf === this.ngDOControlList[0].sectionidf;
                            })[0].isshowhide = 1;
                          }
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                      if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        let tmpControlvalue = '';
                        this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                        })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                      if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                      if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                      if (String(ngControltmp.controlvalue).toLowerCase() != String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                } else if (this.ngIFControlList[i].ConditionStateName === 'Less Than') {
                  if (isAndORCondition === 1) {
                    if (String(this.ngAndOrControlList[0].controlvalue).toLowerCase() < String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==1' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                      }
                    } else {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==2' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                      }
                    }
                  } else {
                    if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        let tmpControlvalue = '';
                        this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                        })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                } else if (this.ngIFControlList[i].ConditionStateName === 'Greater Than') {
                  if (isAndORCondition === 1) {
                    if (String(this.ngAndOrControlList[0].controlvalue).toLowerCase() > String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==1' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                      }
                    } else {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==2' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                      }
                    }
                  } else {
                    if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        let tmpControlvalue = '';
                        this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                        })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                      if (String(ngControltmp.controlvalue).toLowerCase() === String(this.ngCompareControl[0].controlvalue).toLowerCase()) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                } else if (this.ngIFControlList[i].ConditionStateName === 'Contains') {
                  if (isAndORCondition === 1) {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(this.ngAndOrControlList[0].controlvalue).toLowerCase()) != -1) {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==1' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                      }
                    } else {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==2' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                      }
                    }
                  } else {
                    if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      }
                      else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                        let tmpControlvalue = '';
                        this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                        })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) != -1) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                } else if (this.ngIFControlList[i].ConditionStateName === 'Does not Contain') {
                  if (isAndORCondition === 1) {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(this.ngAndOrControlList[0].controlvalue).toLowerCase())) {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==1' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                      }
                    } else {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==2' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                      }
                    }
                  } else {
                    if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                        let tmpControlvalue = '';
                        this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                        })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().indexOf(String(ngControltmp.controlvalue).toLowerCase()) === -1) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                } else if (this.ngIFControlList[i].ConditionStateName === 'Starts With') {
                  if (isAndORCondition === 1) {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(this.ngAndOrControlList[0].controlvalue).toLowerCase())) {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==1' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                      }
                    } else {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==2' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                      }
                    }
                  } else {
                    if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        let tmpControlvalue = '';
                        this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                        })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                } else if (this.ngIFControlList[i].ConditionStateName === "Doesn't Start With") {
                  if (isAndORCondition === 1) {
                    if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(this.ngAndOrControlList[0].controlvalue).toLowerCase()))) {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==1' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                      }
                    } else {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==2' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                      }
                    }
                  } else {
                    if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        let tmpControlvalue = '';
                        this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                        })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().startsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                } else if (this.ngIFControlList[i].ConditionStateName === 'Ends With') {
                  if (isAndORCondition === 1) {
                    if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(this.ngAndOrControlList[0].controlvalue).toLowerCase())) {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==1' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                      }
                    } else {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==2' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                      }
                    }
                  } else {
                    if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        let tmpControlvalue = '';
                        this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                        })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                      if (String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase())) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                } else if (this.ngIFControlList[i].ConditionStateName === 'Doesn\'t End With') {
                  if (isAndORCondition === 1) {
                    if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(this.ngAndOrControlList[0].controlvalue).toLowerCase()))) {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==1' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                      }
                    } else {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==2' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                      }
                    }
                  } else {
                    if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        let tmpControlvalue = '';
                        this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                        })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                      if (!(String(this.ngCompareControl[0].controlvalue).toLowerCase().endsWith(String(ngControltmp.controlvalue).toLowerCase()))) {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                } else if (this.ngIFControlList[i].ConditionStateName === 'Is Empty') {
                  if (isAndORCondition === 1) {
                    if (this.ngAndOrControlList[0].controlvalue === '') {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==1' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==1' + strAppendcondition;
                      }
                    } else {
                      if (strAndCondition === '') {
                        strAndCondition = '(1==2' + strAppendcondition;
                      } else {
                        strAndCondition = strAndCondition + '1==2' + strAppendcondition;
                      }
                    }
                  } else {
                    if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                      if (ngControltmp.controlvalue === '') {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                      if (ngControltmp.controlvalue === '') {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isshowhide = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                      if (ngControltmp.controlvalue === '') {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                      if (ngControltmp.controlvalue === '') {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isenabledisable = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                      if (ngControltmp.controlvalue === '') {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                      if (ngControltmp.controlvalue === '') {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 0;
                      } else {
                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                        })[0].isrequired = 1;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                      if (ngControltmp.controlvalue === '') {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                      if (ngControltmp.controlvalue === '') {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 0;
                        }
                      } else {
                        this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkSectioncnt.length > 0) {
                          this.listDynamicApplicantVisaType.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                        this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                        if (this.checkMainSectioncnt.length > 0) {
                          this.sectionList.filter((item) => {
                            return item.sectionidf === this.ngDOControlList[0].sectionidf;
                          })[0].isshowhide = 1;
                        }
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                      if (ngControltmp.controlvalue === '') {
                        let tmpControlvalue = '';
                        this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                        this.listDynamicApplicantformControl.filter((item) => {
                          return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                        })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                      if (ngControltmp.controlvalue === '') {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').show();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                        $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogSave'))(this);

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                      if (ngControltmp.controlvalue === '') {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                      if (ngControltmp.controlvalue === '') {
                        $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                        $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                        $('#btnConditionDialogSave').hide();
                        $('#btnConditionDialogClose').show();

                        $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                        $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                        // $compile($('#btnConditionDialogClose'))(this);

                        if (callfrom === '1') {
                          $('#divconditionDialog').modal('toggle');
                        }

                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (isPlatformBrowser(this._platformId)) {
          if (isAndORCondition === 1) {
            let scon = eval(strAndCondition.toString());
            if (scon == true) {
              if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                for (let i = 0; i < this.listDynamicApplicantformControl.length; i++) {
                  if (this.listDynamicApplicantformControl[i].formcontrolid == this.ngDOControlList[0].targetfieldidf) {
                    this.listDynamicApplicantformControl[i].isshowhide = 1;
                  }
                }
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                })[0].isshowhide = 0;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                })[0].isenabledisable = 0;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                })[0].isenabledisable = 1;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                })[0].isrequired = 1;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                })[0].isrequired = 0;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                if (this.checkSectioncnt.length > 0) {
                  this.listDynamicApplicantVisaType.filter((item) => {
                    return item.sectionidf === this.ngDOControlList[0].sectionidf;
                  })[0].isshowhide = 1;
                }
                this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                if (this.checkMainSectioncnt.length > 0) {
                  this.sectionList.filter((item) => {
                    return item.sectionidf === this.ngDOControlList[0].sectionidf;
                  })[0].isshowhide = 1;
                }
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                if (this.checkSectioncnt.length > 0) {
                  this.listDynamicApplicantVisaType.filter((item) => {
                    return item.sectionidf === this.ngDOControlList[0].sectionidf;
                  })[0].isshowhide = 0;
                }
                this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                if (this.checkMainSectioncnt.length > 0) {
                  this.sectionList.filter((item) => {
                    return item.sectionidf === this.ngDOControlList[0].sectionidf;
                  })[0].isshowhide = 0;
                }
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Copy a Field\'s value') {
                let tmpControlvalue = '';
                this.tmpCopyFromControl = this.listDynamicApplicantformControl.filter(val => { return val.formcontrolid === this.ngDOControlList[0].targetfieldidf });

                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetsecondidf;
                })[0].controlvalue = this.tmpCopyFromControl[0].controlvalue;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Confirmation') {
                $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                $('#btnConditionDialogSave').show();
                $('#btnConditionDialogClose').show();

                $('#btnConditionDialogSave').text(this.ngDOControlList[0].YesButton);
                $('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                // $compile($('#btnConditionDialogSave'))(this);

                $('#btnConditionDialogClose').text(this.ngDOControlList[0].NoButton);
                $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                // $compile($('#btnConditionDialogClose'))(this);

                //$('#btnConditionDialogSave').attr('ng-click', 'YesButtonClick()');
                if (callfrom === '1') {
                  $('#divconditionDialog').modal('toggle');
                }
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Warning') {
                $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                $('#btnConditionDialogSave').hide();
                $('#btnConditionDialogClose').show();

                $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                // $compile($('#btnConditionDialogClose'))(this);

                if (callfrom === '1') {
                  $('#divconditionDialog').modal('toggle');
                }
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Information') {
                $('#divconditionDialogTitle').text(this.ngDOControlList[0].ConditionTypeName);
                $('#divConditionMessage').text(this.ngDOControlList[0].alertmessage);

                $('#btnConditionDialogSave').hide();
                $('#btnConditionDialogClose').show();

                $('#btnConditionDialogClose').text(this.ngDOControlList[0].OkButton);
                $('#btnConditionDialogClose').attr('ng-click', 'NoButtonClick("' + JSON.stringify(this.ngDOControlList[0]) + '")');
                // $compile($('#btnConditionDialogClose'))(this);

                if (callfrom === '1') {
                  $('#divconditionDialog').modal('toggle');
                }
              }
            } else {
              if (this.ngDOControlList[0].ConditionTypeName === 'Hide') {
                for (let i = 0; i < this.listDynamicApplicantformControl.length; i++) {
                  if (this.listDynamicApplicantformControl[i].formcontrolid == this.ngDOControlList[0].targetfieldidf) {
                    this.listDynamicApplicantformControl[i].isshowhide = 0;
                  }
                }
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Show') {
                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                })[0].isshowhide = 1;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Enable') {
                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                })[0].isenabledisable = 1;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Disable') {
                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                })[0].isenabledisable = 0;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Require') {
                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                })[0].isrequired = 0;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Unrequire') {
                this.listDynamicApplicantformControl.filter((item) => {
                  return item.formcontrolid === this.ngDOControlList[0].targetfieldidf;
                })[0].isrequired = 1;
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Hide Page') {
                this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                if (this.checkSectioncnt.length > 0) {
                  this.listDynamicApplicantVisaType.filter((item) => {
                    return item.sectionidf === this.ngDOControlList[0].sectionidf;
                  })[0].isshowhide = 0;
                }
                this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                if (this.checkMainSectioncnt.length > 0) {
                  this.sectionList.filter((item) => {
                    return item.sectionidf === this.ngDOControlList[0].sectionidf;
                  })[0].isshowhide = 0;
                }
              } else if (this.ngDOControlList[0].ConditionTypeName === 'Show Page') {
                this.checkSectioncnt = this.listDynamicApplicantVisaType.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                if (this.checkSectioncnt.length > 0) {
                  this.listDynamicApplicantVisaType.filter((item) => {
                    return item.sectionidf === this.ngDOControlList[0].sectionidf;
                  })[0].isshowhide = 1;
                }
                this.checkMainSectioncnt = this.sectionList.filter(val => { return val.sectionidf === this.ngDOControlList[0].sectionidf });
                if (this.checkMainSectioncnt.length > 0) {
                  this.sectionList.filter((item) => {
                    return item.sectionidf === this.ngDOControlList[0].sectionidf;
                  })[0].isshowhide = 1;
                }
              }
            }
          }
        }
      }
      this.pagedItems = this.listDynamicApplicantVisaType.filter(val => { return val.sectionparentidf === 0 && val.isshowhide === 0 });
      for (let y = 0; y < this.pagedItems.length; y++) {
        this.pagedItems[y].rowNumber = y + 1;
      }
      //this.totalItems = this.pagedItems.length;
      /*For Document Control Show hide in Split Screen*/

      var sectionlist = this.listDynamicApplicantVisaType.filter(val => { return val.isshowhide === 0 && val.ismultiple === false });
      var controllist = this.listDynamicApplicantformControl.filter(val => { return val.isshowhide === 0 && val.controltypeidf === 4 && val.ismultiple === false });
      for (let i = 0; i < this.listsectionmultiplecontrol.length; i++) {
        for (let j = 0; j < controllist.length; j++) {
          if (parseInt(this.listsectionmultiplecontrol[i].formcontrolid) == parseInt(controllist[j].formcontrolid)) {
            let index = this.controllist.indexOf(this.controllist[j]);
            controllist.splice(index, 1);
          }
        }
      }
      this.BindDocumentList = [];
      for (let i = 0; i < sectionlist.length; i++) {
        for (let j = 0; j < controllist.length; j++) {
          if (sectionlist[i].sectionidf === controllist[j].sectionidf) {
            this.BindDocumentList.push(controllist[j]);
          }
        }
      }
      this.SectionDocumentList = this.BindDocumentList;
      var sectionlist = this.listDynamicApplicantVisaType.filter(val => { return val.isshowhide === 0 && val.ismultiple === true });
      var controllist = this.listsectionmultiplecontrol.filter(val => { return val.isshowhide === 0 && val.controltypeidf === 4 });
      var controllistvalue = this.MultipleControlvalue.filter(val => { return val.isshowhide === 0 && val.controltypeidf === 4 });

      this.BindMultipleDocumentList = [];
      this.tmpBindMultipleDocumentList = [];
      for (let i = 0; i < sectionlist.length; i++) {
        for (let j = 0; j < controllistvalue.length; j++) {
          if (sectionlist[i].sectionidf === controllistvalue[j].sectionidf && controllistvalue[j].controlvalue != '') {
            this.BindMultipleDocumentList.push(controllistvalue[j]);
            this.tmpBindMultipleDocumentList.push(controllistvalue[j]);
          }
        }
      }
      this.tmpSectopnList = this.sectionList.filter(val => { return val.isshowhide === 0 });
      for (let i = 0; i < this.tmpSectopnList.length; i++) {
        this.tmpSectopnList[i].sequence = i + 1;

      }
      if (isPlatformBrowser(this._platformId)) {
        setTimeout(() => { $('.selectpicker').selectpicker('refresh'); }, 10);
      }
    }
    catch (error) {

    }
  }
  setcheckboxvalue(tmpControlList, tmpControlOptionList) {
    this.tmpOptionList = tmpControlOptionList.filter(value => {
      return value.formcontrolid === tmpControlList.formcontrolid;
    });

    var str = '';
    // if (tmpControlList.controlvalue.length > 0) {
    //   str = tmpControlList.controlvalue;
    // }
    for (var i = 0; i < this.tmpOptionList.length; i++) {
      const id = '#cntrl_chk_' + this.tmpOptionList[i].controloptionid;
      if ($(id).prop('checked')) {
        if (str == '') {
          str = this.tmpOptionList[i].optiontext;
        }
        else {
          str = str + "~" + this.tmpOptionList[i].optiontext;
        }
      }
      // if (tmpControlList.controlvaluecheckbox[this.tmpOptionList[i].optiontext] == true) {
      //   //str = str + "," + this.tmpOptionList[i].optiontext;
      //   if (str == '') {
      //     str = this.tmpOptionList[i].optiontext;
      //   }
      //   else {
      //     str = str + "~" + this.tmpOptionList[i].optiontext;
      //   }
      // }
    }

    tmpControlList.controlvalue = str;
  }

  getcheckboxvalue(tmpControlList, tmpControlOptionList) {
    var flag = false;
    if (tmpControlList.controlvalue != null) {
      var tt = tmpControlList.controlvalue.split('~');
      for (var i = 0; i < tt.length; i++) {
        if (tt[i].toString() == tmpControlOptionList.optiontext.toString()) {
          return true;
          flag = true;
        }
      }
    }
    return false;
  }


  AddIsMultipleControl(visatypeidf, visatypesectionmapidf, sec) {
    if (isPlatformBrowser(this._platformId)) {
      this.action = "Add";
      $("#divlist_" + sec.sectionidf).hide();
      $("#divadd_" + sec.sectionidf).show();
      $("#divbutton_" + sec.sectionidf).show();
      sec.ismultiple = false;
      sec.multiplesec = true;

      var mutiplesection = this.MultipleSectionList.filter(value => {
        return value.sectionidf === sec.sectionidf;
      });
      var LastRownumber = 0;
      if (mutiplesection.length > 0) {
        for (var i = 0; i < mutiplesection.length; i++) {
          LastRownumber = mutiplesection[i].rownumber;
        }
        this.rownumber = LastRownumber + 1;
      }
      else {
        this.rownumber = 0;
      }


    }
    this.MControlvalue = this.listDynamicApplicantformControl.filter(value => {
      return value.sectionidf === sec.sectionidf;
    });
    for (var i = 0; i < this.MControlvalue.length; i++) {
      this.MControlvalue[i].controlvalue = '';
      this.MControlvalue[i].date = '';
      this.MControlvalue[i].month = '';
      this.MControlvalue[i].year = '';

      this.MControlvalue[i].countrycode = '';
      this.MControlvalue[i].areacode = '';
      this.MControlvalue[i].phonenumber = '';

      this.MControlvalue[i].isenabledisable = 0;
      this.MControlvalue[i].isverifyuser = 0;
      this.MControlvalue[i].verifyby = 0;
      this.MControlvalue[i].createdby = 0;
    }

    for (var i = 0; i < this.MControlvalue.length; i++) {
      for (var j = 0; j < this.listIsmultiple.length; j++) {

        if (this.listIsmultiple[j].formcontrolid == this.MControlvalue[i].formcontrolid) {
          this.listDynamicApplicantformControl.filter((item) => {
            return item.formcontrolid === this.listIsmultiple[j].formcontrolid;
          })[0].isrequired = this.listIsmultiple[j].isrequired;
        }
      }
    }
  }

  SaveApplicantMultipleData(sec, subSectionForm) {
    this.submitted = true;

    this.multisectionclick = false;
    this.secArrMul = [];

    if (subSectionForm.valid) {
      const email = (localStorage.getItem('socialtoken')) ? jwt_decode(localStorage.getItem('socialtoken')).email : '';
      this.submitted = false;
      var valid = true;

      var MultipleRequiredApplicant = this.listDynamicApplicantformControl.filter(value => {
        return value.sectionidf === sec.sectionidf;
      });
      if (isPlatformBrowser(this._platformId)) {
        for (var j = 0; j < MultipleRequiredApplicant.length; j++) {

          if (MultipleRequiredApplicant[j].isrequired == true && (MultipleRequiredApplicant[j].controlvalue == '' || MultipleRequiredApplicant[j].controlvalue == undefined || MultipleRequiredApplicant[j].controlvalue == null) && MultipleRequiredApplicant[j].controltypeidf != 15) {
            if (MultipleRequiredApplicant[j].isshowhide == false && MultipleRequiredApplicant[j].controltypeidf != 7) {
              $("#cntrl_" + MultipleRequiredApplicant[j].formcontrolid).addClass("ng-invalid");
              valid = false;
            }
          }
        }
      }
      if (valid == true) {
        this.SaveApplicantSectionData(this.mainsectionid, this.applicantidf, subSectionForm);

        this.InsertControlvalue = [];
        if (this.action != "Update") {

          this.MultipleSectionList.push({
            sectionidf: sec.sectionidf,
            rownumber: this.rownumber,
          })

          this.MControlvalue = this.listDynamicApplicantformControl.filter(value => {
            return value.sectionidf === sec.sectionidf;
          });
          for (var i = 0; i < this.MControlvalue.length; i++) {
            if (this.MControlvalue[i].controlvalue != null) {
              if (this.MControlvalue[i].ControlTypeName != 'section') {
                this.InsertControlvalue.push({
                  formcontrolidf: this.MControlvalue[i].formcontrolid,
                  sectionidf: sec.sectionidf,
                  controlvalue: this.MControlvalue[i].controlvalue,
                  rownumber: this.rownumber,
                  sequence: this.MControlvalue[i].sequence,
                  visatypeidf: this.MControlvalue[i].visatypeidf,
                  isshowhide: this.MControlvalue[i].isshowhide,
                  isenabledisable: this.MControlvalue[i].isenabledisable,
                  productidf: this.MControlvalue[i].productidf,
                  date: this.MControlvalue[i].date,
                  month: this.MControlvalue[i].month,
                  year: this.MControlvalue[i].year,
                  countrycode: this.MControlvalue[i].countrycode,
                  areacode: this.MControlvalue[i].areacode,
                  phonenumber: this.MControlvalue[i].phonenumber,
                  filepath: this.MControlvalue[i].filepath,
                  isconfirm: this.MControlvalue[i].isconfirm,
                  controlidf: this.MControlvalue[i].controlidf,
                  controlsettingidf: this.MControlvalue[i].controlsettingidf
                });

                this.MultipleControlvalue.push({
                  formcontrolidf: this.MControlvalue[i].formcontrolid,
                  visatypesectionmapid: this.MControlvalue[i].visatypesectionmapid,
                  productidf: this.MControlvalue[i].productidf,
                  sectionidf: sec.sectionidf,
                  sectionparentidf: this.MControlvalue[i].sectionparentidf,
                  controltypeidf: this.MControlvalue[i].sectionparentidf,
                  rownumber: this.rownumber,
                  ControlTypeName: this.MControlvalue[i].ControlTypeName,
                  question: this.MControlvalue[i].question,
                  controlvalue: this.MControlvalue[i].controlvalue,
                  ismultiple: this.MControlvalue[i].ismultiple,
                  filepath: this.MControlvalue[i].filepath,
                  date: this.MControlvalue[i].date,
                  month: this.MControlvalue[i].month,
                  year: this.MControlvalue[i].year,
                  countrycode: this.MControlvalue[i].countrycode,
                  areacode: this.MControlvalue[i].areacode,
                  phonenumber: this.MControlvalue[i].phonenumber,
                  isconfirm: this.MControlvalue[i].isconfirm,
                  ismultipleshow: this.MControlvalue[i].ismultipleshow,
                  isshowhide: this.MControlvalue[i].isshowhide,
                  sequence: this.MControlvalue[i].sequence,
                  visatypeidf: this.MControlvalue[i].visatypeidf,
                  applicantformdataid: 0,
                  controlidf: this.MControlvalue[i].controlidf,
                  controlsettingidf: this.MControlvalue[i].controlsettingidf
                });
              }

            }
          }

          for (var u = 0; u < this.listDynamicApplicantformControl.length; u++) {
            this.ApplyCondition(this.listDynamicApplicantformControl[u], "0");
          }

          const fvm = {
            objlist: this.InsertControlvalue,
            applicantid: this.applicantidf,
            type: 'S',
            userid: this.uid,
            editedby: (this.userdata) ? this.userdata.email : (email) ? email : ''
          };
          if (this.setPermissionFlag !== 'View') {
            this.assessmentFormService.savemultiplesectionapplicantdetails(fvm).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
              if (data.flag) {
                this.GetAllSectionataMultiple('');
                this.cd.markForCheck();
              }
              else {
                this.mservice.generateMessage('ERROR', '', data.message);
              }
            });
          }

        }
        else {
          this.Controls = this.listDynamicApplicantformControl.filter(value => {
            return value.sectionidf === sec.sectionidf;
          });
          this.MControlvalue = this.MultipleControlvalue.filter(value => {
            return value.sectionidf === sec.sectionidf;
          });
          for (var j = 0; j < this.Controls.length; j++) {
            for (var i = 0; i < this.MultipleControlvalue.length; i++) {
              if (this.Controls[j].formcontrolid == this.MultipleControlvalue[i].formcontrolid && this.Controls[j].rownumber == this.MultipleControlvalue[i].rownumber) {
                this.MultipleControlvalue[i].controlvalue = this.Controls[j].controlvalue;
                this.MultipleControlvalue[i].date = this.Controls[j].date;
                this.MultipleControlvalue[i].month = this.Controls[j].month;
                this.MultipleControlvalue[i].year = this.Controls[j].year;
                this.MultipleControlvalue[i].countrycode = this.Controls[j].countrycode;
                this.MultipleControlvalue[i].areacode = this.Controls[j].areacode;
                this.MultipleControlvalue[i].phonenumber = this.Controls[j].phonenumber;
                this.MultipleControlvalue[i].filepath = this.Controls[j].filepath;
                this.MultipleControlvalue[i].isconfirm = this.Controls[j].isconfirm;
                this.MultipleControlvalue[i].controlidf = this.Controls[j].controlidf;
                this.MultipleControlvalue[i].isshowhide = this.Controls[j].isshowhide;
                this.MultipleControlvalue[i].isenabledisable = this.Controls[j].isenabledisable;
                this.MultipleControlvalue[i].controlsettingidf = this.Controls[j].controlsettingidf;
                this.InsertControlvalue.push(this.MultipleControlvalue[i]);
              }
              else {
                if (this.Controls[j].ControlTypeName != 'section') {
                  this.tmpMultipleControlvalue = this.MultipleControlvalue.filter(value => value.formcontrolid === this.Controls[j].formcontrolid && value.rownumber === this.rownumber && value.sectionidf == this.Controls[j].sectionidf);

                  if (this.tmpMultipleControlvalue.length <= 0) {
                    // this.MultipleControlvalue.push({
                    //   formcontrolidf: this.Controls[j].formcontrolid,
                    //   formcontrolid: this.Controls[j].formcontrolid,
                    //   visatypesectionmapid: this.Controls[j].visatypesectionmapid,
                    //   productidf: this.Controls[j].productidf,
                    //   sectionidf: sec.sectionidf,
                    //   sectionparentidf: this.Controls[j].sectionparentidf,
                    //   controltypeidf: this.Controls[j].sectionparentidf,
                    //   rownumber: this.rownumber,
                    //   ControlTypeName: this.Controls[j].ControlTypeName,
                    //   question: this.Controls[j].question,
                    //   controlvalue: this.Controls[j].controlvalue,
                    //   ismultiple: this.Controls[j].ismultiple,
                    //   filepath: this.Controls[j].filepath,
                    //   date: this.Controls[j].date,
                    //   month: this.Controls[j].month,
                    //   year: this.Controls[j].year,
                    //   countrycode: this.Controls[j].countrycode,
                    //   areacode: this.Controls[j].areacode,
                    //   phonenumber: this.Controls[j].phonenumber,
                    //   isconfirm: this.Controls[j].isconfirm,
                    //   ismultipleshow: this.Controls[j].ismultipleshow,
                    //   isshowhide: this.Controls[j].isshowhide,
                    //   sequence: this.Controls[j].sequence,
                    //   visatypeidf: this.Controls[j].visatypeidf,
                    //   applicantformdataid: 0,
                    //   controlidf: this.Controls[j].controlidf,
                    //   controlsettingidf: this.Controls[j].controlsettingidf
                    // });

                    this.InsertControlvalue.push({
                      formcontrolidf: this.Controls[j].formcontrolid,
                      formcontrolid: this.Controls[j].formcontrolid,
                      visatypesectionmapid: this.Controls[j].visatypesectionmapid,
                      productidf: this.Controls[j].productidf,
                      sectionidf: sec.sectionidf,
                      sectionparentidf: this.Controls[j].sectionparentidf,
                      controltypeidf: this.Controls[j].sectionparentidf,
                      rownumber: this.rownumber,
                      ControlTypeName: this.Controls[j].ControlTypeName,
                      question: this.Controls[j].question,
                      controlvalue: this.Controls[j].controlvalue,
                      ismultiple: this.Controls[j].ismultiple,
                      filepath: this.Controls[j].filepath,
                      date: this.Controls[j].date,
                      month: this.Controls[j].month,
                      year: this.Controls[j].year,
                      countrycode: this.Controls[j].countrycode,
                      areacode: this.Controls[j].areacode,
                      phonenumber: this.Controls[j].phonenumber,
                      isconfirm: this.Controls[j].isconfirm,
                      ismultipleshow: this.Controls[j].ismultipleshow,
                      isshowhide: this.Controls[j].isshowhide,
                      sequence: this.Controls[j].sequence,
                      visatypeidf: this.Controls[j].visatypeidf,
                      applicantformdataid: 0,
                      controlidf: this.Controls[j].controlidf,
                      controlsettingidf: this.Controls[j].controlsettingidf
                    });
                  }
                }
              }

            }
          }
          let rno= Math.max.apply(null, this.Controls.map(function(item) {
    return item.rownumber;
  }));
  let newcnvalues=[];
  this.Controls.forEach(element => {
    element.rownumber=rno;
    newcnvalues.push(element);
  });
          const fvm = {
            objlist: newcnvalues,
            applicantid: this.applicantidf,
            type: 'S',
            userid: this.uid,
            editedby: (this.userdata) ? this.userdata.email : (email) ? email : ''
          };
          if (this.setPermissionFlag !== 'View') {
            this.assessmentFormService.updatemultiplesectionapplicantdetails(fvm).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
              if (data.flag) {
                for (var u = 0; u < this.listDynamicApplicantformControl.length; u++) {
                  this.ApplyCondition(this.listDynamicApplicantformControl[u], "0");
                }
                this.cd.markForCheck();
              }
              else {
                this.mservice.generateMessage('ERROR', '', data.message);
              }
            });
          }

        }

        this.tmpcontrolvalueMul = this.listDynamicApplicantformControl.filter(value => {
          return value.sectionidf === sec.sectionidf && this.rownumber === sec.rownumber;
        });

        for (var i = 0; i < this.tmpcontrolvalueMul.length; i++) {
          for (var j = 0; j < this.listIsmultiple.length; j++) {

            if (this.listIsmultiple[j].formcontrolid == this.tmpcontrolvalueMul[i].formcontrolid) {
              this.listDynamicApplicantformControl.filter(function (item) {
                return item.formcontrolid === this.listIsmultiple[j].formcontrolid;
              })[0].isrequired = false;

            }
          }
        }
        if (isPlatformBrowser(this._platformId)) {
          $("#divlist_" + sec.sectionidf).show();
          $("#divadd_" + sec.sectionidf).hide();
          $("#divbutton_" + sec.sectionidf).hide();
        }
        sec.ismultiple = true;
      }
    }
  }


  SaveApplicantSectionData(sectionid, applicantid, subSectionForm) {
    this.submitted = true;
    // if (!this.form.$valid) {
    //     $('#serviceForm .form-control.ng-invalid').first().focus();
    //     return false;
    // }
    if (subSectionForm.valid) {
      this.submitted = false;
      this.filtered = this.listDynamicApplicantformControl.filter(value => {
        return value.sectionidf === sectionid || value.sectionparentidf === sectionid;
      });

      this.filtered = this.filtered.filter(value => {
        return value.ismultiple === false;
      });
      this.filteredvisatype = this.listDynamicApplicantVisaType.filter(value => {
        return value.sectionidf === sectionid || value.sectionparentidf === sectionid;
      });

      const fvm = {
        listDynamicApplicantVisaType: this.filteredvisatype,
        listDynamicApplicantformControl: this.filtered,
        ApplicantID: this.applicantidf,
        type: 'S',
        projectid: this.projectid,
        userid: this.uid
      };
      if (this.setPermissionFlag !== 'View') {
        this.assessmentFormService.saveApplicantDetails(fvm).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
          this.cd.markForCheck();
          if (data.flag) {

          } else {

          }
        });
      }

    }
  }

  ShowDynamicList(sec) {
    if (isPlatformBrowser(this._platformId)) {

      this.multisectionclick = false;
      this.secArrMul = [];

      this.submitted = false;
      $("#divlist_" + sec.sectionidf).show();
      $("#divadd_" + sec.sectionidf).hide();
      $("#divbutton_" + sec.sectionidf).hide();
      sec.ismultiple = true;

      this.tmpcontrolvalueshowdl = this.listDynamicApplicantformControl.filter(value => {
        return value.sectionidf === sec.sectionidf && value.rownumber === sec.rownumber;
      });

      for (var i = 0; i < this.tmpcontrolvalueshowdl.length; i++) {
        for (var j = 0; j < this.listIsmultiple.length; j++) {

          if (this.listIsmultiple[j].formcontrolid == this.tmpcontrolvalueshowdl[i].formcontrolid) {
            this.listDynamicApplicantformControl.filter(value => {
              return value.formcontrolid === this.listIsmultiple[j].formcontrolid;
            })[0].isrequired = false;

          }
        }
      }
    }
  }

  GetAllSectionataMultiple(type) {
    let productidf = this.productidf;
    let sectionidf = this.sectionidf;
    let applicantidf = this.applicantidf;
    let isform = this.isform;

    const payload = {
      productidf,
      applicantidf,
      isform,
      sectionidf,
      studylevelquery: this.studylevelquery
    };
    this.assessmentFormService.getapplicantmultiplesectioncontroldata(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.ngformdataMultiple = data.outdata;
      this.listsectionmultiplecontrol = this.ngformdataMultiple._listmultiplesectioncontrol;
      this.MultipleSectionList = this.ngformdataMultiple._listMultipleSection;
      this.rownumber = this.MultipleSectionList.length;
      this.MultipleControlvalue = this.ngformdataMultiple._listmultiplesectioncontrolvalue;
      this.FinalMultipleControllist = this.MultipleControlvalue;
      this.cd.markForCheck();
    });
  }

  checkMultipleDocument(sec) {
    this.isDocumentExist = this.MultipleControlvalue.filter(value => {
      return value.controlvalue != null && value.sectionidf == sec.sectionidf && value.controltypeidf == 4 && value.rownumber == sec.rownumber;
    });
    if (this.isDocumentExist.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }

  ShowMultipleDocument(sec) {
    this.tmpSectionDocument = this.MultipleControlvalue.filter(value => {
      return value.sectionidf === sec.sectionidf && value.controltypeidf === 4 && value.rownumber === sec.rownumber;
    });
    this.tmpSectionDocument = this.tmpSectionDocument.filter((value) => {
      return value.controlvalue !== null;
    });
    if (isPlatformBrowser(this._platformId)) {
      $("#modelshowdocument").modal('show');
      $('#iframemultidocument').attr('src', '');
    }
    this.divMultiViewDocument = false;
  }

  // EditDynamicList(sec) {
  //   this.action = "Update";
  //   $("#divlist_" + sec.sectionidf).hide();
  //   $("#divadd_" + sec.sectionidf).show();
  //   $("#divbutton_" + sec.sectionidf).show();
  //   /* show the ngcontrol */
  //   for (var i = 0; i < this.listDynamicApplicantVisaType.length; i++) {
  //     if (this.listDynamicApplicantVisaType[i].sectionidf === sec.sectionidf) {
  //       this.listDynamicApplicantVisaType[i].ismultiple = false;
  //       this.listDynamicApplicantVisaType[i].multiplesec = true;
  //     }
  //   }
  //   this.rownumber = sec.rownumber;
  //   this.ControlvalueEdit = this.MultipleControlvalue.filter(value => {
  //     return value.sectionidf === sec.sectionidf && this.rownumber === sec.rownumber;
  //   });

  //   for (var i = 0; i < this.listDynamicApplicantformControl.length; i++) {
  //     for (var j = 0; j < this.ControlvalueEdit.length; j++) {

  //       if (this.ControlvalueEdit[j].formcontrolid == this.listDynamicApplicantformControl[i].formcontrolid) {


  //         this.ngCascasefield = this.listDynamicApplicantformControl.filter(value => {
  //           return value.cascadeidf === this.ControlvalueEdit[j].formcontrolid;
  //         });
  //         if (this.ngCascasefield.length > 0) {
  //           for (var c = 0; c < this.ngCascasefield.length; c++) {
  //             for (var q = this.listDynamicApplicantControlOptionCascade.length - 1; q >= 0; q--) {
  //               if (this.listDynamicApplicantControlOptionCascade[q].formcontrolid == this.ngCascasefield[c].formcontrolid) {
  //                 this.listDynamicApplicantControlOptionCascade.splice(q, 1);
  //               }
  //             }

  //             this.tmpngCascadedata = this.ngCascadedata.filter(Value => {
  //               return Value.cascadename === this.ControlvalueEdit[j].controlvalue;
  //             });

  //             if (this.tmpngCascadedata.length > 0) {
  //               for (var b = 0; b < this.tmpngCascadedata.length; b++) {
  //                 this.listDynamicApplicantControlOptionCascade.push({
  //                   controloptionid: 0,
  //                   formcontrolid: this.ngCascasefield[c].formcontrolid,
  //                   helpblock: '',
  //                   isconditional: false,
  //                   optiontext: this.tmpngCascadedata[b].name,
  //                   optionvalue: this.tmpngCascadedata[b].id,
  //                   productidf: this.productidf,
  //                   sectionidf: 0,
  //                   sectionparentidf: 0,
  //                   visatypesectionmapid: 0
  //                 });
  //               }
  //             }
  //           }
  //         }

  //         this.listDynamicApplicantformControl[i].controlvalue = this.ControlvalueEdit[j].controlvalue;
  //         this.listDynamicApplicantformControl[i].date = this.ControlvalueEdit[j].date;
  //         this.listDynamicApplicantformControl[i].month = this.ControlvalueEdit[j].month;
  //         this.listDynamicApplicantformControl[i].year = this.ControlvalueEdit[j].year;
  //         this.listDynamicApplicantformControl[i].countrycode = this.ControlvalueEdit[j].countrycode;
  //         this.listDynamicApplicantformControl[i].areacode = this.ControlvalueEdit[j].areacode;
  //         this.listDynamicApplicantformControl[i].phonenumber = this.ControlvalueEdit[j].phonenumber;
  //         this.listDynamicApplicantformControl[i].rownumber = sec.rownumber;
  //         this.listDynamicApplicantformControl[i].filepath = this.ControlvalueEdit[j].filepath;
  //         this.ApplyCondition(this.listDynamicApplicantformControl[i], "0");
  //       }
  //     }
  //   }
  //   //For Validation
  //   this.tmpcontrolvalueEdit = this.listDynamicApplicantformControl.filter(value => {
  //     return value.sectionidf === sec.sectionidf && this.rownumber === sec.rownumber;
  //   });

  //   for (var i = 0; i < this.tmpcontrolvalueEdit.length; i++) {
  //     for (var j = 0; j < this.listIsmultiple.length; j++) {

  //       if (this.listIsmultiple[j].formcontrolid == this.tmpcontrolvalueEdit[i].formcontrolid) {
  //         this.listDynamicApplicantformControl.filter((item) => {
  //           return item.formcontrolid === this.listIsmultiple[j].formcontrolid;
  //         })[0].isrequired = this.listIsmultiple[j].isrequired;

  //       }
  //     }
  //   }
  // }

  EditDynamicList(sec) {
    if (this.setPermissionFlag === 'View') {
      return false;
    }
    this.action = "Update";
    this.multisectionclick = true;
    this.secArrMul = sec;

    if (isPlatformBrowser(this._platformId)) {

      $("#divlist_" + sec.sectionidf).hide();
      $("#divadd_" + sec.sectionidf).show();
      $("#divbutton_" + sec.sectionidf).show();
    }
    /* show the ngcontrol */
    for (var i = 0; i < this.listDynamicApplicantVisaType.length; i++) {
      if (this.listDynamicApplicantVisaType[i].sectionidf === sec.sectionidf) {
        this.listDynamicApplicantVisaType[i].ismultiple = false;
        this.listDynamicApplicantVisaType[i].multiplesec = true;
      }
    }
    this.ControlvalueEdit = this.MultipleControlvalue.filter(value => {
      return value.sectionidf === sec.sectionidf && value.rownumber === sec.rownumber;
    });

    this.multiplseCreatedby = this.ControlvalueEdit[0].createdby;

    for (var i = 0; i < this.listDynamicApplicantformControl.length; i++) {
      for (var j = 0; j < this.ControlvalueEdit.length; j++) {
        if (this.ControlvalueEdit[j].formcontrolid == this.listDynamicApplicantformControl[i].formcontrolid) {
          this.ngCascasefield = this.listDynamicApplicantformControl.filter(value => {
            return value.cascadeidf === this.ControlvalueEdit[j].formcontrolid;
          });
          if (this.ngCascasefield.length > 0) {
            for (var c = 0; c < this.ngCascasefield.length; c++) {
              for (var q = this.listDynamicApplicantControlOptionCascade.length - 1; q >= 0; q--) {
                if (this.listDynamicApplicantControlOptionCascade[q].formcontrolid == this.ngCascasefield[c].formcontrolid) {
                  this.listDynamicApplicantControlOptionCascade.splice(q, 1);
                }
              }
              this.tmpngCascadedata = this.ngCascadedata.filter(value => {
                return value.cascadename === this.ControlvalueEdit[j].controlvalue;
              });
              if (this.tmpngCascadedata.length > 0) {
                for (var b = 0; b < this.tmpngCascadedata.length; b++) {
                  this.listDynamicApplicantControlOptionCascade.push({
                    controloptionid: 0,
                    formcontrolid: this.ngCascasefield[c].formcontrolid,
                    helpblock: '',
                    isconditional: false,
                    optiontext: this.tmpngCascadedata[b].name,
                    optionvalue: this.tmpngCascadedata[b].id,
                    productidf: this.productidf,
                    sectionidf: 0,
                    sectionparentidf: 0,
                    visatypesectionmapid: 0
                  });
                }
              }
            }
          }

          this.listDynamicApplicantformControl[i].applicantformdataid = this.ControlvalueEdit[j].applicantformdataid;
          this.listDynamicApplicantformControl[i].controlvalue = this.ControlvalueEdit[j].controlvalue;
          this.listDynamicApplicantformControl[i].date = this.ControlvalueEdit[j].date;
          this.listDynamicApplicantformControl[i].month = this.ControlvalueEdit[j].month;
          this.listDynamicApplicantformControl[i].year = this.ControlvalueEdit[j].year;
          this.listDynamicApplicantformControl[i].countrycode = this.ControlvalueEdit[j].countrycode;
          this.listDynamicApplicantformControl[i].areacode = this.ControlvalueEdit[j].areacode;
          this.listDynamicApplicantformControl[i].phonenumber = this.ControlvalueEdit[j].phonenumber;
          this.listDynamicApplicantformControl[i].rownumber = sec.rownumber;
          this.listDynamicApplicantformControl[i].filepath = this.ControlvalueEdit[j].filepath;

          this.listDynamicApplicantformControl[i].isenabledisable = this.ControlvalueEdit[j].isenabledisable;
          this.listDynamicApplicantformControl[i].isverifyuser = this.ControlvalueEdit[j].isverifyuser;
          this.listDynamicApplicantformControl[i].verifyby = this.ControlvalueEdit[j].verifyby;
          this.listDynamicApplicantformControl[i].createdby = this.ControlvalueEdit[j].createdby;

          this.ApplyCondition(this.listDynamicApplicantformControl[i], "0");
        }
      }
    }
    //For Validation
    this.tmpcontrolvalue = this.listDynamicApplicantformControl.filter(value => {
      return value.sectionidf === sec.sectionidf && value.rownumber === sec.rownumber;
    });

    for (var i = 0; i < this.tmpcontrolvalue.length; i++) {
      for (var j = 0; j < this.listIsmultiple.length; j++) {
        if (this.listIsmultiple[j].formcontrolid == this.tmpcontrolvalue[i].formcontrolid) {
          this.listDynamicApplicantformControl.filter(item => {
            return item.formcontrolid === this.listIsmultiple[j].formcontrolid;
          })[0].isrequired = this.listIsmultiple[j].isrequired;
        }
      }
    }
  }

  /* Delete Dynamic IsMultiple Section Data */
  DeleteDynamicSectionList(sec, index) {
    if (this.setPermissionFlag === 'View') {
      return false;
    }
    this.MultipleSectionList.splice(index, 1);
    this.ControlvalueEdit = this.MultipleControlvalue.filter(value => {
      return value.sectionidf === sec.sectionidf && value.rownumber === sec.rownumber;
    });

    var fvma = {
      objForm: this.ControlvalueEdit,
    }
    var whatIndex = null;

    this.MultipleControlvalue.forEach((cb, indexvalue) => {
      if (cb.sectionidf === sec.sectionidf
        && cb.rownumber === sec.rownumber) {
        whatIndex = indexvalue;
      }
    });

    if (whatIndex != null) {
      this.MultipleControlvalue.splice(whatIndex, 1);
    }
    this.MultipleSectionList.splice(index, 1);

    this.assessmentFormService.deleteapplicantformdata(fvma).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.GetAllSectionataMultiple('');
        this.cd.markForCheck();
      } else {
        this.mservice.generateMessage('ERROR', '', data.message);
      }
    });
  }

  documentuploadOK(ngVisaTypetmp) {
    this.listsectionids = this.listDynamicApplicantVisaType.filter((value) => {
      return value.sectionparentidf == ngVisaTypetmp.sectionidf || value.sectionidf == ngVisaTypetmp.sectionidf;
    });
    this.listdocumentcontrols = [];
    this.Mainlistdocumentcontrols = [];

    let SD = this.ngformdata.listDynamicApplicantformControl.filter(value => {
      return value.controltypeidf === 4 && value.isshowhide === 0;
    });
    this.Mainlistdocumentcontrols = SD.filter((value) => {
      return value.sectionparentidf === ngVisaTypetmp.sectionidf || value.sectionidf === ngVisaTypetmp.sectionidf;
    });
    var uploadcnt = 0;
    for (var i = 0; i < this.Mainlistdocumentcontrols.length; i++) {
      if (this.Mainlistdocumentcontrols[i].isskip == true) {
        if (this.Mainlistdocumentcontrols[i].skipquestiontext == 'Fill Later') {
          uploadcnt = 1;
        }
        else {
          //this.Mainlistdocumentcontrols[i].skipquestiontext = 'Fill Later';
        }
      }
      else if (this.Mainlistdocumentcontrols[i].isrequired == true) {
        if (this.Mainlistdocumentcontrols[i].controlvalue == '' || this.Mainlistdocumentcontrols[i].controlvalue == null) {
          uploadcnt = 1;
        }
        this.Mainlistdocumentcontrols[i].skipquestiontext = '';
      }
    }
    if (isPlatformBrowser(this._platformId)) {
      if (uploadcnt == 0) {
        $('#modeldocumentupload').modal('toggle');
        //$(".modal-backdrop").remove();
        //$("#modeldocumentupload").hide();            
      }
    }
  }

  GoBack() {
    this.location.back();
  }

  GetAllFormControlMaster() {
    this.assessmentFormService.getallformcontrolmaster(this.applicantidf).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        if (data.outdatalist[0] != null) {
          this.mastercontroll = data.outdatalist[0];
        }
        else {
          this.mastercontroll = [];
        }

        if (data.outdatalist[1] != null) {
          this.ngCascadedata = data.outdatalist[1];
        }
        else {
          this.ngCascadedata = [];
        }
        this.cd.markForCheck();
      }
      else {
        this.mastercontroll = [];
      }
    });
  }

  backtoSearch() {
    let randomNum = this.generateRandomNum();
    let pid = sessionStorage.getItem('pid');
    let aid_param = sessionStorage.getItem('aid_param');

    if (aid_param) {
      this.router.navigate(['/program/course-search/konze' + randomNum + '/' + pid + '/' + aid_param]);
    } else {
      this.router.navigate(['/program/course-search/konze' + randomNum + '/' + pid]);
    }

    // let randomNumF=this.encdec.convertText('enc', 'konze' + randomNum , true);
    // let pidF=this.encdec.convertText('enc', pid.toString() , true);

    // if (aid_param) {
    //   //this.router.navigate(['/program/course-search/konze' + randomNum + '/' + pid + '/' + aid_param]);

    //   let aid_paramF=this.encdec.convertText('enc', aid_param.toString() , true);
    //   this.router.navigate(['/program/course-search/',randomNumF, pidF,aid_paramF]);

    // } else {
    //   //this.router.navigate(['/program/course-search/konze' + randomNum + '/' + pid]);

    //   this.router.navigate(['/program/course-search/',randomNumF, pidF]);
    // }
  }
  generateRandomNum() {
    return Math.floor(Math.random() * (999 - 100 + 1) + 100);
  }

  Updateverifydata(id, verifyby, isverifyuser) {
    this.assessmentFormService.updateverifydata(id, verifyby, isverifyuser, isverifyuser).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag == true) {
        this.mservice.generateMessage('SUCCESS', '', 'Setting Updated sucessfully');
        this.OpenDocumentFlagVerifydata = false;
        if (this.multisectionclick) {
          this.multisectionclick = false;
          var arrFind = this.ControlvalueEdit;
          if (arrFind.length > 0) {
            for (var i = 0; i < arrFind.length; i++) {
              if (arrFind[i].applicantformdataid == id) {

                if (isverifyuser) {
                  this.ControlvalueEdit[i].isenabledisable = 1;
                  this.ControlvalueEdit[i].isverifyuser = 1;
                }
                else {
                  this.ControlvalueEdit[i].isenabledisable = 0;
                  this.ControlvalueEdit[i].isverifyuser = 0;
                }
              }
            }
          }

          this.EditDynamicList(this.secArrMul);
          //this.GetSectionformdata("P");
        }
        else {
          this.GetSectionformdata("P");
        }

        this.cd.markForCheck();
      } else {
        this.cd.markForCheck();
        this.mservice.generateMessage('ERROR', 'EMPTY', 'No Record Found');
      }
    });
  }

  refreshQuestions(event) {
    this.isrefreshquestion = true;
    this.secid = 1;
    let univIds = sessionStorage.getItem('univids');
    univIds = univIds.substring(0, univIds.length - 1);
    this.productidf = univIds;

    this.GetAllFormControlMaster();
    this.GetStudyLevelCondition();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
    this.loadService.ispanel = false;
  }
  // async GetAllFormControlMaster() {
  //   const data =await this.assessmentFormService.getallformcontrolmaster();
  //   console.log(JSON.stringify(data))
  //   let arrayVal=JSON.stringify(data);
  //   let a1=JSON.parse(arrayVal);
  //   if (a1.flag) {
  //         this.mastercontroll=a1.outdatalist[0];
  //       }
  //       else{
  //         this.mastercontroll=[];
  //       }
  //   //await this.assessmentFormService.getallformcontrolmaster().subscribe(data => {
  //   //   if (data.flag) {
  //   //     this.mastercontroll=data.outdatalist[0];
  //   //   }
  //   //   else{
  //   //     this.mastercontroll=[];
  //   //   }
  //   // });
  // }

}
