import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { SMCAuthService } from 'src/app/auth/services/auth.service';
import { ProfileSetupService } from '../../services/profile-setup.service';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSetupComponent implements OnInit {
  componentDestroyed$: Subject<boolean> = new Subject();
  countrylist: any;
  usertypelist: any;
  userdata: any;
  userdetails: any;
  password = '';
  cpassword = '';
  uid: any;
  cpassflag = false;
  passflag = false;
  formData = new FormData();
  isAvtarDiv = false;
  avtarList = [];
  selectedAvtar: any;
  constructor(
    private mservice: ToastService,
    private aservice: SMCAuthService,
    private profileService: ProfileSetupService,
    private adataservice: AuthdataService,
    private cd: ChangeDetectorRef,
    private encdec: EncDecService,
    private loadservice: LoaderService
  ) { }

  ngOnInit() {
    this.loadservice.loadme = true;
    this.setUserInfo();
    this.getCountryList();
    this.getUserDetails();
  }
  getCountryList() {
    this.aservice.getCountries().pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.countrylist = data.outdatalist[0];
        this.usertypelist = data.outdatalist[1];
        this.cd.markForCheck();
      } else {
        this.mservice.generateMessage('ERROR', data.message, '');
      }
    });
  }
  getUserDetails() {
    this.profileService.getProfileDetails(this.encdec.encryptSensitive(this.uid.toString())).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.userdetails = (data.outdatalist[0] && data.outdatalist[0].length > 0) ? data.outdatalist[0][0] : [];
        this.avtarList = (data.outdatalist[1] && data.outdatalist[1].length > 0) ? data.outdatalist[1] : [];
        this.loadservice.loadme = false;
        this.cd.markForCheck();
      }
    });
  }
  setUserInfo() {
    this.userdata = (this.adataservice.getUserData() != '' && this.adataservice.getUserData() != null) ? (this.adataservice.getUserData()[0]) : '';
    if (this.userdata) {
      this.uid = this.userdata.uid;
      this.cd.markForCheck();
    }
  }
  checkCpassword() {
    this.cpassflag = (this.password != this.cpassword) ? true : false;
    this.cd.markForCheck();
  }
  checkPassword() {
    this.cpassflag = (this.password != this.cpassword) ? true : false;
    this.cd.markForCheck();
  }
  saveDetails(editform) {
    if (editform.valid && this.cpassflag === false) {
      if (this.password !== '') {
        this.userdetails.password = this.password;
      }
      this.insertDetails();
    }

  }
  insertDetails() {
    this.loadservice.loadme = true;
    const payload = {
      uid: this.encdec.encryptSensitive(this.uid.toString()),
      username: this.userdetails.username,
      password: this.userdetails.password,
      typeofaccount: 0,
      signuptype: 0,
      firstname: this.userdetails.firstname,
      middlename: this.userdetails.middlename,
      lastname: this.userdetails.lastname,
      email: this.userdetails.email,
      phoneno: this.userdetails.phoneno,
      countryid: this.userdetails.countryid,
      isactive: 1,
      isdelete: 0
    };
    this.profileService.setProfileDetails(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.cd.markForCheck();
      }
      this.loadservice.loadme = false;
    });
  }
  setProfilePhoto(event) {
    this.loadservice.loadme = true;
    this.formData.append('userid', this.encdec.encryptSensitive(this.uid));
    this.formData.append('file', event.target.files[0]);
    this.profileService.setProfilePhoto(this.formData).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.userdetails.imgpath = data.outdata;
        this.cd.markForCheck();
        this.mservice.generateMessage('SUCCESS', 'Profile photo updated', '');
      }
      this.loadservice.loadme = false;
    });
  }
  removeProfilePhoto() {
    this.userdetails.imgpath = '';
    this.cd.markForCheck();
    this.updateProfilePhoto();
  }
  updateProfilePhoto() {
    this.loadservice.loadme = true;
    const payload = {
      imgpath: this.userdetails.imgpath,
      userid: this.encdec.encryptSensitive(this.uid.toString())
    };
    this.profileService.updateProfilePhoto(payload).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.cd.markForCheck();
        this.mservice.generateMessage('SUCCESS', 'Profile photo updated', '');
      }
      this.loadservice.loadme = false;
    });
  }
  chooseAvtar() {
    this.isAvtarDiv = true;
    this.cd.markForCheck();
  }
  selectAvtar(avtar) {
    this.selectedAvtar = avtar;
    this.userdetails.imgpath = avtar.imgpath;
    this.cd.markForCheck();
  }
  isActiveAvtar(avtar) {
    this.cd.markForCheck();
    return (avtar === this.selectedAvtar) ? true : false;
  }
  closeAvtar() {
    this.isAvtarDiv = false;
  }
}
