import {Page, NavController} from 'ionic-angular';
import {WebSocket} from '../../providers/web-socket';
import {Request} from '../../providers/request';

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
    return [[NavController], [WebSocket], [Request]];
  }

  constructor(nav, websocket, request) {
    this.nav = nav;
    this.webSocket = websocket;
    this.request = request;
    this.platform = 'xbtcny';
    this.webSocket.connectToWebsocket();
    this.sendGetTradesRequest("XBTCNY");
    this.sendGetQuoteRequest("XBTCNY");
    this.sendGetQuoteRequest("BPICNY");
  }

  sendGetTradesRequest(contract) {
    var data = this.request.createGetTradesRequest(20,contract);
    this.webSocket.send(data);
  }

  //send getQuoteRequest
  sendGetQuoteRequest(contract) {
    var data = this.request.createQuoteRequest(contract,'2')
    this.webSocket.send(data);
  }

  sendGetOrdersRequest() {
    var request1 = this.request.createGetOrdersRequest('0', Date.now().toString(), "A,0,1,2");
    this.webSocket.send(request1);
    var request2 = this.request.createGetOrdersRequest((Date.now()-1000*60*60*24).toString(), (Date.now()+1000*60*60*24).toString(), "3,S");
    this.webSocket.send(request2);
  };

}
