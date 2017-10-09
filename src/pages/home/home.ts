import { ProfilePage } from './../profile/profile';
import { ProddetailsPage } from './../proddetails/proddetails';
import { Component } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';
import { MessagesPage } from "../messages/messages";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public menuCtrl:MenuController,public navCtrl: NavController) {

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
