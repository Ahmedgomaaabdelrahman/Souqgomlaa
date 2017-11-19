import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessagedetailsPage } from "../messagedetails/messagedetails";
import {ChatProvider} from "../../providers/chat/chat";
import {CommonProvider} from "../../providers/common/common";
import {DomainProvider} from "../../providers/domain/domain";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

import * as firebase from "firebase";


@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
messegers:any;
D:any;
  constructor(public auth:AuthServiceProvider,public domain:DomainProvider,public common:CommonProvider,public chat:ChatProvider,public navCtrl: NavController, public navParams: NavParams) {
      this.D=this.domain.url;
  }
// ionViewWillEnter() {
//
// }
userType:any;
names:any
    ref=firebase.database().ref();

    ionViewWillEnter() {

    console.log('ionViewDidLoad MessagesPage');

      let self=this;
      this.common.getStoredValue('S').then(user=>{

          this.messegers=[];
          this.names=[];
          this.ref.child('user/'+user.Id).on('value', snapshot =>{
          if(user.Type==0) {
          //     this.userType='sellerId'
          //
          // }else{
          //     this.userType='buyerId'
          //
          // }
              this.chat.getOpenedMessages(user.Id).then(data => {
                  self.messegers = data;
                  if(data !=null){
                  for (let i = 0; i <data.length; i++) {
                      this.auth.getUserById(data[i]['sellerId'])
                      // .then(otherUser=>{
                          .subscribe(sellerId => {
                              // console.log(sellerId)
                              this.names.push(sellerId.Name)

                          });
// })
                  }
                  // console.log(data.length)
                  // console.log(data)
              }
              })
          }else{

              this.chat.getOpenedMessages(user.Id).then(data => {
                  self.messegers = data;
                  if(data !=null) {

                      for (let i = 0; i <data.length; i++) {
                          this.auth.getUserById(data[i]['buyerId'])
                              .subscribe(buyerId => {
                                  // console.log(buyerId)
                                  this.names.push(buyerId.Name)

                              });
// })
                      }
                      // console.log(data.length)
                      // console.log(data)
                  }
              })

          }
      });
          });


}
  user:any;

  goDetails(m){
      console.log(m)
// this.common.getStoredValue('S').then(user=>{})
//       this.ref.child('user/'+user.Id).unsubscribe();
      this.navCtrl.push(MessagedetailsPage,{chatInfo:m,instances:m});
  }
}
