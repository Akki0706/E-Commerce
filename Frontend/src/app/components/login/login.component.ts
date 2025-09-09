// import { Component, inject, NgModule } from '@angular/core';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';
// import { Router, RouterModule } from '@angular/router';
// import Swal from 'sweetalert2';



// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule,RouterModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {

// // login.component.ts
//   showPassword = false;


//   formbuilder = inject(FormBuilder);
//   loginForm=this.formbuilder.group({
//     email :['',[Validators.required, Validators.email]],
//     password:['',[Validators.required]],
//   });
// authService=inject(AuthService);
// router=inject(Router);
 

//   login(){
//     console.log(this.loginForm.value);
//     this.authService.login(this.loginForm.value.email!,this.loginForm.value.password!).subscribe((result : any)=>{
//       console.log(result);
//       localStorage.setItem('token',result.token);
//       localStorage.setItem('user',JSON.stringify(result.user));
//       Swal.fire({
//         title: 'Login Successful!',
//         text: 'You have successfully logged in.',
//         icon: 'success',
//         confirmButtonText: 'Continue',
//         confirmButtonColor: '#3085d6',
//    // Auto-close after 3 seconds
//         timerProgressBar: true, // Show a progress bar
//         backdrop: `
//           rgba(0, 0, 0, 0.5)
//           url("/path/to/your/image.png") // Optional: Add a background image
//           center left
//           no-repeat
//         `,
//         customClass: {
//           container: 'swal2-backdrop-blur', // Apply the blur effect
//         },
//       });
//       this.router.navigateByUrl("/");
//     })
//     this.loginForm.reset();
    
    
//   }
  
//   togglePasswordVisibility() {
//     this.showPassword = !this.showPassword;
//   }

// }


  

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  showPassword = false;

  formbuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  loginForm = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false]
  });

  ngOnInit(): void {
    const savedEmail = sessionStorage.getItem('rememberedEmail');
    const savedPassword = sessionStorage.getItem('rememberedPassword');

    if (savedEmail && savedPassword) {
      this.loginForm.patchValue({
        email: savedEmail,
        password: savedPassword,
        rememberMe: true
      });
    }
  }

  login() {
    if (this.loginForm.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter valid email and password',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }

    const { email, password, rememberMe } = this.loginForm.value;

    if (rememberMe) {
      sessionStorage.setItem('rememberedEmail', email!);
      sessionStorage.setItem('rememberedPassword', password!);
    } else {
      sessionStorage.removeItem('rememberedEmail');
      sessionStorage.removeItem('rememberedPassword');
    }

    this.authService.login(email!, password!)
      .subscribe({
        next: (result: any) => {
          if (result.success) {
            sessionStorage.setItem('token', result.token);
            sessionStorage.setItem('user', JSON.stringify(result.user));

            Swal.fire({
              title: 'Login Successful!',
              text: 'You have successfully logged in.',
              icon: 'success',
              confirmButtonText: 'Continue',
              confirmButtonColor: '#3085d6',
              timerProgressBar: true,
              customClass: {
                container: 'swal2-backdrop-blur',
              },
            });

            this.router.navigateByUrl("/");
          } else {
            Swal.fire({
              title: 'Login Failed!',
              text: result.message || 'Invalid credentials',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          Swal.fire({
            title: 'Error!',
            text: error.error?.error || 'Login failed. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });

    this.loginForm.reset();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
