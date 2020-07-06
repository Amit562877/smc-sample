import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternalEmailRoutingModule } from './internal-email-routing.module';
import { InboxComponent } from './components/inbox/inbox.component';
import { ComposeboxComponent } from './components/composebox/composebox.component';
import { EmailListComponent } from './components/email-list/email-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewMailComponent } from './components/view-mail/view-mail.component';


@NgModule({
  declarations: [InboxComponent, ComposeboxComponent, EmailListComponent, ViewMailComponent],
  imports: [
    CommonModule,
    InternalEmailRoutingModule,
    SharedModule
  ]
})
export class InternalEmailModule { }
