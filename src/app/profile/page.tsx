"use client"
import Image from "next/image";
import JoinAsSeller from "./JoinAsSeller";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { ProfileData } from "@/types/profileData";
import { Button, Table } from "flowbite-react";
import { Product } from "@/types/product";
import { CartButtonContext } from "@/contexts/CartButtonContext";
import OrderWindow from "./OrderWindow";

interface Order {
    amount: number,
    customer: number,
    payment_set : {
        credit_card_number: string,
        credit_card_expiry: string,
        id: number,
        payment_amount: number,
        payment_date: string,
        payment_method: string,
    }
    products: Product[]
}

const Profile = () => {
    const {token} = useContext(AuthContext);
    const {cartData, addToCart} = useContext(CartButtonContext);
    const [profile,setProfile] = useState<ProfileData>();
    const [openSellerModal,setOpenSellerModal] = useState(false);
    const [openAddProduct,setOpenAddModal] = useState(false);

    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [orders,setOrders] = useState<Order[]>([])
    const [orderToShow,setOrderToShow] = useState<Order|null>() 

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

    const getOrders = () =>{
        fetch("https://distributed-project-backend.onrender.com/api/payment/order/",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then(async (res)=>{
            const orders = await res.json()
            setOrders(orders);
            console.log(orders[0]);
        })
    }

    const getSeller = ()=>{
        fetch("https://distributed-project-backend.onrender.com/api/stats/my-seller-info/",{
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`   
            }
        }).then(async (response)=>{
            const seller = await response.json();
            console.log(seller)
        })
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
            console.log(data)
            if(data.user.is_seller) getSeller();
            setProfile(data);
        }
        fetchUser();
        fetchWishlist();
        getOrders();
    }, [token])

    return (
        <div className="flex flex-col items-start md:flex-row w-full">
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
                {/* {!profile?.user.is_seller && 
                <button className="text-xl bg-sky-500 text-white p-2 mt-2 rounded-md" onClick={e=>setOpenSellerModal(true)}>Join as seller</button>
                } */}
            </div>
            {/* {
                openSellerModal?
                (
                    <JoinAsSeller setSeller={setOpenSellerModal} token={token}/>
                ):("")
            } */}

            <div className="flex flex-col w-full">
                <div className="w-full p-4">
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

                <div className="w-full p-4">
                    <div className="flex justify-between mb-2">
                        <h2 className="text-2xl font-bold">My Orders</h2>
                    </div>
                    <div className="overflow-x-auto mb-8">
                        <Table>
                            <Table.Head>
                                <Table.HeadCell>Order id</Table.HeadCell>
                                <Table.HeadCell>Amount</Table.HeadCell>
                                <Table.HeadCell>Payment</Table.HeadCell>
                                <Table.HeadCell>Status</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {orders.map(order => (
                                    <Table.Row onClick={e=>setOrderToShow(order)} key={order.payment_set.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {order.payment_set.id}
                                        </Table.Cell>
                                        <Table.Cell>{order.amount} EGP</Table.Cell>
                                        <Table.Cell>{order.payment_set.payment_method}</Table.Cell>
                                        <Table.Cell >
                                            <button className="bg-green-600 p-1 px-3 text-white rounded-md">{"Delivered"}</button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
                {
                    orderToShow?(
                        <>
                            <OrderWindow order={orderToShow} ></OrderWindow>
                            <div className="bg fixed w-full h-full top-0 left-0 bg-black opacity-50" onClick={e=>setOrderToShow(null)}></div>
                        </>
                    ):""
                }
            </div>
            <div className={`fixed top-0 left-0 w-full h-full bg-black z-10 ${openSellerModal || openAddProduct?"block":"hidden"} opacity-50`} onClick={e=>{setOpenSellerModal(false); setOpenAddModal(false)}}></div>
        </div>
    );
}
 
export default Profile;