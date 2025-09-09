import { Component, Pipe } from '@angular/core';
import { inject, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../types/product';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { pipe } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatFormFieldModule,MatSelectModule,MatButtonModule, MatIconModule,MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  displayedColumns: string[] = ['serialNumber', 'name','shotDescription','price','discount', 'action'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  productService=inject(ProductService)

  constructor(private location:Location) {
  
    this.dataSource = new MatTableDataSource([] as any);
  }
ngOnInit(){
  this.getServerData();

}
  private getServerData() {
    this.productService.getAllProducts().subscribe((result: any) => {
      console.log(result);
      this.dataSource.data = result;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 delete(id:string){
console.log(id);
this.productService.deleteProductById(id).subscribe((result:any)=>{
  alert("Product Deleted");
  this.getServerData();
})
 }

 goBack() {
  this.location.back();
}
}
