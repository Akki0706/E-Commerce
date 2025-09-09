import { NgIf } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [NgIf, FormsModule,RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';
  error: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router,private authService: AuthService) {}

  onSubmit() {
    if (!this.email) {
      this.error = 'Please enter your email address';
      this.message = '';
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.message = '';

    this.authService.forgotPassword(this.email).subscribe({
      next: (response) => {
        this.message = response.message || 'Password reset email sent successfully';
        this.error = '';
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Forgot password error:', error);

        if (error.status === 0) {
          this.error = 'Unable to connect to server. Please check if the server is running.';
        } else if (error.error && error.error.message) {
          this.error = error.error.message;
        } else {
          this.error = 'An unexpected error occurred. Please try again.';
        }

        this.message = '';
        this.isLoading = false;
      }
    });
  }
}