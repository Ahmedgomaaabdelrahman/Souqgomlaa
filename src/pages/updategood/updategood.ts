import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessagesPage } from "../messages/messages";
import { ProfilePage } from "../profile/profile";
import {CommonProvider} from "../../providers/common/common";
import {ItemsProvider} from "../../providers/items/items";
import {TownsProvider} from "../../providers/towns/towns";

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
  towns:any=[];
  selectOptions:any;
    res:any=[];
    status:any;
    img:any;
    images:any=[];
    imagesToDelete:any=[];

  constructor(private _towns:TownsProvider, public itemsProvider:ItemsProvider,public common:CommonProvider,public navCtrl: NavController, public navParams: NavParams) {
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
    ionViewWillEnter() {
//setting the values of html tags
        this.res=this.navParams.data;
        this.price=this.res.Price;

        this.itemName=this.res.ItemName;
        this.quantity=this.res.Quantity;
this.status=this.res.Status;
        if(this.status=='معروضة')    {

            this.color='light'
        }else if(this.status=='معطلة'){
            this.color='dark'

        } else if(this.status=='مباعة'){
            this.color='danger'

        }
            this.origin=this.res.Origin;
        this.description=this.res.Description;
            this.category=this.res.Category;
                //loading images
        this.itemsProvider.getItemsImgsUrls(this.res.Id).then(res=>{

          this.images=res.urls;
          //using another array to get img name used to be deleted
          this.imagesToDelete=res.imgNames;
        })}
  Location
  getSelected(town:any){
    this.Location=town;
    console.log(town);
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
        this.common.presentLoadingDefault('برجاء الانتظار حتي اكتمال التعديل ...')
this.itemsProvider.updateItem(this.res.Id,this.itemName,this.quantity,this.origin,this.price,this.description,this.category,this.status,this.Location).subscribe(res=>{

    //
    // console.log(res);
    try{
        if(this.images.length != 0){

            for(let i=0;i<this.images.length;i++){
                let imm=this.images[i];
                this.itemsProvider.itemImageUpload(res.Id,imm).subscribe(res=>{
                    // console.log(res)
                    if(i==(this.images.length-1)){
                        this.common.loadDismess()
                        this.common.presentToast('تمت التعديل','اغلاق')
                    }
                });

            }}else{
            this.common.loadDismess()
            this.common.presentToast('تمت التعديل','اغلاق')
        }
    }catch (E){
        this.common.loadDismess()
        this.common.presentToast('فشل التعديل ','اغلاق')

    }
    //



})
    }


    ///////////////////
    color:any;
    statusManege(){
if(this.status=='معروضة')    {
    this.color='light'

    this.status='معطلة'
}else if(this.status=='معطلة'){
    this.color='dark'

    this.status='مباعة'

} else if(this.status=='مباعة'){
    this.color='danger'

    this.status='معروضة'

}
}
mainPage(){
    this.navCtrl.popTo(HomePage);
}
}
