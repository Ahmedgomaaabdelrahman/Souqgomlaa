import { UpdategoodPage } from './../updategood/updategood';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from "../profile/profile";
import { MessagesPage } from "../messages/messages";
import {CommonProvider} from "../../providers/common/common";
import {ItemsProvider} from "../../providers/items/items";


@Component({
  selector: 'page-mygoods',
  templateUrl: 'mygoods.html',
})
export class MygoodsPage {
goods:any=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private common:CommonProvider,private items:ItemsProvider) {

  }
  ionViewWillEnter(){
    this.goods=[];
    this.common.getStoredValue('S').then(res=>{
      this.items.getMyItems(res.Id).subscribe(res=>{
        console.log('myItems',res);
        for(let i=0;i<res.length;i++){
          this.goods.push(res[i]);

        }
        this.common.storeValue('items',this.goods)
      });
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MygoodsPage');
  }
  goPer(){
    this.navCtrl.push(ProfilePage);
  }
  goChat(){
    this.navCtrl.push(MessagesPage);
  }
  goUpdate(item){
          // console.log('iiiiiii',item)
          this.navCtrl.push(UpdategoodPage,item);
      }
    deleteItem(id:number,index:number){

    console.log('id deleted : ',id,index)
this.items.deleteItem(id).subscribe(res=>{
this.goods.splice(index,1)
    console.log('item deleted : ',res)

})
    }
}
