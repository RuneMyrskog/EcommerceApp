import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  isMenuCollapsed = true;
  appUser: AppUser | null;
  cart$: Observable<ShoppingCart>;

  constructor(private auth: AuthService, cartService: ShoppingCartService){
    console.log("navbar ngOnInit ENTER");
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    cartService.getCart().then(cart$ => this.cart$ = cart$);
    console.log("navbar ngOnInit EXIT");
  }

  logout() {
    this.auth.logout();
  }

  toggle(){
    this.isMenuCollapsed = !this.isMenuCollapsed;
    console.log(this.isMenuCollapsed);
  }

}
