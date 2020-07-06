import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportIssueComponent } from './report-issue/report-issue.component';



const routes: Routes = [{ path: 'report-issue', component: ReportIssueComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportIssueRoutingModule { }
