import { Subject } from "rxjs";
import { Announcment } from "../models/announcment.model";

export class AnnouncmentService{
  announcmentList: Array<Announcment> = [];

  announcmentSubject: Subject<Array<Announcment>> = new Subject<Array<Announcment>>() ;
  searchSubject: Subject<Announcment> = new Subject<Announcment>() ;
  similarSubject: Subject<Array<Announcment>> = new Subject<Array<Announcment>>() ;

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

  stringWordMatch(str1: string, str2: string) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    let wordArray = [];
    let uniqueWordArray = [];

    for (let i of str1.split(" ")) {
      i = i.replace(/[^a-zа-я0-9\s+]/gi, "");
      if (i) wordArray.push(i);
    }

    uniqueWordArray = wordArray.filter(
      (item, index, array) => array.indexOf(item) === index
    );

    for (let i of uniqueWordArray) {
      if (str2.includes(i)) {
        return true;
      }
    }
  }
  similarSearch(announcment: Announcment, announcmentArray: Array<Announcment>){
    let similarArray = announcmentArray.filter(item => this.stringWordMatch(announcment.title, item.title) &&
    this.stringWordMatch(announcment.description, item.description))
    return similarArray;
  }

  searchAnnouncment(title: string){
    let searchResult = this.announcmentList.find((item) =>  this.stringWordMatch(title, item.title) )
    if(searchResult){
      this.searchSubject.next(searchResult)

      let similarArray = this.similarSearch(searchResult,
        this.announcmentList.filter((item) => item.index != searchResult.index)).slice(0,3)
      this.similarSubject.next(similarArray)
      return true;
    }
    else{
      this.similarSubject.next([])
      return false;
    }
  }

}
