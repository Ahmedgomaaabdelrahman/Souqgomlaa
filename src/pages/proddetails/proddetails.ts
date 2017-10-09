import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessagesPage } from "../messages/messages";
import { FavoritesPage } from "../favorites/favorites";

@Component({
  selector: 'page-proddetails',
  templateUrl: 'proddetails.html',
})
export class ProddetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProddetailsPage');
  }

  goChat(){
    this.navCtrl.push(MessagesPage);
  }
  fav(){
    this.navCtrl.push(FavoritesPage);
  }

}
