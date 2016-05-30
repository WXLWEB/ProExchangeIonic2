import {Injectable} from '@angular/core';
import {Signature} from './signature';

/*
  Generated class for the GetSignature provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Request {
  static get parameters(){
    return [[Signature]]
  }

  constructor(signature) {
    this.signature = signature;
    this.data = null;
  }

  createRequest(type) {
     return {
       MsgType: type,
       CRID: this.signature.getUniqueID()
     }
   }

   createSignedRequest(type, fields) {
     var request = this.createRequest(type);
     var date = new Date();
     request.Date = date.toDateString("yyyyMMdd"); // 20160520
     request.Account = accountInfo.account;
     return request;
   }

   signedRequest(request, fields) {
     var headers = [request.MsgType, request.CRID, request.Date, request.Account];
     var concatArray = headers.concat(fields);
     request.SIG = this.signature.getSignature(concatArray);
     return request;
   }

   createGetTradesRequest(count, symbol) {
     var request = this.createRequest('GetTradesRequest');
     request.Count = count;
     request.Symbol = symbol;
     console.log('Request:',request);
     return request;
   }

   createQuoteRequest(symbol,type) {
     var request = this.createRequest('QuoteRequest');
     request.Symbol = symbol;
     request.QuoteType = type;
     return request;
   }

   createGetOrdersRequest(begin, end, status) {
     var request = this.createSignedRequest('GetOrdersRequest');
     request.Status = status;
     request.Begin = begin;
     request.End = end;
     this.signedRequest(request, [begin, end, status]);
     return request;
   }

   createLoginRequest() {
     var request = this.createSignedRequest('LoginRequest');
     this.signedRequest(request);
     return request;
   }

   createGetAccountInfoRequest(){
     var request = this.createSignedRequest('GetAccountInfoRequest');
     this.signedRequest(request);
     return request;
   }
}
