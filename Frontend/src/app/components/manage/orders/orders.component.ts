import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../types/order';
import { DatePipe, Location, NgFor } from '@angular/common';
import { Product } from '../../../types/product';
import Swal from 'sweetalert2';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@Component({
  selector: 'app-orders',
  standalone: true,
imports:[DatePipe,MatButtonToggleModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderService = inject(OrderService);
  orders: Order[] = [];
constructor(private location:Location){}
  ngOnInit() {
    this.orderService.getAdminOrder().subscribe((result: Order[]) => {
      this.orders = result;
    });
  }

  sellingPrice(product:Product) {
    // const price = Number(product.price) || 0; 
    // const discount = Number(product.discount) || 0;  
    // return Math.round(price - (price * discount) / 100);
  const price = Number (product.price) || 0;
  const discount = Number(product.discount) || 0;
  return Math.round(price -(price*discount)/100);

  }
statusChanged(button: any, order: Order) {
  console.log(button.value);
  this.orderService.updateOrderStatus(order._id!, button.value).subscribe(() => {
    Swal.fire({
      icon: 'success',
      title: 'Order Status Updated',
      text: `The status has been changed to "${button.value}".`,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });
  });
}

  goBack(){
    this.location.back();
  }
  trackByFn(index: number, item: any): any {
    return index; // or item.id if you have unique identifiers
  }
}
