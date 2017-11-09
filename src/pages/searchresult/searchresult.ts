import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProddetailsPage } from "../proddetails/proddetails";
import { ProfilePage } from "../profile/profile";
import { MessagesPage } from "../messages/messages";
import {ItemSearchProvider} from "../../providers/item-search/item-search";

@Component({
  selector: 'page-searchresult',
  templateUrl: 'searchresult.html',
})
export class SearchresultPage {
town:any;
cat:any;
  constructor(public searchProvider:ItemSearchProvider,public navCtrl: NavController, public navParams: NavParams) {

  }
  ionViewWillEnter(){
    this.town=this.navParams.data.town;
    this.cat=this.navParams.data.cat;
    console.log(this.town,this.cat);
this.searchProvider.search(this.cat,this.town).subscribe(data=>{
  console.log('result',data)
})
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
