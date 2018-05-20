import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {DomainProvider} from "../domain/domain";

/*
  Generated class for the TownsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TownsProvider {
    http : any;
    baseUrl:String;
  constructor(public _http: Http,public domain:DomainProvider) {
    console.log('Hello TownsProvider Provider');
this.http=_http;
      // this.baseUrl='http://127.0.0.1:9200';
      this.baseUrl=this.domain.url;

  }
getTowns(){
    return this.http.get(this.baseUrl+'/getTowns').map(res=>res.json().res);
}

}
