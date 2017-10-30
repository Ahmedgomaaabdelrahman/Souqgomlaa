import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ItemsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ItemsProvider {
    baseUrl:String;
url='http://45.55.85.173';
  constructor(public http: Http) {
    console.log('Hello ItemsProvider Provider');
      // this.baseUrl='http://127.0.0.1:9200';
      this.baseUrl='http://45.55.85.173';

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
    getAllItems(r:any){
        return this.http.post(this.baseUrl+'/getAllItems',r).map(res=>res.json().res);

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
    updateItem( itemId,name:any,
                quantity:string,
                origin:string,
                price:number,
                description:string,
                category:string){
        let newItem=
            {'Id':itemId,
                'ItemName':name,
                'Quantity':quantity,
                'Origin':origin,
                'Price':price,
                'Description':description,
                'Category':category
            }
        return this.http.post(this.baseUrl+'/itemUpdate',newItem).map(res=>res.json().res);
    }

    deleteItem(id){
    let itemId={'Id':id};
        return this.http.post(this.baseUrl+'/itemDelete',itemId).map(res=>res.json().res);


    }
}
