import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Product } from './../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  getProduct(pId): AngularFireObject<Product> {
    return this.db.object<Product>('/products/' + pId);
  }

  saveProduct(product) {
    this.db.list('/products').push(product);
  }

  updateProduct(pId, product) {
    this.db.object('/products/' + pId).update(product);
  }

  deleteProduct(pId) {
    this.db.object('/products/' + pId).remove();
  }

  getAllProducts(): AngularFireList<Product> {
    return this.db.list<Product>('/products');
  }
}