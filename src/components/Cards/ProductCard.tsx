import { Button } from "flowbite-react";
import ReviewStars from "../Stars";
import { Product } from "@/types/product";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useState } from "react";

interface ProductCardProps {
    type: "edit"|"addtocart";
    onClick?: () => void;
    stock?: number;
    product: Product;
}

export default function ProductCard({
    product,
    type,
    onClick,
    stock
}: ProductCardProps) {

    const {token, openModal} = useContext(AuthContext);
    const [addedToCart, setAddedToCart] = useState(false);

    async function addToCart() {
        if(token) {
            const res = await fetch("https://distributed-project-backend.onrender.com/api/stats/cart-items/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    product: product.id,
                    quantity: 1
                })
            });
            if(res.ok) {
                setAddedToCart(true);
            } else {
                if(res.status === 400) {
                    alert("Product already in cart")
                }
            }
        } else {
            openModal();
        }
    }

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link href={`/productPage/${product.id}`}>
                <img className="p-8 rounded-t-lg" src="https://flowbite.com/docs/images/products/apple-watch.png" alt="product image" />
            </Link>
            <div className="px-5 pb-5">
                <Link href={`/productPage/${product.id}`}>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                    <h6 className="text-l font-semibold tracking-tight text-gray-100 dark:text-white">Sold by: {product.seller_name}</h6>
                    <h6 className="text-l font-semibold tracking-tight text-gray-100 dark:text-white">Category: {product.category_name}</h6>
                </Link>
                <ReviewStars rating={4.5} />
                <div className="flex items-center justify-between">
                    {stock ? 
                    <span className="text-xl font-semibold text-gray-900 dark:text-white">
                        {`${stock} left in stock` }
                    </span>
                    :
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {product.price}
                    </span> 
                    }
                    
                    {type === "edit" ? 
                        <Button 
                            onClick={onClick}
                            color="warning"
                        >
                            Edit Product
                        </Button>
                    : 
                        <>{
                            addedToCart ? 
                            <span className="text-gray-900 dark:text-white">Added to cart</span>
                            :
                            <Button 
                                onClick={addToCart}
                                color="blue"
                            >
                                Add to cart
                            </Button>
                        }</>
                    }
                </div>
            </div>
        </div>
    )
}