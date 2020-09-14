
export class Order {

    userId: string;
    datePlaced: number;
    items: [] = [];
    shippingDetails: any;
    key?: string;

    constructor(userId, shippingDetails, cart) {
        this.userId = userId;
        this.datePlaced = new Date().getTime();
        this.shippingDetails = shippingDetails;
        this.items = cart.items.map(i => {
            return {
                product: {
                    title: i.title,
                    imageUrl: i.imageUrl,
                    price: i.price
                },
                quantity: i.quantity,
                totalPrice: i.price * i.quantity
            }
        })

    }
}