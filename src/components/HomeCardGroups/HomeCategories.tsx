"use client";

import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import CategoryCard from "../Cards/CategoryCard";

const HomeCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetch("https://distributed-project-backend.onrender.com/api/home/categories/",{
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
            },
        })
        .then(res => res.json())
        .then((data) => {
            setCategories(data);
        })
    }, []);

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