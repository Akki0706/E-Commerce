// import { Component, inject } from '@angular/core';
// import { CartService } from '../../services/cart.service';
// import { Product } from '../../types/product';
// import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatRadioModule } from '@angular/material/radio';
// import { OrderService } from '../../services/order.service';
// import { Order } from '../../types/order';
// import { Router } from '@angular/router';

// declare var Razorpay: any;

// @Component({
//   selector: 'app-shopping-cart',
//   standalone: true,
//   imports: [ReactiveFormsModule, MatRadioModule, FormsModule],
//   templateUrl: './shopping-cart.component.html',
//   styleUrl: './shopping-cart.component.css'
// })
// export class ShoppingCartComponent {
//   cartService = inject(CartService);
//   router = inject(Router);
//   paymentType = 'cash';
//   orderService = inject(OrderService);
//   formbuilder = inject(FormBuilder);
//   orderStep: number = 0;

//   // Address form validation
//   addressForm = this.formbuilder.group({
//     address1: ['', [Validators.required]],
//     address2: ['', [Validators.required]],
//     city: ['', [Validators.required]],
//     pincode: ['', [Validators.required]],
//   });

//   ngOnInit() {
//     this.cartService.init();
//   }

//   get cartItems() {
//     return this.cartService.items;
//   }

//   // Calculate selling price after discount
//   sellingPrice(product: Product) {
//     const price = Number(product.price) || 0;  // Ensure price is a number
//     const discount = Number(product.discount) || 0;  // Ensure discount is a number
//     return Math.round(price - (price * discount) / 100);
//   }

//   // Add product to the cart
//   addToCart(productId: string, quantity: number) {
//     this.cartService.addToCart(productId, quantity).subscribe(
//       (result) => {
//         this.cartService.init();
//       },
//       (error) => {
//         console.error("Error adding product to cart", error);
//       }
//     );
//   }

//   // Calculate total amount for the cart items
//   get totalAmount() {
//     let amount = 0;
//     for (let index = 0; index < this.cartItems.length; index++) {
//       const element = this.cartItems[index];
//       amount += this.sellingPrice(element.product) * element.quantity;
//     }
//     return amount;
//   }

//   // Proceed to checkout
//   checkout() {
//     this.orderStep = 1;
//   }

//   // Proceed after adding address
//   addAddress() {
//     this.orderStep = 2;
//   }

//   // Complete the order and call backend service to create the order
//   completeOrder() {
//     let order: Order = {
//       items: this.cartItems,
//       paymentType: this.paymentType,
//       address: this.addressForm.value,
//       date: new Date(),
//       totalAmount: this.totalAmount,
//     };

//     // Log the order to ensure it's properly formatted
//     console.log("Creating order:", order);

//     this.orderService.addOrder(order).subscribe(
//       (result) => {
//         alert("Your Order is completed");
//         this.cartService.init();
//         this.orderStep = 0;
//         this.router.navigateByUrl('/orders');
//       },
//       (error) => {
//         console.error("Error completing order", error);
//         alert("There was an error processing your order.");
//       }
//     );
//   }

  
  
// }



import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../types/product';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { OrderService } from '../../services/order.service';
import { Order } from '../../types/order';
import { Router } from '@angular/router';

// Import SweetAlert2
import Swal from 'sweetalert2';

declare var Razorpay: any;

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [ReactiveFormsModule, MatRadioModule, FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
  cartService = inject(CartService);
  router = inject(Router);
  paymentType = 'cash';
  orderService = inject(OrderService);
  formbuilder = inject(FormBuilder);
  orderStep: number = 0;

  // Address form validation
  addressForm = this.formbuilder.group({
    address1: ['', [Validators.required]],
    address2: ['', [Validators.required]],
    city: ['', [Validators.required]],
    pincode: ['', [Validators.required]],
  });

  ngOnInit() {
    this.cartService.init();
  }

  get cartItems() {
    return this.cartService.items;
  }

  // Calculate selling price after discount
  sellingPrice(product: Product) {
    const price = Number(product.price) || 0;  // Ensure price is a number
    const discount = Number(product.discount) || 0;  // Ensure discount is a number
    return Math.round(price - (price * discount) / 100);
  }

  // Add product to the cart
  addToCart(productId: string, quantity: number) {
    this.cartService.addToCart(productId, quantity).subscribe(
      (result) => {
        this.cartService.init();
      },
      (error) => {
        console.error("Error adding product to cart", error);
        Swal.fire({
          icon: 'error',
          title: 'Add to Cart Failed',
          text: 'There was an issue adding the product to the cart. Please try again.'
        });
      }
    );
  }

  // Calculate total amount for the cart items
  get totalAmount() {
    let amount = 0;
    for (let index = 0; index < this.cartItems.length; index++) {
      const element = this.cartItems[index];
      amount += this.sellingPrice(element.product) * element.quantity;
    }
    return amount;
  }

  // Proceed to checkout
  checkout() {
    this.orderStep = 1;
  }

  // Proceed after adding address
  addAddress() {
    this.orderStep = 2;
  }

  // Complete the order and call backend service to create the order
  completeOrder() {
    let order: Order = {
      items: this.cartItems,
      paymentType: this.paymentType,
      address: this.addressForm.value,
      date: new Date(),
      totalAmount: this.totalAmount,
    };

    // Log the order to ensure it's properly formatted
    console.log("Creating order:", order);

    this.orderService.addOrder(order).subscribe(
      (result) => {
        Swal.fire({
          icon: 'success',
          title: 'Order Placed',
          text: 'Your order has been completed successfully!',
          confirmButtonText: 'OK'
        });
        this.cartService.init();
        this.orderStep = 0;
        this.router.navigateByUrl('/orders');
      },
      (error) => {
        console.error("Error completing order", error);
        Swal.fire({
          icon: 'error',
          title: 'Order Failed',
          text: 'There was an error processing your order. Please try again.',
          confirmButtonText: 'Retry'
        });
      }
    );
  }
}
