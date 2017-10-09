import { HomePage } from './../home/home';
import { SigntypePage } from './../signtype/signtype';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  signUp(){
    this.navCtrl.push(SigntypePage);
  }
  goHome(){
    this.navCtrl.push(HomePage);
  }
}
