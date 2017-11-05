import { AddgoodPage } from './../addgood/addgood';
import { Component } from '@angular/core';
import { NavController, ViewController,NavParams } from 'ionic-angular';
import { ProfilePage } from "../profile/profile";
import { MessagesPage } from "../messages/messages";
import {ItemSearchProvider} from "../../providers/item-search/item-search";
import {DomainProvider} from "../../providers/domain/domain";

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {
    cats:any[];
D:any;
  constructor(public view:ViewController,public domain:DomainProvider,public search:ItemSearchProvider,public navCtrl: NavController, public navParams: NavParams) {

  }
  mode:any;
ionViewWillEnter(){
  console.log(this.navParams.data.data)
  console.log(this.navParams.data)
  if(this.navParams.data.data=='1'){
  this.mode=this.navParams.data.data;}
    this.D=this.domain.url;
this.search.getCategories().subscribe(res=>{
  console.log(res)
    this.cats=res;
})
}

  ionViewDidLoad() {

    console.log('ionViewDidLoad CategoriesPage');
  }
  goPer(){
    this.navCtrl.push(ProfilePage);
  }
  goChat(){
    this.navCtrl.push(MessagesPage);
  }

  addGood(cat){
    console.log(this.mode)
    if(this.mode=='1'){
      this.view.dismiss(cat);
    }else{
        this.navCtrl.push(AddgoodPage,cat);

    }
  }
}
