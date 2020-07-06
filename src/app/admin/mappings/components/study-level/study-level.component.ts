import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/message/loader.service';
import { ToastService } from 'src/app/shared/services/message/toast.service';
import { StudylevelService } from '../../services/studylevel.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthdataService } from 'src/app/auth/services/authdata.service';

@Component({
  selector: 'app-study-level',
  templateUrl: './study-level.component.html',
  styleUrls: ['./study-level.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyLevelComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  constructor(
    private studyService: StudylevelService,
    public loadService: LoaderService,
    private mservice: ToastService,
    private cd: ChangeDetectorRef,
    private adataservice: AuthdataService,
  ) { }

  studylevellist: any = [];
  substudylevellistoriginal: any = [];
  substudylevellist: any = [];
  levelname: '';
  showme = 1;
  records = 10;
  permissions: any = {};
  ngOnInit() {
    this.permissions = this.adataservice.getPermission('Study level/Mapping');
    this.getAllSubLevels();
  }
  getAllSubLevels() {
    this.loadService.loadme = true;
    this.studyService.getSubLevel(this.records, this.showme).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.substudylevellist = [];
        this.substudylevellistoriginal = data.outdatalist[0];
        this.substudylevellistoriginal.forEach(element => {
          let elmdata = element;
          if (elmdata.studylevelid === 0) {
            elmdata.studylevelid = '';
          }
          this.substudylevellist.push(elmdata);
        });
        this.studylevellist = data.outdatalist[1];
        this.loadService.loadme = false;
        this.cd.markForCheck();
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
      }
    });
  }
  addStudyLevel(form) {
    if (form.valid) {
      this.loadService.loadme = true;
      this.studyService.addStudyLevel(this.levelname).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
        if (data.flag) {
          if (data.outdata > 0) {
            this.studylevellist.push({ id: data.outdata, name: this.levelname });
            this.levelname = '';
            this.cd.markForCheck();
          } else if (data.outdata === -1) {
            this.mservice.generateMessage('ERROR', 'FAILED', 'Study level with this name is already exists.');
          }
          this.loadService.loadme = false;
        } else {
          this.loadService.loadme = false;
          this.mservice.generateMessage('ERROR', 'FAILED', data.message);
        }
      });
    }
  }
  addStudyLevelMappings() {
    this.loadService.loadme = true;
    this.studyService.addStudyLevelMapping(this.substudylevellist).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      if (data.flag) {
        this.loadService.loadme = false;
      } else {
        this.loadService.loadme = false;
        this.mservice.generateMessage('ERROR', 'FAILED', data.message);
      }
      this.cd.markForCheck();
    });
  }
  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
