import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ChatProvider} from "../../providers/chat/chat";
import {CommonProvider} from "../../providers/common/common";


 
@Component({
  selector: 'page-messagedetails',
  templateUrl: 'messagedetails.html',
})
export class MessagedetailsPage {
M
  constructor(public common:CommonProvider,public chat:ChatProvider,public navCtrl: NavController, public navParams: NavParams) {
      this.common.getStoredValue('S').then(res=>{

  this.chat.allmsgs(36).then(res=>{
  console.log(res)
})
      });
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad MessagedetailsPage');
  }
    send(){
    console.log(this.navParams.data.sellerId);
  this.common.getStoredValue('S').then(res=>{
    let msg={
      currentID:res.Id,
        reciverID:this.navParams.data.sellerId,
        body:this.M
    }
      this.chat.sendMsg(msg);

  })

  }
}
