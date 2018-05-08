import { SearchresultPage } from './../searchresult/searchresult';
import { TownsPage } from './../towns/towns';
import { CategoriesPage } from './../categories/categories';
import { Component } from '@angular/core';
import { NavController, NavParams,ModalController,Modal  } from 'ionic-angular';
import { MessagesPage } from "../messages/messages";
import {HomePage} from "../home/home";


@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
category:any;
town:any;
  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
      if(this.town==null){
          this.town='كل المدن';
      }
    if(this.category==null){
  this.category='كل الاقسام';

}


  }

  presentCat(){
   const catModal:Modal=this.modalCtrl.create(CategoriesPage,{'data':1});
      catModal.present();
      catModal.onDidDismiss(data=>{
        if(data !=null){
        this.category=data;}
      })
  }
  presentTown(){
    const townModal:Modal =this.modalCtrl.create(TownsPage,{'data':1});
      townModal.present();
      townModal.onDidDismiss(data=>{
        if(data !=null){
          this.town=data;}
      })
  }
  search(){
    console.log('send ',{'town':this.town,'cat':this.category,'mode':1})
    this.navCtrl.push(HomePage,{'town':this.town,'cat':this.category,'mode':1});
  }
  goChat(){
    this.navCtrl.push(MessagesPage);
  }
  mainPage(){
    this.navCtrl.popTo(HomePage);
  }
}
