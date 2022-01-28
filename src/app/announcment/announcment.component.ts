import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Announcment } from '../models/announcment.model';
import { AnnouncmentService } from '../services/announcment.service';
import { SearchService } from '../services/search.service';


@Component({
  selector: 'app-announcment',
  templateUrl: './announcment.component.html',
  styleUrls: ['./announcment.component.css'],
  providers: [SearchService]
})
export class AnnouncmentComponent implements OnInit {

  @Input() announcment: Announcment;
  @Input() announcmentArray: Array<Announcment>;
  @Input() searched: boolean;
  @Output() onsimilalrAnnouncments = new EventEmitter<Array<Announcment>>();

  editOn: boolean = false;
  similarPressed: boolean = false;
  editBtnText: string = "Edit";
  similarBtnText: string = "Show similar";
  editedTitle: string;
  editedDescription: string;
  similarAnnouncments: Array<Announcment>;

  constructor(private announcmentService: AnnouncmentService, private searchService: SearchService) {

  }

  ngOnInit(): void {
    this.announcmentService.announcmentSubject.subscribe(item => {
      this.announcmentArray = item;
      this.searchService.showTopSimilar(this.announcment, item)
    })
    this.searchService.similarSubject.subscribe((item) => this.similarAnnouncments = item)
  }


  deleteAnnouncment(){
    //console.log(this.announcment.index)
    this.announcmentService.deleteAnnouncment(this.announcment.index);
  }

  showSimilar(){
    this.similarPressed = !this.similarPressed;
    this.searchService.showTopSimilar(this.announcment, this.announcmentArray)
    this.onsimilalrAnnouncments.emit(this.similarAnnouncments)
    this.similarPressed?this.similarBtnText= "Hide similar":this.similarBtnText= "Show similar";
  }
  editAnnouncmentMode(){
    this.editOn = !this.editOn;
    this.editedTitle = this.announcment.title;
    this.editedDescription = this.announcment.description;
    this.editOn?this.editBtnText= "Cancel edit":this.editBtnText= "Edit";
  }

  saveEdit(){
    this.announcment.title = this.editedTitle;
    this.announcment.description = this.editedDescription;

    this.announcmentService.editAnnouncment(this.announcment)
  }

}
