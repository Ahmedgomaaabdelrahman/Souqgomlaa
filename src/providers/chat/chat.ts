import {Injectable, NgZone} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FCM } from '@ionic-native/fcm';
import {DomainProvider} from "../domain/domain";
import * as firebase from "firebase";
import {timestamp} from "rxjs/operator/timestamp";
// import { Push, PushObject, PushOptions } from '@ionic-native/push';
import {MessagesPage} from "../../pages/messages/messages";
import {Events} from "ionic-angular";

// import {NavController} from "ionic-angular";
declare var FCMPlugin;
// const options : PushOptions = {
// //    android: {},
//    ios: {
//        alert: 'true',
//        badge: true,
//        sound: 'true'
//    },
// //    windows: {},
// //    browser: {
//     //    pushServiceURL: 'http://push.api.phonegap.com/v1/push'
// //    }
// };
// const socket = new Pusher('90a90fff9718b47744df', {
//     cluster:  "us2",
//     // authEndpoint: '/pusher/auth/',
//     encrypted: true
//
// });
/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ChatProvider {
    ref=firebase.database().ref();
    constructor(private events:Events,public zone:NgZone,public domain:DomainProvider,private fcm: FCM,public http: Http) {
    console.log('Hello ChatProvider Provider');



  }



  sendMsg(msg){

        //get stored key if exists for chat msgs between two users
      this.ref.child('user/'+msg.currentID+'/'+msg.reciverID+'/key')
          .once('value').then(sloredkey=> {
              //if a new msg will be exists then generate new key
          if(sloredkey.val() ==null){
              //generating the new key
          let key = this.ref.child('msgs').push().once('value').then(data => {
              //insert the date of the new msg in the both users refs
              this.ref.child('user/' + msg.currentID + '/' + msg.reciverID).set(
                  {
                      sellerId:msg.sellerId,
                      body: msg.body,
                      date: Date.now(),
                      key: data.key,
                      buyerId:msg.buyerId,
                      // otherUser: msg.otherUser,

                  }
              );
              this.ref.child('user/' + msg.reciverID + '/' + msg.currentID).set(
                  {
                      sellerId:msg.sellerId,
                      body: msg.body,
                      date: Date.now(),
                      key: data.key,
                      buyerId:msg.buyerId,

                  }
              );
              //then  push the msg details in the new key generated
              this.ref.child('msgs/' + data.key).push().set(
                  {
                      date: Date.now(),
                      body: msg.body,
                      sender: msg.currentID,
                      reciver: msg.reciverID
                  }
              );
          });
      }
      //if an old conversation has been started already
       else   if(sloredkey.val() !=null){
              //changing date only in users key
                  this.ref.child('user/' + msg.currentID + '/' + msg.reciverID).update(  {
                      sellerId:msg.sellerId,
                      body: msg.body,
                      date: Date.now(),
                      buyerId:msg.buyerId,
                  });
                  this.ref.child('user/' + msg.reciverID + '/' + msg.currentID).update(  {
                      sellerId:msg.sellerId,
                      body: msg.body,
                      date: Date.now(),
                      buyerId:msg.buyerId,

                  });

                  //store the new msg to the stored key we retrieved from sender tab
              // thats meen there was a conversation already started
                  this.ref.child('msgs/' + sloredkey.val()).push().set(
                      {
                          date: Date.now(),
                          body: msg.body,
                          sender: msg.currentID,
                          reciver: msg.reciverID
                      }
                  );
          }

      });


    }

    getMessagesForDetailsPagetodetailsmessages(currentID,sellerId):Promise<any>{
        let promise=new Promise((resolve,reject)=>{
            this.ref.child('user/'+currentID+'/'+sellerId).on('value', snapshot =>{
                // // if(snapshot.val()!=null)
                // var returnArr = [];
                // for(var i in snapshot.val()){
                //     returnArr.push(snapshot.val()[i]);
                //
                // }

                resolve(snapshot.val());
            });
        });
        return promise;
    }

    getOpenedMessages(currentID):Promise<any>{
      let promise=new Promise((resolve,reject)=>{
      this.ref.child('user/'+currentID).on('value', snapshot =>{
          // if(snapshot.val()!=null)
          var returnArr = [];
          for(var i in snapshot.val()){
                  returnArr.push(snapshot.val()[i]);

          }

          resolve(returnArr);
      });
    });
  return promise;
  }

allmsgs(key):Promise<any>{
    let promise=new Promise((resolve,reject)=> {

        this.ref.child('msgs/'+key).orderByValue().startAt('').once('value').then(data => {
            data.val();
            resolve(data.val());
        });
    });
    return promise;
    }

  // listenToAChannel(Token){
  //     Pusher.log = (msg) => {
  //         console.log(msg);
  //     };
  //     const channel = socket.subscribe("token");
  //     channel.bind('message', function (data) {
  //         console.log(data.message);
  //     });
  // }

getDviceToken(uid):Promise<any>{
    let promise=new Promise((resolve,reject)=>{
          this.fcm.getToken().then(token=>{
            //   resolve(token)

              let req={
           'Id':uid,
           'Token':token
       }
              this.http.post(this.domain.url+'/storeTokenId',req).subscribe(res=>{
                  console.log('fcm response',res)
              });
               console.log('device token by fcm : ',token)
   resolve(token)
          }).catch(e=>{
              console.log('fcm error',e)
          });
      });

return promise;
  }

  onTokenIdRefresh():Promise<any>{
      let promise=new Promise((resolve,reject)=>{
     this.fcm.onTokenRefresh().subscribe(token=>{
         console.log('token refreshed',token)
resolve(token)
      })});
      return promise;
  }
    onTokenRecived(context){
         console.log('fcm subscribtion starts')

        FCMPlugin.onNotification( (token)=>{
 console.log('FCM Fired : Token :: ',token)
            // this.zone.runOutsideAngular(()=>{
          this.zone.run(()=>{
            if(token.wasTapped){
              this.zone.run(()=>{
              this.events.publish('newMessage',true)})
                //Notification was received on device tray and tapped by the user.
               alert( 'لديك رسالة جديدة' );
              context.push(MessagesPage);

            }else{
              this.zone.run(()=>{

              this.events.publish('newMessage',true)})
              // this.events.subscribe('checkNewMessage',)
                //Notification was received in foreground. Maybe the user needs to be notified.
                console.log(context.getActive().name)
                // alert(context.getActive().c);
                // var MessagedetailsPage=context.getActive().name
                // var MessagesPage=context.getActive().name
              // context.push(MessagesPage);
              //   if(MessagedetailsPage!="MessagedetailsPage" && MessagesPage !=="MessagesPage"){
                // alert('لديك رسالة جديدة');

                // }
            }
                })
        })
        //   .catch(function (e){
        //   console.log("onNotification",e)
        // });
        FCMPlugin.onTokenRefresh(function (token){
                            alert('لديك رسالة جديدة');

            // alert( token );
        })

    }
    // sendMessage(){
    //     let req={
    //         'From':5,'To':5,'IsRead':true,'Body':'hey am from here'
    //     }
    //   return  this.http.post(this.domain.url+'/sendMessage',req).map(res=>res.json().res);
    // }

//       pushN(){
//       // to check if we have permission
// this.push.hasPermission()
//   .then((res: any) => {

//     if (res.isEnabled) {
//       console.log('We have permission to send push notifications');
//     } else {
//       console.log('We do not have permission to send push notifications');
//     }

//   });

// // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
// this.push.createChannel({
//  id: "testchannel1",
//  description: "My first test channel",
//  // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
//  importance: 3
// }).then(() => console.log('Channel created'));

// // Delete a channel (Android O and above)
// this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));

// // Return a list of currently configured channels
// this.push.listChannels().then((channels) => console.log('List of channels', channels))

// // to initialize push notifications



// const pushObject: PushObject = this.push.init(options);


// pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

// pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

// pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
//   }
}
