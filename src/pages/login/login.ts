import { HomePage } from './../home/home';
import { SigntypePage } from './../signtype/signtype';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
phone:number;
password:number;
  constructor(public auth:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    // console.log('ionViewDidLoad LoginPage');
    //    this.auth.getD().subscribe(response=>
    //      {
    //        console.log('data1',response);
    //
    //      }
    //    );


}

  signUp(){
    this.navCtrl.push(SigntypePage);
  }
  goHome(){

    this.auth.logIn(this.phone,this.password).subscribe(response=>
    {
        console.log('login res',response);
    });
    // this.navCtrl.push(HomePage);
  }
}
