import {Page, NavController} from 'ionic-angular';
import {MarketData} from '../../providers/market-data';

/*
  Generated class for the MarketPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/market/market.html',
})
export class MarketPage {
  static get parameters() {
    return [[NavController],[MarketData]];
  }

  constructor(nav,marketData) {
    this.nav = nav;
    this.marketData = marketData;
    this.BTCC_Pro_XBTCNY = this.getProMarketTicker();
  }

  getProMarketTicker(){
    return this.marketData.getTickerData('https://pro-data.btcc.com/data/pro/ticker?symbol=XBTCNY');
  }
}
