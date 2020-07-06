import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangelogRoutingModule } from './changelog-routing.module';
import { ChangelogComponent } from './components/changelog/changelog.component';
import { ChangelogResponseComponent } from './components/changelog-response/changelog-response.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ChangelogComponent,
    ChangelogResponseComponent,
  ],
  imports: [
    CommonModule,
    ChangelogRoutingModule,
    SharedModule
  ]
})
export class ChangelogModule { }
