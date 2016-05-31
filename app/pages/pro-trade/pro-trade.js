import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the ProTradePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/pro-trade/pro-trade.html',
})
export class ProTradePage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
    this.platform = 'xbtcny';
  }
}
