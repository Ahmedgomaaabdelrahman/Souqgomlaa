import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessagesPage } from "../messages/messages";
import {ItemsProvider} from "../../providers/items/items";
import {CommonProvider} from "../../providers/common/common";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
    validItems :any;
    holdedItems :any;
    soldItems :any;
    location:any;
    img:any;
    name:any;
  constructor(public auth:AuthServiceProvider,public itemsProvider:ItemsProvider,public common:CommonProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.common.getStoredValue('S').then(res=>{
        this.name=res['Name'];

        this.location=res.Location;
        this.auth.getProfileImage(res.image).then((res)=>{
            console.log(res.image)
            this.img=res
        });
      this.itemsProvider.getMyItemStatistics(res.Id).subscribe(data=>{
        this.validItems=data.valid;
        this.holdedItems=data.holded;
        this.soldItems=data.sold;
      });
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  goChat(){
    this.navCtrl.push(MessagesPage);
  }
  mainPage(){
    this.navCtrl.popTo(HomePage);
  }
}
