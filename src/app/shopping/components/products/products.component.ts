import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from './../../../shared/models/product';
import { ShoppingCart } from './../../../shared/models/shopping-cart';
import { ProductService } from './../../../shared/services/product.service';
import { ShoppingCartService } from './../../../shared/services/shopping-cart.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private subscription: Subscription;
  productList: Product[] = [];
  filteredList: Product[] = [];
  cart$: Observable<ShoppingCart>;
  category: string;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: ShoppingCartService) { }

  async ngOnInit() {

    this.cart$ = await this.cartService.getCart()

    //Mapping the products to Product interface
    this.subscription = this.productService.getAllProducts().snapshotChanges().pipe(switchMap((products: any) => {
      this.productList = this.filteredList = products.map((details: any) => (
        {
          key: details.payload.key,
          title: details.payload.val().title,
          price: details.payload.val().price,
          imageUrl: details.payload.val().imageUrl,
          category: details.payload.val().category
        }))

      return this.route.queryParamMap
    })).subscribe(params => {
      this.category = params.get("category");
      this.applyFilter();
    })
  }

  private applyFilter() {
    this.filteredList = (this.category) ?
      this.productList.filter(p => p.category == this.category) : this.productList;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
