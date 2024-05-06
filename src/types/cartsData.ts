import { CartItem } from "./cart"

export type CartsData = {
    cart: CartItem[];
    total_price: number;
}