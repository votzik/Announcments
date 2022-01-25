import { BrowserModule} from '@angular/platform-browser';
import {FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AnnouncmentService } from './services/announcment.service';
import { AnnouncmentComponent } from './announcment/announcment.component';

@NgModule({
  declarations: [
    AppComponent,
    AnnouncmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AnnouncmentService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
