import { Button } from "flowbite-react";
import ReviewStars from "../Stars";
import { Product } from "@/types/product";
import Link from "next/link";

interface ProductCardProps {
    type: "edit"|"addtocart";
    onClick?: () => void;
    stock?: number;
    product: Product;
}

export default function ProductCard(props: ProductCardProps) {
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link href="#">
                <img className="p-8 rounded-t-lg" src="https://flowbite.com/docs/images/products/apple-watch.png" alt="product image" />
            </Link>
            <div className="px-5 pb-5">
                <Link href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
                </Link>
                <ReviewStars rating={4.5} />
                <div className="flex items-center justify-between">
                    {props.stock ? 
                    <span className="text-xl font-semibold text-gray-900 dark:text-white">
                        {`${props.stock} left in stock` }
                    </span>
                    :
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {"$599"}
                    </span> 
                    }
                    
                    {props.type === "edit" ? 
                    <Button 
                        onClick={props.onClick}
                    >
                        Edit Product
                    </Button>
                    : 
                        <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                    }
                </div>
            </div>
        </div>
    )
}