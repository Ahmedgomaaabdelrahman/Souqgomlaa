import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessagedetailsPage } from "../messagedetails/messagedetails";
import {ChatProvider} from "../../providers/chat/chat";
import {CommonProvider} from "../../providers/common/common";



@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
messegers:any;
  constructor(public common:CommonProvider,public chat:ChatProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
ionViewWillEnter() {
    this.messegers=[];
    this.common.getStoredValue('S').then(user=>{
  this.chat.getOpenedMessages(user.Id).then(data=>{
    this.messegers=data;
    console.log(this.messegers)
  })
    });
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }
 
  goDetails(){
   this.navCtrl.push(MessagedetailsPage);
  }
}
