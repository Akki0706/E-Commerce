import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WishlistService } from './services/wishlist.service';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';  
import { AsyncPipe, NgIf } from '@angular/common';
import { LoaderComponent } from "./shared/loader/loader.component";
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NgIf, LoaderComponent,AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    showLayout = true;
  title = 'DesiDealz';
  wishlistService = inject(WishlistService);
  cartService = inject(CartService);
  authService = inject(AuthService);
  isLoading: any;
   constructor(private router: Router,
    private loaderService :LoaderService
   ) {
     this.isLoading = this.loaderService.loading$;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentPath = this.router.url.split('?')[0]; // Strip query params
        this.showLayout = !(['/login', '/register' , '/forgot-password' ].includes(currentPath)  ||
  currentPath.startsWith('/reset-password'));
      });
  }
  ngOnInit(){
    if(this.authService.isLoggedIn){
    this.wishlistService.init();
    this.cartService.init();
    }
  }

  

}
