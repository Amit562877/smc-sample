import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ManageOneformService } from '../../services/manage-oneform.service';
import { AddSection } from 'src/app/models/oneForm.model';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthdataService } from 'src/app/auth/services/authdata.service';

declare const $: any;
@Component({
  selector: 'app-manage-oneform',
  templateUrl: './manage-oneform.component.html',
  styleUrls: ['./manage-oneform.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageOneformComponent implements OnInit, OnDestroy {

  addSectionModel = new AddSection();
  componentDestroyed$: Subject<boolean> = new Subject();
  public href = '';
  masterlist: any;
  displayboxes: any;
  psequence = 1;
  csequence = 1;
  sectionFlag = false;
  editSectionFlag = false;
  processid: any;
  sectionpayload: any;
  editSectionDetails: any;
  dragElements: any;
  allControllSetting: any;
  currentField: any;
  formFields: any;
  divSectionAdd = true;
  divaddcontrols = false;
  sectionname = '';
  isform: boolean;
  visatypesectionmapidf: number;
  mainsectionid: number;
  productidf: number;
  Settings: {};
  sectionelements: any;
  guid = 1;
  controltype: any;
  Setting: any;
  Deleteformfields = [];
  divaddProcess = false;
  divApplicationSectionAdd = false;
  aApplicationCancel = false;
  aApplicationAdd = true;
  currentid: any;
  SectionName: string;
  isactive = true;
  isrequired = true;
  isdisplaySettings = false;
  boolstage = false;
  textcasetypelist: any;
  validationtypelist: any;
  mastertablelist: any;
  loaddoc: any;
  GoogleAddressField: any;
  ngBindcontrollist: any;
  // process model
  ProcessName: string;
  proisactive = true;

  CopyControlField: any;
  AllControls: any;
  drpcopyfromsectionid: any;
  AllSubSectionList: any;
  drpcopypredefinedcontrolid: any;
  predefinedcontrollist: any;
  ngSectionControlsList: any;
  submitted = false;
  sectionSubmitted = false;
  AllControlsNew: any;
  ngformpredefinedcontrollist:any;

  permissions: any = {};
  constructor(
    private manageOneformService: ManageOneformService,
    private router: Router,
    private mservice: ToastService,
    public loadService: LoaderService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef,
    private adataservice: AuthdataService
  ) { }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      for (let i = 0; i < this.formFields.length; i++) {
        this.formFields[i].sequence = i + 1;
      }
    } else {
      const idx = event.previousIndex;
      const insertIdx = event.currentIndex;
      this.AddElement(this.dragElements[idx], insertIdx);
    }
  }
  boxesDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // this.displayboxes = event.container.data;
    let cnt = 1;
    for (let i = 0; i < this.displayboxes.length; i++) {
      this.displayboxes[i].sequence = cnt;
      cnt++;
    }
    this.cd.markForCheck();
  }
  boxesSectionDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // this.displayboxes = event.container.data;
    let cnt = 1;
    for (let i = 0; i < this.displayboxes.length; i++) {
      // if (this.displayboxes[i].issubsection == true) {
      this.displayboxes[i].sequence = cnt;
      cnt++;
      // }
    }
    this.cd.markForCheck();
    const section = this.displayboxes;
    this.manageOneformService.UpdateApplicationformSectionSequence(section).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.GetBoxes();
      this.cd.markForCheck();
    });
  }


  ngOnInit() {
    this.loadService.loadme = true;
    this.permissions = this.adataservice.getPermission('Manage OneForm');
    this.href = this.router.url;
    this.currentField = this.createNewField();
    if (isPlatformBrowser(this._platformId)) {
      $('#divaddcontrols').hide();
      $('#AddProcessModel').hide();
      $('#StageModel').hide();
      $('#parentsectionModel').hide();
    }

    this.GetMasterList();
    this.loadService.loadme = false;
  }

  // Display All Section box
  DisplayBoxes(event) {
    if (isPlatformBrowser(this._platformId)) {
      $('#parentsectionModel').show();
    }

    this.loadService.loadme = true;
    this.boolstage = true;
    this.processid = event.target.value;
    this.GetBoxes();
    this.cd.markForCheck();
  }

  // Get All Box Information
  GetBoxes() {
    this.manageOneformService.GetMasterListById(this.processid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag && data.outdatalist[0]) {
        if (data.outdatalist[0].length > 0) {
          this.displayboxes = data.outdatalist[0];
          let count = 0;
          for (const section of this.displayboxes) {
            if (section.subsectionparentidf === 0) {
              count++;
            }
          }
          this.psequence = count + 1;
          this.cd.markForCheck();
          this.loadService.loadme = false;
        } else {
          this.loadService.loadme = false;
          this.displayboxes = [];
          this.cd.markForCheck();
          this.mservice.generateMessage('INFO', 'INFO', 'No subsection found');
        }
      } else {
        this.loadService.loadme = false;
        this.boolstage = false;
        this.mservice.generateMessage('ERROR', 'FAILED', 'Some Error Occured');
      }
    });
  }

  // Add New Proces and Product
  AddNewProcess() {
    if (isPlatformBrowser(this._platformId)) {
      $('#parentsectionModel').hide();
      $('#maindivModel').hide();
      $('#AddProcessModel').show();
    }
    this.cd.markForCheck();
  }

  // Cancel Process And Product
  CancelProcess() {
    this.loadService.loadme = true;
    if (isPlatformBrowser(this._platformId)) {
      $('#maindivModel').show();
      $('#AddProcessModel').hide();
    }

    this.ProcessName = '';
    this.proisactive = true;
    this.submitted = false;
    this.boolstage = false;
    this.GetMasterList();
    this.cd.markForCheck();
    this.loadService.loadme = false;
  }

  // Add Section and Subsection Info
  AddStage(event, sec) {
    // Add Section called
    if (event === 'addsection') {
      this.sectionFlag = true;
      this.sectionpayload = sec;
    } else if (event === 'editsection') {
      // Edit Section Info
      this.SectionName = sec.name;
      this.isactive = sec.isactive;
      this.sectionpayload = sec;
      this.sectionFlag = true;
    } else if (event === 'editsubsection') {
      // Edit subsction Info
      this.SectionName = sec.name;
      this.isactive = sec.isactive;
      this.sectionpayload = sec;
      this.sectionFlag = false;
    } else {
      this.sectionpayload = sec;
      let count = 0;
      for (const section of this.displayboxes) {
        for (const subsection of this.displayboxes) {
          if (subsection.subsectionparentidf === section.id) {
            count++;
          }
        }
      }
      this.csequence = count + 1;
      this.sectionFlag = false;
    }
    if (isPlatformBrowser(this._platformId)) {
      $('#StageModel').show();
      $('#txtSectionName').focus();
    }
    
    this.cd.markForCheck();
  }

  // save section and sub section
  SaveSection(addSectionForm) {
    this.loadService.loadme = true;
    this.sectionSubmitted = true;
    if (addSectionForm.valid) {
      this.sectionSubmitted = false;
      const namevalue = this.SectionName;
      const isactive = this.isactive;
      this.CancelStageRules();
      if (this.sectionFlag === true && (this.sectionpayload === undefined || this.sectionpayload === '')) {
        // Add section
        const secPayload = {
          id: 0,
          name: namevalue,
          description: namevalue,
          isform: 1,
          isactive,
          issubsection: 0,
          subsectionparentidf: 0
        };
        const visasecPayload = {
          visatypesectionmapid: 0,
          productidf: this.processid,
          isform: 1,
          sequence: this.psequence,
        };
        this.addSectionModel.sec = secPayload;
        this.addSectionModel.visasec = visasecPayload;
        this.manageOneformService.addSection(this.addSectionModel).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
          if (data.flag) {
            this.GetBoxes();
            this.cd.markForCheck();
            this.mservice.generateMessage('SUCCESS', '', data.message);
          }
        });
      } else if (this.sectionFlag === true && this.sectionpayload.id !== 0) {
        // Edit Process Stage
        const secPayload = {
          id: this.sectionpayload.id,
          name: namevalue,
          description: this.sectionpayload.description,
          isform: this.sectionpayload.isform,
          isactive,
          issubsection: this.sectionpayload.issubsection,
          subsectionparentidf: this.sectionpayload.sectionparentidf
        };
        const visasecPayload = {
          visatypesectionmapid: this.sectionpayload.visatypesectionmapid,
          productidf: this.sectionpayload.productidf,
          isform: this.sectionpayload.isform,
          sequence: this.sectionpayload.sequence
        };
        this.addSectionModel.sec = secPayload;
        this.addSectionModel.visasec = visasecPayload;
        this.manageOneformService.addSection(this.addSectionModel).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
          if (data.flag) {
            this.GetBoxes();
            this.cd.markForCheck();
            this.mservice.generateMessage('SUCCESS', '', data.message);
          }
        });
      } else if (this.sectionFlag === false && this.sectionpayload.sectionparentidf === 0) {
        // add sub section by section Id
        const secPayload = {
          id: 0,
          name: namevalue,
          description: '',
          isform: 1,
          isactive,
          issubsection: 1,
          subsectionparentidf: this.sectionpayload.id
        };
        const visasecPayload = {
          visatypesectionmapid: 0,
          productidf: this.processid,
          isform: 1,
          sequence: this.csequence,
        };
        this.addSectionModel.sec = secPayload;
        this.addSectionModel.visasec = visasecPayload;
        this.manageOneformService.addSection(this.addSectionModel).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
          if (data.flag) {
            this.GetBoxes();
            this.cd.markForCheck();
            this.mservice.generateMessage('SUCCESS', '', data.message);
          }
        });
      } else if (this.sectionFlag === false && this.sectionpayload.sectionparentidf > 0) {
        const secPayload = {
          id: this.sectionpayload.id,
          name: namevalue,
          description: this.sectionpayload.description,
          isform: this.sectionpayload.isform,
          isactive,
          issubsection: this.sectionpayload.issubsection,
          subsectionparentidf: this.sectionpayload.sectionparentidf
        };
        const visasecPayload = {
          visatypesectionmapid: this.sectionpayload.visatypesectionmapid,
          productidf: this.sectionpayload.productidf,
          isform: this.sectionpayload.isform,
          sequence: this.sectionpayload.sequence,
        };
        this.addSectionModel.sec = secPayload;
        this.addSectionModel.visasec = visasecPayload;
        this.manageOneformService.addSection(this.addSectionModel).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
          if (data.flag) {
            this.GetBoxes();
            this.cd.markForCheck();
            this.mservice.generateMessage('SUCCESS', '', data.message);
          }
        });
      } else {
        throw new Error('Nothing Matched');
      }
    }
    this.loadService.loadme = false;
  }
  CancelStageRules() {
    this.sectionSubmitted = false;
    this.SectionName = '';
    this.isactive = true;
    if (isPlatformBrowser(this._platformId)) {
      $('#StageModel').hide();
    }
    this.cd.markForCheck();
  }

  // Add Process and Product
  SaveProcess(addProcessForm) {
    this.loadService.loadme = true;
    this.submitted = true;
    if (addProcessForm.valid) {
      this.submitted = false;
      const processname = this.ProcessName;
      const isactive = this.proisactive;
      this.manageOneformService.addNewProcess(processname, isactive).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          this.mservice.generateMessage('SUCCESS', '', data.message);
          this.CancelProcess();
          this.GetMasterList();
          this.cd.markForCheck();
        } else {
          this.mservice.generateMessage('ERROR', '', data.message);
        }
      });
    }
    this.loadService.loadme = false;
  }
  // Get Predefine Controller
  GetMasterList() {
    this.manageOneformService.GetMasterList().pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {

      if (data.flag && data.outdatalist.length > 0) {
        if (data.outdatalist[0] !== null) {
          this.masterlist = data.outdatalist[0];
        } else {
          this.masterlist = [];
        }

        if (data.outdatalist[1] !== null) {
          this.textcasetypelist = data.outdatalist[1];
        } else {
          this.textcasetypelist = [];
        }

        if (data.outdatalist[2] !== null) {
          this.validationtypelist = data.outdatalist[2];
        } else {
          this.validationtypelist = [];
        }

        if (data.outdatalist[3] !== null) {
          this.mastertablelist = data.outdatalist[3];
        } else {
          this.mastertablelist = [];
        }

        if (data.outdatalist[4] !== null) {
          this.loaddoc = data.outdatalist[4];
        } else {
          this.loaddoc = [];
        }

        if (data.outdatalist[5] !== null) {
          this.GoogleAddressField = data.outdatalist[5];
        } else {
          this.GoogleAddressField = [];
        }

        if (data.outdatalist[6] !== null) {
          this.ngBindcontrollist = data.outdatalist[6];
        } else {
          this.ngBindcontrollist = [];
        }
        if (data.outdatalist[7] !== null) {
          this.AllControlsNew = data.outdatalist[7];
        } else {
          this.AllControlsNew = [];
        }

        if (data.outdatalist[8] !== null) {
          this.ngformpredefinedcontrollist = data.outdatalist[8];
        } else {
          this.ngformpredefinedcontrollist = [];
        }

        this.cd.markForCheck();
      } else {
        this.mservice.generateMessage('ERROR', 'ERROR', 'Some Error Occured');
      }
    });
    this.manageOneformService.getFormControls1().pipe(takeUntil(this.componentDestroyed$)).subscribe(details => {
      if (details.flag) {
        this.dragElements = [];
        this.controltype = details.outdata.controltype;
        this.Setting = details.outdata.setting;
        let Name = null;
        let ICon = null;

        for (let i = 0; i < this.controltype.length; i++) {
          Name = this.controltype[i].name,
            ICon = this.controltype[i].icon,
            this.dragElements.push({
              Name,
              ICon,
              type: this.controltype[i].type,
              ControlTypeId: this.controltype[i].id,
              Settings: {
                controloptionlist: [],
                bindcontrolfieldlist: []
              }
            });
        }
        this.cd.markForCheck();
      }

    });

  }

  // Get Text Case Type
  GettextcaseTypeList() {

    this.manageOneformService.GettextcaseTypeList().pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag && data.outdata) {
        this.textcasetypelist = data.outdata;
        this.cd.markForCheck();
      } else {
        this.mservice.generateMessage('ERROR', 'ERROR', 'Some Error Occured');
      }
    });
  }

  // Manage Controller
  ManageControls(sec, isformtmp) {
    this.loadService.loadme = true;
    this.isdisplaySettings = false;
    this.changetab();
    if (isPlatformBrowser(this._platformId)) {
      $('#divaddcontrols').show();
      $('#mainProcessModel').hide();
    }

    this.formFields = [];
    this.formFields.length = 0;
    this.divSectionAdd = false;
    this.divaddcontrols = true;
    this.sectionname = sec.name;
    this.isform = isformtmp;
    this.visatypesectionmapidf = sec.visatypesectionmapid;
    this.mainsectionid = sec.sectionidf;
    this.productidf = sec.productidf;
    this.Settings = {};
    this.sectionelements = [{
      Name: 'Add Section',
      Type: 'section',
    }];
    this.cd.markForCheck();
    this.GetFormControl(sec.visatypesectionmapid, sec.sectionidf);
  }

  bindsummernote(index, controlType) {
    let Id = controlType + index;
    if (isPlatformBrowser(this._platformId)) {
      $('#' + Id).summernote({
        disableDragAndDrop: true,
        placeholder: '',
        tabsize: 2,
        height: 200,
        callbacks: {}
      });
    }

  }

  timepicker1(index, controlid) {
    // $('#' + controlid + '' + index).timepicker({
    //   autoclose: !0,
    // });
  }
  datepicker1(index, controlid) {
    if (isPlatformBrowser(this._platformId)) {
      let id = '#' + controlid + index;
      $(id).datepicker({
        todayHighlight: !0,
        autoclose: !0,
        format: 'dd/mm/yyyy'
      });
    }

  }
  // Edit All Form Controller
  GetFormControl(visatypesectionmapidf, sectionidf) {
    const section = {
      visatypesectionmapidf,
      sectionidf,
      productidf: this.productidf
    };
    this.manageOneformService.EditFormControl(section).pipe(takeUntil(this.componentDestroyed$)).subscribe(getData => {
      if (getData.flag) {
        this.formFields = getData.outdata;
        if (this.formFields === null) {
          this.formFields = [];
        }
        // Bind existing value in display editor
        for (let i = 0; i < this.formFields.length; i++) {
          if (this.formFields[i].type === 'displayeditor') {
            let Id = 'displayeditor_' + i;
            if (isPlatformBrowser(this._platformId)) {
              setTimeout(() => {
                $('#' + Id).summernote('code', this.formFields[i].Name);
              }, 100);
            }


          }
        }
        this.cd.markForCheck();
      }
      this.loadService.loadme = false;
    });
  }

  // Click On Controll Call this method
  activeField(f) {
    this.isdisplaySettings = true;
    this.currentField.Active = false;
    this.currentField = f;
    if (this.currentField.Settings.googleaddressfield === null || this.currentField.Settings.googleaddressfield === undefined) {
      this.currentField.Settings.googleaddressfield = '0';
    }

    if (this.currentField.Settings.ocrdocidf === null || this.currentField.Settings.ocrdocidf === undefined) {
      this.currentField.Settings.ocrdocidf = '0';
    }

    if (this.currentField.Settings.textcaseidf === null || this.currentField.Settings.textcaseidf === undefined) {
      this.currentField.Settings.textcaseidf = '0';
    }

    if (this.currentField.Settings.mastertableidf === null || this.currentField.Settings.mastertableidf === undefined) {
      this.currentField.Settings.mastertableidf = '0';
    }

    if (this.currentField.Settings.validationtypeidf === null || this.currentField.Settings.validationtypeidf === undefined) {
      this.currentField.Settings.validationtypeidf = '0';
    }

    if (this.currentField.Settings.cascadeidf === null) {
      this.currentField.Settings.cascadeidf = '0';
    }

    if (this.currentField.Settings.cascadefield === null) {
      this.currentField.Settings.cascadefield = '0';
    }
    else {
      this.currentField.Settings.cascadefield = Number(this.currentField.Settings.cascadefield);
    }

    if (this.currentField.Settings.formpredefinedcontrol === null || this.currentField.Settings.formpredefinedcontrol === undefined) {
      this.currentField.Settings.formpredefinedcontrol = '';
    }

    f.Active = true;
    this.currentid = this.currentField.id;
    this.isrequired = this.currentField.Settings.isrequired;
    this.currentField.Settings.ocrid = this.currentField.Settings.ocrid;
    if (isPlatformBrowser(this._platformId)) {
      $('#fieldSettingTab').show();
      $('#addFieldTab').hide();
      $('#addFeildLI').removeClass('active');
      $('#addFieldTab_lnk').removeClass('text-white');
      $('#feildSettingLI').addClass('active');
      $('#fieldSettingTab_lnk').addClass('text-white');
    }
    this.cd.markForCheck();
  }

  // Click on add a field seetings
  changetab() {
    if (isPlatformBrowser(this._platformId)) {
      this.isdisplaySettings = false;
      $('#addFieldTab').show();
      $('#fieldSettingTab').hide();
      $('#addFeildLI').addClass('active');
      $('#addFieldTab_lnk').addClass('text-white');
      $('#feildSettingLI').removeClass('active');
      $('#fieldSettingTab_lnk').removeClass('text-white');
    }
    this.cd.markForCheck();
  }

  calldropcontrolfield(controlid, index) {
    if (isPlatformBrowser(this._platformId)) {


      $('#' + controlid + '' + index).on('select2:select', function (e) {
        const element = e.params.data.element;
        const $element = $(element);
        $element.detach();
        $(this).append($element);
        $(this).trigger('change');
        const newToItem = {};
        const id = e.params.data.id;
        const data = {
          bindfromcontrolidf: id,
          bindcontrolid: 0,
          index
        };
        for (let i = 0; i < this.currentField.Settings.bindcontrolfieldlist.length; i++) {
          if (i === index) {
            if (this.currentField.Settings.bindcontrolfieldlist[i].bindfromcontrolidf === 0) {
              this.currentField.Settings.bindcontrolfieldlist[i].bindfromcontrolidf = parseInt(id, 10);
            } else if (this.currentField.Settings.bindcontrolfieldlist[i].bindconcatecontrolidf1 === 0) {
              this.currentField.Settings.bindcontrolfieldlist[i].bindconcatecontrolidf1 = parseInt(id, 10);
            } else if (this.currentField.Settings.bindcontrolfieldlist[i].bindconcatecontrolidf2 === 0) {
              this.currentField.Settings.bindcontrolfieldlist[i].bindconcatecontrolidf2 = parseInt(id, 10);
            } else if (this.currentField.Settings.bindcontrolfieldlist[i].bindconcatecontrolidf3 === 0) {
              this.currentField.Settings.bindcontrolfieldlist[i].bindconcatecontrolidf3 = parseInt(id, 10);
            }
          }
        }
      });
      $('#' + controlid + '' + index).on('select2:unselecting', function (e) {
        const newToItemList = [];
        const data = {
          id: e.params.args.data.id,
          name: ''
        };

        for (let i = 0; i < this.currentField.Settings.bindcontrolfieldlist.length; i++) {
          if (i === index) {
            if (this.currentField.Settings.bindcontrolfieldlist[i].bindfromcontrolidf === parseInt(data.id, 10)) {
              this.currentField.Settings.bindcontrolfieldlist[i].bindfromcontrolidf = 0;
            } else if (this.currentField.Settings.bindcontrolfieldlist[i].bindconcatecontrolidf1 === parseInt(data.id, 10)) {
              this.currentField.Settings.bindcontrolfieldlist[i].bindconcatecontrolidf1 = 0;
            } else if (this.currentField.Settings.bindcontrolfieldlist[i].bindconcatecontrolidf2 === parseInt(data.id, 10)) {
              this.currentField.Settings.bindcontrolfieldlist[i].bindconcatecontrolidf2 = 0;
            } else if (this.currentField.Settings.bindcontrolfieldlist[i].bindconcatecontrolidf3 === parseInt(data.id, 10)) {
              this.currentField.Settings.bindcontrolfieldlist[i].bindconcatecontrolidf3 = 0;
            }
          }
        }
        $(this).removeData('unselecting');
      });
      this.cd.markForCheck();
    }
  }

  // Add Element Form Control
  AddElement(element, idx) {
    this.currentField.Active = false;
    this.currentField = this.createNewField();
    this.currentField.Settings.label = element.Name;
    this.currentField.Settings.isactive = true;
    this.currentField.Settings.ismaster = false;
    this.currentField.Settings.isrequired = true;
    this.currentField.Settings.isskip = false;
    this.currentField.Settings.isreadonly = false;
    this.currentField.Settings.iscopyvaluefrom = false;
    this.currentField.Settings.isbindvaluefrom = false;
    this.currentField.Settings.isocr = false;
    this.currentField.Settings.isformhidecontrol = false;
    this.currentField.Settings.isshowupdatedby = false;
    _.merge(this.currentField, element);
    this.currentField.visaformcontrol = this.currentField.Settings;
    if (this.formFields === null) {
      this.formFields = [];
    }
    if (typeof idx === 'undefined') {
      this.formFields.push(this.currentField);
    } else {
      this.formFields.splice(idx, 0, this.currentField);
      if (isPlatformBrowser(this._platformId)) {
        $('#fieldSettingTab').show();
        $('#addFieldTab').hide();
        $('#addFeildLI').removeClass('active');
        $('#addFieldTab_lnk').removeClass('text-white');
        $('#feildSettingLI').addClass('active');
        $('#fieldSettingTab_lnk').addClass('text-white');
      }

    }
    for (let i = 0; i < this.formFields.length; i++) {
      this.formFields[i].sequence = i + 1;
    }
    this.cd.markForCheck();
  }

  // Save All Control In database
  SaveElement() {
    this.loadService.loadme = true;
    for (let i = 0; i < this.formFields.length; i++) {
      this.formFields[i].isform = this.isform;
      // saving the value that is given as an input in display editor
      if (this.formFields[i].type == 'displayeditor') {
        if (isPlatformBrowser(this._platformId)) {
          let id = '#displayeditor_' + i;
          this.formFields[i].Name = $(id).summernote('code');
        }

      }

    }
    const svm = {
      svm: this.formFields,
      deleteformfield: this.Deleteformfields
    };
    this.manageOneformService.AddFormControl(svm).pipe(takeUntil(this.componentDestroyed$)).subscribe(getData => {
      if (getData.flag) {
        this.mservice.generateMessage('SUCCESS', '', getData.message);
        this.GetFormControl(this.visatypesectionmapidf, this.mainsectionid);
        this.cd.markForCheck();
      }
    });
  }

  // Create New field For mby default
  createNewField = function () {
    return {
      sectionid: this.mainsectionid,
      productidf: this.productidf,
      visatypesectionmapidf: this.visatypesectionmapidf,
      subsectionid: 0,
      ControlTypeId: 0,
      id: ++this.guid,
      sequence: this.guid,
      Name: '',
      Settings: {
        controloptionlist: [
          {
            optiontext: 'Yes',
            helpblock: 'Yes'
          },
          {
            optiontext: 'No',
            helpblock: 'No'
          },
        ],
        bindcontrolfieldlist: []
      },
      visaformcontrol: {
        controloptionlist: [
          {
            optiontext: 'Yes',
            helpblock: 'Yes'
          },
          {
            optiontext: 'No',
            helpblock: 'No'
          },
        ],
        bindcontrolfieldlist: []
      },
      tags: [],
      bindvaluefield: [],
      documents: [],
      Active: true,
      iscopycontrol: false,
      ChangeFieldSetting: function (Value, SettingName) {
        switch (SettingName) {
          case 'Question':
            this.currentField.Name = Value;
            this.currentField.Settings.label = this.currentField.Name;
            break;
          default:
            break;
        }
      },
    };
  };

  changeField(Value) {
    this.currentField.Settings.label = Value;
    this.currentField.Name = Value;
    this.cd.markForCheck();
  }

  ChangeFieldSetting(Value, SettingName) {
    switch (SettingName) {
      case 'Question':
        this.currentField.Name = Value;
        this.currentField.Settings.label = this.currentField.Name;
        break;
      default:
        break;
    }
    this.cd.markForCheck();
  }

  changeCheckboxField(Value) {
    this.currentField.Settings.isrequired = Value;
    this.cd.markForCheck();
  }

  removeElement(idx) {
    if (confirm('Are You Sure to delete this field')) {
      if (this.formFields[idx].Active) {
        const formcontrolid = this.formFields[idx].Settings.visaformcontrolidf;
        if (this.formFields[idx].Settings.visaformcontrolidf > 0) {
          const formcontrol = {
            formcontrolidf: this.formFields[idx].Settings.visaformcontrolidf,
            type: this.formFields[idx].type,
            visatypesectionmapidf: this.formFields[idx].visatypesectionmapidf,
            productidf: this.productidf
          };
          this.manageOneformService.CheckControlIfCondition(formcontrol).pipe(takeUntil(this.componentDestroyed$)).subscribe(getData => {
            if (getData.flag) {
              const delobj = {
                formcontrolidf: formcontrolid,
                type: this.formFields[idx].type,
                visatypesectionmapidf: this.formFields[idx].visatypesectionmapidf,
                productidf: this.productidf
              };
              this.Deleteformfields.push(delobj);
              this.changetab();
              //this.currentField = {};
              this.formFields.splice(idx, 1);
              this.cd.markForCheck();
            } else {
              this.mservice.generateMessage('ERROR', '', getData.message);
            }
          });
        } else {
          this.formFields.splice(idx, 1);
        }
      }
    }
  }

  CancelElement() {
    this.divSectionAdd = true;
    this.divaddcontrols = false;
    if (isPlatformBrowser(this._platformId)) {
      $('#divaddcontrols').hide();
      $('#mainProcessModel').show();
    }
    this.cd.markForCheck();
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // this.form.get('avatar').setValue(file);
    }
  }

  AddControlOption = function () {
    this.optiontext = '';
    this.controloptionid = 0;
    this.isconditional = false;
    this.helpblock = '';
    this.currentField.Settings.controloptionlist.push({
      optiontext: this.optiontext,
      controloptionid: this.controloptionid,
      helpblock: this.helpblock,
    });
    this.cd.markForCheck();
  };

  RemoveOption(index, option) {
    this.currentField.Settings.controloptionlist.splice(index, 1);
    if (option.controloptionid > 0) {
      const controloption = {
        controloptionid: option.controloptionid,
      };
      this.manageOneformService.DeleteFormControOption(controloption).pipe(takeUntil(this.componentDestroyed$)).subscribe(getData => {
        if (getData.flag) {
          this.cd.markForCheck();
          this.mservice.generateMessage('SUCCESS', '', getData.message);
        } else {
          this.mservice.generateMessage('ERROR', '', getData.message);
        }
      });
    }
    this.cd.markForCheck();
  }
  copyElement() {

  }
  copySubSection() {

  }
  copyPredefinedControlsection() {

  }
  copyPredefinedPageControl() {

  }
  AddBindcontrolfield() {

  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
