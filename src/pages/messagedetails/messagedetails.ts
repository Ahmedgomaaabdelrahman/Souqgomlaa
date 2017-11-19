import { Component,ViewChild } from '@angular/core';
import {Events, Keyboard, NavController, NavParams} from 'ionic-angular';
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
    @ViewChild('content') content:any;
M:any;
icon:any;
myMsgs:any;
myId:any;
ref=firebase.database().ref();

  constructor(public event:Events,public keyboard: Keyboard,public common:CommonProvider,public chat:ChatProvider,public navCtrl: NavController, public navParams: NavParams) {
      this.common.getStoredValue('S').then(user=>{
          this.myId=user.Id
          this.content.scrollToBottom();
      })
this.icon="ios-send"
      let self=this
      this.myMsgs=[]
//chat//
      this.ref.child('msgs/'+this.navParams.data.instances.key).on('value', data =>{

          this.chat.allmsgs(this.navParams.data.instances.key).then(msgs=>{
    console.log(msgs)
    self.myMsgs=[]
    for(var i in msgs){
        self.myMsgs.push(msgs[i]);
        console.log( msgs[i])

    }
   
    
})
  })
//////chat//////
if(this.keyboard.didShow)this.icon="ios-send"
      else if(this.keyboard.didHide)this.icon="ios-send"


  }
 
    


  ionViewDidLoad(){

      console.log( this.myMsgs)

    console.log('ionViewDidLoad MessagedetailsPage',this.navParams.data);
    // this.chat
  }

    send(){
    console.log(this.navParams.data.sellerId);
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
        console.log(msg);

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
          console.log(msg);
          this.chat.sendMsg(msg);
          this.M=''

      }
  });
  this.content.scrollToBottom();
  
  }
  dirClass:string;
  mainPage(){
    this.navCtrl.popTo(HomePage);
}
}
