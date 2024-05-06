import { Product } from "./product"
import { User } from "./user"

export type SellerInfo = {
    avatar: string,
    average_product_rating: string,
    company_name: string,
    location: string,
    out_of_stock_num: number​
    products: Product[],
    products_num: number,
    total_products_sold: number,
    total_revenue: string,
    user: User
}