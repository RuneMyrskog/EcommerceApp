import { Product } from './../../models/product';
import { Observable, take } from 'rxjs';
import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories$: Observable<any>;
  product: any = { data: {}};
  id: string | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService){

    this.categories$ = categoryService.getAll();
    this.id =this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).pipe(take(1)).subscribe(product => this.product = product);
  }

  save(product: any) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    
    this.router.navigate(['/admin/products'])
  }

  delete() {
    if(confirm("are you sure you want to delete this product?")){
      if (this.id) this.productService.delete(this.id);
      else alert("invalid product id");

      this.router.navigate(['/admin/products']);
    }
  }

}
