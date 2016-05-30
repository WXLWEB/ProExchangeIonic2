import {Injectable} from '@angular/core';

/*
  Generated class for the GetSignature provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Signature {
  static get parameters(){
    return []
  }

  constructor() {
    this.data = null;
  }

  getSignature(){
    var joinStr = Array.prototype.join.call(arguments, '');
    var shaObj = new jsSHA(joinStr, "TEXT");
    var hmac = shaObj.getHMAC(accountInfo.accountKey, "TEXT", "SHA-1", "HEX");
    return hmac;
  }

  getUniqueID(){
    // always start with a letter (for DOM friendlyness)
    var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
    do {
      // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
      var ascicode = Math.floor((Math.random() * 42) + 48);
      if (ascicode < 58 || ascicode > 64) {
        // exclude all chars between : (58) and @ (64)
        idstr += String.fromCharCode(ascicode);
      }
    } while (idstr.length < 32);

    return idstr;
  }

}
