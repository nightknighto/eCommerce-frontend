import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "flowbite-react";
import { AuthContext } from "@/contexts/AuthContext";

const CartButton = () => {

  const {token} = useContext(AuthContext);
  const [itemsCount, setItemsCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch("https://distributed-project-backend.onrender.com/api/stats/cart-items/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: any = await response.json();
      setItemsCount(data.cart.length);
      setTotalPrice(data.total_price);
    }
    if (token) {
      fetchCart();
    }
  }, [token]);

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
          {itemsCount} item(s) - ${totalPrice.toFixed(2)}
        </Button>
      </Link>
  );
};

export default CartButton;
