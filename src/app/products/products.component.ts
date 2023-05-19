import { switchMap, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnDestroy{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string | null;
  cart: ShoppingCart;
  subscription: Subscription;

  constructor(
    productService: ProductService,
    route: ActivatedRoute,
    cartService: ShoppingCartService){

    console.log("products constructor ENTER");
    cartService.getCart().then(cart$ => 
      this.subscription = cart$.subscribe(cart => this.cart = cart));

    console.log("products constructor EXIT");
    productService
      .getAll()
      .pipe(switchMap(products => {
        this.products=products
        return route.queryParamMap
      }))
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category == this.category) :
          this.products;
    });
    
  }


  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
