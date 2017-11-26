import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";


@Component({
  selector: 'page-activation',
  templateUrl: 'activation.html',
})
export class ActivationPage {
first:number;
    // second:number;
    // thierd:number;
    // fourth:number;
  constructor(public auth:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivationPage');
  }
  
  goHome(){
    let Vcode=this.first
      console.log(Vcode,this.navParams.data)
this.auth.makeVerefaied(Vcode,this.navParams.data).subscribe(res=>{

  this.navCtrl.setRoot(HomePage);
})
  }
}
