import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import {Events, LoadingController, ToastController} from "ionic-angular";
import { Camera, CameraOptions } from '@ionic-native/camera';

/*
  Generated class for the CommonProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CommonProvider {

  constructor(public event:Events,private camera: Camera,public loadingCtrl: LoadingController, public toast:ToastController,private store:Storage,public http: Http) {
    console.log('Hello CommonProvider Provider');
  }
storeValue(key:any,value:any){
    this.store.set(key,value);

}
getStoredValue(key:any):Promise<any>{
let promise=new Promise((resolve,reject)=>{
    this.store.get(key).then((val) => {
        console.log('am from local storage ', val);
        resolve(val);
    }).catch((e)=>{
        console.log('storage err :',e);
    });
});
    return promise;
}
removeStoredKey(key:any){
    this.store.remove(key);
}
    presentToast(msg:string,closeText:string,callback?) {
        const toast = this.toast.create({
            message: msg,
            duration: 4000,
            position: 'bottom'
            ,dismissOnPageChange:true,
            showCloseButton:true
            ,closeButtonText:closeText
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
            callback;
        });

        toast.present();

    }
    presentLoadingDefault(msg:any) {
        this.loading = this.loadingCtrl.create({
            spinner:'ios',
            content: msg
        });

        this.loading.present();
return this.loading;
    }
loading:any;
    loadDismess(){
   this.loading.dismiss();
    }
    //profile pic handler

    camPic(source):Promise<string>{
        let promise=new Promise((resolve,reject)=>{
        const options: CameraOptions = {
            quality: 50,
            sourceType:source,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            let base64Image =  imageData;
            resolve(base64Image);
        }, (err) => {
            reject(err)
            // Handle error
        });
        })
        return promise;
    }
    eventPublish(ev,content){
        this.event.publish(ev, content)
    }

}
