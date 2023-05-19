import { Subscription, Observable } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{ 
   
  cart$: Observable<ShoppingCart>;


  constructor(
    private cartService: ShoppingCartService){
  }

  async ngOnInit(){
      this.cart$ = await this.cartService.getCart();

  }

  ngOnDestroy(): void {
    
     
  }
  
  
}
