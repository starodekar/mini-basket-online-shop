import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category } from './../../../shared/models/category';
import { CategoriesService } from './../../../shared/services/category.service';
import { ProductService } from './../../../shared/services/product.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {

  productForm: FormGroup;
  categories$: Observable<Category[]>;
  id = null;
  urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  private subscription: Subscription;

  constructor(private catService: CategoriesService, private productsService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.initializeForm();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.subscription = this.productsService.getProduct(this.id).valueChanges().subscribe(product => this.setProductDetails(product));
    }

    this.categories$ = this.catService.getCategories();
  }

  ngOnDestroy() {
    if (this.id)
      this.subscription.unsubscribe();
  }

  private initializeForm() {
    this.productForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required, Validators.min(0)]),
      category: new FormControl(null, Validators.required),
      imageUrl: new FormControl(null, [Validators.required, Validators.pattern(this.urlRegex)])
    });
  }

  submit() {
    if (!this.id) this.productsService.saveProduct(this.productForm.value);
    else this.productsService.updateProduct(this.id, this.productForm.value);

    this.router.navigate(["admin/products"]);
  }

  setProductDetails(p) {
    this.productForm.setValue({
      title: p.title,
      imageUrl: p.imageUrl,
      category: p.category,
      price: p.price
    })
  }

  delete() {
    if (!confirm("Are you sure you want to delete this product?")) return;
    this.productsService.deleteProduct(this.id);
    this.router.navigate(["admin/products"]);
  }

  getTitle() {
    return this.productForm.get('title');
  }

  getPrice() {
    return this.productForm.get('price');
  }

  getCategories() {
    return this.productForm.get('category');
  }

  getImageUrl() {
    return this.productForm.get('imageUrl');
  }
}
