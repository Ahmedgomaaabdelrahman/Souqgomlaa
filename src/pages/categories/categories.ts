import { AddgoodPage } from './../addgood/addgood';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from "../profile/profile";
import { MessagesPage } from "../messages/messages";

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }
  goPer(){
    this.navCtrl.push(ProfilePage);
  }
  goChat(){
    this.navCtrl.push(MessagesPage);
  }

  addGood(){
    this.navCtrl.push(AddgoodPage);
  }
}
