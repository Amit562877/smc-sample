import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportIssueRoutingModule } from './report-issue-routing.module';
import { ReportIssueComponent } from './report-issue/report-issue.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ReportIssueComponent],
  imports: [
    CommonModule,
    ReportIssueRoutingModule,
    SharedModule
  ]
})
export class ReportIssueModule { }
