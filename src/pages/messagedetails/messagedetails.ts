import { Component,ViewChild,NgZone } from '@angular/core';

import {Content, Events, Keyboard, NavController, NavParams} from 'ionic-angular';
import {ChatProvider} from "../../providers/chat/chat";
import {CommonProvider} from "../../providers/common/common";
import {Observable} from "rxjs/Observable";
import * as firebase from "firebase";
import { HomePage } from '../home/home';



@Component({
  selector: 'page-messagedetails',
  templateUrl: 'messagedetails.html',
})
export class MessagedetailsPage {
    @ViewChild(Content) content:any;
M:any;
icon:any;
myMsgs:any;
myId:any;
scrollContent:any;
ref=firebase.database().ref();

  constructor(public zone:NgZone,public event:Events,public keyboard: Keyboard,public common:CommonProvider,public chat:ChatProvider,public navCtrl: NavController, public navParams: NavParams) {
      // this.scrollContent=this.content['_scroll']['initialized']
      this.common.getStoredValue('S').then(user=>{
          this.myId=user.Id
          // this.content.scrollToBottom();
          console.log('fffffff',this.content)
          // if(this.content._scroll['initialized'])
              this.content.scrollToBottom(0)
      })
this.icon="ios-send"
      let self=this
      this.zone.run(()=>{
          this.myMsgs=[]
      })
//chat//
    if(this.navParams.data.instances.key!=null){
      this.ref.child('msgs/'+this.navParams.data.instances.key).on('value', data =>{

          this.chat.allmsgs(this.navParams.data.instances.key).then(msgs=>{this.zone.run((

          )=>{
              console.log(msgs)
              self.myMsgs=[]
              for(var i in msgs){
               this.zone.run(()=>{   self.myMsgs.push(msgs[i]);})
                  // console.log( msgs[i])

              }

              // this.content.scrollToBottom(0)
          })


})
 setTimeout(() => {
     try{
          if(this.content._scroll['initialized'])
              this.content.scrollToBottom(0)
     }catch(e){
         console.log(e)
     }
            }, 300);
  })
}

//////chat//////
// if(this.keyboard.didShow)this.icon="ios-send"
//       else if(this.keyboard.didHide)this.icon="ios-send"


  }




  ionViewDidLoad(){

      console.log( this.myMsgs)

    console.log('ionViewDidLoad MessagedetailsPage',this.navParams.data);
    setTimeout(() => {
        // if(this.content._scroll['initialized']) this.content.scrollToBottom(0)
        this.content.scrollToBottom(0)
    }, 1000);

    // this.chat
  }

    send(){
    console.log(this.navParams.data);
  this.common.getStoredValue('S').then(res=>{
      console.log(res.Type)
      if(res.Type==0){
    if(res.Id !=null) {
this.ref.child('n/'+res.Id+'/').set({
    R: this.navParams.data.instances.sellerId,
    msg: this.M
})
        let msg = {
            currentID: res.Id,
            buyerId: res.Id,
            reciverID: this.navParams.data.instances.sellerId,
            details: this.navParams.data.instances,
            body: this.M,
            sellerId:this.navParams.data.instances.sellerId,
            senderId:res.Id,
            // sender:res.Id,
            otherUser: this.navParams.data.instances.sellerId
        }
        // console.log(msg);

        this.chat.sendMsg(msg);
        this.M=''

    }}else{
          //
          this.ref.child('n/'+res.Id+'/').set({
              R: this.navParams.data.instances.buyerId,
              msg: this.M
          })
          let msg = {
              currentID: res.Id,
              reciverID: this.navParams.data.instances.buyerId,
              details: null,
              body: this.M,
              senderId:res.Id,
              // sender:res.Id,
              sellerId:res.Id,
              buyerId: this.navParams.data.instances.buyerId,

              otherUser: this.navParams.data.instances.buyerId

          }
          // console.log(msg);
          this.chat.sendMsg(msg);
          this.M=''

      }
  });
        if(this.content._scroll['initialized']) this.content.scrollToBottom(0) // setTimeout(() => {
 //    // this.content.scrollToBottom(300);
 // }, 1000);

  }
  dirClass:string;
  mainPage(){
    this.navCtrl.popTo(HomePage);
}
}
