import { Component, Input, OnInit } from '@angular/core';
import { Announcment } from '../models/announcment.model';
import { AnnouncmentService } from '../services/announcment.service';

@Component({
  selector: 'app-announcment',
  templateUrl: './announcment.component.html',
  styleUrls: ['./announcment.component.css']
})
export class AnnouncmentComponent implements OnInit {

  constructor(private announcmentService: AnnouncmentService) { }

  ngOnInit(): void {
  }

  @Input() announcment: Announcment;
  @Input() searched: boolean;
  editOn: boolean = false;
  editBtnText: string = "Edit";
  editedTitle: string;
  editedDescription: string;

  deleteAnnouncment(){
    console.log(this.announcment.index)
    this.announcmentService.deleteAnnouncment(this.announcment.index);
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
