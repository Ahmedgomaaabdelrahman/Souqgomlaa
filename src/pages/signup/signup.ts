import { ActivationPage } from './../activation/activation';
import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {HomePage} from "../home/home";
import {TownsProvider} from "../../providers/towns/towns";
import {CommonProvider} from "../../providers/common/common";

import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
    getselectedTown:string;
    Name:string;
    Email:string;
    Phone:number;
    Password:string;
    Image:string;
    Location:string;
    Commercial_Register:string;
    mode:boolean;
    towns:any=[];
    selectOptions:any;
  constructor(public events:Events,private camera: Camera,public common:CommonProvider,private _towns:TownsProvider,private auth:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
      this.mode=this.navParams.data;
    //   this.selectOptions = {
    //       title: 'اختر مدينة',
    //       mode: 'md'
    //   };
      console.log('i am ',this.mode)
 
  }

  ionViewWillEnter() {
     this._towns.getTowns().subscribe(res=>{
          console.log('towns res',res)
          console.log('towns res',res.length)
for(let i=0;i<res.length;i++){
let x=res[i].Location
    this.towns.push(res[i].Location);

}
      })  }
  Img:any;
  useCam(source){
      this.common.camPic(source).then(res=>{
          console.log('img',res)
          this.Image=res;
this.Img='data:image/jpeg;base64,' + res
      }).catch(e=>{
          console.log('cam error :', e)
      })
  }
 activation(){
if(this.mode==true){

this.common.presentLoadingDefault('برجاء الانتظار ...');
    this.auth.Sregister(this.Name,this.Email,this.Phone,this.Password,this.Location,this.Commercial_Register,this.mode,this.Image)
        .subscribe(response=>
        {

            console.log('res',response);
            this.phoneValidate(response);
this.common.loadDismess();
        });
      }else {

    this.auth.Sregister(this.Name,this.Email,this.Phone,this.Password,this.Location,'nothing',this.mode,this.Image)
        .subscribe(response=>
        {

          this.phoneValidate(response);
            this.common.loadDismess();

        });
}

   // this.navCtrl.push(ActivationPage);
 }
phoneValidate(response:any){
    if(response=='phoneTaken'){
this.common.presentToast('رقم الهاتف مستخدم بالفعل','اغلاق');
    }else if(response.message=='Image source not readable'){
        this.common.presentToast('لم تقم باختيار صورة','اغلاق');

    }

    else {

        this.common.presentToast('مرحبا! تم التسجيل بنجاح','اغلاق');
        this.events.publish('guest',false)

        this.events.publish('userType',response.Type)
        // this.common.storeValue('S',response)

        this.navCtrl.setRoot(ActivationPage,response);
    }
}
//get selected town
    getSelected(town:any){
    this.Location=town;
    console.log(town);
    }

}
