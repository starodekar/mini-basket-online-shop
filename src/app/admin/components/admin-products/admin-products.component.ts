import { Product } from './../../../shared/models/product';
import { ProductService } from './../../../shared/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  productList: Product[];
  filteredList: Product[];
  private subscription: Subscription;
  table: DataTableResource<Product>
  tableItems: Product[] = [];
  totalProductsCount: number;

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.subscription = this.productService.getAllProducts().snapshotChanges().subscribe(products => {
      this.productList = this.filteredList = products.map(details =>
        (
          {
            key: details.payload.key,
            title: details.payload.val().title,
            price: details.payload.val().price,
            imageUrl: details.payload.val().imageUrl,
            category: details.payload.val().category
          }))
      this.initializeTable() // Mapping the products according to our defined product class
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  initializeTable(){
    this.table = new DataTableResource(this.filteredList);
    this.table.query({ offset: 0 }) // Gets all the records for the first page, offset: 0 => page 1
      .then(items => this.tableItems = items);
    this.table.count() // Total products in out table
      .then(count => this.totalProductsCount = count);
  }

  refreshItems(params) {
    if (!this.table)
      return;

    this.table.query(params) // Gets all the records for the current page 
      .then(items => this.tableItems = items);
  }

  search(query) {
    this.filteredList = (query) ?
      this.productList.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.productList;

    this.initializeTable();
  }

}

