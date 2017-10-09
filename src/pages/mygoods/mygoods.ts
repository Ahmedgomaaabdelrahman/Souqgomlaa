import { UpdategoodPage } from './../updategood/updategood';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from "../profile/profile";
import { MessagesPage } from "../messages/messages";


@Component({
  selector: 'page-mygoods',
  templateUrl: 'mygoods.html',
})
export class MygoodsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MygoodsPage');
  }
  goPer(){
    this.navCtrl.push(ProfilePage);
  }
  goChat(){
    this.navCtrl.push(MessagesPage);
  }
  goUpdate(){
    this.navCtrl.push(UpdategoodPage);
  }
}
