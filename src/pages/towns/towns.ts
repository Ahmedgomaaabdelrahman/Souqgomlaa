import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { MessagesPage } from "../messages/messages";
import {TownsProvider} from "../../providers/towns/towns";
import {HomePage} from "../home/home";


@Component({
  selector: 'page-towns',
  templateUrl: 'towns.html',
})
export class TownsPage {
towns:any[];
  constructor(public view:ViewController,public townsProvider:TownsProvider,public navCtrl: NavController, public navParams: NavParams) {
  }
ionViewWillEnter(){
    this.townsProvider.getTowns().subscribe(data=>{

      this.towns=data;
    })
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad TownsPage');
  }
  goChat(){
    this.navCtrl.push(MessagesPage);
  }
    select(town){
    this.view.dismiss(town)
    }
  mainPage(){
    this.navCtrl.popTo(HomePage);

  }
}
