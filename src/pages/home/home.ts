import { BigimagePage } from './../bigimage/bigimage';
import { ProfilePage } from './../profile/profile';
import { ProddetailsPage } from './../proddetails/proddetails';
import { Component,NgZone } from '@angular/core';
import {NavController, MenuController, NavParams, Events} from 'ionic-angular';
import { MessagesPage } from "../messages/messages";
import {ItemsProvider} from "../../providers/items/items";
import {CommonProvider} from "../../providers/common/common";
import {DomainProvider} from "../../providers/domain/domain";
import {ItemSearchProvider} from "../../providers/item-search/item-search";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  newMessage:boolean;
all:any;
realAll:any;
itemimg:any;
details:any;
i:any
d:any
    D:string;
    valid:boolean;
    mode:any;
  constructor(public zone:NgZone,public events:Events, public navParams:NavParams,public searchProvider:ItemSearchProvider,public domain:DomainProvider,public items:ItemsProvider,public common:CommonProvider,public menuCtrl:MenuController,public navCtrl: NavController) {
    this.zone.run(()=>{
      this.newMessage})
    let selfm=this
    this.zone.run(()=>{

      this.events.subscribe('newMessage', (message)=> {
      console.log('newMessage',message)
      this.zone.run(()=>{message})
      selfm.newMessage=message

    })
      this.events.subscribe('sendAlertMsg', (message)=> {
      console.log('newMessage',message)

    })

    })
this.valid=false;
      // console.log('context',this.navCtrl);

  }
  help:any;

openImage(img){
    this.navCtrl.push(BigimagePage,{"image":img});
}


  getItems(){
      this.all=[]
      this.realAll=[]
this.itemimg=[];
      this.items.getAllItems({'i': 0}).subscribe(res => {

          if (res != null) {
              console.log('get all  result',res)

              this.valid = true;
              this.all = res;
              console.log(this.all)
              this.i = res[(res.length) - 1].Id;

for(let i=0;i<this.i;i++){
    if(res[i]!=null){
    this.items.getItemfirstImgUrl(res[i].Id).then(
        itemurl=>{
            console.log('itemurl',itemurl.urls);
this.itemimg.push(itemurl.urls)
            this.realAll.push(res[i])
        });
    }
}
          } else if(res == null || res.length<10){
              this.help+=10

              this.valid = false;
          }
          try{
              this.common.loadDismess();
          }catch (e){}

      })
  }
ionViewWillEnter(){
    // let selfm=this
    // this.events.subscribe('newMessage', (message)=> {
    //   console.log('newMessage',message)
    //   selfm.newMessage=message
    //
    // })
this.help=0;
    this.all=[];
    this.realAll=[]
    let self=this;
    this.mode=this.navParams.data.mode
    this.D=this.domain.url;
if(this.mode!=1) {
    this.common.presentLoadingDefault('رجاء الانتظار ...')

 this.getItems();
}else if(this.mode==1){
    this.valid = true;

    self.all=[];
    self.realAll=[];
    this.itemimg=[]

    this.searchProvider.search(this.navParams.data.cat,this.navParams.data.town).subscribe(data=>{
        console.log('search result',data)
        self.all=data;
        console.log('search result',self.all.length)

        for(let i=0;i<=self.all.length;i++){
            if(data[i]!=null)
                this.items.getItemfirstImgUrl(data[i].Id).then(
                    itemurl=>{
                        console.log('iiiiiiiimages',itemurl.urls);
                        this.itemimg.push(itemurl.urls)
                        this.realAll.push(data[i])
                    });
        }

    })
} else {
    this.valid = false;
}
    try{
        this.common.loadDismess();
    }catch (e){}

console.log('result',this.realAll)

}
  goDetails(item :any){
    this.navCtrl.push(ProddetailsPage,item);
  }

  goPer(){
    this.navCtrl.push(ProfilePage);
  }
  goChat(){
    this.navCtrl.push(MessagesPage);
  }

    doInfinite(infiniteScroll){


        return new Promise((resolve) => {
            console.log('f',this.all[(this.all.length)-1].Id)
            let f=this.all[(this.all.length)-1].Id;
            let x={'i':f}
            this.items.getAllItems(x).subscribe(res=>{


                if(res !=null){
                for (let i=0; i < res.length; i++) {
                    this.items.getItemfirstImgUrl(res[i].Id).then(
                        itemurl=>{
                            console.log('itemurl',itemurl);

                        });
                    this.items.getItemfirstImgUrl(res[i].Id).then(
                        itemurl=>{
                            console.log('itemurl',itemurl.urls);
                            this.itemimg.push(itemurl.urls)
                        });
                    this.realAll.push(res[i])
                }}
                console.log('items',this.realAll);
                infiniteScroll.complete();
                resolve();

            })
        })
    }
    ionViewWillLeave() {
      // this.newMessage==false;
   }
}
