import {Injectable} from '@angular/core';
import {Storage, LocalStorage, Events} from 'ionic-angular';


@Injectable()
export class OrderBookData {
  static get parameters(){
    return [[Events]];
  }

  constructor(events) {
    this.events = events;
    this.orderbook = {
      ask:[],
      bid:[],
      askData:{},
      bidData:{},
      version:0
    }
  }

  processIncoming(data){
    console.debug("Orderbooks:", data);
    var that = this;
    if(data.Type === "F"){
      that.version = data.Version;
      that.askData = {};
      that.bidData = {};
      //divide the ask or bid orders
      _.forEach(data.List, function (n, key) {
        if(n.Side === "1"){
            that.bidData[n.Price] = {Price: n.Price, Quantity: n.Size};
            return;
        }
        if(n.Side === "2"){
            that.askData[n.Price] = {Price: n.Price, Quantity: n.Size};
        }
      })
      return;
    }

    if(data.Type === "I"){
      // if version = 32767
      if (data.Version >= 32767){
        that.version = 0;
      }else{
        that.version++;
      };
      // check if orderbook.version + 1 = version
      // if not do new quote request
      if(that.version !== data.Version){
          $log.debug('wrong version!',data.Symbol);
          // $rootScope.$broadcast('SendQuoteRequest',data.Symbol);
          return;
      };
      //divide the ask or bid orders
      _.forEach(data.List, function (n, key) {
        if(n.Side == "1"){
          var obj = that.bidData[n.Price];
          if(obj == null){
              that.bidData[n.Price] = {Price: n.Price, Quantity: n.Size};
              return;
          }
          var qty = obj.Quantity + n.Size;
          if(qty <= 0){
            delete that.bidData[n.Price];
            if (qty < 0) {
              // $rootScope.$broadcast('SendQuoteRequest',data.Symbol);
              that.askData = {};
              that.bidData = {};
            }
            return;
          }
          that.bidData[n.Price].Quantity = qty;
          return;
        }
        if(n.Side === "2"){
          var obj2 = that.askData[n.Price];
          if(obj2 == null){
              that.askData[n.Price] = {Price: n.Price, Quantity: n.Size};
              return;
          }
          var qty2 = obj2.Quantity + n.Size;
          if(qty2 <= 0){
              delete that.askData[n.Price];
              if (qty2 < 0) {
                // $rootScope.$broadcast('SendQuoteRequest',data.Symbol);
                that.askData = {};
                that.bidData = {};
                return;
              }
          }
          that.askData[n.Price].Quantity = qty2;
        }
      });
    }
  }

  clearOrderBook(){
    this.orderbook = {
      ask:[],
      bid:[],
      askData:{},
      bidData:{},
      version:0
    }
  }
}
