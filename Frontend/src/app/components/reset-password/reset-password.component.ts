import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [NgIf, FormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  message: string = '';
  error: string = '';
  token: string = '';
  isValidToken: boolean = false;
  isLoading: boolean = true;
  email: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token') || '';

    if (!this.token) {
      this.error = 'No token provided';
      this.isLoading = false;
      return;
    }

    this.token = decodeURIComponent(this.token);
    this.verifyToken();
  }

  verifyToken() {
    this.authService.verifyResetToken(this.token).subscribe({
      next: (response:any) => {
        this.isValidToken = response.valid;
        this.email = response.email || '';
        this.isLoading = false;
      },
      error: (error:any) => {
        this.error = error.error?.message || 'Invalid or expired token';
        this.isValidToken = false;
        this.isLoading = false;
        console.error('Token verification error:', error);
      }
    });
  }

  onSubmit() {
    if (!this.isValidToken) {
      this.error = 'Invalid or expired token';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters';
      return;
    }

    this.authService.resetPassword(this.token, this.password).subscribe({
      next: (response:any) => {
        this.message = response.message;
        this.error = '';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error:any) => {
        this.error = error.error?.message || 'An error occurred while resetting your password';
        this.message = '';
        console.error('Password reset error:', error);
      }
    });
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
