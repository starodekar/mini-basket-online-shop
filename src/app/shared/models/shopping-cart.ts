import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};

        for (let productId in itemsMap) {
            let item = itemsMap[productId]
            let cartItem = new ShoppingCartItem();
            Object.assign(cartItem, item);
            cartItem.quantity = item.quantity;
            this.items.push(cartItem);
        }
    }

    get totalItemsCount() {
        let totalItemsCount = 0;
        for (let productId in this.itemsMap)
            totalItemsCount += this.itemsMap[productId].quantity;

        return totalItemsCount;
    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items)
            sum += this.items[productId].totalPrice;

        return sum;
    }

    getQuantity(product: Product) {
        let item = this.itemsMap[product.key];
        return item ? item.quantity : 0;
    }

}