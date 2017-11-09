import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessagedetailsPage } from "../messagedetails/messagedetails";



@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }
 
  goDetails(){
   this.navCtrl.push(MessagedetailsPage);
  }
}
