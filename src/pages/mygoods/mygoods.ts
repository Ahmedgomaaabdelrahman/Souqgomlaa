import { HomePage } from './../home/home';
import { UpdategoodPage } from './../updategood/updategood';
import {Component, NgZone} from '@angular/core';
import {Events, NavController, NavParams,AlertController } from 'ionic-angular';
import { ProfilePage } from "../profile/profile";
import { MessagesPage } from "../messages/messages";
import {CommonProvider} from "../../providers/common/common";
import {ItemsProvider} from "../../providers/items/items";
import {DomainProvider} from "../../providers/domain/domain";


@Component({
  selector: 'page-mygoods',
  templateUrl: 'mygoods.html',
})
export class MygoodsPage {
goods:any=[];
thumps:any=[];
D:any
  newMessage:boolean;

  constructor(public zone:NgZone,private alertCtrl: AlertController,public events:Events,public domain:DomainProvider,public navCtrl: NavController, public navParams: NavParams,private common:CommonProvider,private items:ItemsProvider) {
this.D=this.domain.url
  }
  mode:any;
  ionViewWillEnter(){
    let self =this

    this.zone.run(()=>{
      this.newMessage=false;})
    this.events.subscribe('newMessage', (message)=> {
      console.log('newMessage',message)
      self.newMessage=message

    })
    this.mode=this.navParams.data.data;
    this.goods=[];
    this.common.getStoredValue('S').then(res=>{
        //////////////
       if(this.mode==1){
           this.items.getMySoldItems(res.Id).subscribe(res=>{
               // console.log('myItems',res);
               for(let i=0;i<res.item.length;i++){

                   console.log('myItems',res.item[i]);
                   if(res.img[i]!=null){
                       this.thumps.push(this.D+'/Image_Thump/'+res.img[i].Image);
                   }else{
                     this.thumps.push('assets/imgs/icon.png');

                   }
                   this.goods.push(res.item[i]);

               }
               this.common.storeValue('items',this.goods)
           });
       } else{
      this.items.getMyItems(res.Id).subscribe(res=>{
        // console.log('myItems',res);
        for(let i=0;i<res.item.length;i++){

            console.log('myItems',res.item[i]);
            if(res.img[i]!=null){
this.thumps.push(this.D+'/Image_Thump/'+res.img[i].Image);}else{
              this.thumps.push('assets/imgs/icon.png');
            }
            this.goods.push(res.item[i]);

        }
        this.common.storeValue('items',this.goods)
      });
       }
      //////////////////
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MygoodsPage');
  }
  goPer(){
    this.navCtrl.push(ProfilePage);
  }
  goChat(){
    this.navCtrl.push(MessagesPage);
  }
  goUpdate(item){
          // console.log('iiiiiii',item)
          this.navCtrl.push(UpdategoodPage,item);
      }
    deleteItem(id:number,index:number){
      let alert = this.alertCtrl.create({
        // title: 'Confirm purchase',
        message: 'هل تريد الحذف',
        buttons: [
          {
            text: 'الغاء',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'حذف المنتج',
            handler: () => {
              console.log('id deleted : ',id,index)


              this.items.deleteItem(id).subscribe(res=>{
                this.goods.splice(index,1)
                console.log('item deleted : ',res)

              })


              console.log('Buy clicked');
            }
          }
        ]
      });
      alert.present();
/////////////////////


  }
    mainPage(){
        this.navCtrl.popTo(HomePage);
    }


  presentConfirm(callback) {

  }
}
