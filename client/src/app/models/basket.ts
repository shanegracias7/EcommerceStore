export interface BasketItem {
    productId: number;
    name: string;
    description: string;
    price: number;
    pictureURL: string;
    type: string;
    brand: string;
    quantity: number;
}

export interface Basket {
    id: number;
    buyerId: string;
    items: BasketItem[];
}