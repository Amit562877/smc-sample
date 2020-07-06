import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VisachecklistService } from 'src/app/services/visachecklist.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visa-checklist',
  templateUrl: './visa-checklist.component.html',
  styleUrls: ['./visa-checklist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisaChecklistComponent implements OnInit {
  documentid: any;
  servicedocumentlist: any;
  servicedocuments = false;
  constructor(
    public visaService: VisachecklistService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  componentDestroyed$: Subject<boolean> = new Subject();
  ngOnInit() {
    this.route.params.pipe(takeUntil(this.componentDestroyed$)).subscribe(params => {
      this.documentid = params.documentid.toString();
    });
    this.getservicedocumentslist();
  }
  getservicedocumentslist() {
    // const productid = this.documentid.slice(1);
    const pid = parseInt(this.documentid);
    this.visaService.getservicedocumentlist(54, pid ? pid : 0).pipe(takeUntil(this.componentDestroyed$)).subscribe(data => {
      this.servicedocumentlist = data.outdatalist[0];
      if (this.servicedocumentlist.length > 0) {
        this.servicedocuments = true;
      } else {
        this.servicedocuments = false;
      }
      this.cd.markForCheck();
    });
  }
}
