import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export interface ILoader {
    show: boolean;
  }
  
  
  @Injectable({
    providedIn: 'root'
  })
  export class LoaderService {
  
    private loaderSubject = new Subject<ILoader>();
    loaderState = this.loaderSubject.asObservable();
    constructor() { }
    show() {
      this.loaderSubject.next(<ILoader>{ show: true });
    }
    hide() {
      this.loaderSubject.next(<ILoader>{ show: false });
    }
  }