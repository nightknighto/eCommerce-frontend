import React, { FormEvent, useState } from "react";
import Link from "next/link";

interface AddProductToSellProps {
    setAddProduct: (b:boolean)=>void,
    token: string | null,
    userId: number | null
}

const AddProductToSell = ({ setAddProduct, token, userId }: AddProductToSellProps)=>{
    const [url,setUrl] = useState("https://distributed-project-backend.onrender.com/api/home/products/")

    const submitProduct = async (e:FormEvent)=>{
        e.preventDefault()
        const form = Object.fromEntries(new FormData(e.target as HTMLFormElement));
        console.log(form);
        for(let entry in form){
            if(entry === "quantity" || entry === "category" || entry === "seller")
                form[`${entry}`] = +form[`${entry}`];
        }
        console.log(form)
        
        if(!token){
            alert("You should login first");
            return;
        }
        console.log(token);
        const res = await fetch(url,{
            method:"POST",
            mode:"cors",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(form),
        })
        const r = await res.json();
        console.log(r);
    }

    return(
        <form className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col bg-white p-10 z-20" onSubmit={submitProduct}>
            <div className="text-3xl font-semibold">Enter product</div>
            <div className="flex flex-col text-xl font-semibold">
                <label htmlFor="thumbnail">Thumbnail:&nbsp;</label>
                <input className="w-80 h-10 text-2xl rounded font-normal" type="text" name="thumbnail" id="thumbnail"/>
            </div>
            <div className="flex flex-col text-xl font-semibold">
                <label htmlFor="name">Name:&nbsp;</label>
                <input className="w-80 h-10 text-2xl rounded font-normal" type="text" name="name" id="name"/>
            </div>
            <div className="flex flex-col text-xl font-semibold">
                <label htmlFor="description">Description:&nbsp;</label>
                <input className="w-80 h-10 text-2xl rounded font-normal" type="text" name="description" id="description"/>
            </div>
            <div className="flex flex-col text-xl font-semibold">
                <label htmlFor="price">Price:&nbsp;</label>
                <input className="w-80 h-10 text-2xl rounded font-normal" type="text" name="price" id="price"/>
            </div>
            <div className="flex flex-col text-xl font-semibold">
                <label htmlFor="quantity">Quantity:&nbsp;</label>
                <input className="w-80 h-10 text-2xl rounded font-normal" type="number" name="quantity" id="quantity"/>
            </div>
            <div className="flex flex-col text-xl font-semibold">
                <label htmlFor="specs">Specs:&nbsp;</label>
                <input className="w-80 h-10 text-2xl rounded font-normal" type="text" name="specs" id="specs"/>
            </div>
            <div className="flex flex-col text-xl font-semibold">
                <label htmlFor="category">Category:&nbsp;</label>
                <input className="w-80 h-10 text-2xl rounded font-normal" type="number" name="category" id="category"/>
            </div>
            <div className="flex flex-col text-xl font-semibold">
                <label htmlFor="seller">Seller:&nbsp;</label>
                <input className="w-80 h-10 text-2xl rounded font-normal" type="number" name="seller" id="seller" value={userId?userId:0}/>
            </div>
            <input type="submit" className=""/>
        </form>
    )
}

export default AddProductToSell;