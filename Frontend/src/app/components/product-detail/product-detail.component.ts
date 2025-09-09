// import { Component, inject } from '@angular/core';
// import { CustomerService } from '../../services/customer.service';
// import { ActivatedRoute } from '@angular/router';
// import { Product } from '../../types/product';
// import { ProductCardComponent } from '../product-card/product-card.component';
// import { WishlistService } from '../../services/wishlist.service';
// import { MatIconModule } from '@angular/material/icon';
// import { CartService } from '../../services/cart.service';

// @Component({
//   selector: 'app-product-detail',
//   standalone: true,
//   imports: [ProductCardComponent,MatIconModule],
//   templateUrl: './product-detail.component.html',
//   styleUrl: './product-detail.component.css'
// })
// export class ProductDetailComponent {
// customerService=inject(CustomerService);
// route=inject(ActivatedRoute);
// product!:Product;
// mainImage!:string;
// similarProducts:Product[]=[];
// ngOnInit(){
// this.route.params.subscribe((x:any)=>{
// this.getProductDetail(x.id);
// })

// }

// getProductDetail(id:string){
//   this.customerService.getProductById(id).subscribe((result)=>{
//     this.product=result;
//     this.mainImage=this.product.images[0];
//     console.log(this.product);
//     this.customerService.getProducts('',this.product.categoryId,'',-1,'',1,4).subscribe(result=>{
//       this.similarProducts=result;  
//     })
//   });
// }
// changeImage(url:string){
//   this.mainImage=url;
// }


// get sellingPrice() {
//   const price = Number(this.product.price) || 0;  // Ensures price is a number
//   const discount = Number(this.product.discount) || 0;  // Ensures discount is a number
//   return Math.round(price - (price * discount) / 100);
// }

// wishlistService=inject(WishlistService);
// addToWishList(product:Product){
//   console.log(product);
//   if(this.isInWishList(product)){
//     this.wishlistService.removeFromWishlists(product._id!)
//     .subscribe((result)=>{
//       this.wishlistService.init();
//     })
//   }else{
//     this.wishlistService.addInWishlists(product._id!)
//     .subscribe((result)=>{
//       this.wishlistService.init();
//     })
  
//   }
//   }
  
//   isInWishList(product:Product){
//   let isExists = this.wishlistService.wishlists.find(
//     (x)=>x._id == product._id
//   );
//   if(isExists) return true;
//   else return false;
//   }
  
  
// cartService=inject(CartService);
// addToCart(product:Product){
// console.log(product);
// if(!this.isProductInCart(product._id!)){
//   this.cartService.addToCart(product._id!,1).subscribe(()=>{
//     this.cartService.init();
//   })
// }else{
//   this.cartService.removeFromCart(product._id!).subscribe(()=>{
//     this.cartService.init();
//   })
// }
// }

// isProductInCart(productId:string){
//   if(this.cartService.items.find((x)=> x.product._id == productId)){
//     return true;
//   } else {
//     return false;
//   }
// }

// }


import { Component, inject, NgModule } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { WishlistService } from '../../services/wishlist.service';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ProductCardComponent, MatIconModule,ProductReviewsComponent,NgIf],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  customerService = inject(CustomerService);
  route = inject(ActivatedRoute);
  product!: Product;
  mainImage!: string;
  similarProducts: Product[] = [];

  wishlistService = inject(WishlistService);
  cartService = inject(CartService);

  ngOnInit() {
    this.route.params.subscribe((x: any) => {
      this.getProductDetail(x.id);
    });
  }

  getProductDetail(id: string) {
    this.customerService.getProductById(id).subscribe((result) => {
      this.product = result;
      this.mainImage = this.product?.images?.[0] || '';
      console.log(this.product);

      // Fetch similar products based on categoryId
      if (this.product?.categoryId) {
        this.customerService.getProducts('', this.product.categoryId, '', -1, '', 1, 4)
          .subscribe(result => {
            this.similarProducts = result;
          });
      }
    });
  }

  changeImage(url: string) {
    this.mainImage = url;
  }

  get sellingPrice() {
    const price = Number(this.product?.price) || 0;  // Safeguard product access
    const discount = Number(this.product?.discount) || 0;
    return Math.round(price - (price * discount) / 100);
  }

  addToWishList(product: Product) {
    if (!product || !product._id) {
      console.error("Invalid product data", product);
      return;
    }

    if (this.isInWishList(product)) {
      this.wishlistService.removeFromWishlists(product._id!)
        .subscribe(() => this.wishlistService.init());
    } else {
      this.wishlistService.addInWishlists(product._id!)
        .subscribe(() => this.wishlistService.init());
    }
  }

  isInWishList(product: Product) {
    if (!product || !product._id) return false;

    const isExists = this.wishlistService.wishlists?.find(
      (x) => x?._id === product._id
    );
    return !!isExists;
  }

  addToCart(product: Product) {
    if (!product || !product._id) {
      console.error("Invalid product data", product);
      return;
    }

    if (!this.isProductInCart(product._id!)) {
      this.cartService.addToCart(product._id!, 1).subscribe(() => {
        this.cartService.init();
      });
    } else {
      this.cartService.removeFromCart(product._id!).subscribe(() => {
        this.cartService.init();
      });
    }
  }

  isProductInCart(productId: string) {
    return !!this.cartService.items.find(
      (x) => x?.product?._id === productId
    );
  }
}
