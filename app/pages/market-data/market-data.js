import {Page, NavController, Modal} from 'ionic-angular';
import {ScheduleFilterPage} from '../schedule-filter/schedule-filter';

/*
  Generated class for the MarketDataPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/market-data/market-data.html',
})
export class MarketDataPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
  }

  presentFilter() {
    let modal = Modal.create(ScheduleFilterPage, this.excludeTracks);
    this.nav.present(modal);

    modal.onDismiss(data => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });

  }
}
