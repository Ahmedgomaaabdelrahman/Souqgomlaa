import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DomainProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DomainProvider {
    url='http://sooqaljomlah.com';
  constructor(public http: Http) {
    console.log('Hello DomainProvider Provider');
  }

}
