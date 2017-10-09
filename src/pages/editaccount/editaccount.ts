import { FavoritesPage } from '../favorites/favorites';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from "../profile/profile";
import { MessagesPage } from "../messages/messages";

@Component({
  selector: 'page-editaccount',
  templateUrl: 'editaccount.html',
})
export class EditaccountPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditaccountPage');
  }
 goPer(){
    this.navCtrl.push(ProfilePage);
  }
  goChat(){
    this.navCtrl.push(MessagesPage);
  }
  fav(){
    this.navCtrl.push(FavoritesPage);
  }
}
