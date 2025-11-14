// // components/product-reviews/product-reviews.component.ts
// import { Component, inject, Input, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ReviewService } from '../../services/review.service';
// import { Review } from '../../types/review';
// import {  Router } from '@angular/router';
// import { ActivatedRoute } from '@angular/router';
// @Component({
//   selector: 'app-product-reviews',
//   standalone: true, 
//   templateUrl: './product-reviews.component.html',
//   styleUrls: ['./product-reviews.component.css'],
//   imports: [CommonModule, FormsModule, ReactiveFormsModule] 
// })
// export class ProductReviewsComponent implements OnInit {
//   @Input() productId!: string;
//   reviews: Review[] = [];
//   reviewForm!: FormGroup;
//   router=inject(Router);

//   constructor(private reviewService: ReviewService, private fb: FormBuilder,private route:ActivatedRoute) {}

//   // ngOnInit(): void {
//   //   this.loadReviews();

//   //   this.reviewForm = this.fb.group({
//   //     reviewer: ['', Validators.required],
//   //     rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
//   //     comment: ['', Validators.required]
//   //   });
//   // }

//   ngOnInit(): void {
//     this.productId = this.route.snapshot.paramMap.get('id'); // if it's from the route
//     this.loadReviews();
  
//     this.reviewForm = this.fb.group({
//       reviewer: ['', Validators.required],
//       rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
//       comment: ['', Validators.required]
//     });
//   }
  

//   // loadReviews(): void {
//   //   this.reviewService.getReviews(this.productId).subscribe((reviews) => {
//   //     this.reviews = reviews;
//   //   });
//   // }


//   loadReviews(): void {
//     console.log('Product ID:', this.productId); // Debugging step
//     if (this.productId) {
//       this.reviewService.getReviews(this.productId).subscribe(
//         (reviews) => {
//           this.reviews = reviews;
//         },
//         (error) => {
//           console.error('Error loading reviews:', error);
//         }
//       );
//     }
//   }
  

//   submitReview(): void {
//     if (this.reviewForm.valid) {
//       this.reviewService.addReview(this.productId, this.reviewForm.value).subscribe(() => {
//         this.loadReviews();
//         this.reviewForm.reset({ rating: 5 });
//         this.router.navigateByUrl('/product');
        
//       });
//     }
//   }
// }


import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../types/review';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';




@Component({
  selector: 'app-product-reviews',
  standalone: true, 
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.css'],
imports: [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NgIf,
  NgbCarouselModule,

  // 👇 Add Angular Material modules
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule
]
})
export class ProductReviewsComponent implements OnInit {
  @Input() productId!: string;
  reviews: Review[] = [];
  reviewForm!: FormGroup;
  
  router = inject(Router);
  route = inject(ActivatedRoute);


  isAdmin: boolean = false;

  constructor(private reviewService: ReviewService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // Retrieve the product ID from the route and provide a fallback if it's null
    const routeProductId = this.route.snapshot.paramMap.get('id');
    if (routeProductId) {
      this.productId = routeProductId;
    }

    this.loadReviews();

    this.reviewForm = this.fb.group({
      reviewer: ['', Validators.required],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required]
    });
  }

  loadReviews(): void {
    console.log('Product ID:', this.productId); // Debugging step
    if (this.productId) {
      this.reviewService.getReviews(this.productId).subscribe(
        (reviews) => {
          this.reviews = reviews;
        },
        (error) => {
          console.error('Error loading reviews:', error);
        }
      );
    }
  }

  // submitReview(): void {
  //   if (this.reviewForm.valid) {
  //     this.reviewService.addReview(this.productId, this.reviewForm.value).subscribe(() => {
  //       this.loadReviews();
  //       this.reviewForm.reset({ rating: 5 });
  //       this.router.navigateByUrl('/');
  //     });
  //   }
  // }


  submitReview(): void {
    if (this.reviewForm.valid) {
      this.reviewService.addReview(this.productId, this.reviewForm.value).subscribe(
        () => {
          this.loadReviews(); // Reload reviews after successful submission
          this.reviewForm.reset({ rating: 5 }); // Reset the form, with default rating 5
          // Ensure '/product' is the correct path to navigate after submission
      
          console.log(this.reviewForm.value);
          
        },
        (error) => {
          console.error('Error submitting review:', error); // Handle error case
        }
      );
    } else {
      console.warn('Form is invalid, cannot submit');
    }
  }
  
}
