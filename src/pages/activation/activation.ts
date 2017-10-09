import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-activation',
  templateUrl: 'activation.html',
})
export class ActivationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivationPage');
  }
  
  goHome(){
    this.navCtrl.push(HomePage);
  }
}
