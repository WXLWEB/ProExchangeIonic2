import {Injectable} from '@angular/core';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {Observable} from 'rxjs/Rx';
import {Request} from '../request';
import {Signature} from '../signature';
var _ = require('lodash');

/*
  Generated class for the WebSocket provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WebSocket {
  static get parameters(){
    return [[Request],[Signature]]
  }

  constructor(http, request, signature) {
    this.http = http;
    this.request = request;
    this.signature = signature;
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
        console.debug(data);
      }
      // switch (type) {
      //   case 'Heartbeat':
      //     break;
      //   case 'ErrorResponse':
      //     if (data.ResultCode == '0') {
      //       session.setLogin(false);
      //     }
      //     $log.error('errorresponse:', data);
      //     break;
      //   case 'GetRiskProfilesResponse':
      //     riskProfile.processIncoming(data);
      //     break;
      //   case 'ExecTransactions':
      //     orderHistory.processIncoming(data);
      //     break;
      //   case 'ExecTrade':
      //     $log.debug("ExecTrade:", data);
      //     ExecTrade.processIncoming(data);
      //     break;
      //   case 'GetTradesResponse':
      //     $log.debug("GetTradesResponse:", data);
      //     ExecTrade.clearTrades();
      //     _.forEach(data.Trades, function (trade) {
      //       ExecTrade.processIncoming(trade);
      //     });
      //     break;
      //   //case 'GetActiveContractsResponse':
      //   //  $log.debug("GetActiveContractsResponse:", data);
      //   //  Ticker.activeContracts = data.Contracts;
      //   //  break;
      //   case 'MarketStatusChangedResponse':
      //     $log.debug("MarketStatusChangedResponse:",data);
      //     marketStatus.processIncoming(data);
      //     break;
      //   case 'OrderCancelReject':
      //     execReport.processIncoming(data);
      //     break;
      //   case 'QuoteResponse':
      //     $log.debug("QuoteResponse:",data);
      //     OrderBook.clearOrderBook();
      //     OrderBook.processIncoming(data.OrderBook,$rootScope.groupOrderbookArgs,$rootScope.groupMarketDepthArgs);
      //     Ticker.processIncoming(data.Ticker);
      //     break;
      //   case 'OrderBook':
      //     $log.debug("OrderBook:",data.OrderBook)
      //     OrderBook.processIncoming(data.OrderBook,$rootScope.groupOrderbookArgs,$rootScope.groupMarketDepthArgs);
      //   case 'Ticker':
      //     $log.debug("Ticker:", data);
      //     Ticker.processIncoming(data);
      //     execReport.processIncoming({});
      //     accountInfo.processIncoming();
      //     break;
      //   case 'LoginResponse':
      //     $log.debug("LoginResponse:",data);
      //     break;
      //   case 'GetAccountInfoResponse':
      //     $log.debug("GetAccountInfoResponse",data);
      //     break;
      //   case 'AccountInfo':
      //     $log.debug("AccountInfo:", data);
      //     accountInfo.processIncoming(data);
      //     riskProfile.processIncoming(data);
      //     var is_logged_in = (data.ResultCode === '0') || false;
      //     session.setLogin(is_logged_in);
      //     break;
      //   case 'GetOrdersResponse':
      //     $log.debug('GetOrdersResponse:',data);
      //     execReport.processIncoming(data);
      //     break;
      //   case 'ExecReport':
      //     $log.debug("ExecReport:", data);
      //     execReport.processIncoming(data);
      //     break;
      //   default:
      //     $log.debug('have something no handle Msgtype:',type);
      //     $log.debug('have something no handle:',JSON.stringify(data));
      // }
      //
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
