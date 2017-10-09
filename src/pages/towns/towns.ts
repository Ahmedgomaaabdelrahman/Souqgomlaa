import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessagesPage } from "../messages/messages";


@Component({
  selector: 'page-towns',
  templateUrl: 'towns.html',
})
export class TownsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TownsPage');
  }
  goChat(){
    this.navCtrl.push(MessagesPage);
  }
}
