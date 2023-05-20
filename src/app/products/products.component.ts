import { switchMap, Subscription, Observable } from 'rxjs';
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
export class ProductsComponent implements OnInit{
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string | null;
  query: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService){
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  private populateProducts(){
    this.productService
      .getAll()
      .pipe(switchMap(products => {
        this.products = products
        return this.route.queryParamMap
      }))
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  applySearchFilter(query: string) {
    this.applyFilter();
    
    this.filteredProducts = (query) ?
      this.filteredProducts.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.filteredProducts;
  }

  private applyFilter(query?: string){

    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category == this.category) :
      this.products
  }

}
