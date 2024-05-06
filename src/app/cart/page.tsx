"use client";
import MainLayout from "@/components/Layouts/MainLayout";
import ShoppingCart from "@/app/cart/ShoppingCart";
import { AuthContext } from "@/contexts/AuthContext";
import { CartsData } from "@/types/cartsData";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { CartButtonContext } from "@/contexts/CartButtonContext";

export default function CartPage() {

    const {cartData, fetchCart, clearCart} = useContext(CartButtonContext);

    return (
        <>
            <div className="grid grid-cols-12 gap-4 m-3">
                <div className="col-span-12 lg:col-span-8">
                    <ShoppingCart cartItems={cartData?.cart} fetchCart={fetchCart} />
                </div>

                {/* Summary */}
                <div className="bg-white col-span-12 lg:col-span-4 p-3 flex flex-col gap-y-5">
                    <h3 className="text-xl font-semibold"
                    >Summary</h3>
                    <div className="flex justify-between">
                        <p>Total</p>
                        <p>{cartData?.total_price}$</p>
                    </div>
                    <Link href="/Checkout">
                        <button className="block border-2 p-1 w-full">Checkout</button>
                    </Link>
                    <Link href="/">
                        <button className="block border-2 p-1 w-full">Continue Shopping</button>
                    </Link>
                    <button className="block border-2 p-1 w-full" onClick={clearCart}>Clear Cart</button>
                </div>
            </div>
        </>
    )
} 