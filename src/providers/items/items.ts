import { Injectable } from '@angular/core';
import {Http, Headers,RequestOptions} from '@angular/http';
import {BehaviorSubject} from "rxjs";
import 'rxjs/add/operator/map';

import {DomainProvider} from "../domain/domain";

/*
  Generated class for the ItemsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ItemsProvider {
    baseUrl:String;
// url='http://45.55.85.173';
  constructor(public http: Http,public domain:DomainProvider) {
    console.log('Hello ItemsProvider Provider');
      // this.baseUrl='http://127.0.0.1:9200';
      this.baseUrl=this.domain.url;

  }
    addItem(
        name:string,
    quantity:string,
    origin:string,
    price:number,
    description:string,
    location:string,
    sellerId:number,
    category:string,
    Status:string){
        let seller=
            {
              'ItemName':name,
              'Quantity':quantity,
              'Origin':origin,
              'Price':price,
              'Description':description,
              'Location':location,
              'SellerId':sellerId,
              'Category':category,
              'Status':Status}


return this.http.post(this.baseUrl+'/ItemIn',seller).map(res=>res.json().res);
    }
    getMyItems(SellerID:any){
        let id={'SellerId':SellerID}
        return this.http.post(this.baseUrl+'/getMyItems',id).map(res=>res.json().res);

    }
    getMyItemStatistics(SellerID:any){
        let id={'SellerId':SellerID}
        return this.http.post(this.baseUrl+'/getMyStatics',id).map(res=>res.json().res);

    }
    getMySoldItems(SellerID:any){
        let id={'SellerId':SellerID}
        return this.http.post(this.baseUrl+'/getMySoldItems',id).map(res=>res.json().res);

    }
     headers = new Headers({'Content-Type': 'application/json'});

    getAllItems(r:any){
       let options = new RequestOptions({headers: this.headers, method: "post"});
       let deleteOptions = new RequestOptions({headers: this.headers, method: "delete"});
       let getOptions = new RequestOptions({headers: this.headers, method: "get"});
       let putOptions = new RequestOptions({headers: this.headers, method: "put"});
        return this.http.post(this.baseUrl+'/getAllItems',r,options).map(res=>res.json().res);

    }
    itemImageUpload(itemId:number,image:string){
        let itemImage={'ItemId':itemId,
        'image':image}

        return this.http.post(this.baseUrl+'/storeItemImage',itemImage).map(res=>res.json().res);

    }
    getItemImagesIDs(itemId:number){
        let Id={'ItemId':itemId}
        return this.http.post(this.baseUrl+'/getitemImagesIds',Id).map(res=>res.json().res);

    }
    deleteImage(imageName:number){

        let Id={'imageName':imageName}
        return this.http.post(this.baseUrl+'/deleteImage',Id).map(res=>res.json().res);

    }
    urls:any;
    imgNames:any;

    getItemsImgsUrls(itemId:number):Promise<any>{
        let self=this;
        let promise=new Promise((resolve,reject)=>{

        this.getItemImagesIDs(itemId).subscribe(res=>{
            self. urls=[]
            self. imgNames=[]
           for (let i=0;i<res.length;i++){
               self.  urls.push(this.baseUrl+'/ItemImages/'+res[i].Image);
               self.  imgNames.push(res[i].Image);

               if(i==(res.length-1)){
                   console.log('imgs names',self. imgNames)
                   let imgObject={'urls':self.urls,'imgNames': self. imgNames}

                   resolve(imgObject);
               }
           }
        });
        });

        return promise;
    }
    getItemfirstImgUrl(itemId:number):Promise<any>{
        let self=this;
        let promise=new Promise((resolve,reject)=>{

            this.getItemImagesIDs(itemId).subscribe(res=>{
                self. urls=[]
                self. imgNames=[]
                if(res[0]!=null)
                    self.  urls.push(this.baseUrl+'/ItemImages/'+res[0].Image);
                    // self.  imgNames.push(res[i].Image);

                    // if(i==(res.length-1)){
                        console.log('imgs names',self. imgNames)
                        let imgObject={'urls':self.urls,'imgNames': self. imgNames}

                        resolve(imgObject);
                    // }
                // }
            });
        });

        return promise;
    }
    updateItem( itemId,name:any,
                quantity:string,
                origin:string,
                price:number,
                description:string,
                category:string,
                status:string,Location:string
    ){
        let newItem=
            {'Id':itemId,
                'ItemName':name,
                'Quantity':quantity,
                'Origin':origin,
                'Location':Location,
                'Price':price,
                'Description':description,
                'Category':category,
                'Status':status
            }
        return this.http.post(this.baseUrl+'/itemUpdate',newItem).map(res=>res.json().res);
    }

    deleteItem(id){
    let itemId={'Id':id};
        return this.http.post(this.baseUrl+'/itemDelete',itemId).map(res=>res.json().res);


    }
}
