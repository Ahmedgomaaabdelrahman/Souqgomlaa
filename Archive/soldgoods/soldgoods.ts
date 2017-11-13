import { SolgoddetailPage } from './../solgoddetail/solgoddetail';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-soldgoods',
  templateUrl: 'soldgoods.html',
})
export class SoldgoodsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SoldgoodsPage');
  }
details(){
  this.navCtrl.push(SolgoddetailPage);
}
}
