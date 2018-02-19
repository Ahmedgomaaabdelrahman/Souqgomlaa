import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessagesPage } from "../messages/messages";
import {FavProvider} from "../../providers/fav/fav";
import {CommonProvider} from "../../providers/common/common";
import {ProddetailsPage} from "../proddetails/proddetails";
import {DomainProvider} from "../../providers/domain/domain";
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import {BigimagePage} from "../bigimage/bigimage";

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
    all:any;
    D:any;
  constructor(public domain:DomainProvider,public favProvider:FavProvider,public common:CommonProvider,public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController) {
      this.D=this.domain.url;

  }
  maximaizeImage(image){
    this.navCtrl.push(BigimagePage,{'image':image})
  }
    goDetails(item :any){
        // console.log('iiiiiii',item)
        this.navCtrl.push(ProddetailsPage,item);
    }
  ionViewWillEnter() {
      this.common.getStoredValue('S').then(res=>{
try{
          this.favProvider.getMyFav(res.Id).subscribe(res=>{
            console.log('res',res)


            if (res != null) {
                  this.all = res;
                  console.log(this.all)

              }
          })}catch (e)
{
console.log(e)
}
      },e=>
      {
        console.log(e)

      });
    console.log('ionViewDidLoad FavoritesPage');
  }
  goChat(){
    this.navCtrl.push(MessagesPage);
  }
  mainPage(){
    this.navCtrl.popTo(HomePage);
}

}
