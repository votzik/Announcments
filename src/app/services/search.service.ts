import { Subject } from "rxjs";
import { Announcment } from "../models/announcment.model";

export class SearchService{
  searchSubject: Subject<Announcment> = new Subject<Announcment>() ;
  similarSubject: Subject<Array<Announcment>> = new Subject<Array<Announcment>>() ;

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

  showTopSimilar(announcment: Announcment, announcmentArray: Array<Announcment>){
    let similarArray = this.similarSearch(announcment,
      announcmentArray.filter((item) => item.index != announcment.index)).slice(0,3)
    this.similarSubject.next(similarArray)
  }

  searchAnnouncment(title: string, announcmentArray: Array<Announcment>){
    let searchResult = announcmentArray.find((item) =>  this.stringWordMatch(title, item.title) )
    if(searchResult){
      this.searchSubject.next(searchResult);
      this.showTopSimilar(searchResult, announcmentArray);
      return true;
    }
    else{
      this.similarSubject.next([])
      return false;
    }
  }
}
