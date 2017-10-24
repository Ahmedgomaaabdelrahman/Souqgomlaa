import { ProfilePage } from './../profile/profile';
import { ProddetailsPage } from './../proddetails/proddetails';
import { Component } from '@angular/core';
import { NavController,MenuController } from 'ionic-angular';
import { MessagesPage } from "../messages/messages";
import {ItemsProvider} from "../../providers/items/items";
import {CommonProvider} from "../../providers/common/common";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
all:any;
details:any;
i:any
d:any
  constructor(public items:ItemsProvider,public common:CommonProvider,public menuCtrl:MenuController,public navCtrl: NavController) {

  }
ionViewWillEnter(){
    this.all=[];
    this.common.presentLoadingDefault('رجاء الانتظار ...')
    this.items.getAllItems({'i':0}).subscribe(res=>{


            this.all=res;
        console.log('itemmm',res[9].Id);
        console.log('itemmm',res);
        this.i=res[(res.length)-1].Id;
        this.common.loadDismess();

    })
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
                if(res.length !=0){
                for (let i=0; i < res.length; i++) {
                    this.all.push(res[i])
                }}
                infiniteScroll.complete();
                resolve();

            })
        })
    }
}
