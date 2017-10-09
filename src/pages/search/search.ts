import { SearchresultPage } from './../searchresult/searchresult';
import { TownsPage } from './../towns/towns';
import { CategoriesPage } from './../categories/categories';
import { Component } from '@angular/core';
import { NavController, NavParams,ModalController  } from 'ionic-angular';
import { MessagesPage } from "../messages/messages";


@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  presentCat(){
    this.navCtrl.push(CategoriesPage)
  }
  presentTown(){
      this.navCtrl.push(TownsPage);
  }
  search(){
    this.navCtrl.push(SearchresultPage);
  }
  goChat(){
    this.navCtrl.push(MessagesPage);
  }  
}
