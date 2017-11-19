import { HomePage } from './../home/home';
import { FavoritesPage } from '../favorites/favorites';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from "../profile/profile";
import { MessagesPage } from "../messages/messages";
import {CommonProvider} from "../../providers/common/common";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {TownsProvider} from "../../providers/towns/towns";

@Component({
  selector: 'page-editaccount',
  templateUrl: 'editaccount.html',
})
export class EditaccountPage {
name:string;
email:string;
password:string;
phone:number;
    Commercial_Register:string;
    id:number;
    img:any;
    imgId:any;
    image:any;
    Location:any;
    towns:any=[];
    selectOptions:any;
    mode:boolean;

    constructor(private _towns:TownsProvider,private auth:AuthServiceProvider,private common:CommonProvider,public navCtrl: NavController, public navParams: NavParams) {
this.common.getStoredValue('S').then(res=>{
    this.mode=res.Type;

        // if(res.Type==1){
    // this.mode=res.Type;}
    // else if(res.Type==0){
    //     this.mode=false;
    // }

})
        this.selectOptions = {
            title: 'اختر مدينة',
            mode: 'md'
        };
        this._towns.getTowns().subscribe(res=>{
            console.log('towns res',res)
            console.log('towns res',res.length)
            for(let i=0;i<res.length;i++){
                let x=res[i].Location
                this.towns.push(res[i].Location);

            }
        })
  }
  ionViewWillEnter(){
      this.common.getStoredValue('S').then(res=>{

console.log('phone',res.Phone);
this.id=res.Id;

          this.name=res['Name'];
   this.email=res.Email;
   this.password=res.Password;
   this.phone=res.Phone
   this.Commercial_Register=res.Commercial_Register;
   // this.img=this.auth.getBaseUrl()+'/profileImages/'+res.image
         let self=this;
          self.imgId=res.image

       this.auth.getProfileImage(res.image).then((res)=>{
console.log(res.image)
       self.img=res
       })
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditaccountPage');
  }
 goPer(){
    this.navCtrl.push(ProfilePage);
  }
  goChat(){
    this.navCtrl.push(MessagesPage);
  }
  fav(){
    this.navCtrl.push(FavoritesPage);
  }
submit(){
     let self=this
      if (this.image==undefined){
          self.image='old'
      }
      console.log(this.image)
      console.log(this.imgId)
this.auth.editProfile(this.id,this.name,this.email,this.password,this.phone,this.Commercial_Register,this.image,this.Location).subscribe(res=>{
    console.log(res);
    this.common.storeValue('S',res);
})
  }

    useCam(source){
        this.common.camPic(source).then(res=>{
            console.log('img',res)
            this.image=res;
            this.img='data:image/jpeg;base64,' + res
        }).catch(e=>{
            console.log('cam error :', e)
        })
    }
    //get selected town
    getSelected(town:any){
        this.Location=town;
        console.log(town);
    }
    mainPage(){
        this.navCtrl.popTo(HomePage);
    }
}
