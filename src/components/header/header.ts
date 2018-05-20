import { Nav, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { HomePage } from "../../pages/home/home";


@Component({
  selector: 'myheader',
  templateUrl: 'header.html',
   styles: [`
    .headimgdiv{
      background-color: white  !important;
      border-radius: 10px  !important;
      height: 55px  !important;
      text-align: center  !important;
      margin: 5px auto  !important;
      width: 18%  !important;
    }
     .myimg{
          height: 53px  !important;

       }
    ion-buttons{
          float: left;
          text-align:center !important;
    }

    .headerp{
      color: white  !important;
      margin: 0  !important;
      font-size: 13px  !important;
      text-align: center  !important;
      font-family:cairoreg;
    }
  `],
})
export class HeaderComponent {

  text: string;

  constructor(public navCtrl:NavController) {
    console.log('Hello HeaderComponent Component');
    this.text = 'Hello World';
  }

mainPage(){
  this.navCtrl.popTo(HomePage);
}
}
