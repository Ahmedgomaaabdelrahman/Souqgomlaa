import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessagesPage } from "../messages/messages";
import { FavoritesPage } from "../favorites/favorites";
import {CommonProvider} from "../../providers/common/common";

@Component({
  selector: 'page-proddetails',
  templateUrl: 'proddetails.html',
})
export class ProddetailsPage {

  constructor(public common:CommonProvider,public navCtrl: NavController, public navParams: NavParams) {
      console.log('ionViewDidLoad ProddetailsPage',this.navParams.data);

  }
res:any=[];
  ionViewWillEnter() {

    this.res=this.navParams.data;
  }

  goChat(){
    this.navCtrl.push(MessagesPage);
  }
  fav(){
    this.navCtrl.push(FavoritesPage);
  }

}
