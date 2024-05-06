"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Category } from "@/types/category";
import CategoryCard from "../Cards/CategoryCard";

const HomeCategories = () => {
    const {token} = useContext(AuthContext);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        if (!token) return;
        fetch("https://distributed-project-backend.onrender.com/api/home/categories/",{
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        .then(res => res.json())
        .then((data) => {
            setCategories(data);
        })
    }, [token]);

    return (
        <div className="flex overflow-x-auto gap-x-2">
            {categories.map(category => (
                <div key={category.id} className="flex-shrink-0">
                    <CategoryCard category={category} key={category.id}/>
                </div>
            ))}
        </div>
    );
}
 
export default HomeCategories;