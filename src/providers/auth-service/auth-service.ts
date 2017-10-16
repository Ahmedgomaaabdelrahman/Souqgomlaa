import { Injectable } from '@angular/core';
import { HttpModule ,Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  http : any;
  _http:any;
  baseUrl:String;
  constructor(http :HttpModule,_http:Http){
    this.http=http;
    this._http=_http;

    this.baseUrl='http://localhost:8000';

  }
//   get() {
// let towns=[];
// towns.push({Location:'ff'});
//     return this._http.post('http://localhost:8000/s/'+{towns:{'Location':'alex'}})
//       .map(res=> res);
//     }

    Sregister(name:string,email:string,phone:number,password:string,location:string,commercial_register:string,mode:any
        ) {

        let seller=
            {'Name':name,
            'Email':email,
            'Phone':phone,
            'Password':password,
            'Location':location,
            'Commercial_Register':commercial_register,
            'Total_Rate':0,
            'Rated_Times':0,
                'Type':mode
            }
        ;
        return this._http.post(this.baseUrl+'/makeS',seller)
            .map(res=> res);
    }
  getD():Observable<any> {
      let self=this;
let observable=Observable.create(observer=>{
  this._http.get(this.baseUrl)

    .map(res=> res).subscribe(response=>{
    observer.next(response)

  })
})
    return observable

  }
  logIn(phone:number,password){
let user={'Phone':phone,'Password':password};
return this._http.post(this.baseUrl+'/login',user).map(res=>res);
  }
}

