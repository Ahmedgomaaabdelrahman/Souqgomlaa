import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


 
@Component({
  selector: 'page-messagedetails',
  templateUrl: 'messagedetails.html',
})
export class MessagedetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagedetailsPage');
  }

}
