import { Subject } from "rxjs";
import { Announcment } from "../models/announcment.model";

export class AnnouncmentService{
  announcmentList: Array<Announcment> = [];

  announcmentSubject: Subject<Array<Announcment>> = new Subject<Array<Announcment>>() ;

  initialAnnouncments(){
    this.announcmentList = [new Announcment(
      Date.now(),
      "Thanks",
      "Thanks for visiting kind stranger, pleasure to meet you",
      new Date(Date.now())
    ),
    new Announcment(
      Date.now() +1,
      "Also Thanks",
      "You can see the search really works",
      new Date(Date.now())
    ),
      ];
      this.announcmentSubject.next(this.announcmentList);

  }
  addAnnouncment(announcment: Announcment){
    this.announcmentList.push(announcment)
    //let newList = this.announcmentList.slice();
    this.announcmentSubject.next(this.announcmentList)
  }

  deleteAnnouncment(index: number){
    this.announcmentList = this.announcmentList.filter((item) => item.index != index)
    this.announcmentSubject.next(this.announcmentList)
  }

  editAnnouncment(announcment: Announcment){
    let index = this.announcmentList.findIndex(item => item.index == announcment.index)


    this.announcmentList[index] = new Announcment(
      announcment.index,
      announcment.title,
      announcment.description,
      announcment.date

    )
    this.announcmentSubject.next(this.announcmentList)
  }

}
