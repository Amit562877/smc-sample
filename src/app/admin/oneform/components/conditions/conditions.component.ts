import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { Router } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { OneformConditionsService } from 'src/app/services/oneform-conditions.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthdataService } from 'src/app/auth/services/authdata.service';

declare const $: any;
@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConditionsComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  divConditionType: boolean;
  divConditions: boolean;
  divConditionDisplay: boolean;
  divConditionnotempty = true;

  ngOptionSecondValue = [];
  ConditionIcon = '';
  ConditionHeader = '';
  ConditionSubHeader = '';
  Conditionidf = 0;
  Conditionmapidf = 0;
  ProductID = 0;
  FilterSectionID = 0;
  ngSections = [];
  ngSectionControls = [];
  ngControlOptions = [];
  ngDOSectionControls = [];
  ngDOSectionControlsField = [];
  ngDOControlOptions = [];
  ControlIFcondtionmapping = [];
  ControlDOconditionmapping = [];

  ngVisaTypeList = [];

  ngConditionData: any;
  ngControlConditionmapping: any;
  ControlIFcondtionmappingDisplay: any;
  ControlDOconditionmappingDisplay: any;
  ngConditionType: any;
  ngConditionTypeAll: any;

  liSectionTarget: any;
  liFromTargetField: any;
  liToTargetField: any;
  liAlertMessage: any;
  liOkButton: any;
  liYesNoButton: any;
  liNoConditions: any;
  liYesConditions: any;
  liNoFromTargetField: any;
  liYesFromTargetField: any;
  liNoSection: any;
  liYesSection: any;

  ControlIFcondtionmappingtmp: any;
  ngConditionstatelist: any;
  ngAlertConditionType: any;

  ngControlData: any;
  ngSectionsList: any;
  ngSectionControlsList: any;
  ngControlOptionsList: any;

  ngData: any;
  ngConditions: any;

  ngSectionFilterControls: any;
  permissions: any = {};
  constructor(
    private conditionsService: OneformConditionsService,
    private router: Router,
    private mservice: ToastService,
    public loadService: LoaderService,
    @Inject(PLATFORM_ID) private _platformId: Object,
    private cd: ChangeDetectorRef,
    private adataservice: AuthdataService
  ) { }

  ngOnInit() {
    this.permissions = this.adataservice.getPermission('Conditions');
    this.ControlIFcondtionmapping.push({
      conditionmapid: 0, formcontrolmapidf: 0, conditionidf: 0, productidf: 0,
      sourcecontrolidf: 0, sourcecontroldrpid: '', SourceQuestion: '', SourceControlName: '', SourceType: '', SourceControlType: '',
      operatoridf: 0, ConditionStateType: '', ConditionStateName: '', target: 0, targetvalue: '', targetOptionvalue: '', targetoption: '',
      targetcontrolidf: 0, TargetQuestion: '', TargetControlName: '', TargetType: '', TargetControlType: '',
      sequence: 1, controljoinopt: '', companyidf: 0, branchidf: 0, ngConditionstate: [], ngOptionSecondValue: [],
      targetdays: '', targetbetweenvalue: '', targetbetweendays: ''
    });

    this.ControlDOconditionmapping.push({
      doconditionmapid: 0, formcontrolmapidf: 0, conditionidf: 0, productidf: 0, conditiontypeidf: 0, ConditionTypeName: '',
      targetfieldidf: 0, TargetQuestion: '', TargetControlName: '', TargetType: '', TargetControlType: '',
      targetsecondidf: 0, TargetsecondQuestion: '', TargetsecondControlName: '', TargetsecondType: '', TargetsecondControlType: '',
      sectionidf: 0, Targetsectionname: '', TargetDescription: '', sequence: 1, companyidf: 0, branchidf: 0,
      alertmessage: '', OkButton: 'OK', CancelButton: 'Cancel', NoButton: 'No', YesButton: 'Yes', IsNoButton: false, IsYesButton: false,
      NoConditiontypeidf: 0, NoConditionTypeName: '', NoConditiontargetfieldif: 0, NoConditionTargetQuestion: '',
      NoConditionTargetControlName: '', NoConditionTargetType: '', NoConditionTargetControlType: '',
      NoSectionidf: 0, NoTargetsectionname: '', YesConditiontypeidf: 0, YesConditionTypeName: '', YesConditiontargetfieldif: 0,
      YesConditionTargetQuestion: '', YesConditionTargetControlName: '', YesConditionTargetType: '', YesConditionTargetControlType: '',
      YesSectionidf: 0, YesTargetsectionname: ''
    });

    this.GetMasterList();
    this.GetAllConditionType();
    this.GetAllConditions('D');
    this.GetAllConditionsMaster();
    this.GetAllAlertConditionType(99);
    this.GetAllSectinsControls();
  }

  GetMasterList() {
    this.loadService.loadme = true;
    this.conditionsService.GetMasterList().pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag && data.outdatalist.length > 0) {
        if (data.outdatalist[0] !== null) {
          this.ngVisaTypeList = data.outdatalist[0];
        } else {
          this.ngVisaTypeList = [];
        }
        this.cd.markForCheck();
        this.loadService.loadme = false;
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', '', data.message);
      }
      this.cd.markForCheck();
    });
  }




  GetDatafromVisaType(type) {
    if (isPlatformBrowser(this._platformId)) {
      if (this.ProductID > 0) {
        $('#ulFilterField').removeClass('error');
      }
      else {
        $('#ulFilterField').addClass('error');
      }
      this.GetDatafrom_VisaType();
      this.GetAllConditions(type);

    }

  }


  GetDatafrom_VisaType() {
    this.GetAllSectinsControls();
  }

  GetAllConditions(type) {
    var productid = this.ProductID;
    this.loadService.loadme = true;
    this.conditionsService.GetConditions(productid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.ngConditionData = data.outdata;
        this.ngControlConditionmapping = this.ngConditionData._Controlconditionmapping;
        this.ControlIFcondtionmappingDisplay = this.ngConditionData._ControlIFcondtionmapping;
        this.ControlDOconditionmappingDisplay = this.ngConditionData._ControlDOconditionmapping;
        if (type == 'C') {
          if (this.ngControlConditionmapping.length > 0) {
            this.divConditionType = true;
            this.divConditions = false;
            this.divConditionDisplay = false;
            this.divConditionnotempty = true;
          }
          else {
            this.divConditionType = true;
            this.divConditions = false;
            this.divConditionDisplay = true;
            this.divConditionnotempty = false;
          }
        }
        else {
          if (this.ngControlConditionmapping.length > 0) {
            this.divConditionType = false;
            this.divConditions = false;
            this.divConditionDisplay = true;
            this.divConditionnotempty = false;
          }
          else {
            this.divConditionType = false;
            this.divConditions = false;
            this.divConditionDisplay = true;
            this.divConditionnotempty = false;
          }
        }
        this.cd.markForCheck();
        this.loadService.loadme = false;
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', '', data.message);
      }
    });
  }

  AddNewCondition = function () {
    this.divConditionType = true;
    this.divConditions = false;
    this.divConditionDisplay = false;
    this.divConditionnotempty = true;
    this.Conditionmapidf = 0;
    this.cd.markForCheck();
  }

  RemoveAndOrCondition(ControlIFcondtionmappingmap, index) {
    var applycon = 0;
    if (this.ControlIFcondtionmapping.length - 1 == index) {
      applycon = 1;
      this.ControlIFcondtionmapping[index - 1].controljoinopt = "";
    }
    this.ControlIFcondtionmapping.splice(index, 1);
    if (isPlatformBrowser(this._platformId)) {
      setTimeout(() => {
        $('#divRemoveIFButton' + (index + 1)).show();
        if (applycon == 1) {
          $('#divAndAddIFButton' + (index - 1)).show();
          $('#divORAddIFButton' + (index - 1)).show();
          $('#spnANDtag' + (index - 1)).show();
          $('#spnORtag' + (index - 1)).show();
        }
      }, 400);
      this.cd.markForCheck();
    }


  }

  AddAndCondition(ControlIFcondtionmappingmap, index) {
    ControlIFcondtionmappingmap.controljoinopt = 'AND';
    this.ControlIFcondtionmapping.push({
      conditionmapid: 0, formcontrolmapidf: 0, conditionidf: 0, productidf: 0,
      sourcecontrolidf: 0, sourcecontroldrpid: '', SourceQuestion: '', SourceControlName: '', SourceType: '', SourceControlType: '',
      operatoridf: 0, ConditionStateType: '', ConditionStateName: '', target: 0, targetvalue: '', targetOptionvalue: '', targetoption: '',
      targetcontrolidf: 0, TargetQuestion: '', TargetControlName: '', TargetType: '', TargetControlType: '',
      sequence: 1, controljoinopt: '', companyidf: 0, branchidf: 0, ngConditionstate: [], ngOptionSecondValue: [],
      targetdays: '', targetbetweenvalue: '', targetbetweendays: ''
    });
    setTimeout(() => {
      this.HideShowIFAndAddRemoveButton(index);
    }, 400);
    this.cd.markForCheck();
  }

  HideShowIFAndAddRemoveButton(index) {
    if (isPlatformBrowser(this._platformId)) {
      $('#divRemoveIFButton' + (index + 1)).show();
      $('#divAndAddIFButton' + (index)).hide();
      $('#divORAddIFButton' + (index)).hide();
      $('#spnANDtag' + (index)).hide();
      $('#spnORtag' + (index)).show();
      this.cd.markForCheck();
    }

  }

  AddOrCondition(ControlIFcondtionmappingmap, index) {
    ControlIFcondtionmappingmap.controljoinopt = 'OR';
    this.ControlIFcondtionmapping.push({
      conditionmapid: 0, formcontrolmapidf: 0, conditionidf: 0, productidf: 0,
      sourcecontrolidf: 0, sourcecontroldrpid: '', SourceQuestion: '', SourceControlName: '', SourceType: '', SourceControlType: '',
      operatoridf: 0, ConditionStateType: '', ConditionStateName: '', target: 0, targetvalue: '', targetOptionvalue: '', targetoption: '',
      targetcontrolidf: 0, TargetQuestion: '', TargetControlName: '', TargetType: '', TargetControlType: '',
      sequence: 1, controljoinopt: '', companyidf: 0, branchidf: 0, ngConditionstate: [], ngOptionSecondValue: [],
      targetdays: '', targetbetweenvalue: '', targetbetweendays: ''
    });
    setTimeout(() => {
      this.HideShowIFAndAddRemoveButton(index);
    }, 400);
    this.cd.markForCheck();
  }

  BacktoCondition = function () {
    this.divConditionType = false;
    this.divConditions = false;
    this.divConditionDisplay = true;
    this.divConditionnotempty = true;
    if (this.ngControlConditionmapping.length > 0) {
      this.divConditionnotempty = true;
    }
    else {
      this.divConditionnotempty = false;
    }
    this.cd.markForCheck();
  }

  GetDatafromSectionID() {
    if (this.FilterSectionID > 0) {
      this.ngSectionControls = this.ngDOSectionControls.filter(value => {
        return value.sectionidf === this.FilterSectionID
      });

      this.ngControlOptions = this.ngDOControlOptions.filter(value => {
        return value.sectionidf === this.FilterSectionID;
      });
    }
    else {
      this.ngSectionControls = this.ngDOSectionControls.filter(value => {
        return value.productidf === this.ProductID;
      });
      this.ngControlOptions = this.ngDOControlOptions.filter(value => {
        return value.productidf === this.ProductID;
      });
    }
    this.cd.markForCheck();
  }

  EditCondition(ngControlConditionmappingtmp) {
    this.ProductID = ngControlConditionmappingtmp.productidf;
    this.FilterSectionID = 0;
    this.GetDatafrom_VisaType();
    this.GetDatafromSectionID();

    this.ngConditionType = this.ngConditionTypeAll.filter(value => {
      return value.conditionidf === ngControlConditionmappingtmp.conditionidf;
    });

    if (ngControlConditionmappingtmp.ConditionShortName == 'P') {
      this.liSectionTarget = true;
      this.liFromTargetField = false;
    }
    else {
      this.liSectionTarget = false;
      this.liFromTargetField = true;
    }

    if (ngControlConditionmappingtmp.ConditionShortName == 'C') {
      this.liToTargetField = true;
    }
    else {
      this.liToTargetField = false;
    }

    if (ngControlConditionmappingtmp.ConditionShortName == 'A') {
      this.liSectionTarget = false;
      this.liFromTargetField = false;
      this.liAlertMessage = true;
      this.liOkButton = false;
      this.liYesNoButton = false;
      this.liNoConditions = false;
      this.liYesConditions = false;
      this.liNoFromTargetField = false;
      this.liYesFromTargetField = false;
      this.liNoSection = false;
      this.liYesSection = false;
    }
    else {
      this.liAlertMessage = false;
      this.liOkButton = false;
      this.liYesNoButton = false;
      this.liNoConditions = false;
      this.liYesConditions = false;
      this.liNoFromTargetField = false;
      this.liYesFromTargetField = false;
      this.liNoSection = false;
      this.liYesSection = false;
    }

    this.ConditionIcon = ngControlConditionmappingtmp.ConditionIcon;
    this.ConditionHeader = ngControlConditionmappingtmp.ConditionName;
    this.ConditionSubHeader = ngControlConditionmappingtmp.ConditionSubHeader;

    this.Conditionmapidf = ngControlConditionmappingtmp.formcontrolmapid;
    this.divConditionType = false;
    this.divConditions = true;
    this.divConditionDisplay = false;
    this.divConditionnotempty = false;

    this.ControlIFcondtionmappingtmp = this.ControlIFcondtionmappingDisplay.filter(value => {
      return value.formcontrolmapidf === ngControlConditionmappingtmp.formcontrolmapid;
    });
    for (var i = 0; i < this.ControlIFcondtionmappingtmp.length; i++) {
      var tmpcontroltype = this.ControlIFcondtionmappingtmp[i].SourceControlType;
      var tmpformcontrolid = this.ControlIFcondtionmappingtmp[i].sourcecontrolidf;

      this.ControlIFcondtionmappingtmp[i].ngConditionstate = this.ngConditionstatelist.filter(value => {
        return value.controltype === tmpcontroltype;
      });

      if (isPlatformBrowser(this._platformId)) {
        if (tmpcontroltype == 'D' || tmpcontroltype == 'R' || tmpcontroltype == 'C') {

          $("#liConditionTarget" + i).hide();
          $("#liSecondValue" + i).hide();
          $("#liOptionSecondValue" + i).show();
          $("#liSecondField" + i).hide();
        }
        else if (tmpcontroltype == 'T') {
          $("#liConditionTarget" + i).show();
          $("#liSecondValue" + i).show();
          $("#liOptionSecondValue" + i).hide();
        }
      }



      tmpformcontrolid = parseInt(tmpformcontrolid);
      this.ControlIFcondtionmappingtmp[i].ngOptionSecondValue = this.ngControlOptions.filter(value => {
        return value.formcontrolid === tmpformcontrolid;
      });
    }

    this.ControlIFcondtionmapping = this.ControlIFcondtionmappingDisplay.filter(value => {
      return value.formcontrolmapidf === ngControlConditionmappingtmp.formcontrolmapid;
    });

    this.ControlDOconditionmapping = this.ControlDOconditionmappingDisplay.filter(value => {
      return value.formcontrolmapidf === ngControlConditionmappingtmp.formcontrolmapid;
    });

    if (isPlatformBrowser(this._platformId)) {
      setTimeout(() => {
        for (var i = 0; i < this.ControlIFcondtionmapping.length; i++) {
          this.ShowHideSecondCondition(this.ControlIFcondtionmapping[i], i);
          if (i != this.ControlIFcondtionmapping.length - 1) {
            $("#divRemoveIFButton" + (i + 1)).show();
            $("#divAndAddIFButton" + (i)).hide();
            $("#divORAddIFButton" + (i)).hide();
            $("#spnANDtag" + (i)).hide();
            $("#spnORtag" + (i)).hide();
          }
        }
      }, 400);
      setTimeout(() => {
        for (var i = 0; i < this.ControlDOconditionmapping.length; i++) {
          this.HideShowYesNoControls(this.ControlDOconditionmapping[i]);
          this.ShowHideNoConditionsControl(this.ControlDOconditionmapping[i].IsNoButton);
          this.ShowHideYesConditionsControl(this.ControlDOconditionmapping[i].IsYesButton);
          this.SetNoDoCondition(this.ControlDOconditionmapping[i]);
          this.SetYesDoCondition(this.ControlDOconditionmapping[i]);

        }
      }, 400);
    }
    this.cd.markForCheck();
  }

  ShowHideSecondCondition(ControlIFcondtionmappingtmp, index) {
    var t = ControlIFcondtionmappingtmp.sourcecontroldrpid.split('_');
    if (isPlatformBrowser(this._platformId)) {
      if (t[1] == 'D' || t[1] == 'R' || t[1] == 'C') {
        $("#liSecondField" + index).hide();
        $("#liSecondValue" + index).hide();
        $("#liConditionTarget" + index).hide();
        $("#liOptionSecondValue" + index).show();
      }
      else {
        $("#liOptionSecondValue" + index).hide();
        $("#liConditionTarget" + index).show();
        if (ControlIFcondtionmappingtmp.target == '2') {
          $("#liSecondField" + index).show();
          $("#liSecondValue" + index).hide();
        }
        else {
          $("#liSecondValue" + index).show();
          $("#liSecondField" + index).hide();
        }
      }
    }
    this.cd.markForCheck();
  }

  HideShowYesNoControls(tmpControlDOconditionmapping) {
    let conditiontypeavalue = tmpControlDOconditionmapping.conditiontypeidf;
    let conditiontypename = $.grep(this.ngConditionType, function (com) {
      return com.conditiontypeid == conditiontypeavalue;
    })[0].name;
    this.liOkButton = false;
    this.liYesNoButton = false;
    if (conditiontypename == 'Confirmation') {
      this.liOkButton = false;
      this.liYesNoButton = true;
    }
    else if (conditiontypename == 'Warning' || conditiontypename == 'Information') {
      this.liOkButton = true;
      this.liYesNoButton = false;
      this.liNoConditions = false;
      this.liYesConditions = false;
      this.liNoFromTargetField = false;
      this.liYesFromTargetField = false;
      this.liNoSection = false;
      this.liYesSection = false;
    }
    this.cd.markForCheck();
  }

  ShowHideNoConditionsControl(isnobutton) {
    if (isnobutton) {
      this.liNoConditions = true;
      this.liNoFromTargetField = false;
      this.liNoSection = false;
    }
    else {
      this.liNoConditions = false;
      this.liNoFromTargetField = false;
      this.liNoSection = false;
    }
    this.cd.markForCheck();
  }

  ShowHideYesConditionsControl(isYesbutton) {
    if (isYesbutton) {
      this.liYesConditions = true;
      this.liYesFromTargetField = false;
      this.liYesSection = false;
    }
    else {
      this.liYesConditions = false;
      this.liYesFromTargetField = false;
      this.liYesSection = false;
    }
    this.cd.markForCheck();
  }

  SetNoDoCondition(tmpControlDOconditionmapping) {
    if (tmpControlDOconditionmapping.NoConditiontypeidf > 0) {
      var NoConditiontypeidf = tmpControlDOconditionmapping.NoConditiontypeidf;
      var Alertconditiontypename = $.grep(this.ngAlertConditionType, function (com) {
        return com.conditiontypeid == NoConditiontypeidf;
      })[0].name;

      if (Alertconditiontypename == 'Skip Field') {
        this.liNoFromTargetField = true;
        this.liNoSection = false;
      }
      else {
        this.liNoFromTargetField = false;
        this.liNoSection = true;
      }
    }
    else {
      this.liNoFromTargetField = false;
      this.liNoSection = false;
    }
    this.cd.markForCheck();
  }


  SetYesDoCondition(tmpControlDOconditionmapping) {
    if (tmpControlDOconditionmapping.YesConditiontypeidf > 0) {
      var YesConditiontypeidf = tmpControlDOconditionmapping.YesConditiontypeidf;
      var Alertconditiontypename = $.grep(this.ngAlertConditionType, function (com) {
        return com.conditiontypeid == YesConditiontypeidf;
      })[0].name;

      if (Alertconditiontypename == 'Skip Field') {
        this.liYesFromTargetField = true;
        this.liYesSection = false;
      }
      else {
        this.liYesFromTargetField = false;
        this.liYesSection = true;
      }
    }
    else {
      this.liYesFromTargetField = false;
      this.liYesSection = false;
    }
    this.cd.markForCheck();
  }

  GetAllSectinsControls() {
    var productid = this.ProductID;
    this.loadService.loadme = true;
    this.conditionsService.GetSectionFormControlOption(productid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.ngControlData = data.outdata;
        this.ngSectionsList = this.ngControlData.listDynamicApplicantVisaType;
        this.ngSectionControlsList = this.ngControlData.listDynamicApplicantformControl;
        this.ngControlOptionsList = this.ngControlData.listDynamicApplicantControlOption;
        this.ngConditionstatelist = this.ngControlData.listConditionState;

        this.ngSections = this.ngSectionsList.filter(value => {
          return value.productidf === this.ProductID;
        });

        this.ngSectionControls = this.ngSectionControlsList.filter(value => {
          return value.productidf === this.ProductID;
        });

        this.ngControlOptions = this.ngControlOptionsList.filter(value => {
          return value.productidf === this.ProductID;
        });

        this.ngDOSectionControls = this.ngSectionControlsList.filter(value => {
          return value.productidf === this.ProductID;
        });

        this.ngDOSectionControlsField = this.ngSectionControlsList.filter(value => {
          return value.productidf === this.ProductID;
        });

        this.ngDOControlOptions = this.ngControlOptionsList.filter(value => {
          return value.productidf === this.ProductID;
        });
        this.loadService.loadme = false;
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', 'FAILED', 'Some Error Occured');
      }
      this.cd.markForCheck();
    });
  }


  GetAllConditionsMaster() {
    this.loadService.loadme = true;
    this.conditionsService.GetMasterConditions().pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.ngData = data.outdata;
        this.ngConditions = this.ngData.conditionlist;
        this.loadService.loadme = false;
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', 'FAILED', 'Load Failed');
      }
      this.cd.markForCheck();
    });
  }

  ShowHidedivcondition(page, ngConditionstmp) {

    if (this.ProductID > 0) {
      if (isPlatformBrowser(this._platformId)) {
        $('#ulFilterField').removeClass('error');
      }

      this.Conditionmapidf = 0;
      this.divConditions = true;
      this.divConditionType = false;

      this.ngConditionType = this.ngConditionTypeAll.filter(value => {
        return value.conditionidf === ngConditionstmp.id;
      });

      this.ConditionIcon = ngConditionstmp.imageicon;
      this.ConditionHeader = ngConditionstmp.name;
      this.ConditionSubHeader = ngConditionstmp.displaytext;
      this.Conditionidf = ngConditionstmp.id;

      this.ControlIFcondtionmapping = [];
      this.ControlIFcondtionmapping.length = 0;
      this.ControlIFcondtionmapping.push({
        conditionmapid: 0, formcontrolmapidf: 0, conditionidf: 0, productidf: 0,
        sourcecontrolidf: 0, sourcecontroldrpid: '', SourceQuestion: '', SourceControlName: '', SourceType: '', SourceControlType: '',
        operatoridf: 0, ConditionStateType: '', ConditionStateName: '', target: 0, targetvalue: '', targetOptionvalue: '', targetoption: '',
        targetcontrolidf: 0, TargetQuestion: '', TargetControlName: '', TargetType: '', TargetControlType: '',
        sequence: 1, controljoinopt: '', companyidf: 0, branchidf: 0, ngConditionstate: [], ngOptionSecondValue: [],
        targetdays: '', targetbetweenvalue: '', targetbetweendays: ''
      });


      this.ControlDOconditionmapping = [];
      this.ControlDOconditionmapping.length = 0;
      this.ControlDOconditionmapping.push({
        doconditionmapid: 0, formcontrolmapidf: 0, conditionidf: 0, productidf: 0, conditiontypeidf: 0, ConditionTypeName: '',
        targetfieldidf: 0, TargetQuestion: '', TargetControlName: '', TargetType: '', TargetControlType: '',
        targetsecondidf: 0, TargetsecondQuestion: '', TargetsecondControlName: '', TargetsecondType: '', TargetsecondControlType: '',
        sectionidf: 0, Targetsectionname: '', TargetDescription: '', sequence: 1, companyidf: 0, branchidf: 0,
        alertmessage: '', OkButton: 'OK', CancelButton: 'Cancel', NoButton: 'No', YesButton: 'Yes', IsNoButton: false, IsYesButton: false,
        NoConditiontypeidf: 0, NoConditionTypeName: '', NoConditiontargetfieldif: 0, NoConditionTargetQuestion: '',
        NoConditionTargetControlName: '', NoConditionTargetType: '', NoConditionTargetControlType: '',
        NoSectionidf: 0, NoTargetsectionname: '', YesConditiontypeidf: 0, YesConditionTypeName: '', YesConditiontargetfieldif: 0,
        YesConditionTargetQuestion: '', YesConditionTargetControlName: '', YesConditionTargetType: '', YesConditionTargetControlType: '',
        YesSectionidf: 0, YesTargetsectionname: ''
      });

      var i = 0;
      if (isPlatformBrowser(this._platformId)) {
        $("#liConditionTarget" + i).hide();
        $("#liSecondValue" + i).hide();
        $("#liOptionSecondValue" + i).hide();
        $("#liSecondField" + i).hide();
      }


      if (ngConditionstmp.shortname == 'P') {
        this.liFromTargetField = false;
        this.liSectionTarget = true;
      }
      else {
        this.liSectionTarget = false;
        this.liFromTargetField = true;
      }
      //alert(ngConditionstmp.shortname);
      if (ngConditionstmp.shortname == 'A') {
        this.liSectionTarget = false;
        this.liFromTargetField = false;
        this.liAlertMessage = true;
        this.liOkButton = false;
        this.liYesNoButton = false;
        this.liNoConditions = false;
        this.liYesConditions = false;
        this.liNoFromTargetField = false;
        this.liYesFromTargetField = false;
        this.liNoSection = false;
        this.liYesSection = false;
      }
      else {
        this.liAlertMessage = false;
        this.liOkButton = false;
        this.liYesNoButton = false;
        this.liNoConditions = false;
        this.liYesConditions = false;
        this.liNoFromTargetField = false;
        this.liYesFromTargetField = false;
        this.liNoSection = false;
        this.liYesSection = false;
      }

      if (ngConditionstmp.shortname == 'C') {
        this.liToTargetField = true;
      }
      else {
        this.liToTargetField = false;
      }
      this.cd.markForCheck();
    }
    else {
      if (isPlatformBrowser(this._platformId)) {
        $('#ulFilterField').addClass('error');
      }

    }
  }

  GetConditionState(ControlIFcondtionmappingtmp, index) {
    var t = ControlIFcondtionmappingtmp.sourcecontroldrpid.split('_');
    ControlIFcondtionmappingtmp.SourceControlType = t[1];
    ControlIFcondtionmappingtmp.ngConditionstate = this.ngConditionstatelist.filter(value => {
      return value.controltype === t[1];
    });

    //alert(ControlIFcondtionmappingtmp.SourceControlType);
    if (isPlatformBrowser(this._platformId)) {
      if (t[1] == 'D' || t[1] == 'R' || t[1] == 'C') {
        $("#liConditionTarget" + index).hide();
        $("#liSecondValue" + index).hide();
        $("#liOptionSecondValue" + index).show();
        $("#liSecondField" + index).hide();
        ControlIFcondtionmappingtmp.target = 0;
      }
      else if (t[1] == 'T') {
        $("#liConditionTarget" + index).show();
        $("#liSecondValue" + index).show();
        $("#liOptionSecondValue" + index).hide();
      }
      else if (t[1] == 'DT') {
        $("#liConditionTarget" + index).show();
        $("#liSecondValue" + index).show();
        $("#liOptionSecondValue" + index).hide();
      }
    }


    var tmpformcontrolid = parseInt(t[0]);
    ControlIFcondtionmappingtmp.ngOptionSecondValue = this.ngControlOptions.filter(value => {
      return value.formcontrolid === tmpformcontrolid;
    });
    this.cd.markForCheck();
  }

  BacktoConditionType() {
    this.divConditions = false;
    this.divConditionType = true;
    if (this.ngControlConditionmapping.length > 0) {
      this.divConditionnotempty = true;
    }
    else {
      this.divConditionnotempty = false;
    }
    this.cd.markForCheck();
  }

  InsertUpdateConditions() {
    this.loadService.loadme = true;
    for (var i = 0; i < this.ControlIFcondtionmapping.length; i++) {
      var sourcecontrolidf = this.ControlIFcondtionmapping[i].sourcecontroldrpid.split('_')[0];
      var sourcecontroltype = this.ControlIFcondtionmapping[i].sourcecontroldrpid.split('_')[1];
      this.ControlIFcondtionmapping[i].sourcecontrolidf = sourcecontrolidf;
      if (sourcecontroltype == 'D' || sourcecontroltype == 'C' || sourcecontroltype == 'R') {
        var targetOptionvalue = this.ControlIFcondtionmapping[i].targetOptionvalue;
        var optiontext = $.grep(this.ControlIFcondtionmapping[i].ngOptionSecondValue, function (com) {
          return com.optiontext == targetOptionvalue;
        })[0].optiontext;
        this.ControlIFcondtionmapping[i].targetoption = optiontext;
      }
      else {
        this.ControlIFcondtionmapping[i].targetoption = '';
      }
    }
    let targetfeild = this.ControlDOconditionmapping[0].targetfieldidf;

    this.ngSectionFilterControls = this.ngSectionControlsList.filter(value => {
      return value.formcontrolid === targetfeild;
    });

    if (this.FilterSectionID !== this.ngSectionFilterControls[0].sectionidf) {
      this.ControlDOconditionmapping[0].sectionidf = this.FilterSectionID;
    }


    var param = {
      Visatypeidf: this.ProductID,
      Conditionidf: this.Conditionidf,
      Conditionmapidf: this.Conditionmapidf,
      objIFmapping: this.ControlIFcondtionmapping,
      objDoMapping: this.ControlDOconditionmapping,
    }

    this.conditionsService.InsertUpdateConditions(param).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.loadService.loadme = false;
        this.mservice.generateMessage('SUCCESS', '', data.message);
        this.GetAllConditions('D');
        this.cd.markForCheck();
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', '', data.message);
      }
    });

  }


  GetAllConditionType() {
    this.loadService.loadme = true;
    this.conditionsService.GetAllConditionType().pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.ngConditionTypeAll = data.outdata;
        this.cd.markForCheck();
        this.loadService.loadme = false;
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', '', data.message);
      }
    });
  }

  GetAllAlertConditionType(Conditionid) {
    this.loadService.loadme = true;
    this.conditionsService.GetConditionType(Conditionid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.ngAlertConditionType = data.outdata;
        this.cd.markForCheck();
        this.loadService.loadme = false;
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', '', data.message);
      }
    });
  }

  DeleteCondition(ngControlConditionmappingtmp) {

    this.Conditionmapidf = ngControlConditionmappingtmp.formcontrolmapid;
    this.loadService.loadme = true;
    this.conditionsService.DeleteCondition(this.Conditionmapidf).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.mservice.generateMessage('SUCCESS', '', data.message);
        this.GetAllConditions('D');
        this.cd.markForCheck();
        this.loadService.loadme = false;
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', '', data.message);
      }
    });
  }

  SetNoCondition(tmpControlDOconditionmapping) {
    this.ShowHideNoConditionsControl(tmpControlDOconditionmapping.IsNoButton);
  }

  SetYesCondition(tmpControlDOconditionmapping) {
    this.ShowHideYesConditionsControl(tmpControlDOconditionmapping.IsYesButton);
  }

  SetYesButtonName(tmpControlDOconditionmapping, index) {
    if (isPlatformBrowser(this._platformId)) {
      tmpControlDOconditionmapping.YesButton = $('#btnYes' + index)[0].innerText;
      this.cd.markForCheck();
    }

  }

  SetNoButtonName(tmpControlDOconditionmapping, index) {
    if (isPlatformBrowser(this._platformId)) {
      tmpControlDOconditionmapping.NoButton = $('#btnNo' + index)[0].innerText;
      this.cd.markForCheck();
    }

  }

  SetOkButtonName(tmpControlDOconditionmapping, index) {
    if (isPlatformBrowser(this._platformId)) {
      tmpControlDOconditionmapping.OkButton = $('#btnOk' + index)[0].innerText;
      this.cd.markForCheck();
    }


  }

  ShowHideTarget(ControlIFcondtionmappingtmp, index) {
    //operatoridf
    var t = ControlIFcondtionmappingtmp.sourcecontroldrpid.split('_');
    if (isPlatformBrowser(this._platformId)) {

      if (t[1] == 'D' || t[1] == 'R' || t[1] == 'C') {
        $("#liConditionTarget" + index).hide();
      }
      else {
        $('#liConditionTarget' + index).show();
      }
      this.cd.markForCheck();
    }
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
