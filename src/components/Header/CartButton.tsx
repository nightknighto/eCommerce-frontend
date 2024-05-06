import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "flowbite-react";
import { AuthContext } from "@/contexts/AuthContext";
import { CartsData } from "@/types/cartsData";
import { CartButtonContext } from "@/contexts/CartButtonContext";

const CartButton = () => {

  const {cartData} = useContext(CartButtonContext);

  return (
      <Link
        className="flex items-center justify-center rounded-full text-white"
        href="/cart"
      >
        <Button color="success" className="p-0">
          <Image
            src={"/images/cart-pill.png"}
            alt="Cart"
            width={24}
            height={24}
          />
          {cartData.cart.length} item(s) - ${cartData.total_price.toFixed(2)}
        </Button>
      </Link>
  );
};

export default CartButton;
