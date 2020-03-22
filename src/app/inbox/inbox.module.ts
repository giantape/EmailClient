import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxRoutingModule } from './inbox-routing.module';
import { HomeComponent } from './home/home.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { EmailReplayComponent } from './email-replay/email-replay.component';
import { EmailCreateComponent } from './email-create/email-create.component';
import { EmailIndexComponent } from './email-index/email-index.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [HomeComponent, EmailShowComponent, EmailReplayComponent, EmailCreateComponent, EmailIndexComponent, PlaceholderComponent, NotFoundComponent],
  imports: [
    CommonModule,
    InboxRoutingModule
  ]
})
export class InboxModule { }
