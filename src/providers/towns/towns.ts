import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the TownsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TownsProvider {
    http : any;
    baseUrl:String;
  constructor(public _http: Http) {
    console.log('Hello TownsProvider Provider');
this.http=_http;
      this.baseUrl='http://localhost:8000';

  }
getTowns(){
    return this.http.get(this.baseUrl+'/getTowns').map(res=>res.json().res);
}

}
