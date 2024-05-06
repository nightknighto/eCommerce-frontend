"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Category } from "@/types/category";
import CategoryCard from "../Cards/CategoryCard";
import MerchantCard from "../Cards/MerchantCard";
import { User } from "@/types/user";
import { Product } from "@/types/product";

type Seller = {
    user: User,
    company_name: string,
    location: string,
    products: Product[]
}

const HomeSellers = () => {
    const {token} = useContext(AuthContext);
    const [sellers, setSellers] = useState<Seller[]>([]);

    useEffect(() => {
        if (!token) return;
        fetch("https://distributed-project-backend.onrender.com/api/stats/sellers/",{
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            setSellers(data);
        })
    }, [token]);

    return (
        <div className="flex overflow-x-auto gap-x-2">
            {sellers.map(seller => (
                <div key={seller.user.id} className="flex-shrink-0 w-80">
                    <MerchantCard user={seller.user} company={seller.company_name} numberOfProducts={seller.products.length}/>
                </div>
            ))}
        </div>
    );
}
 
export default HomeSellers;