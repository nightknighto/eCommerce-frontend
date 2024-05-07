import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import Image from "next/image";

interface OrderProps {
    order:{
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
}

const OrderWindow = ({order}:OrderProps)=>{

    const [products,setproducts] = useState<Product[]>(order.products)

    console.log(order)
    return(
        <div className="text-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col w-1/2 bg-white p-5 rounded-lg z-10">
            <div className="flex flex-row font-semibold m-auto">
                <p className="">Order ID:</p>
                <p>{order?.payment_set.id}</p>
            </div>
            <div className="flex flex-row">
                <p className="font-semibold w-11">Price:</p>
                <p>{order?.amount} EGP</p>
            </div>
            <div className="flex flex-row">
                <p className="font-semibold w-11">date:</p>
                <p>{order?.payment_set.payment_date}</p>
            </div>
            <div>
                <h2 className="font-semibold">Products</h2>
                {
                    products.map(product=>
                        (
                            <div className="flex flex-row my-2 gap-x-2 items-center">
                                <Image 
                                src={`${product.thumbnail?product.thumbnail:"https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"}`}
                                width={"100"}
                                height={"10"}
                                style={{width:"130",
                                height:"auto"}}
                                alt=""
                                />
                                <div className="font-semibold">
                                    <p>{product.name}</p>
                                    <p>{product.price} EGP</p>
                                </div>    
                                <div className="relative left-10 bg-green-500 text-white w-10 rounded-full text-center">
                                 <span className="">{1}</span>   
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default OrderWindow;