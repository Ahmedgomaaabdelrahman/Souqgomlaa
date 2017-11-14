import { Injectable } from '@angular/core';
import {HttpModule, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {CommonProvider} from "../common/common";
import {DomainProvider} from "../domain/domain";

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

    // url='http://45.55.85.173';

    constructor(private common:CommonProvider,http :HttpModule,_http:Http,public domain:DomainProvider){
    this.http=http;
    this._http=_http;

    this.baseUrl=this.domain.url;

  }
//   get() {
// let towns=[];
// towns.push({Location:'ff'});
//     return this._http.post('http://localhost:8000/s/'+{towns:{'Location':'alex'}})
//       .map(res=> res);
//     }

    Sregister(name:string,email:string,phone:number,password:string,location:string,commercial_register:string,mode:any,image:string
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
                'Type':mode,
                'image':image
            }
        ;
        return this._http.post(this.baseUrl+'/makeS',seller)
            .map(res=> res.json().res);
    }
//   getD():Observable<any> {
//       let self=this;
// let observable=Observable.create(observer=>{
//   this._http.get(this.baseUrl)
//
//     .map(res=> res).subscribe(response=>{
//     observer.next(response)
//
//   })
// })
//     return observable
//
//   }
  logIn(phone:number,password){
let user={'Phone':phone,'Password':password};
return this._http.post(this.baseUrl+'/login',user).map(res=> res.json().res);
  }
  logOut(){

      this.common.removeStoredKey('S')
  }
  editProfile(id:number,name:string,email:string,password:string,phone:number,Commercial_Register:string,image:any,location:any){
      let edit=
          {'Id':id,
              'Name':name,
              'Email':email,
              'Phone':phone,
              'Password':password,
              'Commercial_Register':Commercial_Register,
          'image':image,'Location':location
          }

return this._http.post(this.baseUrl+'/update',edit).map(res=>res.json().res);
  }
  getProfileImage(imgId):Promise<any>{
      let promise=new Promise((resolve,reject)=>{
          resolve(this.baseUrl+'/profileImages/'+imgId);
      })
      // console.log(this._http.get(this.baseUrl+'/profileImages/'+img))
      return promise;

  }
    getProfileThumpImage(imgId):Promise<any>{
        let promise=new Promise((resolve,reject)=>{
            resolve(this.baseUrl+'/Image_Thump/'+imgId);
        })
        // console.log(this._http.get(this.baseUrl+'/profileImages/'+img))
        return promise;

    }
  getBaseUrl(){
      return this.baseUrl;
  }
}

