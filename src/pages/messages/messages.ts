import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessagedetailsPage } from "../messagedetails/messagedetails";
import {ChatProvider} from "../../providers/chat/chat";
import {CommonProvider} from "../../providers/common/common";
import {DomainProvider} from "../../providers/domain/domain";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

import * as firebase from "firebase";
import { HomePage } from '../home/home';


@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
messegers:any;
realmsgs:any
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
          this.realmsgs=[];
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
                  console.log(self.messegers)

                  if(data !=null){
                  for (let i = 0; i < self.messegers.length; i++) {
                      self.auth.getUserById( self.messegers [i]['sellerId'])
                      // .then(otherUser=>{
                          .subscribe(sellerId => {
                              //self.realmsgs=[]
                              // console.log(sellerId)
                            if(sellerId !=null && sellerId.Id==data[i]['sellerId']){
                                self.names.push(sellerId.Name)
                                self.realmsgs.push(data[i])
                               console.log(sellerId)
                               console.log(sellerId.Id==data[i]['sellerId'])
                            }

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
                  // self.realmsgs = data;
                  console.log(self.messegers)
                  if(data !=null) {

                      for (let i = 0; i < self.messegers.length; i++) {
                          self.auth.getUserById(data[i]['buyerId'])
                              .subscribe(buyerId => {
                                //  self.realmsgs=[]

                                  // console.log(buyerId)
                                  if(buyerId != null && buyerId.Id== self.messegers[i]['buyerId']) {
                                      console.log(buyerId)
                                      console.log(buyerId.Id== self.messegers[i]['buyerId'])

                                      self.names.push(buyerId.Name)
                                      self.realmsgs.push(data[i])
                                  }
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
  mainPage(){
    this.navCtrl.popTo(HomePage);
}
}
