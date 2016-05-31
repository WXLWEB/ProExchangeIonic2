import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the OrderbookPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/orderbook/orderbook.html',
})
export class OrderbookPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }
}
