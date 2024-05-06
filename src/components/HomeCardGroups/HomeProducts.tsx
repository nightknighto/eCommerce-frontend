"use client";

import { useEffect, useState } from "react";
import ProductCard from "../Cards/ProductCard";
import { Product } from "@/types/product";

const HomeProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("https://distributed-project-backend.onrender.com/api/home/products/",{
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
            },
        })
        .then(res => res.json())
        .then((data) => {
            setProducts(data);
        })
    }, []);

    return (
        <div className="flex overflow-x-auto gap-x-2">
            {products.slice(0, 10).map(product => (
                <div key={product.id} className="flex-shrink-0">
                    <ProductCard product={product} type="addtocart" key={product.id}/>
                </div>
            ))}
        </div>
    );
}
 
export default HomeProducts;