import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessagesPage } from "../messages/messages";
import { ProfilePage } from "../profile/profile";
import {CommonProvider} from "../../providers/common/common";
import {ItemsProvider} from "../../providers/items/items";

@Component({
  selector: 'page-updategood',
  templateUrl: 'updategood.html',
})
export class UpdategoodPage {
    itemName:any;
    quantity:string;
    origin:string;
    price:number;
    description:string;
    category:string;

    img:any;
    images:any=[];
    imagesToDelete:any=[];

  constructor(public itemsProvider:ItemsProvider,public common:CommonProvider,public navCtrl: NavController, public navParams: NavParams) {

  }
    res:any=[];
    ionViewWillEnter() {
//setting the values of html tags
        this.res=this.navParams.data;
        //loading images
        this.itemsProvider.getItemsImgsUrls(this.res.Id).then(res=>{

          this.images=res.urls;
          //using another array to get img name used to be deleted
          this.imagesToDelete=res.imgNames;
        })

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdategoodPage');
  }
  goChat(){
    this.navCtrl.push(MessagesPage);
  }
  goPer(){
    this.navCtrl.push(ProfilePage);
  }
    useCam(source){
        this.common.camPic(source).then(res=>{

            this.images.push('data:image/jpeg;base64,' + res)

        }).catch(e=>{
            console.log('cam error :', e)
        })
    }

    //delete image and empty the arrays of it
    deletImgModal(img) {
        this.common.presentLoadingDefault('سوف يتم الحذف برجاء الانتظار ...')
        this.itemsProvider.deleteImage(this.imagesToDelete[img]).subscribe(res=>{
            this.images.splice(img,1)
            this.imagesToDelete.splice(img,1)
            this.common.loadDismess();
this.common.presentToast('تم الحذف بنجاح','اغلاق');
        })

    }
//update the item
    submit(){
this.itemsProvider.updateItem(this.res.Id,this.itemName,this.quantity,this.origin,this.price,this.description,this.category)
    }
}
