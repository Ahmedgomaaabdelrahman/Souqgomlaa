import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessagesPage } from "../messages/messages";
import {FavProvider} from "../../providers/fav/fav";
import {CommonProvider} from "../../providers/common/common";
import {ProddetailsPage} from "../proddetails/proddetails";
import {DomainProvider} from "../../providers/domain/domain";

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
    all:any;
    D:any;
  constructor(public domain:DomainProvider,public favProvider:FavProvider,public common:CommonProvider,public navCtrl: NavController, public navParams: NavParams) {
      this.D=this.domain.url;

  }
    goDetails(item :any){
        // console.log('iiiiiii',item)
        this.navCtrl.push(ProddetailsPage,item);
    }
  ionViewWillEnter() {
      this.common.getStoredValue('S').then(res=>{

          this.favProvider.getMyFav(res.Id).subscribe(res=>{
              if (res != null) {
                  this.all = res;
                  console.log(this.all)

              }
          })
      });
    console.log('ionViewDidLoad FavoritesPage');
  }
  goChat(){
    this.navCtrl.push(MessagesPage);
  }
} 
