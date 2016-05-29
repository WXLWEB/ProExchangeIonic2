import {Injectable} from '@angular/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';


/*
  Generated class for the GetSignature provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Signature {
  static get parameters(){
    return [[Events]]
  }

  constructor(Events) {
    this.events = events;
    this.data = null;
  }

  getSignature(){
    var joinStr = Array.prototype.join.call(arguments, '');
    var shaObj = new jsSHA(joinStr, "TEXT");
    var hmac = shaObj.getHMAC(accountInfo.accountKey, "TEXT", "SHA-1", "HEX");
    return hmac;
  }

}
