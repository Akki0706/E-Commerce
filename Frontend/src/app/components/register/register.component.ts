// import { Component, inject } from '@angular/core';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';

// import { RecaptchaModule } from 'ng-recaptcha';
// import { NgIf } from '@angular/common';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [ReactiveFormsModule, RecaptchaModule,NgIf],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })
// export class RegisterComponent {
// formbuilder =inject(FormBuilder);
// captchaResponse: string | null = null;
// registerForm = this.formbuilder.group({
//   name: [
//     '',
//     [
//       Validators.required,
//       Validators.minLength(2), // Minimum length of 2 characters
//       Validators.maxLength(50), // Maximum length of 50 characters
//       Validators.pattern(/^[a-zA-Z\s'-]+$/) // Allows alphabetic characters, spaces, hyphens, and apostrophes
//     ]
//   ],
//   email: [
//     '',
//     [
//       Validators.required,
//       Validators.email,
//       Validators.maxLength(100) // Set a reasonable max length for email addresses
//     ]
//   ],
//   password: [
//     '',
//     [
//       Validators.required,
//       Validators.minLength(8), // Minimum length of 8 characters
//       Validators.maxLength(20), // Maximum length of 20 characters
//       Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/) 
//       // At least one lowercase, one uppercase, one digit, and one special character
//     ]
//   ],
//   recaptcha: ['', Validators.required]

// });

// onCaptchaResolved(captchaResponse: string | null): void {
//   this.captchaResponse = captchaResponse;
// }

// authService=inject(AuthService);
// router=inject(Router);
// // register() {
// //   console.log('Register button clicked');
// //   let value = this.registerForm.value;
// //   if (this.registerForm.valid && this.captchaResponse) {
// //     const formData = { ...value, recaptcha: this.captchaResponse };
// //     this.authService.register(formData.name!, formData.email!, formData.password!, formData.recaptcha).subscribe({
// //       next: (result) => {
// //         alert('User Registered');
// //         this.router.navigateByUrl('/login');
// //       },
// //       error: (error) => {
// //         console.error('Error occurred during registration:', error);
// //       },
// //     });
// //   } else {
// //     console.error('Form is invalid or reCAPTCHA not completed');
// //   }
// // }
// register() {
//   console.log('Register button clicked');
//   if (this.registerForm.valid && this.captchaResponse) {
//     const formData = {
//       name: this.registerForm.value.name?.trim(),
//       email: this.registerForm.value.email?.trim(),
//       password: this.registerForm.value.password,
//       recaptcha: this.captchaResponse
//     };

//     this.authService.register(formData.name!, formData.email!, formData.password!, formData.recaptcha)
//       .subscribe({
//         next: (result) => {
//           alert('User Registered');
//           this.router.navigateByUrl('/login');
//         },
//         error: (error) => {
//           console.error('Error occurred during registration:', error);
//         },
//       });
//   } else {
//     console.error('Form is invalid or reCAPTCHA not completed');
//   }
// }

// }







// import { Component, inject } from '@angular/core';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';
// import { RecaptchaModule } from 'ng-recaptcha';
// import { NgIf } from '@angular/common';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [ReactiveFormsModule, RecaptchaModule, NgIf],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })
// export class RegisterComponent {
//   private formbuilder = inject(FormBuilder);
//   private authService = inject(AuthService);
//   private router = inject(Router);

//   captchaResponse: string | null = null;
  
//   registerForm = this.formbuilder.group({
//     name: [
//       '',
//       [
//         Validators.required,
//         Validators.minLength(2),
//         Validators.maxLength(50),
//         Validators.pattern(/^[a-zA-Z\s'-]+$/) 
//       ]
//     ],
//     email: [
//       '',
//       [
//         Validators.required,
//         Validators.email,
//         Validators.maxLength(100) 
//       ]
//     ],
//     password: [
//       '',
//       [
//         Validators.required,
//         Validators.minLength(8),
//         Validators.maxLength(20),
//         Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/) 
//       ]
//     ],
//     recaptcha: ['', Validators.required]
//   });

//   onCaptchaResolved(captchaResponse: string | null): void {
//     this.captchaResponse = captchaResponse;
//   }

//   register() {
//     console.log('Register button clicked');

//     if (this.registerForm.valid && this.captchaResponse) {
//       const formData = {
//         name: this.registerForm.value.name?.trim(),
//         email: this.registerForm.value.email?.trim(),
//         password: this.registerForm.value.password,
//         recaptcha: this.captchaResponse
//       };

//       console.log('Form Data:', formData);

//       this.authService.register(formData.name!, formData.email!, formData.password!, formData.recaptcha)
//         .subscribe({
//           next: () => {
//             alert('User Registered');
//             this.router.navigateByUrl('/login');
//           },
//           error: (error) => {
//             console.error('Error occurred during registration:', error);
//           }
//         });
//     } else {
//       console.error('Form is invalid or reCAPTCHA not completed');
//     }
//   }
// }









// import { Component, inject } from '@angular/core';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';
// import { RecaptchaModule } from 'ng-recaptcha';
// import { NgIf } from '@angular/common';
// import { HttpClientModule } from '@angular/common/http';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [ReactiveFormsModule, RecaptchaModule, NgIf, HttpClientModule],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })
// export class RegisterComponent {
//   private formbuilder = inject(FormBuilder);
//   private authService = inject(AuthService);
//   private router = inject(Router);

