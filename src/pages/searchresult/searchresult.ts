import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProddetailsPage } from "../proddetails/proddetails";
import { ProfilePage } from "../profile/profile";
import { MessagesPage } from "../messages/messages";

@Component({
  selector: 'page-searchresult',
  templateUrl: 'searchresult.html',
})
export class SearchresultPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchresultPage');
  }
goDetails(){
    this.navCtrl.push(ProddetailsPage);
  }
  
  goPer(){
    this.navCtrl.push(ProfilePage);
  }

  goChat(){
    this.navCtrl.push(MessagesPage);
  }
}
