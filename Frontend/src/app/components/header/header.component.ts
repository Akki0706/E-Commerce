// import { Component, inject } from '@angular/core';
// import { Category } from '../../types/category';
// import { Router, RouterLink } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { CustomerService } from '../../services/customer.service';
// import { FormsModule } from '@angular/forms';
// import { MatIconModule } from '@angular/material/icon';
// import { NgIf } from '@angular/common';


// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [RouterLink,FormsModule,MatIconModule,NgIf],
//   templateUrl: './header.component.html',
//   styleUrl: './header.component.css'
// })
// export class HeaderComponent {
// customerService = inject(CustomerService);
// categoryList:Category[]=[];
// authService=inject(AuthService);
// searchTerm!:string;
// ngOnInit(){
//   this.customerService.getCategories().subscribe((result)=>{
//     this.categoryList = result;
//   })
// }
// router = inject(Router);
// onSearch(e:any){
// if(e.target.value){
//   this.router.navigateByUrl("/products?search="+e.target.value);
// }
// }



// searchCategory(id:string){
//   this.searchTerm="";
//   this.router.navigateByUrl("/products?categoryId="+id);
  
// }

// logout(){
//   this.authService.logout();
//   this.router.navigateByUrl("/login");
// }

// shouldShowSearchBar(): boolean {
//   return !(this.router.url.includes('/login') || this.router.url.includes('/register'));
// }

// Search(){
//   if(this.searchTerm){
//     this.router.navigateByUrl("/products?search="+this.searchTerm);
//   }
//   }
// }



import { Component, inject, HostListener } from '@angular/core';
import { Category } from '../../types/category';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditProtocolDialogComponent } from '../edit-protocol-dialog/edit-protocol-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, MatIconModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  customerService = inject(CustomerService);
  categoryList: Category[] = [];
  authService = inject(AuthService);
  searchTerm!: string;
  router = inject(Router);
  isDropdownOpen = false;
constructor(private dialog: MatDialog) {}
  ngOnInit() {
    this.customerService.getCategories().subscribe((result) => {
      this.categoryList = result;
    })
  }

  onSearch(e: any) {
    if (e.target.value) {
      this.router.navigateByUrl("/products?search=" + e.target.value);
    }
  }

  searchCategory(id: string) {
    this.searchTerm = "";
    this.router.navigateByUrl("/products?categoryId=" + id);
  }

  logout() {
    this.closeDropdown();
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

  shouldShowSearchBar(): boolean {
    return !(this.router.url.includes('/login') || this.router.url.includes('/register'));
  }

  Search() {
    if (this.searchTerm) {
      this.router.navigateByUrl("/products?search=" + this.searchTerm);
    }
  }

  // Dropdown methods
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(): void {
    this.isDropdownOpen = false;
  }

  getUserInitials(): string {
    if (!this.authService.userName) return 'U';
    const names = this.authService.userName.split(' ');
    if (names.length >= 2) {
      return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    }
    return this.authService.userName.charAt(0).toUpperCase();
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-dropdown')) {
      this.closeDropdown();
    }
  }

  // Close dropdown on escape key
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeDropdown();
  }

  openEditProtocolDialog(): void {
    const dialogRef = this.dialog.open(EditProtocolDialogComponent, {
      width: '800px',
      maxHeight: '80vh',
      disableClose: true, // Prevents closing by clicking outside
      data: {
        // Pass any initial data here if needed
        protocolId: 'your-protocol-id',
        // other data...
      }
    });

    // Handle dialog close
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog was closed with data:', result);
        // Handle the returned data (form values)
        this.handleProtocolUpdate(result);
      } else {
        console.log('Dialog was closed without saving');
      }
    });
  }

  private handleProtocolUpdate(protocolData: any): void {
    // Implement your protocol update logic here
    console.log('Updating protocol with:', protocolData);
    // Make API calls, update local state, etc.
  }
}

