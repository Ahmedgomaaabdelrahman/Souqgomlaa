import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessagesPage } from "../messages/messages";
import { ProfilePage } from "../profile/profile";

@Component({
  selector: 'page-updategood',
  templateUrl: 'updategood.html',
})
export class UpdategoodPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdategoodPage');
  }
  goChat(){
    this.navCtrl.push(MessagesPage);
  }
  goPer(){
    this.navCtrl.push(ProfilePage);
  }
}
