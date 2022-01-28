import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Announcment } from './models/announcment.model';
import { AnnouncmentService } from './services/announcment.service';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ViewportScroller } from "@angular/common";
import {MatSnackBar} from '@angular/material/snack-bar';
import {SearchService} from"./services/search.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SearchService]
})
export class AppComponent implements OnInit {

  announcmentList: Array<Announcment>;
  announcmentFound: Announcment;
  similarAnnouncment: Array<Announcment>;
  addForm: FormGroup;


  search: string = '';
  addPressed: boolean = false;
  searchPressed: boolean = false;
  searchStarted: boolean = false;
  showPressed: boolean = true;
  announcmentDidFind: boolean = false;


  constructor(private announcmentService: AnnouncmentService,
    private formBuilder: FormBuilder,
    private scroller: ViewportScroller,
    private snackBar: MatSnackBar,
    private searchService: SearchService){
    this.addForm = formBuilder.group({
      "title": ["",[Validators.required, Validators.maxLength]],
      "description": ["", [Validators.required, Validators.maxLength]]
    })
  }
  ngOnInit() {

    this.announcmentService.announcmentSubject.subscribe((item) => {
      this.announcmentList = item
      if(this.searchStarted)
      this.announcmentDidFind = this.searchService.searchAnnouncment(this.search, this.announcmentList)
      })
    this.searchService.searchSubject.subscribe((item) => this.announcmentFound = item)
    this.searchService.similarSubject.subscribe((item) => this.similarAnnouncment = item)
    this.announcmentService.initialAnnouncments()

  }
  ngOnDestroy(){
    this.announcmentService.announcmentSubject.unsubscribe();
    this.searchService.searchSubject.unsubscribe();
    this.searchService.similarSubject.unsubscribe();
  }

  showAnnouncments(){
    this.showPressed = !this.showPressed;
  }



  addMenu(){
    this.addPressed = !this.addPressed;
  }

  searchMenu(){
    this.searchPressed = !this.searchPressed;
  }

  searchAnnouncment(){
    this.searchStarted = true;
    this.announcmentDidFind = this.searchService.searchAnnouncment(this.search, this.announcmentList)

    this.scroller.scrollToAnchor("result");
  }

  addAnnouncment(){
    //console.log(this.addForm);
    let index = Date.now();
    let announcment: Announcment = new Announcment(
      index,
      this.addForm.value.title,
      this.addForm.value.description
      ,new Date(Date.now())
      );


    this.announcmentService.addAnnouncment(announcment);
    this.showPressed = true;
    this.scroller.scrollToAnchor("show");
    this.snackBar.open("Announcment added", "Close",{
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
    });


  }

}
