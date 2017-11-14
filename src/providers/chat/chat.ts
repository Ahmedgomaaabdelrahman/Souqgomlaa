import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import Pusher from 'pusher-js';
// import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { FCM } from '@ionic-native/fcm';
import {DomainProvider} from "../domain/domain";
import * as firebase from "firebase";
declare var FCMPlugin;

const socket = new Pusher('90a90fff9718b47744df', {
    cluster:  "us2",
    // authEndpoint: '/pusher/auth/',
    encrypted: true

});
/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ChatProvider {
    ref=firebase.database().ref();
    constructor(public domain:DomainProvider,private fcm: FCM,public http: Http) {
    console.log('Hello ChatProvider Provider');



  }
  sendMsg(msg){
this.ref.push('hi firebase')
    }


  listenToAChannel(Token){
      Pusher.log = (msg) => {
          console.log(msg);
      };
      const channel = socket.subscribe("token");
      channel.bind('message', function (data) {
          console.log(data.message);
      });
  }

getDviceToken(uid):Promise<any>{
    let promise=new Promise((resolve,reject)=>{
          this.fcm.getToken().then(token=>{
       let req={
           'Id':uid,
           'Token':token
       }
              this.http.post(this.domain.url+'/storeTokenId',req).subscribe(res=>{
                  console.log('fcm response',res)
                  resolve(res)
              });

          }).catch(e=>{
              console.log('fcm response',e)
          });
      });

return promise;
  }

  onTokenIdRefresh():Promise<any>{
      let promise=new Promise((resolve,reject)=>{
     this.fcm.onTokenRefresh().subscribe(token=>{
resolve(token)
      })});
      return promise;
  }
    onTokenRecived(){
        FCMPlugin.onNotification(function (token){
            if(token.wasTapped){
                //Notification was received on device tray and tapped by the user.
                alert( JSON.stringify(token) );
            }else{
                //Notification was received in foreground. Maybe the user needs to be notified.
                // alert( JSON.stringify(token) );
            }
        })
        //   .catch(function (e){
        //   console.log("onNotification",e)
        // });
        FCMPlugin.onTokenRefresh(function (token){
            // alert( token );
        })

    }
    sendMessage(){
        let req={
            'From':5,'To':5,'IsRead':true,'Body':'hey am from here'
        }
      return  this.http.post(this.domain.url+'/sendMessage',req).map(res=>res.json().res);
    }
}
