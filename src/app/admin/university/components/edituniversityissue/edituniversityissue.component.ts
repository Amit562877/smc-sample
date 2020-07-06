import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthdataService } from 'src/app/auth/services/authdata.service';
import { EncDecService } from 'src/app/shared/services/enc-dec.service';
import { UniversityService } from '../../services/university.service';
declare const $: any;
@Component({
  selector: 'app-edituniversityissue',
  templateUrl: './edituniversityissue.component.html',
  styleUrls: ['./edituniversityissue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EdituniversityissueComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  universityid: any;
  universitydetails = []
  countrylist = []
  universitytypelist = []
  city = []
  state = []
  tablecampusdetails = []
  brochuredetails = []
  campusname: any;
  address: any;
  type: any;
  vtour: any;
  phoneno: any;
  campusid: any;
  cricosproviderno: any
  fileupload: any
  islogoedit = false;
  formData = new FormData();
  frmData = new FormData();
  brochurefile: any;
  myFiles = []
  filedescription = [];
  ccity: any;
  cstate: any;
  country: any;
  campusoverview: any;
  longitude: any;
  latitude: any;
  postcode: any;
  constructor(
    private adataservice: AuthdataService,
    private uservice: UniversityService,
    public loadService: LoaderService,
    private mservice: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private encdec: EncDecService,
  ) { }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.universityid = this.encdec.convertText('dec', params.universityid.toString());
      this.cd.markForCheck();
      //console.log("this.universityid", this.universityid)
    });
    this.getuniversity()
    // this.loadService.loadme=true;



  }
  getuniversity() {
    this.uservice.getuniversitybyid(this.universityid).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.universitydetails = (data.outdatalist[0] !== 'No Data Found') ? JSON.parse(data.outdatalist[0]) : [];
        this.countrylist = (data.outdatalist[1] !== 'No Data Found') ? JSON.parse(data.outdatalist[1]) : [];
        this.universitytypelist = (data.outdatalist[2] !== 'No Data Found') ? JSON.parse(data.outdatalist[2]) : [];
        this.tablecampusdetails = (data.outdatalist[3] !== 'No Data Found') ? JSON.parse(data.outdatalist[3]) : [];
        this.city = (data.outdatalist[4] !== 'No Data Found') ? JSON.parse(data.outdatalist[4]) : [];
        this.state = (data.outdatalist[5] !== 'No Data Found') ? JSON.parse(data.outdatalist[5]) : [];
        // this.brochuredetails=(data.outdatalist[6] !== 'No Data Found')?JSON.parse(data.outdatalist[6]):[]

        this.cd.markForCheck();

      }
    })

  }
  opencontactinfoModal(campusid, cname, cricosprovidercode, address, city, state, country, overview, long, lat, postcode) {

    this.campusname = cname;
    this.address = address;
    this.campusid = campusid;
    this.cricosproviderno = cricosprovidercode
    this.ccity = city;
    this.cstate = state;
    this.country = country;
    this.campusoverview = overview;
    this.longitude = long;
    this.latitude = lat;
    this.postcode = postcode;

    $('#myModal').modal('toggle');

  }
  savecontactinfo() {
    this.uservice.savecontactdetails(this.campusid, this.campusname, this.address, this.universityid,
      this.cricosproviderno, this.ccity, this.cstate, this.campusoverview, this.longitude, this.latitude, this.postcode).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {

        if (data.flag == true) {
          $("#myModal").modal('hide');
          this.loadService.loadme = false;
          this.phoneno = "";
          this.mservice.generateMessage('SUCCESS', 'Contact info Update successfully', '');
          this.getuniversity();

          this.cd.markForCheck();

        } else {
          this.loadService.loadme = false;
          this.mservice.generateMessage('ERROR', data.message, 'FAILED');
        }
      })

  }
  clearall() {
    $("#myModal").modal('hide');

  }
  public trackByIndex(index: number) {
    return index;
  }
  setPhoto(event) {
    this.fileupload = this.universitydetails[0].logourl;
    this.islogoedit = true;
    this.formData.append('file', event.target.files[0]);
    this.formData.append('universityid', this.universityid);
    this.formData.append('oldunivpath', this.fileupload);

  }
  // addbrochure() {
  //   const brochure: any = {};

  //    brochure.path =File;
  //    brochure.description = '';
  //    //this.brochuredetails=brochure;
  //    this.brochuredetails.push(brochure);

  //   //this.brochuredetails[2].description.push('')

  //   this.cd.markForCheck();
  // }
  // removebrochure(index) {
  //   this.brochuredetails.splice(index, 1);

  //   this.cd.markForCheck();
  // }


  saveuniversity() {

    // console.log("FILE2==>",event.target.files[1])
    if (this.islogoedit == true) {
      this.uservice.savelogo(this.formData).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag == true) {
          this.universitydetails[0].logourl = "";
          this.mservice.generateMessage('SUCCESS', 'Universitylogo updated successfully', '');

        } else {
          this.mservice.generateMessage('False', 'Please check universitylogo not updated', '');
        }
      })
    }
    //console.log(this.universitydetails)
    this.uservice.saveuniversitydetails(this.universityid, this.universitydetails[0]).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag == true) {
        this.mservice.generateMessage('SUCCESS', 'UniversityDetails updated successfully ', '')
        this.getuniversity();
      } else {
        this.mservice.generateMessage('FALSE', 'Not updated', '');
      }
    })
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

}
