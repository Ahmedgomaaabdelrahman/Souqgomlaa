import { LoginPage } from './../login/login';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessagesPage } from "../messages/messages";
import { FavoritesPage } from "../favorites/favorites";
import {CommonProvider} from "../../providers/common/common";
import {ItemsProvider} from "../../providers/items/items";
import {DomainProvider} from "../../providers/domain/domain";
import {FavProvider} from "../../providers/fav/fav";
import {MessagedetailsPage} from "../messagedetails/messagedetails";
import {ChatProvider} from "../../providers/chat/chat";
import { Events } from 'ionic-angular';
import {BigimagePage} from "../bigimage/bigimage";

@Component({
  selector: 'page-proddetails',
  templateUrl: 'proddetails.html',
})
export class ProddetailsPage {
Name=this.navParams.data.SellerId.Name;
image=this.navParams.data.SellerId.image;
D:any;
star:string;
guestUser
  constructor(public events :Events,public chat :ChatProvider,public favProvider:FavProvider,public domain:DomainProvider,public itemsProvider:ItemsProvider,public common:CommonProvider,public navCtrl: NavController, public navParams: NavParams) {
      console.log('ionViewDidLoad ProddetailsPage',this.navParams.data.SellerId.Name);
      // this.Name=this.navParams.data.SellerId.Name
      this.D=this.domain.url;
  this.events.subscribe('guest',guest=>{
         this.guestUser=guest;
        })

  }
res:any=[];
    images:any[];
    currentId:any;
  ionViewWillEnter() {

    this.res=this.navParams.data;
    let self=this;
      this.common.getStoredValue('S').then(res=>{
                        if(res != null){

          console.log('fav',res.Id,this.navParams.data.Id);

          this.favProvider.checkFav(res.Id,this.navParams.data.Id).subscribe(res=>{
          self.currentId=res.Id;
          this.star=res;
              console.log('fav',this.star);

      });}
      });
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

    favTogle(){
        this.common.getStoredValue('S').then(res=>{
                if(res!= null){
            this.favProvider.addToFavorites(res.Id,this.navParams.data.Id).subscribe(res=>{
            console.log('fav',this.star);
            // self.currentId=res.Id;
            this.star=res;
        });}else{
          this.common.presentToast(' عفوا يجب التسجيل اولا','اغلاق')
          this.navCtrl.push(LoginPage)
        }
        });
      // this.star=star;

    }
    contact(){
        console.log(this.navParams.data.SellerId)

        this.common.getStoredValue('S').then(user=>{
                if(user != null){

          console.log('data passed to chat',user.Id,this.navParams.data.SellerId.sellerId)
        this.chat.getMessagesForDetailsPagetodetailsmessages(user.Id,this.navParams.data.SellerId.sellerId).then(res=>{
          console.log('data passed to chat',res)
// if(res!=null) {
//   this.navCtrl.push(MessagedetailsPage, {instances: res});
// }else{
            let send={
        buyerId:user.Id,sellerId:this.navParams.data.SellerId.sellerId

            }
  this.navCtrl.push(MessagedetailsPage, {instances: send});

// }
        })
      }else{
          this.common.presentToast(' عفوا يجب التسجيل اولا','اغلاق')
          this.navCtrl.push(LoginPage)
        }
        })
    }
    mainPage(){
        this.navCtrl.popTo(HomePage);
    }
  maximaizeImage(image){
      this.navCtrl.push(BigimagePage,{'image':image})
  }
}
