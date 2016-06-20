import {Page, NavParams} from 'ionic-angular';
import {MarketPage} from '../market/market';
import {ProTradePage} from '../pro-trade/pro-trade';
import {AccountPage} from '../account/account';
import {SchedulePage} from '../schedule/schedule';


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
    this.tab1Root = MarketPage;
    this.tab2Root = ProTradePage;
    this.tab3Root = SchedulePage;
  }
}
