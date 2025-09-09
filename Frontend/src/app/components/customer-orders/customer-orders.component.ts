import { Component, inject } from '@angular/core';
import { Order } from '../../types/order';
import { OrderService } from '../../services/order.service';
import { Product } from '../../types/product';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.css'
})
export class CustomerOrdersComponent {
orders : Order[]=[];
orderService = inject(OrderService);
ngOnInit(){
  this.orderService.getCustomerOrders().subscribe((result)=>{
    this.orders=result;
    console.log(this.orders);
    
  });
}
sellingPrice(product:Product) {
  const price = Number(product.price) || 0;  // Ensures price is a number
  const discount = Number(product.discount) || 0;  // Ensures discount is a number
  return Math.round(price - (price * discount) / 100);
}
}
