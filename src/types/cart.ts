import { Product } from "./product"

export type CartItem = {
    "id": number,
    "customer": number,
    "product": string,
    "quantity": number,
    "product_details": Product
}