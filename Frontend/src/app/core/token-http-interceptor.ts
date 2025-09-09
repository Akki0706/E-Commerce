// import { HttpInterceptorFn } from "@angular/common/http";
// export const tokenHttpInterceptor:HttpInterceptorFn = (req,next)=>{
//     const token = localStorage.getItem('token');
//     if(token){
//         req=req.clone({
//             setHeaders:{
//                 Authorization:token,
//             },
//         });
//     }
// return next(req);
// }


// import { HttpInterceptorFn } from "@angular/common/http";

// export const tokenHttpInterceptor: HttpInterceptorFn = (req, next) => {
//   const token = localStorage.getItem('token');

//   if (token) {
//     req = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`, // Ensure correct format
//       },
//     });
//   }

//   return next(req);
// };

// ----------------------------------Right code working fine in below code only add validation----------------------------------------------------------------

// import { HttpInterceptorFn } from '@angular/common/http';

// export const tokenHttpInterceptor: HttpInterceptorFn = (req, next) => {
//   const token = sessionStorage.getItem('token');

//   if (token) {
//     req = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//   }

//   return next(req);
// };


// ---------------------------------------------------------------------------------------------




import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const tokenHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    // catch error response globally
    catchError((error) => {
      if (error.status === 401 || error.status === 403) {
        Swal.fire({
          icon: 'warning',
          title: 'Session Expired',
          text: 'Your session has expired. Please login again.',
          confirmButtonText: 'OK'
        }).then(() => {
          // Clear session and redirect to login
          sessionStorage.clear();
          window.location.href = '/login';
        });
      }

      // rethrow error so components still get it if needed
      return throwError(() => error);
    })
  );
};
