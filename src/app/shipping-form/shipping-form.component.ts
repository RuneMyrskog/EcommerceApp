import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../models/order';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy{
  @Input('cart') cart: ShoppingCart;
  shipping: any = {};
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) {
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart)
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key])
  }

  ngOnInit(){
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user!.uid);
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }
}
