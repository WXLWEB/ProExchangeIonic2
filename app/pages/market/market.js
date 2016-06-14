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
    this.marketList = [];
    this.getAllMaketApiTickerData();
  }

  getAllMaketApiTickerData() {
    return this.marketData.getMaketApi().then(data => {
      data.ticker.forEach(api =>{
         this.marketData.getTickerData(api).then(obj =>{
           this.marketList.push(obj);
           console.log("TickerData:",this.marketList);
        });
      });
    });
  }

}
