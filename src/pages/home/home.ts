import { ProfilePage } from './../profile/profile';
import { ProddetailsPage } from './../proddetails/proddetails';
import { Component } from '@angular/core';
import { NavController,MenuController,NavParams } from 'ionic-angular';
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
all:any;
details:any;
i:any
d:any
    D:string;
    valid:boolean;
    mode:any;
  constructor(public navParams:NavParams,public searchProvider:ItemSearchProvider,public domain:DomainProvider,public items:ItemsProvider,public common:CommonProvider,public menuCtrl:MenuController,public navCtrl: NavController) {

this.valid=false;

  }
  help:any;
  getItems(){

      this.items.getAllItems({'i': 0}).subscribe(res => {

          if (res != null) {
              this.valid = true;
              this.all = res;
              console.log(this.all)
              this.i = res[(res.length) - 1].Id;

          } else if(res == null || res.length<10){
              this.help+=10

              // this.getItems();
              this.valid = false;
          }
          this.common.loadDismess();

      })
  }
ionViewWillEnter(){
this.help=0;
    this.all=[];
    let self=this;
    this.mode=this.navParams.data.mode
    this.D=this.domain.url;
if(this.mode!=1) {
    this.common.presentLoadingDefault('رجاء الانتظار ...')

 this.getItems();
}else if(this.mode==1){
    this.valid = true;

    self.all=[];
    this.searchProvider.search(this.navParams.data.cat,this.navParams.data.town).subscribe(data=>{
        console.log('result',data)
        self.all=data;
    })
} else {
    this.valid = false;
}
this.common.loadDismess();

console.log('result',this.all)

}
  goDetails(item :any){
    // console.log('iiiiiii',item)
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

                this.common.loadDismess();

                console.log('res',res)

                if(res !=null){
                for (let i=0; i < res.length; i++) {
                    this.all.push(res[i])
                }}
                infiniteScroll.complete();
                resolve();

            })
        })
    }
   //  ionViewWillLeave() {
   // }
}
