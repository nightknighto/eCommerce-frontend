import { CartsData } from "@/types/cartsData";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { open } from "fs/promises";

type CartButtonContextType = {
    cartData: CartsData;
    fetchCart: () => void;
    clearCart: () => void;
    addToCart: (product_id: number) => void;
}

export const CartButtonContext = createContext<CartButtonContextType>({
    cartData: {
        cart: [],
        total_price: 0,
    },
    fetchCart: () => {},
    clearCart: () => {},
    addToCart: () => {},
})

export function CartButtonProvider({children}: {
    children: React.ReactNode
}) {
    const { token, openModal } = useContext(AuthContext)
    const [cartData, setCartData] = useState<CartsData>({
        cart: [],
        total_price: 0,
    });

    const fetchCart = async () => {
        if(!token) return;
        const res = await fetch("https://distributed-project-backend.onrender.com/api/stats/cart-items/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if(!res.ok) {
            alert("Error fetching cart data");
            return;
        }
        const data: CartsData = await res.json();
        setCartData(data);
    }

    function clearCart() {
        fetch("https://distributed-project-backend.onrender.com/api/stats/cart-items/", {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(res => {
            if(res.ok) {
                fetchCart();
            }
        })
    }

    async function addToCart(product_id: number) {
        if(!token) {
            openModal();
            return;
        }

        const res = await fetch("https://distributed-project-backend.onrender.com/api/stats/cart-items/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                product: product_id,
                quantity: 1
            })
        });
        if(res.ok) {
            fetchCart();
        } else {
            if(res.status === 400) {
                alert("Product already in cart")
            }
        }
    }

    useEffect(() => {
        fetchCart();
    }, [token]);

    return (
        <CartButtonContext.Provider value={
            {
                cartData,
                fetchCart,
                clearCart,
                addToCart,
            }
        }>
            {children}
        </CartButtonContext.Provider>
    )
}