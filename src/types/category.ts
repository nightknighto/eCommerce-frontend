import { Product } from "./product";

export type Category = {
  "id": number,
  "thumbnail": string,
  "name": string,
  "products_number": number,
  "example_products": Product[],
  "category_path": string
};
