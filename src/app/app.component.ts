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
import { Platform, MenuController,Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CommonProvider } from '../providers/common/common';
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any ;

  constructor(private auth:AuthServiceProvider,private common:CommonProvider,public menuCtrl:MenuController ,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
        this.common.getStoredValue('S').then(res=>{
            if(res.type==1){
                this.nav.setRoot(HomePage);
            }else{
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
     this.nav.push(SoldgoodsPage);
  }
   onFav(){
     this.nav.push(FavoritesPage);
  }
   onMyGoods(){
     this.nav.push(MygoodsPage);
   }
   logOut(){
      this.auth .logOut();
      this.nav.setRoot(LoginPage);
      this.nav.push(LoginPage);
   }
}

