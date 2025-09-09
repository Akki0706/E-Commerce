// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { environment } from '../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
//   http=inject(HttpClient);
//   register(name:string,email:string,password:string, recaptcha: string){
//     return this.http.post(environment.apiUrl + '/auth/register',{
//       name,
//       email,
//       password,
//       recaptcha
//     });
//   }

//   login(email:string,password:string){
//     return this.http.post(environment.apiUrl + '/auth/login',{
//       email,
//       password
//     });
//   }
// get isLoggedIn(){
//   let token = localStorage.getItem('token');
//   if(token){
//     return true;
//   }
//   return false;
// }

// get isAdmin(){
//   let userData = localStorage.getItem('user');
//   if(userData){
//     return JSON.parse(userData).isAdmin;
//   }
//   return false;
// }


//   get userName(){
//     let userData = localStorage.getItem('user');
//     if(userData){
//       return JSON.parse(userData).name;
//     }
//     return null;
//   }

  
//   get userEmail(){
//     let userData = localStorage.getItem('user');
//     if(userData){
//       return JSON.parse(userData).email;
//     }
//     return null;
//   }
//   logout(){
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   }
// }


import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
    private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  router: any;

  // REGISTER
  register(name: string, email: string, password: string, recaptcha: string) {
    // console.log('Sending registration request to:', this.apiUrl + '/auth/register');
    return this.http.post(`${this.apiUrl}/auth/register`, {
      name,
      email,
      password,
      recaptcha
    });
  }

  // LOGIN
  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/login`, {
      email,
      password
    });
  }

  // FORGOT PASSWORD
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, { email }).pipe(
      catchError((error) => {
        console.error('AuthService forgotPassword error:', error);
        return throwError(() => error);
      })
    );
  }


    verifyResetToken(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/verify-reset-token/${encodeURIComponent(token)}`);
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/reset-password/${encodeURIComponent(token)}`, { password });
  }

  // AUTH HELPERS
  get isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  get isAdmin(): boolean {
    try {
      const userData = sessionStorage.getItem('user');
      if (!userData) return false;
      const parsed = JSON.parse(userData);
      return Boolean(parsed?.isAdmin);
    } catch {
      return false;
    }
  }

  get userName(): string | null {
    const userData = sessionStorage.getItem('user');
    return userData ? JSON.parse(userData).name : null;
  }

  get userEmail(): string | null {
    const userData = sessionStorage.getItem('user');
    return userData ? JSON.parse(userData).email : null;
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }




  
}
