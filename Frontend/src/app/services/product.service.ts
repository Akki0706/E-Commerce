import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../types/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  http = inject(HttpClient); 

  constructor() { }
  getAllProducts() {
    return this.http.get<Product[]>(environment.apiUrl+"/product");
  }

  getProductById(id:string) {
    return this.http.get<Product>(environment.apiUrl+"/product/" + id);
  }


  // addProduct(Product:Product){
  //   return this.http.post( environment.apiUrl+"/product",{
  //     Product
  //   });
  // }
  addProduct(product: any) {
    return this.http.post(environment.apiUrl + "/product", product);
  }
  

  // updateProduct(id:string,name:string){
  //   return this.http.put(environment.apiUrl+"/product/"+ id,{
  //     name:name,
  //   });
  // }
// product.service.ts
updateProduct(id: string, product: any) {
  return this.http.put(environment.apiUrl + "/product/" + id, product);
}

  
  deleteProductById(id:string) {
    return this.http.delete(environment.apiUrl+"/product/" + id);
  }
}
