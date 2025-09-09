import { Component, inject} from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import { Category } from '../../../types/category';
import { Brand } from '../../../types/brand';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [MatButtonModule,ReactiveFormsModule,MatInputModule,MatSelectModule,MatCheckboxModule,MatIconModule,RouterModule,
    MatPaginator,MatTableModule
  ],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.css'
})
export class ProductsFormComponent {
 formBuilder = inject(FormBuilder);
 productForm = this.formBuilder.group({
  name:["",[Validators.required,Validators.minLength(5)]] ,
  shotDescription:["",[Validators.required,Validators.minLength(10)]],
  description: ["",[Validators.required,Validators.minLength(50)]],
  price:["",[Validators.required]] ,
  discount: [],
  images: this.formBuilder.array([]),
  categoryId:["",[Validators.required]],
  brandId:["",[Validators.required]],
  isFeatured:[false],
  isNewProduct:[false]
 });

 categoryService = inject(CategoryService);
 brandService = inject(BrandService);
 productService=inject(ProductService);
 categories: Category[] = [];
 brands:Brand[]=[];
 constructor(private location:Location) {}

id!:string;
route=inject(ActivatedRoute);
 ngOnInit(){
this.addImage();
this.categoryService.getCategories().subscribe((result ) => {
  this.categories = result;
  console.log(result);
  
});
this.brandService.getBrands().subscribe((result)=>{
  this.brands=result ;
})

this.id=this.route.snapshot.params["id"];
console.log(this.id);
if(this.id){
this.productService.getProductById(this.id).subscribe((result)=>{
  for (let index = 0; index < result.images.length; index++) {

    this.addImage();
  }
  this.productForm.patchValue(result as any);
})
}else{
  this.addImage();
}

 }

 router = inject(Router);
addProduct() {
  const value = this.productForm.value;
  console.log(value);
  
  this.productService.addProduct(value as any).subscribe((result) => {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Product Added Successfully!',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigateByUrl("/admin/products");
    });
  });
}


 updateProduct(){
  let value = this.productForm.value;
  console.log(value);
  this.productService.updateProduct(this.id,value as any).subscribe((result)=>{
      Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Product Upated  Successfully!',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigateByUrl("/admin/products");
    });
  });
 }

 addImage(){
  this.images.push(this.formBuilder.control(null));
 }
 removeImage(){
  this.images.removeAt(this.images.controls.length-1);
 }
 get images(){
 return this.productForm.get('images') as FormArray;
 }

 
 goBack() {
  this.location.back();
}
}
