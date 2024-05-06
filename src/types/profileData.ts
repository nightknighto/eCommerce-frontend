import { Order } from "./orders";
import { User } from "./user";

export interface ProfileData {
    user: User;
    avatar: string;
    address: string;
    wishlist: number[];
    order_set: Order[];
}