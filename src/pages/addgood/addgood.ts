import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessagesPage } from "../messages/messages";
import { ProfilePage } from "../profile/profile";


@Component({
  selector: 'page-addgood',
  templateUrl: 'addgood.html',
})
export class AddgoodPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddgoodPage');
  }
  
  goChat(){
    this.navCtrl.push(MessagesPage);
  }
  goPer(){
    this.navCtrl.push(ProfilePage);
  }
}
