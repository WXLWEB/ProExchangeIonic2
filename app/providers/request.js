import {Injectable} from '@angular/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';
import {Signature} from './signature';

/*
  Generated class for the Request provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Request {
  static get parameters(){
    return [[Events]]
  }

  constructor(Events) {
    this.events = events;
    this.data = null;
  }
  send(param){
    console.log("sent param:", param);
    if (!_.has(param, 'Signature')) {
      param.Signature = _.spread(this.signature.getSignature)(_.valuesIn(param));
    }
    // return this.websocket.send(JSON.stringify(param));//TODO: add a then/error clause and log success/error
  }

}
