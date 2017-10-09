import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-signtype',
  templateUrl: 'signtype.html',
})
export class SigntypePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigntypePage');
  }
 
 signUp(){
   this.navCtrl.push(SignupPage);
 }
}
