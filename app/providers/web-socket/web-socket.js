import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
// import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import 'rxjs/add/operator/map';

/*
  Generated class for the WebSocket provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WebSocket {
  static get parameters(){
    return [[Http]]
  }

  constructor(http) {
    this.http = http;
    // this.ws = new $WebSocket('wss://pro-ws-staging.btcc.com:2012');
    this.data = null;
  }

  connectToWebsocket(){
    this.websocket = $WebSocket('wss://pro-ws-staging.btcc.com:2012')
  }

  load() {
    this.websocket = new WebSocket("ws://echo.websocket.org/"); //dummy echo websocket service
      this.websocket.onopen =  (evt) => {
          this.websocket.send("Hello World");
      };
      return Observable.create(observer=>{
          this.websocket.onmessage = (evt) => {
              observer.next(evt);
          };
      })
      .map(res=>"From WS: " + res.data)
      .share();
    // this.ws = new $WebSocket('wss://pro-ws-staging.btcc.com:2012');
    // console.log('WebSocket',this.ws);
    // this.ws.getDataStream().subscribe(
    //   res => {
    //     var count = JSON.parse(res.data).value;
    //     console.log('Got: ' + count);
    //     this.counter = count;
    //   },
    //   function(e) { console.log('Error: ' + e.message); },
    //   function() { console.log('Completed'); }
    // );
    // websocket.onOpen(function (msg) {
    //   console.log('websocket connection');
    //   if (angular.isDefined(reconnection)) {
    //     $interval.cancel(reconnection);
    //     reconnection = undefined;
    //   }
    // });
    // websocket.onMessage(function (message) {
    //   var data = message.data;
    //   data = JSON.parse(data);
    //   var type = data.MsgType;
    //   if(type != 'Heartbeat'){
    //     console.debug(data);
    //   }
    //   // switch (type) {
    //   //   case 'Heartbeat':
    //   //     break;
    //   //   case 'ErrorResponse':
    //   //     if (data.ResultCode == '0') {
    //   //       Session.setLogin(false);
    //   //     }
    //   //     $log.error('errorresponse:', data);
    //   //     break;
    //   //   // case 'GetRiskProfilesResponse':
    //   //   //   riskProfile.processIncoming(data);
    //   //   //   break;
    //   //   case 'AccountInfo':
    //   //     $log.debug("AccountInfo:", data);
    //   //     AccountInfo.processIncoming(data);
    //   //     var is_logged_in = (data.ResultCode === '0') || false;
    //   //     Session.setLogin(is_logged_in);
    //   //     break;
    //   //   case 'ExecReport':
    //   //     ExecReport.processIncoming(data);
    //   //     break;
    //   //   // case 'ExecTransactions':
    //   //   //   orderHistory.processIncoming(data);
    //   //   //   break;
    //   //   case 'Ticker':
    //   //     $log.debug("Ticker:", data);
    //   //     Ticker.processIncoming(data);
    //   //     // ExecReport.processIncoming({});
    //   //     // accountInfo.processIncoming();
    //   //     break;
    //   //   case 'ExecTrade':
    //   //     $log.debug("ExecTrade:", data);
    //   //     ExecTrade.processIncoming(data);
    //   //     break;
    //   //   case 'GetTradesResponse':
    //   //     $log.debug("GetTradesResponse:", data);
    //   //     ExecTrade.clearTrades();
    //   //     _.forEach(data.Trades, function (trade) {
    //   //       ExecTrade.processIncoming(trade);
    //   //     });
    //   //     break;
    //   //   // //case 'GetActiveContractsResponse':
    //   //   // //  $log.debug("GetActiveContractsResponse:", data);
    //   //   // //  ticker.activeContracts = data.Contracts;
    //   //   // //  break;
    //   //   // case 'MarketStatusChangedResponse':
    //   //   //   $log.debug("MarketStatusChangedResponse:",data);
    //   //   //   marketStatus.processIncoming(data);
    //   //   //   break;
    //   //   // case 'OrderCancelReject':
    //   //   //   execReport.processIncoming(data);
    //   //   //   break;
    //   //   case 'OrderBookResponse':
    //   //     $log.debug("OrderBookResponse:",data);
    //   //     OrderBookResponse.processIncoming(data,$rootScope.groupOrderbookArgs,$rootScope.groupMarketDepthArgs);
    //   //     break;
    //   //   default:
    //   //     $log.debug('have something no handle:' + JSON.stringify(data));
    //   // }
    // });
    // websocket.onError(function (msg) {
    //   console.log('websocket is disconnection');
    //
    //   console.error(msg);
    //   // $rootScope.$broadcast('wsClosed');
    // });
    // websocket.onClose(function (msg) {
    //   console.log('websocket is disconnection');
    //   // $rootScope.$broadcast('wsClosed');
    // });
  }
}
