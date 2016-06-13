import {Injectable} from '@angular/core';
import {Http} from '@angular/http';


@Injectable()
export class MarketData {
  static get parameters(){
    return [[Http]];
  }

  constructor(http, user) {
    // inject the Http provider and set to this instance
    this.http = http;
  }

  fetchTicker(url) {
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get(url).subscribe(res => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data = res.json();
        resolve(this.data);
      });
    });
  }

  getTickerData(url) {
    return this.fetchTicker(url).then(data => {
      console.log("data:",data);
      return data;
    });
  }

  processData(data) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions

    data.tracks = [];

    // // loop through each day in the schedule
    // data.schedule.forEach(day => {
    //   // loop through each timeline group in the day
    //   day.groups.forEach(group => {
    //     // loop through each session in the timeline group
    //     group.sessions.forEach(session => {
    //       this.processSession(data, session);
    //     });
    //   });
    // });

    return data;
  }

}
