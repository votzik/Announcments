import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Announcment } from './models/announcment.model';
import { AnnouncmentService } from './services/announcment.service';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ViewportScroller } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  announcmentList: Array<Announcment>;
  announcmentFound: Announcment;
  similarAnnouncment: Array<Announcment>;
  addForm: FormGroup;

  @ViewChild('result') scrollElement: ElementRef;


  search: string = '';
  addPressed: boolean = false;
  searchPressed: boolean = false;
  searchStarted: boolean = false;
  showPressed: boolean = false;
  announcmentDidFind: boolean = false;


  constructor(private announcmentService: AnnouncmentService, private formBuilder: FormBuilder, private scroller: ViewportScroller){
    this.addForm = formBuilder.group({
      "title": ["",[Validators.required, Validators.maxLength]],
      "description": ["", [Validators.required, Validators.maxLength]]
    })
  }
  ngOnInit() {
    this.announcmentService.announcmentSubject.subscribe((item) => this.announcmentList = item)
    this.announcmentService.searchSubject.subscribe((item) => this.announcmentFound = item)
    this.announcmentService.similarSubject.subscribe((item) => this.similarAnnouncment = item)
    this.announcmentService.initialAnnouncments()

  }
  ngOnDestroy(){
    this.announcmentService.announcmentSubject.unsubscribe();
    this.announcmentService.searchSubject.unsubscribe();
    this.announcmentService.similarSubject.unsubscribe();
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
    this.announcmentDidFind = this.announcmentService.searchAnnouncment(this.search)
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


  }

}
