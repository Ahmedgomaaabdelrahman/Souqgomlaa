import { UpdategoodPage } from './../pages/updategood/updategood';
import { MygoodsPage } from './../pages/mygoods/mygoods';
import { SearchresultPage } from './../pages/searchresult/searchresult';
import { ActivationPage } from './../pages/activation/activation';
import { SignupPage } from './../pages/signup/signup';
import { TownsPage } from './../pages/towns/towns';
import { SolgoddetailPage } from './../pages/solgoddetail/solgoddetail';
import { SoldgoodsPage } from './../pages/soldgoods/soldgoods';
import { SigntypePage } from './../pages/signtype/signtype';
import { SearchPage } from './../pages/search/search';
import { ProfilePage } from './../pages/profile/profile';
import { ProddetailsPage } from './../pages/proddetails/proddetails';
import { NotificationsPage } from './../pages/notifications/notifications';
import { MessagesPage } from './../pages/messages/messages';
import { MessagedetailsPage } from './../pages/messagedetails/messagedetails';
import { FavoritesPage } from './../pages/favorites/favorites';
import { EditaccountPage } from './../pages/editaccount/editaccount';
import { CategoriesPage } from './../pages/categories/categories';
import { AddgoodPage } from './../pages/addgood/addgood';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,NgZone  } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,ModalController, NavController,ToastController,LoadingController} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HeaderComponent } from '../components/header/header';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpModule ,Http} from '@angular/http';
import { TownsProvider } from '../providers/towns/towns';
import { IonicStorageModule } from '@ionic/storage';
import { CommonProvider } from '../providers/common/common';
import { ItemsProvider } from '../providers/items/items';
import { Camera, CameraOptions } from '@ionic-native/camera';
class CameraMock extends Camera {
    getPicture(options) {
        return new Promise((resolve, reject) => {

            resolve("BASE_64_ENCODED_DATA_GOES_HERE");
        })
    }
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ActivationPage,
    LoginPage,
    AddgoodPage,
    CategoriesPage,
    EditaccountPage,
    FavoritesPage,
    MessagedetailsPage,
    MessagesPage,
    NotificationsPage,
    ProddetailsPage,
    ProfilePage,
    SignupPage,
    SearchPage,
    SigntypePage,
    SoldgoodsPage,
    SolgoddetailPage,
    TownsPage,
    HeaderComponent,
    SearchresultPage,
    MygoodsPage,
    UpdategoodPage
      // ,
    // ItemsPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),HttpModule,IonicStorageModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ActivationPage,
    LoginPage,
    AddgoodPage,
    CategoriesPage,
    EditaccountPage,
    FavoritesPage,
    MessagedetailsPage,
    MessagesPage,
    NotificationsPage,
    ProddetailsPage,
    ProfilePage,
    SearchPage,
    SigntypePage,
    SignupPage,
    SoldgoodsPage,
    SolgoddetailPage,
    TownsPage,
    HeaderComponent,
    SearchresultPage,
    MygoodsPage,
    UpdategoodPage
  ],
  providers: [
    StatusBar,
    SplashScreen,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
      { provide: Camera, useClass: Camera },

    AuthServiceProvider,
    TownsProvider,ToastController,LoadingController,ModalController,
    CommonProvider,{ provide: IonicStorageModule, useClass: IonicStorageModule},
    ItemsProvider
  ]
})
export class AppModule {}
