import Image from "next/image";
import { Product } from "@/types/product";
import Link from "next/link";
import { CartItem } from "@/types/cart";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { Button } from "flowbite-react";

export default function WishlistItems ({ wishlistItems, fetchWishlist }: {
  wishlistItems?: Product[];
  fetchWishlist: () => void;
}) {

  const { token } = useContext(AuthContext);

  async function deleteItem(id: number) {
    const response = await fetch(`https://distributed-project-backend.onrender.com/api/stats/remove-product/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      fetchWishlist();
    }
  }

  async function changeQuantity(id: number, e: React.ChangeEvent<HTMLInputElement>) {
    if(!e.target.value || !parseInt(e.target.value) || parseInt(e.target.value) <= 0) return;
    const response = await fetch(`https://distributed-project-backend.onrender.com/api/stats/cart-items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity: parseInt(e.target.value),
      }),
    });
    if (response.ok) {
      fetchWishlist();
    }
  }

  const clearWishlist = () => {
    fetch(`https://distributed-project-backend.onrender.com/api/stats/clear-wishlist`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    })
    .then(() => fetchWishlist());
  }


  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-between px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Shopping Cart
        </h4>
        <Button color="warning" onClick={clearWishlist}>Clear Wishlist</Button>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 sm:col-span-4 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Quantity</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Unit Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Total</p>
        </div>
      </div>

      {wishlistItems?.map((item) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={item.id}
        >
          <div className="col-span-2 sm:col-span-4 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={"/images/product/product-04.png"}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div>
              <p className="text-sm text-black dark:text-white underline">
                <Link href={`/productPage/${item.id}`} >{item.name}</Link>
              </p>
            </div>
          </div>
          <div className="col-span-2 items-center flex">
            <p className="text-sm text-black dark:text-white">
              <input type="number" defaultValue={item.quantity} className="w-20" min={0} max={99} onChange={changeQuantity.bind(null, item.id)}  />
              <button className="m-1 p-1 border-2" onClick={deleteItem.bind(null, item.id)}>X</button>
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              ${item.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">${item.price * item.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

