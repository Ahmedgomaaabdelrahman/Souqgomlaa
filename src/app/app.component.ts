import { MygoodsPage } from './../pages/mygoods/mygoods';
import { CategoriesPage } from './../pages/categories/categories';
import { FavoritesPage } from './../pages/favorites/favorites';
import { SoldgoodsPage } from './../pages/soldgoods/soldgoods';
import { AddgoodPage } from './../pages/addgood/addgood';
import { EditaccountPage } from './../pages/editaccount/editaccount';
import { SearchPage } from './../pages/search/search';
import { NotificationsPage } from './../pages/notifications/notifications';
import { LoginPage } from './../pages/login/login';
import { Component,ViewChild } from '@angular/core';
import { Platform, Nav, Config, ToastController , MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CommonProvider } from '../providers/common/common';
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import { HomePage } from '../pages/home/home';
import { Events } from 'ionic-angular';
import {ChatProvider} from "../providers/chat/chat";
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { BackgroundMode } from '@ionic-native/background-mode';

//   const options: PushOptions = {
// //    android: {},
//    ios: {
//        alert: 'true',
//        badge: true,
//        sound: 'false'
//    },
// //    windows: {},
// //    browser: {
//     //    pushServiceURL: 'http://push.api.phonegap.com/v1/push'
// //    }
// };

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any ;

  constructor(private backgroundMode: BackgroundMode,public push:Push,public chat:ChatProvider,public events: Events,private toastCtrl:ToastController,private auth:AuthServiceProvider,private common:CommonProvider,public menuCtrl:MenuController ,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    platform.ready().then(() => {
      this.backgroundMode.enable();

// chat  
 //push test
  //       this.push.hasPermission()
  // .then((res: any) => {

  //   if (res.isEnabled) {
  //     console.log('We have permission to send push notifications');
  //     this.push.listChannels().then((channels) => console.log('List of channels', channels))

  //   } else {
  //     console.log('We do not have permission to send push notifications');
  //   }

  // });

// const pushObject: PushObject = this.push.init(options);


// pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

// pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

// pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
///////
        try {
                       

           this.chat.onTokenRecived(this.nav);
            this.chat.onTokenIdRefresh();

 //this.chat.pushN();
        }catch(e){
            console.log(e);
        }
        ///////////////////////////////
        //back button handle
        //Registration of push in Android and Windows Phone
        // var lastTimeBackPress = 0;
        // var timePeriodToExit  = 2000;
        //
        // platform.registerBackButtonAction(() => {
        //     // get current active page
        //     let view = this.nav.getActive();
        //     // if (view.component.name == "TabsPage") {
        //         //Double check to exit app
        //         if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
        //             platform.exitApp(); //Exit from app
        //         } else {
        //             let toast = this.toastCtrl.create({
        //                 message:  'انقر مرة اخري للخروج من التطبيق',
        //                 duration: 3000,
        //                 position: 'bottom'
        //             });
        //             toast.present();
        //             lastTimeBackPress = new Date().getTime();
        //         }
        //     // } else {
        //         // go to previous page
        //         // this.nav.pop({});
        //     // }
        // });

        /////////////////////////////
        this.guestUser=false;

        this.events.subscribe('userType',user=>{

            if(user==1){
                this.type=true;

            }else if(user==0){
                this.type=false;


            }
        })
        this.events.subscribe('guest',guest=>{
         this.guestUser=guest;
        })
        this.common.getStoredValue('S').then(res=>{
            // console.log(this.type)
            console.log(res.Type)
            if(res.Type==1){
                this.type=true;

                this.nav.setRoot(MygoodsPage,{'data':0});
            }else if(res.Type==0){
                this.type=false;

                this.nav.setRoot(HomePage);

            }
        }).catch((e)=>{
this.rootPage=LoginPage;
            this.nav.push(LoginPage);

        })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

  toggleclose(){
    this.menuCtrl.close();
  }

   type:any;
  guestUser:any;
   onNotify(){
     this.nav.push(NotificationsPage);
  }
   onSearch(){
     this.nav.push(SearchPage);
  }
   onEdit(){
     this.nav.push(EditaccountPage);
  }
   onAddGood(){
     this.nav.push(CategoriesPage);
  }
   onSold(){
     this.nav.push(MygoodsPage,{'data':1});
  }
   onFav(){
     this.nav.push(FavoritesPage);
  }
   onMyGoods(){
     this.nav.push(MygoodsPage,{'data':0});
   }

   logOut(){
      this.auth .logOut();
      this.nav.setRoot(LoginPage);
      this.nav.push(LoginPage);
   }
    mainPage(){
        this.nav.setRoot(HomePage);
    }
}

