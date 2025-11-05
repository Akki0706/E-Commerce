// import { Component, inject, Input } from '@angular/core';
// import { Product } from '../../types/product';
// import { MatButtonModule } from '@angular/material/button';
// import { RouterLink } from '@angular/router';
// import { MatIconModule } from '@angular/material/icon';
// import { WishlistService } from '../../services/wishlist.service';
// import { CartService } from '../../services/cart.service';

// @Component({
//   selector: 'app-product-card',
//   standalone: true,
//   imports: [MatButtonModule, RouterLink, MatIconModule],
//   templateUrl: './product-card.component.html',
//   styleUrl: './product-card.component.css'
// })
// export class ProductCardComponent {
//   @Input() product!: Product;
  
  
//   wishlistService = inject(WishlistService);
//   get sellingPrice() {
//     const price = Number(this.product.price) || 0;  // Ensures price is a number
//     const discount = Number(this.product.discount) || 0;  // Ensures discount is a number
//     return Math.round(price - (price * discount) / 100);
//   }

//   addToWishList(product: Product) {
//     console.log(product);
//     if (this.isInWishList(product)) {
//       this.wishlistService.removeFromWishlists(product._id!)
//         .subscribe((result) => {
//           this.wishlistService.init();
//         })
//     } else {
//       this.wishlistService.addInWishlists(product._id!)
//         .subscribe((result) => {
//           this.wishlistService.init();
//         })

//     }
//   }

//   isInWishList(product: Product) {
//     let isExists = this.wishlistService.wishlists.find(
//       (x) => x._id == product._id
//     );
//     if (isExists) return true;
//     else return false;
//   }


//   cartService = inject(CartService);
//   addToCart(product: Product) {
//     console.log(product);
//     if (!this.isProductInCart(product._id!)) {
//       this.cartService.addToCart(product._id!, 1).subscribe(() => {
//         this.cartService.init();
//       })
//     } else {
//       this.cartService.removeFromCart(product._id!).subscribe(() => {
//         this.cartService.init();
//       })
//     }
//   }

//   isProductInCart(productId: string) {
//     if (this.cartService.items.find((x) => x.product._id == productId)) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// }import { Component, inject, Input } from '@angular/core';






// import { Product } from '../../types/product';
// import { MatButtonModule } from '@angular/material/button';
// import { RouterLink } from '@angular/router';
// import { MatIconModule } from '@angular/material/icon';
// import { WishlistService } from '../../services/wishlist.service';
// import { CartService } from '../../services/cart.service';
// import { Component, inject, Input } from '@angular/core';
// import { NgIf } from '@angular/common';

// @Component({
//   selector: 'app-product-card',
//   standalone: true,
//   imports: [MatButtonModule, RouterLink, MatIconModule,NgIf],
//   templateUrl: './product-card.component.html',
//   styleUrl: './product-card.component.css'
// })
// export class ProductCardComponent {
//   @Input() product!: Product;
  
//   wishlistService = inject(WishlistService);
//   cartService = inject(CartService);

//   get sellingPrice() {
//     const price = Number(this.product?.price) || 0;  // Ensures price is a number
//     const discount = Number(this.product?.discount) || 0;  // Ensures discount is a number
//     return Math.round(price - (price * discount) / 100);
//   }

//   addToWishList(product: Product) {
//     if (!product || !product._id) {
//       console.error("Invalid product data", product);
//       return;
//     }
    
//     if (this.isInWishList(product)) {
//       this.wishlistService.removeFromWishlists(product._id)
//         .subscribe(() => this.wishlistService.init());
//     } else {
//       this.wishlistService.addInWishlists(product._id)
//         .subscribe(() => this.wishlistService.init());
//     }
//   }

//   isInWishList(product: Product) {
//     if (!product || !product._id) return false;

//     const isExists = this.wishlistService.wishlists?.find(
//       (x) => x?._id === product._id
//     );
//     return !!isExists;
//   }

//   addToCart(product: Product) {
//     if (!product || !product._id) {
//       console.error("Invalid product data", product);
//       return;
//     }

//     if (!this.isProductInCart(product._id)) {
//       this.cartService.addToCart(product._id, 1).subscribe(() => {
//         this.cartService.init();
//       });
//     } else {
//       this.cartService.removeFromCart(product._id).subscribe(() => {
//         this.cartService.init();
//       });
//     }
//   }

//   isProductInCart(productId: string) {
//     return !!this.cartService.items.find(
//       (x) => x?.product?._id === productId
//     );
//   }
// }

import { Component, inject, Input } from '@angular/core';
import { Product } from '../../types/product';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { NgIf } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatIconModule, NgIf,MatTooltipModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;

  wishlistService = inject(WishlistService);
  cartService = inject(CartService);

  get sellingPrice(): number {
    const price = Number(this.product?.price) || 0;  // Ensures price is a number
    const discount = Number(this.product?.discount) || 0;  // Ensures discount is a number
    return Math.round(price - (price * discount) / 100);
  }

  addToWishList(product: Product): void {
    if (!product || !product._id) {
      console.error("Invalid product data", product);
      return;
    }

    if (this.isInWishList(product)) {
      this.wishlistService.removeFromWishlists(product._id)
        .subscribe(() => this.wishlistService.init());
    } else {
      this.wishlistService.addInWishlists(product._id)
        .subscribe(() => this.wishlistService.init());
    }
  }

  isInWishList(product: Product): boolean {
    if (!product || !product._id) return false;

    return !!this.wishlistService.wishlists?.find(
      (x) => x?._id === product._id
    );
  }

  addToCart(product: Product): void {
    if (!product || !product._id) {
      console.error("Invalid product data", product);
      return;
    }

    if (!this.isProductInCart(product._id)) {
      this.cartService.addToCart(product._id, 1).subscribe(() => {
        this.cartService.init();
      });
    } else {
      this.cartService.removeFromCart(product._id).subscribe(() =>
    
        {
        this.cartService.init();
      });
    }
  }

  isProductInCart(productId: string): boolean {
    return !!this.cartService.items.find(
      (x) => x?.product?._id === productId
   
    );
  }
}
