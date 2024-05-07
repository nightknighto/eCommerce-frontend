"use client"
import Image from "next/image";
import JoinAsSeller from "./JoinAsSeller";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { ProfileData } from "@/types/profileData";
import { Button, Table } from "flowbite-react";
import { Product } from "@/types/product";
import { CartButtonContext } from "@/contexts/CartButtonContext";

const Profile = () => {
    const {token} = useContext(AuthContext);
    const {cartData, addToCart} = useContext(CartButtonContext);

    const [profile,setProfile] = useState<ProfileData>();
    const [openSellerModal,setOpenSellerModal] = useState(false);
    const [openAddProduct,setOpenAddModal] = useState(false);

    const [wishlist, setWishlist] = useState<Product[]>([]);

    const fetchWishlist = () => {
        fetch(`https://distributed-project-backend.onrender.com/api/stats/get-wishlist`, {
            headers: {
                "Authorization": `Bearer ${token}`, 
            }
        })
        .then(res => res.json())
        .then((wishlist: Product[]) => {
            console.log(wishlist);
            setWishlist(wishlist);
        })
    };

    async function deleteWishlistItem(id: number) {
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

    useEffect(() => {
        if (!token) return;
        const fetchUser = async () => {
            const res = await fetch("https://distributed-project-backend.onrender.com/api/stats/profile/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = await res.json();
            setProfile(data);
        }
        fetchUser();
        fetchWishlist();
    }, [token])

    return (
        <div className="flex flex-col md:flex-row w-full">
            {/* Profile */}
            <div className="w-full md:w-1/4 flex flex-col items-center justify-center p-4">
                <div className="w-full border-slate-200 border-2 flex flex-col rounded-md p-2">
                    <p className="text-xl font-semibold mb-8">My Profile</p>

                    <p className="font-medium">Profile Photo</p>
                    <div className="relative">
                    <Image
                        width={100}
                        height={100}
                        // TODO: Show image once we get rid of the stupid URLs in the db
                        src={"/images/user/user-01.png"}
                        
                        alt="User"
                    />
                    </div>


                    <p className="font-medium mt-4">Username</p>
                    <div className="bg-slate-200 rounded-md py-2 border-2 border-slate-300">
                        <p>{profile?.user.username}</p>
                    </div>

                    <p className="font-medium mt-4">Email</p>
                    <div className="bg-slate-200 rounded-md py-2 border-2 border-slate-300">
                        <p>{profile?.user.email}</p>
                    </div>

                    <p className="font-medium mt-4">First Name</p>
                    <div className="bg-slate-200 rounded-md py-2 border-2 border-slate-300">
                        <p>{profile?.user.first_name}</p>
                    </div>

                    <p className="font-medium mt-4">Last Name</p>
                    <div className="bg-slate-200 rounded-md py-2 border-2 border-slate-300">
                        <p>{profile?.user.last_name}</p>
                    </div>

                    <p className="font-medium mt-4">Address</p>
                    <div className="bg-slate-200 rounded-md py-2 border-2 border-slate-300">
                        <p>{profile?.address}</p>
                    </div>
                </div>
                {!profile?.user.is_seller && 
                <button className="text-xl bg-sky-500 text-white p-2 mt-2 rounded-md" onClick={e=>setOpenSellerModal(true)}>Join as seller</button>
                }
            </div>
            {
                openSellerModal?
                (
                    <JoinAsSeller setSeller={setOpenSellerModal} token={token}/>
                ):("")
            }
            {/* Wishlist */}
            <div className="w-full md:w-3/4 p-4">
                <div className="flex justify-between mb-2">
                    <h2 className="text-2xl font-bold">My Wishlist</h2>
                    <Button onClick={clearWishlist}>
                        Clear Wishlist
                    </Button>
                </div>
                <div className="overflow-x-auto mb-8">
                        <Table>
                            <Table.Head>
                                <Table.HeadCell>Product name</Table.HeadCell>
                                <Table.HeadCell>Category</Table.HeadCell>
                                <Table.HeadCell>Price</Table.HeadCell>
                                <Table.HeadCell>Cart</Table.HeadCell>
                                <Table.HeadCell>Remove</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {wishlist.map(product => (
                                    <Table.Row key={product.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {product.name}
                                        </Table.Cell>
                                        <Table.Cell>{product.category_name}</Table.Cell>
                                        <Table.Cell>{product.price}</Table.Cell>
                                        <Table.Cell className="flex gap-x-2">
                                            {/* Check if wishlist item is already in cart */}
                                            {cartData.cart.filter(c => c.product_details.id === product.id).length > 0 ?
                                                <span className="font-semibold">Added to cart!</span>
                                                :
                                                <Button size="sm" onClick={() => addToCart(product.id)}>
                                                    Add to Cart
                                                </Button>
                                            }
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button size="sm" onClick={() => deleteWishlistItem(product.id)}>
                                                Remove
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                </div>
            </div>
            <div className={`fixed top-0 left-0 w-full h-full bg-black z-10 ${openSellerModal || openAddProduct?"block":"hidden"} opacity-50`} onClick={e=>{setOpenSellerModal(false); setOpenAddModal(false)}}></div>
        </div>
    );
}
 
export default Profile;