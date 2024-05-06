"use client";

import { useContext, useEffect, useState } from "react";
import ProductCard from "../Cards/ProductCard";
import { Product } from "@/types/product";
import { AuthContext } from "@/contexts/AuthContext";

const HomeCategoryProducts = () => {
    const {token} = useContext(AuthContext);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<{name: string, id: number}[]>([]);

    useEffect(() => {
        fetch("https://distributed-project-backend.onrender.com/api/home/products?limit=200",{
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
            },
        })
        .then(res => res.json())
        .then((data: Product[]) => {
            setProducts(data);
            const _categories = data.map(product => ({name: product.category_name, id: product.category}));
            const uniqueCategories = new Map(_categories.map(c => [c.id, c])).values();
            setCategories([...uniqueCategories]);
        })
    }, []);

    return (
        <>
        {categories.map(category => (
            <>
                <h2 className="text-4xl font-bold dark:text-white mb-2">{category.name}</h2>
                <div className="flex overflow-x-auto gap-x-2">
                    {products.filter(p => p.category === category.id).slice(0, 10).map(product => (
                        <div key={product.id} className="flex-shrink-0">
                            <ProductCard product={product} type="addtocart" key={product.id}/>
                        </div>
                    ))}
                </div>
            </>
        ))}
        </>
    );
}
 
export default HomeCategoryProducts;