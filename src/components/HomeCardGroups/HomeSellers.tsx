"use client";

import { useEffect, useState } from "react";
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
    const [sellers, setSellers] = useState<Seller[]>([]);

    useEffect(() => {
        fetch("https://distributed-project-backend.onrender.com/api/stats/sellers/",{
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
            },
        })
        .then(res => res.json())
        .then((data) => {
            setSellers(data);
        })
    }, []);

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