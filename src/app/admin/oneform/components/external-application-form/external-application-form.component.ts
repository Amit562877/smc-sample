import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ExternalApplicationFormService } from '../../services/external-application-form.service';
import { ActivatedRoute } from '@angular/router';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare const $: any;
@Component({
  selector: 'app-external-application-form',
  templateUrl: './external-application-form.component.html',
  styleUrls: ['./external-application-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExternalApplicationFormComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  productid: number;
  sectionlist: any;
  sectionname = '';
  isactive = true;
  ismultiple = false;
  sectionparentidf = 0;
  sectionid = 0;
  dragElements: any;
  formFields: any;
  divaddcontrols = false;
  divSectionAdd = true;
  currentField: any;
  fieldSettingTabFlag = false;
  displaySectionRecords = true;
  AddSectionId = false;
  guid = 1;
  Deleteformfields = [];
  currentid: any;
  sortableOptions: any;
  validationFlag = true;
  addSectionForm: FormGroup;
  submitted = false;

  constructor(
    private externalApplicationFormService: ExternalApplicationFormService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mservice: ToastService,
    public loadService: LoaderService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef
  ) { }

  dropSection(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    let cnt = 1;
    for (let i = 0; i < this.sectionlist.length; i++) {
      this.sectionlist[i].sequence = cnt;
      cnt++;
    }
    this.externalApplicationFormService.updateApplicationformSectionSequence(this.sectionlist).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.GetAllExternalSectionList();
      this.cd.markForCheck();
    });
  }
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

  ngOnInit() {

    this.currentField = this.createNewField();

    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.productid = params.productid.toString();
      this.cd.markForCheck();
    });
    this.addSectionForm = this.formBuilder.group({
      sectionname: ['', Validators.required],
      isactive: ['', [Validators.nullValidator]],
      ismultiple: ['', [Validators.nullValidator]]
    });
    this.GetAllExternalSectionList();
  }

  get fval() {
    return this.addSectionForm.controls;
  }
  GetAllExternalSectionList() {
    this.externalApplicationFormService.getAllExternalSectionList(this.productid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag && data.outdatalist[0]) {
        this.sectionlist = data.outdatalist[0];
        this.sectionlist = this.sectionlist.filter(value => {
          return value.sectionparentidf === 0;
        });
      }
      else {
        this.sectionlist = [];
      }
      this.cd.markForCheck();
    });
  }
  AddNewSection() {
    this.ClearField();
    this.displaySectionRecords = false;
    this.AddSectionId = true;
    this.cd.markForCheck();
  }

  SaveSection() {
    this.submitted = true;
    if (this.addSectionForm.invalid) {
      return;
    }
    const payload = {
      sectionname: this.sectionname,
      productidf: this.productid,
      sectionparentidf: this.sectionparentidf,
      sequence: 1,
      isactive: this.isactive,
      ismultiple: this.ismultiple,
      sectionid: this.sectionid
    };

    this.externalApplicationFormService.saveSection(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.mservice.generateMessage('SUCCESS', '', data.message);
        this.ClearField();
        this.GetAllExternalSectionList();
        this.cd.markForCheck();
      } else {
        this.mservice.generateMessage('ERROR', '', data.message);
      }
    });
  }
  EditSection(section) {
    this.sectionid = section.sectionid;
    this.productid = section.productidf;
    this.sectionname = section.sectionname;
    this.ismultiple = section.ismultiple;
    this.isactive = section.isactive;
    this.AddSectionId = true;
    this.displaySectionRecords = false;
    this.cd.markForCheck();
  }
  ClearField() {
    this.submitted = false;
    this.sectionid = 0;
    this.AddSectionId = false;
    this.displaySectionRecords = true;
    this.sectionname = '';
    this.ismultiple = false;
    this.isactive = true;
    this.cd.markForCheck();
  }
  ManageControls(sec) {
    this.sectionname = sec.sectionname;
    this.sectionid = sec.sectionid;
    this.productid = sec.productidf;
    this.GetDragElement();
    this.GetFormControl(sec.sectionid);
    this.divSectionAdd = false;
    this.divaddcontrols = true;
    this.cd.markForCheck();
  }
  GetDragElement() {
    this.dragElements =
      [{
        Name: 'Question',
        type: 'question',
        ControlTypeId: 1,

      }, {
        Name: 'SubSection',
        type: 'section',
        ControlTypeId: 1,
      },
        // {
        //   Name: 'HtmlDisplay Editor',
        //   type: 'displayeditor',
        //   ControlTypeId: 7,
        // },
        // {
        //   Name: 'Line',
        //   type: 'line',
        //   ControlTypeId: 8,
        // }

      ];
  }
  GetFormControl(sectionid) {
    this.externalApplicationFormService.editFormControl(sectionid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.formFields = data.outdata;
      } else {
        this.formFields = [];
      }
      this.cd.markForCheck();
    });
  }
  AddElement(ele, idx) {
    this.currentField.Active = false;
    this.currentField = this.createNewField();
    this.currentField.isrequired = true;
    this.currentField.ismultiple = false;
    _.merge(this.currentField, ele);

    if (this.formFields == null) {
      this.formFields = [];
    }

    if (typeof idx === 'undefined') {
      this.formFields.push(this.currentField);
    } else {
      if (isPlatformBrowser(this._platformId)) {
        this.formFields.splice(idx, 0, this.currentField);
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
  createNewField() {
    return {
      id: ++this.guid,
      sequence: this.guid,
      ismultiple: false,
      sectionid: this.sectionid,
      isrequired: false,
      questionid: 0,
      productidf: this.productid
    };
  }
  SaveElement() {
    this.loadService.loadme = true;
    const svm = {
      svm: this.formFields,
      deleteformfield: this.Deleteformfields
    };

    this.externalApplicationFormService.addFormControl(svm).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.mservice.generateMessage('SUCCESS', '', data.message);
        this.GetFormControl(this.sectionid);
        this.cd.markForCheck();
      }
      this.loadService.loadme = false;
    });
  }
  CancelElement() {
    this.divSectionAdd = true;
    this.divaddcontrols = false;
    this.cd.markForCheck();
    this.GetAllExternalSectionList();
  }
  RemoveElement(idx) {
    if (confirm('Are You Sure to delete this field')) {
      this.loadService.loadme = true;
      if (this.formFields[idx]) {
        const formcontrolid = this.formFields[idx].questionid;
        if (this.formFields[idx].questionid > 0) {
          const delobj = {
            questionid: formcontrolid,
            type: this.formFields[idx].type,
            sectionid: this.formFields[idx].sectionid
          };
          this.Deleteformfields.push(delobj);
          this.Changetab();
          this.currentField = {};
          this.formFields.splice(idx, 1);
          this.loadService.loadme = false;
        } else {
          this.formFields.splice(idx, 1);
          this.loadService.loadme = false;
        }
        this.cd.markForCheck();
      } else {
        this.loadService.loadme = false;
      }
    }
  }
  ActiveField(f) {

    this.fieldSettingTabFlag = true;
    this.currentField.Active = false;
    this.currentField = f;
    this.currentid = this.currentField.id;
    f.Active = true;
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

  Changetab() {
    if (isPlatformBrowser(this._platformId)) {
      this.fieldSettingTabFlag = false;
      $('#addFieldTab').show();
      $('#fieldSettingTab').hide();
      $('#addFeildLI').addClass('active');
      $('#addFieldTab_lnk').addClass('text-white');
      $('#feildSettingLI').removeClass('active');
      $('#fieldSettingTab_lnk').removeClass('text-white');
    }
    this.cd.markForCheck();
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
