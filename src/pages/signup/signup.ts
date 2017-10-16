import { ActivationPage } from './../activation/activation';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
    Name:string;
    Email:string;
    Phone:number;
    Password:string;
    Location:string;
    Commercial_Register:string;
    mode:boolean;
  constructor(private auth:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
      this.mode=this.navParams.data;
      console.log('i am ',this.mode)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
 activation(){
if(this.mode==true){
    this.Location='f'

    this.auth.Sregister(this.Name,this.Email,this.Phone,this.Password,this.Location,this.Commercial_Register,this.mode)
        .subscribe(response=>
        {
            console.log('res',response);
        });
      }else {
    this.Location='f'

    this.auth.Sregister(this.Name,this.Email,this.Phone,this.Password,this.Location,'nothing',this.mode)
        .subscribe(response=>
        {
            console.log('res',response);
        });
}

   // this.navCtrl.push(ActivationPage);
 }

}
