import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {DomainProvider} from "../domain/domain";

/*
  Generated class for the ItemSearchProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ItemSearchProvider {
    baseUrl:any
  constructor(public http: Http,public domain:DomainProvider) {
    console.log('Hello ItemSearchProvider Provider');
    this.baseUrl=this.domain.url;
  }
    getCategories(){
        return this.http.get(this.baseUrl+'/getCategories').map(res=>res.json().res);

    }
search(cat:string,loc:string){
        let key={
            'Loc':loc,
            'Cat':cat
        };
    return this.http.post(this.baseUrl+'/search',key).map(res=>res.json().res);
}
}
