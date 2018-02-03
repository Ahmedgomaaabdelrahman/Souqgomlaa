import { Component,NgZone } from '@angular/core';
import {Events, NavController, NavParams} from 'ionic-angular';
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
noMessagesYet:boolean;
  constructor(public events:Events,public zone:NgZone,public auth:AuthServiceProvider,public domain:DomainProvider,public common:CommonProvider,public chat:ChatProvider,public navCtrl: NavController, public navParams: NavParams) {
      this.D=this.domain.url;
  // this.noMessagesYet=true;
  }

    userType:any;
    names:any
    ref=firebase.database().ref();

    ionViewWillEnter() {
      this.noMessagesYet=true;
      this.events.publish('newMessage',false)
      // this.zone.run(()=>{
        // this.messegers=[];
        // this.realmsgs=[];
        // this.names=[];
      // })
    console.log('ionViewDidLoad MessagesPage');

      let self=this;
      this.common.getStoredValue('S').then(user=>{
this.zone.run(()=>{
    this.messegers=[];
    this.realmsgs=[];
    this.names=[];
})

          this.ref.child('user/'+user.Id).on('value', snapshot =>{

          if(user.Type==0) {

              this.chat.getOpenedMessages(user.Id).then(data => {
                  self.messegers = data;
                  console.log(data.length)
                  console.log(data)
                if(data.length==1 ||data.length==0){
                  this.noMessagesYet=true;
                }else {
                  this.noMessagesYet=false;

                }
                  if(data !=null){
                  for (let i = 0; i < data.length; i++) {
                      self.auth.getUserById( self.messegers [i]['sellerId'])
                          .subscribe(sellerId => {

                            if(sellerId !=null && sellerId.Id==data[i]['sellerId']){
                              this.zone.run(()=>{
                                self.names[i]=sellerId.Name
                              self.realmsgs[i]=data[i]})

                               console.log(sellerId)
                               console.log(sellerId.Id==data[i]['sellerId'])
                            }

                          });
// })
                      if(i==data.length-1){
                          break;
                      }
                  }

              }
              })
          }else{

              this.chat.getOpenedMessages(user.Id).then(data => {
                  self.messegers = data;
                  console.log(data.length)
                if(data.length==0){
                  this.noMessagesYet=true;
                }else {
                  this.noMessagesYet=false;

                }
                  if(data !=null) {

                      for (let i = 0; i <data.length; i++) {
                          self.auth.getUserById(data[i]['buyerId'])
                              .subscribe(buyerId => {

                                  if(buyerId != null && buyerId.Id== self.messegers[i]['buyerId'] ) {
                                      console.log(buyerId)
                                      console.log(buyerId.Id== self.messegers[i]['buyerId'])

                                      self.names[i]=buyerId.Name

                                      self.realmsgs[i]=data[i]

                                  }
                              });
// })
                          if(i==data.length-1){
                              break;
                          }
                      }

                  }
              })

          }
      });
          });


}
  user:any;

  goDetails(m){
      console.log(m)

      this.navCtrl.push(MessagedetailsPage,{chatInfo:m,instances:m});
  }
  mainPage(){
    this.navCtrl.popTo(HomePage);
}
}
