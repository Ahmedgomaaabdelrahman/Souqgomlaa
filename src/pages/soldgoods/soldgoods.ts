import { SolgoddetailPage } from './../solgoddetail/solgoddetail';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from "../profile/profile";
import { MessagesPage } from "../messages/messages";


@Component({
  selector: 'page-soldgoods',
  templateUrl: 'soldgoods.html',
})
export class SoldgoodsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SoldgoodsPage');
  }
details(){
  this.navCtrl.push(SolgoddetailPage);
}

goPer(){
  this.navCtrl.push(ProfilePage);
}
goChat(){
  this.navCtrl.push(MessagesPage);
}
}
