import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessagesPage } from "../messages/messages";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  goChat(){
    this.navCtrl.push(MessagesPage);
  }
}
