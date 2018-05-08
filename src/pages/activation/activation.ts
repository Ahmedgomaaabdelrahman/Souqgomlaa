import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import {Events, NavController, NavParams} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {CommonProvider} from "../../providers/common/common";
import {MygoodsPage} from "../mygoods/mygoods";


@Component({
  selector: 'page-activation',
  templateUrl: 'activation.html',
})
export class ActivationPage {
first:number;
flag:boolean;
    // second:number;
    // thierd:number;
    // fourth:number;
  constructor(public events:Events,public common:CommonProvider,public auth:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
this.flag=false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivationPage');
  }
  
  goHome(){
    let Vcode=this.first
      console.log(Vcode,this.navParams.data)
this.auth.makeVerefaied(Vcode,this.navParams.data.Id).subscribe(res=>{
  console.log(res)
if(res==1){
    this.events.publish('guest', false);
    this.common.storeValue('S', this.navParams.data);

    this.events.publish('userType', this.navParams.data.Type);
    if (this.navParams.data.Type == 1) {
        this.navCtrl.setRoot(MygoodsPage, {'data': 0})
    } else {
        this.navCtrl.setRoot(HomePage);
    }
  }else {
  this.flag=true;
  this.common.presentToast('الكود الذي ادخلته غير صحيح','اغلاق')
}
})
  }

    resend(){
this.auth.reSendVcode(this.navParams.data.Id,this.first)

    }
}
