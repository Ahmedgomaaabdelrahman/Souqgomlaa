import { LoginPage } from './../login/login';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MessagesPage } from "../messages/messages";
import { FavoritesPage } from "../favorites/favorites";
import {CommonProvider} from "../../providers/common/common";
import {ItemsProvider} from "../../providers/items/items";
import {DomainProvider} from "../../providers/domain/domain";
import {FavProvider} from "../../providers/fav/fav";
import {MessagedetailsPage} from "../messagedetails/messagedetails";
import {ChatProvider} from "../../providers/chat/chat";
import { Events } from 'ionic-angular';
import {BigimagePage} from "../bigimage/bigimage";
import { ModalController } from 'ionic-angular';
import * as firebase from "firebase";

@Component({
  selector: 'page-proddetails',
  templateUrl: 'proddetails.html',
})
export class ProddetailsPage {
Name=this.navParams.data.SellerId.Name;
image=this.navParams.data.SellerId.image;
D:any;
  newmsg:string;
  ref=firebase.database().ref();

  star:string;
guestUser
  constructor(public events :Events,public chat :ChatProvider,public favProvider:FavProvider,public domain:DomainProvider,public itemsProvider:ItemsProvider,public common:CommonProvider,public navCtrl: NavController, public navParams: NavParams) {
      console.log(' ProddetailsPage',this.navParams.data);

      // this.Name=this.navParams.data.SellerId.Name
      this.D=this.domain.url;
  this.events.subscribe('guest',guest=>{
         this.guestUser=guest;
        })

  }
res:any=[];
    images:any[];
    currentId:any;
  ionViewWillEnter() {
    let x = document.getElementById("myDIV");
    x.style.display = "none"
    this.res=this.navParams.data;
    let self=this;
      this.common.getStoredValue('S').then(res=>{
                        if(res != null){

          console.log('fav',res.Id,this.navParams.data.Id);

          this.favProvider.checkFav(res.Id,this.navParams.data.Id).subscribe(res=>{
          self.currentId=res.Id;
          this.star=res;
              console.log('fav',this.star);

      });}
      });
      this.itemsProvider.getItemsImgsUrls(this.res.Id).then(res=>{

          this.images=res.urls;


      })
  }

  goChat(){
    this.navCtrl.push(MessagesPage);
  }
  fav(){
    this.navCtrl.push(FavoritesPage);
  }

    favTogle(){
        this.common.getStoredValue('S').then(res=>{
                if(res!= null){
            this.favProvider.addToFavorites(res.Id,this.navParams.data.Id).subscribe(res=>{
            console.log('fav',this.star);
            // self.currentId=res.Id;
            this.star=res;
        });}else{
          this.common.presentToast(' عفوا يجب التسجيل اولا','اغلاق')
          this.navCtrl.push(LoginPage)
        }
        });
      // this.star=star;

    }
  sendMSG(){
        console.log(this.navParams.data.SellerId)

        this.common.getStoredValue('S').then(user=>{
                if(user != null){

          console.log('data passed to chat',user.Id,this.navParams.data.SellerId.sellerId)
        this.chat.getMessagesForDetailsPagetodetailsmessages(user.Id,this.navParams.data.SellerId.sellerId).then(res=>{
          console.log('data passed to chat',res)
// if(res!=null) {
//   this.navCtrl.push(MessagedetailsPage, {instances: res});
// }else{
            let send={
        buyerId:user.Id,sellerId:this.navParams.data.SellerId.sellerId

            }
            this.send(this.navParams.data.SellerId.sellerId, user.Id,this.newmsg,{instances: send})
  // this.navCtrl.push(MessagedetailsPage, {instances: send});

// }
        })
      }else{
          this.common.presentToast(' عفوا يجب التسجيل اولا','اغلاق')
          this.navCtrl.push(LoginPage)
        }
        })
    }
  send(seller,buyer,Msg,instances){
    // console.log(this.navParams.data);
    this.common.getStoredValue('S').then(res=>{
      console.log(res.Type)
      if(res.Type==0){
        if(res.Id !=null) {
          this.ref.child('n/' + res.Id + '/').set({
            // R: this.navParams.data.instances.sellerId,
            R: seller,
            msg: Msg
          })
          let msg = {
            currentID: res.Id,
            buyerId: res.Id,
            date: firebase.database.ServerValue.TIMESTAMP,
            // reciverID: this.navParams.data.instances.sellerId,
            reciverID: seller,
            // details: this.navParams.data.instances,
            details: instances,
            body: Msg,
            // sellerId: this.navParams.data.instances.sellerId,
            sellerId: seller,
            senderId: res.Id,
            // sender:res.Id,
            otherUser: seller
            // otherUser: this.navParams.data.instances.sellerId
          }
          // console.log(msg);

          this.chat.sendMsg(msg);
          Msg = ''

        this.navCtrl.push(MessagesPage)
        }}
        });
    }
      // }else{
      //   //
      //   this.ref.child('n/'+res.Id+'/').set({
      //     R: this.navParams.data.instances.buyerId,
      //     msg: this.M
      //   })
    //     let msg = {
    //       currentID: res.Id,
    //       reciverID: this.navParams.data.instances.buyerId,
    //       date:firebase.database.ServerValue.TIMESTAMP,
    //
    // });
    // if(this.content._scroll['initialized']) this.content.scrollToBottom(0) // setTimeout(() => {
    //    // this.content.scrollToBottom(300);
    // }, 1000);
    // if(this.oneTimeMsg){
    //   // this.common.presentToast("")
    //   this.common.presentToast('تم الارسال بنجاح',null)
    //   this.navCtrl.setRoot(MessagesPage)
    // }
  // }
    mainPage(){
        this.navCtrl.popTo(HomePage);
    }
  maximaizeImage(image){
      this.navCtrl.push(BigimagePage,{'image':image})
  }
  myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }


}

  chatCancel(){
    let x = document.getElementById("myDIV");
    x.style.display === "none"
  }
}
