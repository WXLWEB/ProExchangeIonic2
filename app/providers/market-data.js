import {Injectable} from '@angular/core';
import {Http} from '@angular/http';


@Injectable()
export class MarketData {
  static get parameters(){
    return [[Http]];
  }

  constructor(http) {
    // inject the Http provider and set to this instance
    this.http = http;
    this.data = [];
    this.getMaketApi().then(data => {
      data.ticker.forEach(api =>{
         this.getTickerData(api).then(obj =>{
           this.data.push(obj);
           console.log(api.title+"TickerData:",this.data);
        });
      });
    });
  }

  loadTicker(data) {
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get(data.api).subscribe(res => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        resolve(res.json());
      })
    });
  }

  getTickerData(data) {
    return this.loadTicker(data).then(ticker => {
      return ticker;
    });
  }

  loadMarketApi(){
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('data/market-api.json').subscribe(res => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        resolve(res.json());
      });
    });
  }

  getMaketApi(){
    return this.loadMarketApi().then(data => {
      return data;
    });
  }

}
