import {Injectable} from '@angular/core';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {Observable} from 'rxjs/Rx';
import {Request} from '../request';
import {Signature} from '../signature';
import {OrderBookData} from '../orderbook-data';
var _ = require('lodash');

/*
  Generated class for the WebSocket provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WebSocket {
  static get parameters(){
    return [[Request],[Signature],[OrderBookData]]
  }

  constructor(http, request, signature,orderBookData) {
    this.http = http;
    this.request = request;
    this.signature = signature;
    this.orderBookData = orderBookData;
    // this.ws = new $WebSocket('wss://pro-ws-staging.btcc.com:2012');
    this.data = null;
    this.ws = new $WebSocket("wss://pro-ws-staging.btcc.com:2012"); //dummy echo websocket services
  }

  connectToWebsocket() {
    console.log('websocket:',this.ws);
    // this.ws.send("Hello");
    this.ws.onOpen(function (msg) {
      console.log('websocket connection');
      // if (angular.isDefined(reconnection)) {
      //   $interval.cancel(reconnection);
      //   reconnection = undefined;
      // }
    });
    this.ws.onMessage(function (message) {
      var data = message.data;
      data = JSON.parse(data);
      console.log('data:',data);
      var type = data.MsgType;
      if(type != 'Heartbeat'){
        // console.debug(data);
      }
      switch (type) {
        case 'Heartbeat':
          break;
        case 'ErrorResponse':
          if (data.ResultCode == '0') {
            session.setLogin(false);
          }
          console.log('errorresponse:', data);
          break;
        case 'GetRiskProfilesResponse':
          riskProfile.processIncoming(data);
          break;
        case 'ExecTransactions':
          orderHistory.processIncoming(data);
          break;
        case 'ExecTrade':
          console.log("ExecTrade:", data);
          ExecTrade.processIncoming(data);
          break;
        // case 'GetTradesResponse':
        //   console.log("GetTradesResponse:", data);
        //   ExecTrade.clearTrades();
        //   _.forEach(data.Trades, function (trade) {
        //     ExecTrade.processIncoming(trade);
        //   });
        //   break;

        case 'MarketStatusChangedResponse':
          console.log("MarketStatusChangedResponse:",data);
          marketStatus.processIncoming(data);
          break;
        case 'OrderCancelReject':
          execReport.processIncoming(data);
          break;
        case 'QuoteResponse':
          console.log("QuoteResponse:",data);
          this.orderBookData.clearOrderBook();
          this.orderBookData.processIncoming(data.OrderBook);
          // Ticker.processIncoming(data.Ticker);
          break;
        case 'OrderBook':
          console.log("OrderBook:",data.OrderBook)
          OrderBook.processIncoming(data.OrderBook,$rootScope.groupOrderbookArgs,$rootScope.groupMarketDepthArgs);
        case 'Ticker':
          console.log("Ticker:", data);
          Ticker.processIncoming(data);
          execReport.processIncoming({});
          accountInfo.processIncoming();
          break;
        case 'LoginResponse':
          console.log("LoginResponse:",data);
          break;
        case 'GetAccountInfoResponse':
          console.log("GetAccountInfoResponse",data);
          break;
        case 'AccountInfo':
          console.log("AccountInfo:", data);
          accountInfo.processIncoming(data);
          riskProfile.processIncoming(data);
          var is_logged_in = (data.ResultCode === '0') || false;
          session.setLogin(is_logged_in);
          break;
        case 'GetOrdersResponse':
          console.log('GetOrdersResponse:',data);
          execReport.processIncoming(data);
          break;
        case 'ExecReport':
          console.log("ExecReport:", data);
          execReport.processIncoming(data);
          break;
        default:
          console.log('have something no handle Msgtype:',type);
          console.log('have something no handle:',JSON.stringify(data));
      }

    });
    this.ws.onError(function (msg) {
      console.log('websocket is disconnection');

      console.error(msg);
      // $rootScope.$broadcast('wsClosed');
    });
    this.ws.onClose(function (msg) {
      console.log('websocket is disconnection');
      // $rootScope.$broadcast('wsClosed');
    });
  }

  send(param){
    console.log("sent param:", param);
    // if (!_.has(param, 'Signature')) {
    //   param.Signature = _.spread(this.signature.getSignature)(_.valuesIn(param));
    // }
    return this.ws.send(JSON.stringify(param));//TODO: add a then/error clause and log success/error
  }
}
