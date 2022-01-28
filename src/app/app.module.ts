import { BrowserModule} from '@angular/platform-browser';
import {FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AnnouncmentService } from './services/announcment.service';
import { AnnouncmentComponent } from './announcment/announcment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SearchService } from './services/search.service';

@NgModule({
  declarations: [
    AppComponent,
    AnnouncmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [AnnouncmentService, FormBuilder, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
