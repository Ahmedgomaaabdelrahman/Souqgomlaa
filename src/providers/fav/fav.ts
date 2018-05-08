import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {DomainProvider} from "../domain/domain";

/*
  Generated class for the FavProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FavProvider {

    baseUrl:String;
// url='http://45.55.85.173';
    constructor(public http: Http,public domain:DomainProvider) {
        console.log('Hello ItemsProvider Provider');
        // this.baseUrl='http://127.0.0.1:9200';
        this.baseUrl=this.domain.url;

    }
    addToFavorites(buyerId,itemId){
      let fav={
          'BuyerId':buyerId,
          'ItemId':itemId
      }
        return this.http.post(this.baseUrl+'/addToFavorites',fav).map(res=>res.json().res);

    }
    checkFav(buyerId,itemId){
        let fav={
            'BuyerId':buyerId,
            'ItemId':itemId
        }
        return this.http.post(this.baseUrl+'/checkStar',fav).map(res=>res.json().res);
    }
    getMyFav(buyerId){
        let fav={
            'BuyerId':buyerId
        }
        return this.http.post(this.baseUrl+'/getMyFav',fav).map(res=>res.json().res);
    }
}
