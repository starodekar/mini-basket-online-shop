import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartItem } from './../models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges()
      .pipe(map((cart: any) => new ShoppingCart(cart.items)));
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object("/shopping-carts/" + cartId + "/items").remove()
  }

  addToCart(product) {
    this.updateItem(product, 1);
  }

  removeFromCart(product) {
    this.updateItem(product, -1);
  }

  private createCart() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime()
    })
  }

  //get a cart item
  private getItem(cartId: string, productId: string): AngularFireObject<ShoppingCartItem> {
    return this.db.object<ShoppingCartItem>("/shopping-carts/" + cartId + "/items/" + productId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem("shopping-cart-id");
    if (cartId) return cartId;

    let result = await this.createCart();
    localStorage.setItem('shopping-cart-id', result.key);
    return result.key;
  }

  private async updateItem(product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    item$.valueChanges().pipe(take(1))
      .subscribe((data: any) => {
        let quantity = (data ? (data.quantity || 0) : 0) + change;
        // Used || to avoid null reference error

        if (quantity === 0) item$.remove();
        else item$.update({
          key: product.key,
          title: product.title,
          imageUrl: product.imageUrl,
          category: product.category,
          price: product.price,
          quantity: quantity
        });
      });
  }

}
