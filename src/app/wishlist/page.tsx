"use client";
import MainLayout from "@/components/Layouts/MainLayout";
import ShoppingCart from "@/app/cart/ShoppingCart";
import { AuthContext } from "@/contexts/AuthContext";
import { CartsData } from "@/types/cartsData";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { CartButtonContext } from "@/contexts/CartButtonContext";
import WishlistItems from "./ShoppingCart";
import { Product } from "@/types/product";

export default function WishlistPage() {
    const {token} = useContext(AuthContext);
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

    const fetchWishlist = () => {
        fetch(`https://distributed-project-backend.onrender.com/api/stats/get-wishlist`, {
            headers: {
                "Authorization": `Bearer ${token}`, 
            }
        })
        .then(res => res.json())
        .then((wishlist: Product[]) => {
            console.log(wishlist);
            setWishlistItems(wishlist);
        })
    };

    useEffect(() => {
        fetchWishlist();
    }, [token]);

    return (
        <>
            <div className="grid grid-cols-12 gap-4 m-3">
                <div className="col-span-12 lg:col-span-12">
                    <WishlistItems wishlistItems={wishlistItems} fetchWishlist={fetchWishlist} />
                </div>
            </div>
        </>
    )
} 