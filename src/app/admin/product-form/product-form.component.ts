import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories$: Observable<any>;

  constructor(
    private router: Router,
    private categoryService: CategoryService, 
    private productService: ProductService){
    this.categories$ = categoryService.getCategories();
    this.categories$.subscribe(categories => console.log(categories));
  }

  save(product: any) {
    console.log(product);
    this.productService.create(product);
    this.router.navigate(['/admin/products'])
  }


}
