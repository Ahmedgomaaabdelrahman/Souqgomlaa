import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-bigimage',
  templateUrl: 'bigimage.html',
})
export class BigimagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
image
  ionViewWillEnter() {
    this.image=this.navParams.get('image')
    console.log(this.navParams.get('image'));
  }

}
