import { switchMap } from 'rxjs';
import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: any[] = [];
  filteredProducts: any[] = [];
  
  category: string | null;

  constructor(
    
    productService: ProductService,
    route: ActivatedRoute){

    productService
      .getAll()
      .pipe(switchMap(products => {
        this.products=products
        return route.queryParamMap
      }))
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.data.category == this.category) :
          this.products;
    });

    
    
  }
}
