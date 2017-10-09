import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessagesPage } from "../messages/messages";

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }
  goChat(){
    this.navCtrl.push(MessagesPage);
  }
} 