//   captchaResponse: string | null = null;

//   registerForm = this.formbuilder.group({
//     name: [
//       '',
//       [
//         Validators.required,
//         Validators.minLength(2),
//         Validators.maxLength(50),
//         Validators.pattern(/^[a-zA-Z\s'-]+$/) 
//       ]
//     ],
//     email: [
//       '',
//       [
//         Validators.required,
//         Validators.email,
//         Validators.maxLength(100) 
//       ]
//     ],
//     password: [
//       '',
//       [
//         Validators.required,
//         Validators.minLength(8),
//         Validators.maxLength(20),
//         Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/) 
//       ]
//     ],
//     recaptcha: ['', Validators.required]
//   });

//   onCaptchaResolved(captchaResponse: string | null): void {
//     console.log('reCAPTCHA Response:', captchaResponse);
//     this.captchaResponse = captchaResponse;
//   }

//   register() {
//     console.log('Register button clicked');

//     if (this.registerForm.valid && this.captchaResponse) {
//       const formData = {
//         name: this.registerForm.value.name?.trim(),
//         email: this.registerForm.value.email?.trim(),
//         password: this.registerForm.value.password,
//         recaptcha: this.captchaResponse
//       };

//       console.log('Form Data:', formData);

//       this.authService.register(formData.name!, formData.email!, formData.password!, formData.recaptcha)
//         .subscribe({
//           next: (response: any) => {
//             console.log('Registration Response:', response);
//             alert('User Registered Successfully');
//             this.router.navigateByUrl('/login');
//           },
//           error: (error) => {
//             console.error('Error occurred during registration:', error);
//             alert('Registration failed. Please try again.');
//           }
//         });
//     } else {
//       console.error('Form is invalid or reCAPTCHA not completed');
//       alert('Please complete the form and reCAPTCHA.');
//     }
//   }
// }












import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RecaptchaModule, NgIf, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private formbuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  captchaResponse: string | null = null;
  submitted = false; // Add this line

  registerForm = this.formbuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z\s'-]+$/) 
      ]
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.maxLength(100) 
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/) 
      ]
    ],
    recaptcha: ['']  // Remove the required validator here
  });

  onCaptchaResolved(captchaResponse: string | null): void {
    console.log('reCAPTCHA Response:', captchaResponse);
    this.captchaResponse = captchaResponse;
    // Don't update the form control, just track it separately
  }

  register() {
    this.submitted = true; // Set submitted to true when the form is submitted

    console.log('Register button clicked');
    console.log('Form validity:', this.registerForm.valid);
    console.log('Captcha response:', this.captchaResponse);
    
    // Check each control
    console.log('Name valid:', this.registerForm.get('name')?.valid);
    console.log('Email valid:', this.registerForm.get('email')?.valid);
    console.log('Password valid:', this.registerForm.get('password')?.valid);
    
    // Check if form data is present regardless of validation
    const nameValue = this.registerForm.get('name')?.value;
    const emailValue = this.registerForm.get('email')?.value;
    const passwordValue = this.registerForm.get('password')?.value;
    
    const hasRequiredData = nameValue && emailValue && passwordValue && this.captchaResponse;
    console.log('Has all required data:', hasRequiredData);

    if (hasRequiredData) {
      const formData = {
        name: nameValue.trim(),
        email: emailValue.trim(),
        password: passwordValue,
        recaptcha: this.captchaResponse
      };

      console.log('Form Data:', formData);

      this.authService.register(formData.name!, formData.email!, formData.password!, formData.recaptcha!)
        .subscribe({
          next: (response: any) => {
            console.log('Registration Response:', response);
         Swal.fire({
               title: 'Register Successful!',
               text: 'You have register successfully .',
               icon: 'success',
               confirmButtonText: 'Continue',
               confirmButtonColor: '#3085d6',
          // Auto-close after 3 seconds
               timerProgressBar: true, // Show a progress bar
               backdrop: `
                 rgba(0, 0, 0, 0.5)
                 url("/path/to/your/image.png") // Optional: Add a background image
                 center left
                 no-repeat
               `,
               customClass: {
                 container: 'swal2-backdrop-blur', // Apply the blur effect
               },
             });
            this.router.navigateByUrl('/login');
          },
          error: (error) => {
            console.error('Error occurred during registration:', error);
            alert('Registration failed: ' + (error.error?.message || error.message || 'Please try again.'));
          }
        });
    } else {
      let errorMessage = 'Please complete the following: ';
      if (!nameValue) errorMessage += 'Name, ';
      if (!emailValue) errorMessage += 'Email, ';
      if (!passwordValue) errorMessage += 'Password, ';
      if (!this.captchaResponse) errorMessage += 'reCAPTCHA, ';
      
      // Remove trailing comma and space
      errorMessage = errorMessage.slice(0, -2);
      
      console.error(errorMessage);
      alert(errorMessage);
    }
  }

  navigateToLogin() {
  this.router.navigate(['/login']);
}
showPassword = false;

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}
}