import React, { FormEvent, useState,useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";

interface JoinAsSellerProps {
    setSeller: (b:boolean)=>void,
    token: string | null,
    userId: number | null
}

const JoinAsSeller = ({setSeller, token, userId}:JoinAsSellerProps)=>{
    const [url,setUrl] = useState("https://distributed-project-backend.onrender.com/api/auth/register/seller/")
    const submitSeller = async (e:FormEvent)=>{
        e.preventDefault();
        const form = Object.fromEntries(new FormData(e.target as HTMLFormElement));
        console.log(form)
        if(!token){
            alert("You should login first");
            return 
        }
        console.log(token)
        const res = await fetch(url,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`, 
            },
            body:JSON.stringify(form),
        })
        const r = await res.json();
        console.log(r);
        console.log(res.status);
        if(!(res.status === 201 || res.status === 200)){
            alert("You may have already joined");   
        }else{
            setSeller(false)
        }
    }

    return(
        <>
            <form className="fixed top-1/2 left-1/2 bg-white z-10 flex flex-col gap-y-3 p-5 justify-center 
            -translate-y-1/2 -translate-x-1/2 rounded z-20" onSubmit={submitSeller}>
                <div className="text-2xl font-semibold">Join as seller</div>
                <div className="flex flex-row items-center">
                    <label className="w-20 font-semibold" htmlFor="company_name">Company:&nbsp;</label>
                    <input className="h-8 rounded w-100" type="text" name="company_name" id="company_name"/>
                </div>
                <div className="flex flex-row items-center">
                    <label className="w-20 font-semibold" htmlFor="location">Location:&nbsp;</label>
                    <input className="h-8 rounded w-100" type="text" name="location" id="location"/>
                </div>
                <input type="submit" className="bg-white shadow-md h-8 font-semibold rounded-md cursor-pointer 
                text-black border border-black hover:bg-slate-100"/>
            </form>
        </>
    )
}

export default JoinAsSeller;