"use client";

import { useContext, useEffect, useState } from "react";
import ProductCard from "../Cards/ProductCard";
import { AuthContext } from "@/contexts/AuthContext";
import { Product } from "@/types/product";

const HomeProducts = () => {
    const {token} = useContext(AuthContext);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (!token) return;
        fetch("https://distributed-project-backend.onrender.com/api/home/products/",{
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            setProducts(data);
        })
    }, [token]);

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