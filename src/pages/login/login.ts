import { HomePage } from './../home/home';
import { SigntypePage } from './../signtype/signtype';
import { Component } from '@angular/core';
import { NavController, NavParams ,Events } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { CommonProvider } from '../../providers/common/common';
import {MygoodsPage} from "../mygoods/mygoods";
import {ChatProvider} from "../../providers/chat/chat";
import * as firebase from "firebase";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
phone:number;
password:number;
  constructor(public chat:ChatProvider,public events:Events,public commonProvider:CommonProvider,public auth:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
ref=firebase.database().ref();
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
      try {
      this.commonProvider.presentLoadingDefault('الرجاء الانتظار ... ');
    this.auth.logIn(this.phone,this.password).subscribe(response=>

    {

        console.log('b',response);


        if(response=='noUser')
      {

          console.log('not a user',response);

this.commonProvider.loadDismess();
          this.commonProvider.presentToast('برجاء تاكد من رقم الجوال والرقم السري','اغلاق')

      }else{
this.chat.getDviceToken(response.Id).then(res=>{
    console.log(response.Id+'/devtoken'+res)
    this.ref.child('user/'+response.Id+'/devtoken').set(res);
            // this.chat.listenToAChannel("eLml4NJxK5U:APA91bGl0kthK8hW48jl1Gsyi9niG4eOl5Pd0Zvw7XEzCgulMUk1OpK5nY_JbH1xkmGckzwUEfiIQ1MF6FdSb3YUuAdkJjAjQ6ozOqyG7pYKnBNWj5EAOTEWHyx2vCJAzhgvpkfoMiYt");
});
            this.commonProvider.loadDismess();
            this.commonProvider.presentToast('تم الدخول بنجاح','اغلاق')
            this.events.publish('guest',false)
            this.commonProvider.storeValue('S',response)

            this.events.publish('userType',response.Type)
            if(response.Type==1){
                this.navCtrl.setRoot(MygoodsPage,{'data':0})
            }else{
          this.navCtrl.setRoot(HomePage);}
          console.log('login res',response);


      }
    });}catch (E){
          console.log('login error',E)
      }
    // this.navCtrl.push(HomePage);
  }
    visitor(){
// this.chat.sendMessage().subscribe(res=>{
//     console.log(res)
// });
        this.events.publish('guest',true)

        this.navCtrl.push(HomePage);
    }
}
/////////
