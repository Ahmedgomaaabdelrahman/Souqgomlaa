import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessagesPage } from "../messages/messages";
import { FavoritesPage } from "../favorites/favorites";
import {CommonProvider} from "../../providers/common/common";
import {ItemsProvider} from "../../providers/items/items";

@Component({
  selector: 'page-proddetails',
  templateUrl: 'proddetails.html',
})
export class ProddetailsPage {
Name=this.navParams.data.SellerId.Name;
  constructor(public itemsProvider:ItemsProvider,public common:CommonProvider,public navCtrl: NavController, public navParams: NavParams) {
      console.log('ionViewDidLoad ProddetailsPage',this.navParams.data.SellerId.Name);
      // this.Name=this.navParams.data.SellerId.Name

  }
res:any=[];
    images:any[];
  ionViewWillEnter() {

    this.res=this.navParams.data;
      this.itemsProvider.getItemsImgsUrls(this.res.Id).then(res=>{

          this.images=res.urls;

      })
  }

  goChat(){
    this.navCtrl.push(MessagesPage);
  }
  fav(){
    this.navCtrl.push(FavoritesPage);
  }

}
