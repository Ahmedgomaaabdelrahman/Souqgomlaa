import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import {NavController, ModalController, NavParams, ViewController} from 'ionic-angular';
import { MessagesPage } from "../messages/messages";
import { ProfilePage } from "../profile/profile";
import {ItemsProvider} from "../../providers/items/items";
import {CommonProvider} from "../../providers/common/common";
import {MygoodsPage} from "../mygoods/mygoods";


@Component({
  selector: 'page-addgood',
  templateUrl: 'addgood.html',
})
export class AddgoodPage {
itemName:string;
quantity:string;
origin:string;
price:number;
description:string;
location:string;
sellerId:number;
category:string;
status:string;
    img:any;
    images:any=[];
  constructor(public modalCtrl: ModalController,private items:ItemsProvider,public navCtrl: NavController, public navParams: NavParams,private common:CommonProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddgoodPage');
  }
  
  goChat(){
    this.navCtrl.push(MessagesPage);
  }
  goPer(){
    this.navCtrl.push(ProfilePage);
  }
    submit(){
      this.common.presentLoadingDefault('برجاء الانتظار ...')
    this.common.getStoredValue('S').then(res=>{
      this.sellerId=res.Id;
      this.location=res.Location;
      this.status='معروضة';
        this.category=this.navParams.data;
this.items.addItem(this.itemName,this.quantity,this.origin,this.price,this.description,this.location
,this.sellerId,this.category,this.status).subscribe(res=>{

  console.log(res);
  try{
      if(this.images.length != 0){

  for(let i=0;i<this.images.length;i++){
      let imm=this.images[i];
  this.items.itemImageUpload(res.Id,imm).subscribe(res=>{console.log(res)
      if(i==(this.images.length-1)){
      this.common.loadDismess()
      this.common.presentToast('تمت الاضافة بنجاح','تم');
this.navCtrl.setRoot(MygoodsPage)
      }
  });

  }}else{
          this.common.loadDismess()
          this.common.presentToast('تمت الاضافة بنجاح','تم');

      }
  }catch (E){
      this.common.loadDismess()
      this.common.presentToast('فشلت الاضافة','تم');

  }
});
    });
    }
    useCam(source){
        this.common.camPic(source).then(res=>{
            // console.log('img',res)
            // this.images.push()=res;
            this.images.push('data:image/jpeg;base64,' + res)
        }).catch(e=>{
            console.log('cam error :', e)
        })
    }
    deletImgModal(img) {
        // const profileModal = this.modalCtrl.create(Profile, { selectedImg: img });
        // profileModal.present();
        console.log('array id : ',img)
        this.images.splice(img,1)
        console.log('array id : ', img)

    }
    mainPage(){
        this.navCtrl.popTo(HomePage);
    }
}
// @Component({
//     selector: 'page-addgood',
//     template: '<html><body>' +
//     '<img src={{selectedImg}}>' +
//     '<button (click)="delete()"></button>' +
//     '</body></html>',
// })class Profile {
//     selectedImg:any;
//     imgId:number;
//     constructor(params: NavParams,public viewCtrl: ViewController) {
//         // console.log('UserId', params.get('userId'));
//         this.selectedImg=params.get('selectedImg');
//         this.imgId=params.get('imgId');
//
//     }
//     delete(){
//         let data = { 'foo': 'bar' };
//         this.viewCtrl.dismiss(data);
//     }
// }