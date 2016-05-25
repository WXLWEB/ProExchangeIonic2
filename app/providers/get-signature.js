import {Injectable} from '@angular/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';


/*
  Generated class for the GetSignature provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GetSignature {
  static get parameters(){
    return [[Events]]
  }

  constructor(Events) {
    this.events = events;
    this.data = null;
  }

  
}
