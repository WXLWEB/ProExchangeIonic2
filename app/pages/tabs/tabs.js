import {Page, NavParams} from 'ionic-angular';
import {MarketDataPage} from '../market-data/market-data';
import {ProTradePage} from '../pro-trade/pro-trade';
import {AccountPage} from '../account/account';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  static get parameters() {
    return [[NavParams]];
  }

  constructor(navParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;

    // set the root pages for each tab
    this.tab1Root = MarketDataPage;
    this.tab2Root = ProTradePage;
    this.tab3Root = AccountPage;
  }
}
